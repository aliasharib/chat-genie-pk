import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";

const revisions = [
  {
    client: "TechStart Inc",
    tier: "Premium",
    used: 1,
    max: 2,
    status: "Available",
  },
  {
    client: "Local Cafe",
    tier: "Standard",
    used: 1,
    max: 1,
    status: "Exhausted",
  },
  {
    client: "Fashion Brand",
    tier: "Basic",
    used: 0,
    max: 1,
    status: "Available",
  },
  {
    client: "Marketing Agency",
    tier: "Premium",
    used: 0,
    max: 2,
    status: "Available",
  },
];

export const RevisionTracker = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Revision Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {revisions.map((revision, index) => {
            const usage = (revision.used / revision.max) * 100;
            const isExhausted = revision.used >= revision.max;
            
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center space-x-3">
                  {isExhausted ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : revision.used === 0 ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{revision.client}</p>
                    <Badge 
                      variant={revision.tier === "Premium" ? "default" : revision.tier === "Standard" ? "secondary" : "outline"}
                      className="text-xs mt-1"
                    >
                      {revision.tier}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {revision.used}/{revision.max} used
                    </p>
                    <Badge 
                      variant={isExhausted ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {revision.status}
                    </Badge>
                  </div>
                  <div className="w-16">
                    <Progress value={usage} className="h-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};