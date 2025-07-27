import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

const projects = [
  {
    client: "TechStart Inc",
    tier: "Premium",
    daysLeft: 2,
    totalDays: 5,
    status: "In Progress",
  },
  {
    client: "Local Cafe",
    tier: "Standard", 
    daysLeft: 1,
    totalDays: 3,
    status: "Final Review",
  },
  {
    client: "Fashion Brand",
    tier: "Basic",
    daysLeft: 0,
    totalDays: 3,
    status: "Delivered",
  },
  {
    client: "Marketing Agency",
    tier: "Premium",
    daysLeft: 4,
    totalDays: 5,
    status: "Design Phase",
  },
];

export const DeliveryTracker = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Delivery Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => {
            const progress = ((project.totalDays - project.daysLeft) / project.totalDays) * 100;
            const isOverdue = project.daysLeft < 0;
            const isUrgent = project.daysLeft <= 1 && project.daysLeft >= 0;
            
            return (
              <div key={index} className="space-y-2 p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{project.client}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={project.tier === "Premium" ? "default" : project.tier === "Standard" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {project.tier}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isOverdue ? (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    ) : project.status === "Delivered" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={`text-sm font-medium ${
                      isOverdue ? "text-destructive" : 
                      isUrgent ? "text-warning" : 
                      project.status === "Delivered" ? "text-success" : "text-muted-foreground"
                    }`}>
                      {project.status === "Delivered" ? "Done" : 
                       isOverdue ? `${Math.abs(project.daysLeft)} days overdue` :
                       `${project.daysLeft} days left`}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={project.status === "Delivered" ? 100 : progress} 
                  className="h-2"
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};