import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  Star,
  Clock,
  Users,
  Zap,
  Download,
  Activity,
} from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";

// Types and Interfaces
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  popularity: number;
}

interface StatisticProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface InstallButtonProps {
  isInstalling: boolean;
  progress: number;
  onClick: () => void;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

interface ToolCardProps {
  tool: Tool;
}

// Mock Data
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
    name: "Smart Compiler 2.33",
    description: "Intelligent code compilation with error prediction",
    icon: <Cpu className="w-6 h-6" />,
    category: "build",
    popularity: 88,
  },
  {
    id: "syntax",
    name: "Syntax Analyzer 2.42",
    description: "Real-time code analysis and optimization suggestions",
    icon: <Braces className="w-6 h-6" />,
    category: "debug",
    popularity: 90,
  },
  {
    id: "ai",
    name: "AI Assistant 2.42",
    description: "Context-aware code completion and refactoring",
    icon: <Sparkles className="w-6 h-6" />,
    category: "build",
    popularity: 94,
  },
  {
    id: "ai-beta",
    name: "AI Assistant 2.58",
    description: "Next-gen AI with advanced semantic code understanding and real-time pair programming",
    icon: <Sparkles className="w-6 h-6" />,
    category: "build",
    popularity: 96,
  },
  {
    id: "ai-experimental",
    name: "AI Assistant 2.599",
    description: "Experimental build with quantum-inspired code synthesis and multi-model reasoning",
    icon: <Sparkles className="w-6 h-6" />,
    category: "build",
    popularity: 97,
  },
  {
    id: "ai-nightly",
    name: "AI Assistant 2.599",
    description: "Nightly build with advanced neural architecture and predictive code generation",
    icon: <Sparkles className="w-6 h-6" />,
    category: "build",
    popularity: 98,
  },
];

// Memoized Components
const Statistic = memo(({ icon, label, value }: StatisticProps) => (
  <div className="flex items-center space-x-2">
    <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </div>
));

const FeatureHighlight = memo(({ icon, title, description }: FeatureHighlightProps) => (
  <div className="flex items-start space-x-3 p-4 rounded-lg bg-card">
    <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
));

const InstallButton = memo(({ isInstalling, progress, onClick }: InstallButtonProps) => (
  <Button size="lg" onClick={onClick} disabled={isInstalling}>
    {isInstalling ? (
      <>
        Installing...
        <Progress value={progress} className="w-20 ml-2" />
      </>
    ) : (
      <>
        Quick Install
        <ArrowRight className="ml-2 w-4 h-4" />
      </>
    )}
  </Button>
));

const SearchBar = memo(({ value, onChange }: SearchBarProps) => (
  <div className="relative">
    <Input
      id="search-input"
      placeholder="Search tools... (⌘ + /)"
      className="max-w-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      <span className="text-xs">⌘</span>K
    </kbd>
  </div>
));

const ToolCard = memo(({ tool }: ToolCardProps) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
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
    
    <div className="flex items-center text-sm font-mono bg-muted/50 p-2 rounded-md">
      <code>npm install @devtools/{tool.id}</code>
    </div>
  </Card>
));

// Main Component
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

  const startInstallation = useCallback(() => {
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
  }, [toast]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.key === "/" || e.key === "k") && (e.metaKey || e.ctrlKey)) {
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
            <InstallButton
              isInstalling={isInstalling}
              progress={installProgress}
              onClick={startInstallation}
            />
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Statistic
            icon={<Users className="w-5 h-5" />}
            label="Active Developers"
            value="100,000+"
          />
          <Statistic
            icon={<Download className="w-5 h-5" />}
            label="Total Downloads"
            value="1M+"
          />
          <Statistic
            icon={<Activity className="w-5 h-5" />}
            label="Daily Active Users"
            value="50,000+"
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <FeatureHighlight
            icon={<Zap className="w-5 h-5" />}
            title="Lightning Fast"
            description="Optimized performance for instant feedback and real-time updates"
          />
          <FeatureHighlight
            icon={<Star className="w-5 h-5" />}
            title="AI-Powered"
            description="Smart suggestions and automated workflows powered by advanced AI"
          />
        </div>

        {/* Tools Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList>
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="core">Core</TabsTrigger>
                <TabsTrigger value="debug">Debug</TabsTrigger>
                <TabsTrigger value="build">Build</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}