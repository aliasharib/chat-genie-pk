import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Globe, Tag, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  industry: string;
  type: string;
  status: string;
  imageUrl?: string;
  completedDate: string;
  tags: string[];
  url?: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "TechStart Corporate Website",
    client: "TechStart Inc",
    industry: "Technology",
    type: "Corporate Website",
    status: "Live",
    completedDate: "2024-03-15",
    tags: ["React", "Modern Design", "Mobile Responsive"],
    url: "https://techstart.com"
  },
  {
    id: "2", 
    title: "Local Cafe E-commerce",
    client: "Local Cafe",
    industry: "Food & Beverage",
    type: "E-commerce",
    status: "Live",
    completedDate: "2024-03-10",
    tags: ["Online Ordering", "Payment Gateway", "SEO"],
    url: "https://localcafe.com"
  },
  {
    id: "3",
    title: "Fashion Brand Showcase",
    client: "Fashion Brand",
    industry: "Fashion",
    type: "Portfolio",
    status: "Live",
    completedDate: "2024-03-05",
    tags: ["Photography", "Animation", "Brand Identity"]
  },
  {
    id: "4",
    title: "Marketing Agency Landing",
    client: "Marketing Agency",
    industry: "Marketing",
    type: "Landing Page",
    status: "In Progress",
    completedDate: "2024-03-20",
    tags: ["Lead Generation", "A/B Testing", "Analytics"]
  }
];

const industries = ["All", "Technology", "Food & Beverage", "Fashion", "Marketing", "Healthcare", "Finance"];
const projectTypes = ["All", "Corporate Website", "E-commerce", "Portfolio", "Landing Page", "Blog", "Custom"];

const Portfolio = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Showcase of completed projects and client work</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects..."
            className="px-3 py-2 border rounded-md w-64"
          />
        </div>
        
        <select className="px-3 py-2 border rounded-md">
          <option>All Industries</option>
          {industries.slice(1).map(industry => (
            <option key={industry}>{industry}</option>
          ))}
        </select>
        
        <select className="px-3 py-2 border rounded-md">
          <option>All Types</option>
          {projectTypes.slice(1).map(type => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="grid" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <Image className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.industry}</Badge>
                      <Badge variant={project.status === "Live" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Completed: {project.completedDate}
                      </span>
                      <div className="flex space-x-2">
                        {project.url && (
                          <Button size="sm" variant="outline">
                            <Globe className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.client} • {project.industry}</p>
                        <div className="flex space-x-2 mt-1">
                          {project.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={project.status === "Live" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{project.completedDate}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Live Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">21</div>
                <p className="text-xs text-muted-foreground">87.5% completion rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Industries Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Diverse portfolio</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Avg. Project Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 days</div>
                <p className="text-xs text-muted-foreground">-2 days vs last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;