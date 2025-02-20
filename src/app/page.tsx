import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/supabase/server";
import { CheckCircle, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const user = await getUser();

  return (
    <main>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Supercharge Your Notes with AI
              </h1>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Organize, analyze, and enhance your notes with the power of
                artificial intelligence. Experience note-taking like never
                before.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href={user ? "/dashboard" : "/login"}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-primary/10"
      >
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
              <p>
                Get intelligent summaries and key takeaways from your notes
                automatically.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Sparkles className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Smart Organization</h3>
              <p>
                Let AI categorize and tag your notes for effortless retrieval.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Task Extraction</h3>
              <p>Automatically identify and create tasks from your notes.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Take Notes</h3>
              <p>Write or import your notes into the app.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p>Our AI processes and analyzes your notes.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enhance Productivity</h3>
              <p>Gain insights, stay organized, and boost your productivity.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
