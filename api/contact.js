export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method Not Allowed. Received: ${req.method}` });
  }

  try {
    const formData = req.body;
    
    // Check for required GitHub credentials
    const token = process.env.GITHUB_PAT;
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    
    if (!token || !owner || !repo) {
      console.error("Missing GitHub environment variables");
      return res.status(500).json({ message: "Server configuration missing" });
    }

    const filePath = 'src/Data/contact/messages.json';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    // 1. Fetch the current file from GitHub
    const getResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!getResponse.ok) {
      const errorData = await getResponse.json().catch(() => ({}));
      console.error("Failed to fetch current file:", errorData);
      return res.status(500).json({ message: "Failed to read from GitHub" });
    }

    const fileData = await getResponse.json();
    const sha = fileData.sha;
    
    // Decode current content
    let messages = [];
    if (fileData.content) {
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf8');
      try {
        messages = JSON.parse(decodedContent);
      } catch {
        messages = [];
      }
    }

    // 2. Append new message
    const newMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...formData
    };
    messages.push(newMessage);

    // 3. Encode the updated messages
    const updatedContent = Buffer.from(JSON.stringify(messages, null, 2), 'utf8').toString('base64');

    // 4. Update the file in GitHub
    const putResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        message: `New contact form submission from ${formData['First Name'] || 'User'}`,
        content: updatedContent,
        sha: sha
      })
    });

    if (!putResponse.ok) {
      const errorData = await putResponse.json().catch(() => ({}));
      console.error("Failed to update file:", errorData);
      return res.status(500).json({ message: "Failed to write to GitHub" });
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
