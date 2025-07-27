import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, AlertTriangle } from "lucide-react";

const renewals = [
  {
    client: "TechStart Inc",
    type: "Hosting",
    daysLeft: 7,
    cost: "$120/year",
    urgency: "medium",
  },
  {
    client: "Local Cafe",
    type: "Domain",
    daysLeft: 2,
    cost: "$15/year", 
    urgency: "high",
  },
  {
    client: "Fashion Brand",
    type: "Hosting + Domain",
    daysLeft: 15,
    cost: "$145/year",
    urgency: "low",
  },
  {
    client: "Marketing Agency",
    type: "Premium Hosting",
    daysLeft: 1,
    cost: "$300/year",
    urgency: "critical",
  },
];

export const UpcomingRenewals = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Renewals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {renewals.map((renewal, index) => {
            const getUrgencyColor = (urgency: string) => {
              switch (urgency) {
                case 'critical': return 'text-destructive';
                case 'high': return 'text-warning';
                case 'medium': return 'text-info';
                default: return 'text-muted-foreground';
              }
            };

            const getUrgencyBadge = (urgency: string) => {
              switch (urgency) {
                case 'critical': return 'destructive';
                case 'high': return 'secondary';
                case 'medium': return 'outline';
                default: return 'outline';
              }
            };
            
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center space-x-3">
                  {renewal.urgency === 'critical' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                  {renewal.type.includes('Domain') ? (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">{renewal.client}</p>
                    <p className="text-sm text-muted-foreground">{renewal.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getUrgencyColor(renewal.urgency)}`}>
                      {renewal.daysLeft} days left
                    </p>
                    <p className="text-xs text-muted-foreground">{renewal.cost}</p>
                  </div>
                  <Badge variant={getUrgencyBadge(renewal.urgency) as any} className="capitalize">
                    {renewal.urgency}
                  </Badge>
                </div>
              </div>
            );
          })}
          
          <Button variant="outline" className="w-full mt-4">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};