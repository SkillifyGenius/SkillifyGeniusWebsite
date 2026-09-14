// Chromium smoke test for the built Next.js app. Appwrite writes are mocked.
// Run after starting the app: node scripts/smoke-browser.mjs http://127.0.0.1:3100
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = process.argv[2] || "http://127.0.0.1:3000";
const browser = process.env.CHROME_PATH || [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].find(existsSync);
if (!browser) throw new Error("Set CHROME_PATH to a Chrome or Edge executable.");

const profile = mkdtempSync(join(tmpdir(), "skillify-browser-"));
const processRef = spawn(browser, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: "ignore" });
let socket;
const pending = new Map();
const browserErrors = [];
let nextId = 1;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let port;
  for (let attempt = 0; attempt < 100; attempt++) {
    const portFile = join(profile, "DevToolsActivePort");
    if (existsSync(portFile)) {
      port = Number(readFileSync(portFile, "utf8").split("\n")[0]);
      break;
    }
    await pause(100);
  }
  assert.ok(port, "Chromium did not start remote debugging");
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  assert.ok(target, "No browser page target was available");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) {
      if (message.method === "Runtime.exceptionThrown") browserErrors.push(message.params.exceptionDetails.text);
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") browserErrors.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
      return;
    }
    if (!pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  function send(method, params = {}) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  }
  async function waitFor(expression, message) {
    for (let attempt = 0; attempt < 80; attempt++) {
      if (await evaluate(expression)) return;
      await pause(100);
    }
    throw new Error(message);
  }
  async function navigate(path) {
    await send("Page.navigate", { url: new URL(path, base).href });
    await waitFor(`document.readyState === "complete" && location.pathname === ${JSON.stringify(path.split("?")[0])}`, `Page did not load: ${path}`);
    await pause(400);
  }
  const mockAppwrite = `(() => { const realFetch = window.fetch; window.fetch = (input, options) => { if (String(input).includes('/databases/') && options?.method === 'POST') { window.__skillifySubmission = { url: String(input), request: JSON.parse(options.body) }; return Promise.resolve(new Response('{}', {status: 201})); } return realFetch(input, options); }; })()`;
  const fillAndSubmit = (values) => `(() => { ${mockAppwrite}; const form = [...document.querySelectorAll('form')].find(f => f.querySelector('[name="${Object.keys(values)[0]}"]')); for (const [name,value] of Object.entries(${JSON.stringify(values)})) { const field = form.elements.namedItem(name); field.value = value; field.dispatchEvent(new Event('input', {bubbles:true})); field.dispatchEvent(new Event('change', {bubbles:true})); } form.requestSubmit(); return form.checkValidity(); })()`;

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await navigate("/");
  assert.equal(await evaluate(`!!document.querySelector('a[href="/courses"]') && !!document.querySelector('[name="courseSlug"]') && document.body.innerText.includes('Customized 1:1 technology learning')`), true, "Original homepage flow is missing");
  assert.equal(await evaluate(fillAndSubmit({ studentName: "Browser Test Student", parentName: "Browser Test Parent", phone: "+8801000000000", courseSlug: "web-creator-lab" })), true, "Registration form was invalid");
  await waitFor(`!!window.__skillifySubmission`, "Registration did not submit");
  assert.equal(await evaluate(`window.__skillifySubmission.request.data.courseSlug`), "web-creator-lab");
  assert.equal(await evaluate(`window.__skillifySubmission.url.includes('/collections/course_registrations/')`), true);

  await navigate("/blog");
  await evaluate(`document.querySelector('[aria-label^="Read article:"]').click()`);
  await waitFor(`!!document.querySelector('[role="dialog"]')`, "Blog modal did not open");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
  await waitFor(`!document.querySelector('[role="dialog"]')`, "Blog modal did not close on Escape");

  await navigate("/trial?course=web-creator-lab");
  assert.equal(await evaluate(`document.querySelector('[name="courseSlug"]').value`), "web-creator-lab");
  assert.equal(await evaluate(`document.querySelector('[name="studentAge"]').min + '-' + document.querySelector('[name="studentAge"]').max`), "6-18");
  const date = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
  assert.equal(await evaluate(fillAndSubmit({ parentName: "Browser Test Parent", studentName: "Browser Test Student", studentAge: "12", phone: "+8801000000000", email: "browser-test@example.com", preferredDate: date })), true, "Trial form was invalid");
  await waitFor(`!!window.__skillifySubmission`, "Trial did not submit");
  assert.equal(await evaluate(`window.__skillifySubmission.request.data.courseSlug`), "web-creator-lab");
  assert.equal(await evaluate(`window.__skillifySubmission.url.includes('/collections/trial_bookings/')`), true);

  await navigate("/contact");
  assert.equal(await evaluate(fillAndSubmit({ fullName: "Browser Test Parent", email: "browser-test@example.com", subject: "Browser smoke test", message: "This request is mocked and never reaches Appwrite." })), true, "Contact form was invalid");
  await waitFor(`!!window.__skillifySubmission`, "Contact form did not submit");
  assert.equal(await evaluate(`window.__skillifySubmission.url.includes('/collections/leads/')`), true);

  for (const width of [390, 768, 1440]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    for (const path of ["/", "/courses", "/blog", "/trial", "/contact"]) {
      await navigate(path);
      const dimensions = await evaluate(`({ viewport: window.innerWidth, document: document.documentElement.scrollWidth })`);
      assert.ok(dimensions.document <= dimensions.viewport + 1, `${path} overflows at ${width}px: ${JSON.stringify(dimensions)}`);
    }
  }
  assert.deepEqual(browserErrors, [], `Browser errors occurred: ${browserErrors.join(" | ")}`);
  console.log("Chromium smoke passed: preserved routes, three mocked forms, blog modal, and 390/768/1440px layout.");
} finally {
  socket?.close();
  processRef.kill();
  await pause(300);
  const resolvedProfile = realpathSync(profile);
  const resolvedTemp = realpathSync(tmpdir());
  if (resolvedProfile.startsWith(resolvedTemp + "\\") && resolvedProfile.includes("skillify-browser-")) {
    try { rmSync(resolvedProfile, { recursive: true, force: true }); } catch { /* Chromium may still be releasing profile files. */ }
  }
}
