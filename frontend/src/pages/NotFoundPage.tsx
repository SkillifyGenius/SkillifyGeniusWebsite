import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return <><Seo title="Page not found | Skillify Genius" description="The requested page could not be found." /><section className="grid min-h-[65vh] place-items-center px-5 py-20 text-center"><div><p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">404</p><h1 className="mt-4 text-5xl font-black">That page has moved.</h1><p className="mt-5 text-lg">Let’s get you back to the learning journey.</p><Button asChild className="mt-7"><Link to="/"><ArrowLeft className="h-4 w-4" />Back home</Link></Button></div></section></>;
}
