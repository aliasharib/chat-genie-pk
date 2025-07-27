import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Phone, Video, CheckCircle } from "lucide-react";

const funnelStages = [
  {
    stage: "Leads",
    count: 45,
    icon: <Users className="h-4 w-4" />,
    color: "bg-blue-500",
  },
  {
    stage: "Contacted",
    count: 32,
    icon: <Phone className="h-4 w-4" />,
    color: "bg-yellow-500",
  },
  {
    stage: "Demo",
    count: 18,
    icon: <Video className="h-4 w-4" />,
    color: "bg-orange-500",
  },
  {
    stage: "Closed",
    count: 8,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-500",
  },
];

export const LeadFunnel = () => {
  const totalLeads = funnelStages[0].count;
  
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Lead Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => {
            const percentage = (stage.count / totalLeads) * 100;
            const conversionRate = index > 0 ? (stage.count / funnelStages[index - 1].count) * 100 : 100;
            
            return (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {stage.icon}
                    <span className="font-medium">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{stage.count}</Badge>
                    {index > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {conversionRate.toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};