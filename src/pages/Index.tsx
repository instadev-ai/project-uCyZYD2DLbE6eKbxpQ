import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Command, Cpu, GitFork, Terminal } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

interface FeatureMetrics {
  views: number;
  interactions: number;
  loadTime: number;
}

const Index = () => {
  // State management
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFeature, setActiveFeature] = useState<string>("");
  const [metrics, setMetrics] = useState<FeatureMetrics>({
    views: 0,
    interactions: 0,
    loadTime: 0,
  });
  const [systemStatus, setSystemStatus] = useState<"online" | "offline" | "degraded">("offline");

  const { toast } = useToast();

  // Simulated API call
  const fetchSystemStatus = useCallback(async () => {
    try {
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemStatus("online");
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch system status:", error);
      setSystemStatus("degraded");
    }
  }, []);

  // Memoized calculations
  const performanceScore = useMemo(() => {
    return Math.round((metrics.loadTime * 0.4 + metrics.interactions * 0.6) * 100) / 100;
  }, [metrics.loadTime, metrics.interactions]);

  // Feature interaction handler
  const handleFeatureInteraction = useCallback((featureId: string) => {
    setActiveFeature(featureId);
    setMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
    }));
    
    toast({
      title: "Feature Activated",
      description: `You've activated ${featureId}. Exploring more features increases your developer score!`,
    });
  }, [toast]);

  // Lifecycle effects
  useEffect(() => {
    fetchSystemStatus();
    
    const cleanup = () => {
      setSystemStatus("offline");
      console.log("Cleaning up system resources...");
    };

    return cleanup;
  }, [fetchSystemStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        loadTime: prev.loadTime + 0.1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (performanceScore > 10) {
      toast({
        title: "Achievement Unlocked!",
        description: "You've reached a performance score of 10+. Keep exploring!",
      });
    }
  }, [performanceScore, toast]);

  // Render helpers
  const renderSystemStatus = useMemo(() => {
    const statusColors = {
      online: "text-green-500",
      offline: "text-red-500",
      degraded: "text-yellow-500",
    };

    return (
      <span className={statusColors[systemStatus]}>
        System Status: {systemStatus}
      </span>
    );
  }, [systemStatus]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading system resources...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container px-4 py-24 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-muted border animate-fade-in">
            <span className="text-muted-foreground">Introducing DevTools 2.0</span>
            {renderSystemStatus}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in [animation-delay:150ms]">
            Developer Tools<br />for the Modern Web
          </h1>
          
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in [animation-delay:300ms]">
            Powerful development environment with everything you need to build, debug and deploy your next big project. Built for developers, by developers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in [animation-delay:450ms]">
            <Button 
              size="lg" 
              className="h-12 px-6"
              onClick={() => handleFeatureInteraction("get_started")}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-6"
              onClick={() => handleFeatureInteraction("github")}
            >
              View on GitHub
              <GitFork className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Performance Score: {performanceScore} | Interactions: {metrics.interactions}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container px-4 pb-24 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card 
            className={`p-6 transition-all hover:shadow-lg ${activeFeature === "command" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleFeatureInteraction("command")}
          >
            <Command className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Command Palette</h3>
            <p className="text-muted-foreground">
              Quick access to all tools and commands with a powerful search interface.
            </p>
          </Card>

          <Card 
            className={`p-6 transition-all hover:shadow-lg ${activeFeature === "terminal" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleFeatureInteraction("terminal")}
          >
            <Terminal className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Integrated Terminal</h3>
            <p className="text-muted-foreground">
              Full-featured terminal with multi-tab support and command history.
            </p>
          </Card>

          <Card 
            className={`p-6 transition-all hover:shadow-lg ${activeFeature === "code" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleFeatureInteraction("code")}
          >
            <Code2 className="w-12 h-12 mb-4 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">Code Intelligence</h3>
            <p className="text-muted-foreground">
              Smart code completion and insights powered by AI.
            </p>
          </Card>

          <Card 
            className={`p-6 transition-all hover:shadow-lg ${activeFeature === "performance" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleFeatureInteraction("performance")}
          >
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
