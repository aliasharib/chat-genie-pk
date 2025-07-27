import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Copy, Edit, Trash2, Send, TrendingUp, Eye, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  category: "welcome" | "followup" | "support" | "sales";
  content: string;
  variables: string[];
  usageCount: number;
  successRate: number;
  createdAt: string;
  lastUsed?: string;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Welcome New Client",
    category: "welcome",
    content: "Hi {{clientName}}, welcome to Nuvora! We're excited to help you grow your business with our AI-powered chat solutions. Your account is now active and ready to use.",
    variables: ["clientName"],
    usageCount: 156,
    successRate: 94.2,
    createdAt: "2024-01-15",
    lastUsed: "2024-01-20"
  },
  {
    id: "2",
    name: "Follow-up Check-in",
    category: "followup",
    content: "Hello {{clientName}}, how has your experience been with Nuvora so far? We'd love to hear your feedback and help optimize your setup for better results.",
    variables: ["clientName"],
    usageCount: 89,
    successRate: 87.3,
    createdAt: "2024-01-10",
    lastUsed: "2024-01-19"
  },
  {
    id: "3",
    name: "Technical Support",
    category: "support",
    content: "Hi {{clientName}}, we've received your support request regarding {{issue}}. Our technical team is looking into this and will have a solution within {{timeframe}}.",
    variables: ["clientName", "issue", "timeframe"],
    usageCount: 234,
    successRate: 96.8,
    createdAt: "2024-01-08",
    lastUsed: "2024-01-20"
  },
  {
    id: "4",
    name: "Upgrade Proposal",
    category: "sales",
    content: "Hello {{clientName}}, based on your current usage of {{currentPlan}}, we believe upgrading to {{proposedPlan}} would provide significant benefits including {{benefits}}.",
    variables: ["clientName", "currentPlan", "proposedPlan", "benefits"],
    usageCount: 67,
    successRate: 78.5,
    createdAt: "2024-01-12",
    lastUsed: "2024-01-18"
  }
];

const categoryColors = {
  welcome: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  followup: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  support: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  sales: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
};

const categoryIcons = {
  welcome: "👋",
  followup: "🔄",
  support: "🛠️",
  sales: "💼"
};

export default function MessageTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "welcome" as const,
    content: ""
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalUsage = templates.reduce((sum, template) => sum + template.usageCount, 0);
  const avgSuccessRate = templates.reduce((sum, template) => sum + template.successRate, 0) / templates.length;

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      category: newTemplate.category,
      content: newTemplate.content,
      variables: extractVariables(newTemplate.content),
      usageCount: 0,
      successRate: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: "", category: "welcome", content: "" });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Template created successfully!",
    });
  };

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{(\w+)\}\}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Success",
      description: "Template deleted successfully!",
    });
  };

  const handleCloneTemplate = (template: Template) => {
    const clonedTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: undefined
    };
    setTemplates([...templates, clonedTemplate]);
    toast({
      title: "Success",
      description: "Template cloned successfully!",
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Message Templates</h1>
          <p className="text-muted-foreground">Create and manage message templates for your clients</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new message template with variables for personalization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="Enter template name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTemplate.category}
                  onValueChange={(value: any) => setNewTemplate({ ...newTemplate, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Template Content</Label>
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  placeholder="Enter your message template. Use {variable} for dynamic content."
                  rows={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use {`{{variableName}}`} for dynamic content (e.g., {`{{clientName}}`})
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
                <p className="text-xs text-muted-foreground">Active templates</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Messages sent</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Response rate</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Used</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Support</div>
                <p className="text-xs text-muted-foreground">Template category</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover-scale group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{categoryIcons[template.category]}</span>
                        <Badge className={categoryColors[template.category]}>
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCloneTemplate(template)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Clone
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Quick Send
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                  
                  {template.variables.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-2">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable) => (
                          <Badge key={variable} variant="secondary" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Usage</p>
                      <p className="text-sm font-medium">{template.usageCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                      <p className="text-sm font-medium">{template.successRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Template Performance
                </CardTitle>
                <CardDescription>Success rates by template category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categoryIcons).map(([category, icon]) => {
                  const categoryTemplates = templates.filter(t => t.category === category);
                  const avgRate = categoryTemplates.length > 0 
                    ? categoryTemplates.reduce((sum, t) => sum + t.successRate, 0) / categoryTemplates.length
                    : 0;
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{icon}</span>
                        <span className="capitalize font-medium">{category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${avgRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{avgRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Usage Statistics
                </CardTitle>
                <CardDescription>Most frequently used templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {templates
                  .sort((a, b) => b.usageCount - a.usageCount)
                  .slice(0, 5)
                  .map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{categoryIcons[template.category]}</span>
                        <span className="font-medium">{template.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {template.usageCount} uses
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                A/B Testing Insights
              </CardTitle>
              <CardDescription>Template performance comparison and optimization suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">💡 Optimization Suggestions</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Support templates have the highest success rate (96.8%) - consider adapting their structure</li>
                  <li>• Sales templates could benefit from more personalization variables</li>
                  <li>• Welcome templates show strong engagement - create more variations for A/B testing</li>
                  <li>• Consider creating seasonal variants of your best-performing templates</li>
                </ul>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200">Best Performer</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">Technical Support</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">96.8%</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Most Used</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Technical Support</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">234 uses</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">Needs Attention</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Upgrade Proposal</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">78.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}