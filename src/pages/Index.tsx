// ... keep existing code (imports and interfaces)

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
    
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Download className="w-4 h-4 mr-1" />
          {tool.downloads.toLocaleString()} downloads
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {new Date(tool.lastUpdate).toLocaleDateString()}
        </div>
      </div>
      <div className="flex items-center text-sm font-mono bg-muted/50 p-2 rounded-md">
        <code>npm install @devtools/{tool.id}</code>
      </div>
    </div>
  </Card>
));

// ... keep existing code (rest of the components and main Index component)