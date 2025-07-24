import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  Settings, 
  Plus, 
  ExternalLink, 
  Check, 
  Clock, 
  AlertCircle,
  Search,
  Slack,
  Github,
  Mail
} from "lucide-react";

const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: "Slack",
      description: "Send notifications to Slack channels",
      icon: Slack,
      category: "Communication",
      status: "connected",
      connected: true,
      popular: true
    },
    {
      id: 2,
      name: "GitHub",
      description: "Sync with GitHub repositories and issues",
      icon: Github, 
      category: "Development",
      status: "disconnected",
      connected: false,
      popular: true
    },
    {
      id: 3,
      name: "Email Marketing",
      description: "Integrate with email marketing platforms",
      icon: Mail,
      category: "Marketing", 
      status: "connected",
      connected: true,
      popular: false
    },
    {
      id: 4,
      name: "Zapier",
      description: "Connect with 5000+ apps through Zapier",
      icon: Zap,
      category: "Automation",
      status: "disconnected", 
      connected: false,
      popular: true
    }
  ];

  const connectedIntegrations = integrations.filter(i => i.connected);
  const availableIntegrations = integrations.filter(i => !i.connected);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Check className="h-4 w-4 text-green-500" />;
      case "disconnected":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: "default",
      disconnected: "secondary",
      error: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Browse All Integrations
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150+</div>
            <p className="text-xs text-muted-foreground">Available connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedIntegrations.length}</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Integration categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2K</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connected" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableIntegrations.length})</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="connected">
          <div className="space-y-4">
            {connectedIntegrations.length > 0 ? (
              connectedIntegrations.map((integration) => (
                <Card key={integration.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <integration.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{integration.name}</h3>
                          {integration.popular && <Badge variant="secondary">Popular</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Category: {integration.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        {getStatusBadge(integration.status)}
                      </div>
                      <Switch checked={integration.connected} />
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Connected Integrations</h3>
                  <p className="text-sm text-muted-foreground">Connect your first integration to get started</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search integrations..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {availableIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <integration.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{integration.name}</h3>
                            {integration.popular && <Badge variant="secondary">Popular</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{integration.category}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage your API keys and webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="api-key" 
                      type="password" 
                      value="sk-1234567890abcdef" 
                      readOnly 
                    />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="webhook-url" 
                      placeholder="https://your-app.com/webhook" 
                    />
                    <Button variant="outline">Test</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input 
                    id="webhook-secret" 
                    type="password" 
                    placeholder="Your webhook secret" 
                  />
                </div>
                
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription>Monitor your API usage and limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">API Calls This Month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">10,000</div>
                    <p className="text-sm text-muted-foreground">Monthly Limit</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">87.5%</div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;