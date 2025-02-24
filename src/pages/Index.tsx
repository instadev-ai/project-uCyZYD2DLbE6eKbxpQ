import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Command, Cpu, GitFork, Terminal } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container px-4 py-24 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-muted border animate-fade-in">
            <span className="text-muted-foreground">Introducing DevTools 2.0</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in [animation-delay:150ms]">
            Developer Tools<br />for the Modern Web
          </h1>
          
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in [animation-delay:300ms]">
            Powerful development environment with everything you need to build, debug and deploy your next big project. Built for developers, by developers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in [animation-delay:450ms]">
            <Button size="lg" className="h-12 px-6">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6">
              View on GitHub
              <GitFork className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container px-4 pb-24 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 transition-all hover:shadow-lg">
            <Command className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Command Palette</h3>
            <p className="text-muted-foreground">
              Quick access to all tools and commands with a powerful search interface.
            </p>
          </Card>

          <Card className="p-6 transition-all hover:shadow-lg">
            <Terminal className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Integrated Terminal</h3>
            <p className="text-muted-foreground">
              Full-featured terminal with multi-tab support and command history.
            </p>
          </Card>

          <Card className="p-6 transition-all hover:shadow-lg">
            <Code2 className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Code Intelligence</h3>
            <p className="text-muted-foreground">
              Smart code completion and insights powered by AI.
            </p>
          </Card>

          <Card className="p-6 transition-all hover:shadow-lg">
            <Cpu className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Performance Tools</h3>
            <p className="text-muted-foreground">
              Advanced profiling and debugging tools to optimize your code.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;
