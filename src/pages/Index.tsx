import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Rocket,
  Code2,
  Braces,
  Terminal,
  Cpu,
  GitBranch,
  Boxes,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  popularity: number;
}

const tools: Tool[] = [
  {
    id: "terminal",
    name: "Smart Terminal",
    description: "AI-powered command line interface with predictive suggestions",
    icon: <Terminal className="w-6 h-6" />,
    category: "core",
    popularity: 98,
  },
  {
    id: "debugger",
    name: "Visual Debugger",
    description: "Time-travel debugging with state inspection",
    icon: <Boxes className="w-6 h-6" />,
    category: "debug",
    popularity: 92,
  },
  {
    id: "git",
    name: "Git Control",
    description: "Advanced version control with merge visualization",
    icon: <GitBranch className="w-6 h-6" />,
    category: "core",
    popularity: 95,
  },
  {
    id: "compiler",
    name: "Smart Compiler",
    description: "Intelligent code compilation with error prediction",
    icon: <Cpu className="w-6 h-6" />,
    category: "build",
    popularity: 88,
  },
  {
    id: "syntax",
    name: "Syntax Analyzer",
    description: "Real-time code analysis and optimization suggestions",
    icon: <Braces className="w-6 h-6" />,
    category: "debug",
    popularity: 90,
  },
  {
    id: "ai",
    name: "AI Assistant",
    description: "Context-aware code completion and refactoring",
    icon: <Sparkles className="w-6 h-6" />,
    category: "build",
    popularity: 94,
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [installProgress, setInstallProgress] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  const filteredTools = tools.filter(
    (tool) =>
      (activeCategory === "all" || tool.category === activeCategory) &&
      (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startInstallation = () => {
    setIsInstalling(true);
    setInstallProgress(0);
    
    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          toast({
            title: "Installation Complete",
            description: "All developer tools have been successfully installed!",
          });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && e.metaKey) {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container px-4 py-16 mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <Badge variant="outline" className="px-4 py-1">
            <Rocket className="w-4 h-4 mr-2" />
            Developer Tools v2.0
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            The Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
              Development
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Experience the next generation of development tools powered by AI and real-time collaboration.
          </p>

          <div className="flex gap-4">
            <Button size="lg" onClick={startInstallation} disabled={isInstalling}>
              {isInstalling ? (
                <>
                  Installing...
                  <Progress value={installProgress} className="w-20 ml-2" />
                </>
              ) : (
                <>
                  Quick Install
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Tools Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Input
              id="search-input"
              placeholder="Search tools... (⌘ + /)"
              className="max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList>
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="core">Core</TabsTrigger>
                <TabsTrigger value="debug">Debug</TabsTrigger>
                <TabsTrigger value="build">Build</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {tool.icon}
                  </div>
                  <Badge variant="secondary">
                    {tool.popularity}% Popular
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />
                  Ready to install
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}