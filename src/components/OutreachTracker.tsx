import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Instagram, Phone, Clock } from "lucide-react";

const outreach = [
  {
    platform: "WhatsApp",
    icon: <MessageSquare className="h-4 w-4" />,
    pitched: 12,
    replied: 8,
    interested: 4,
    status: "Active",
  },
  {
    platform: "Instagram DM", 
    icon: <Instagram className="h-4 w-4" />,
    pitched: 25,
    replied: 15,
    interested: 6,
    status: "Active",
  },
  {
    platform: "Cold Calls",
    icon: <Phone className="h-4 w-4" />,
    pitched: 8,
    replied: 5,
    interested: 2,
    status: "Paused",
  },
];

export const OutreachTracker = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Outreach Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {outreach.map((channel, index) => {
            const replyRate = (channel.replied / channel.pitched) * 100;
            const interestRate = (channel.interested / channel.replied) * 100;
            
            return (
              <div key={index} className="p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {channel.icon}
                    <span className="font-medium">{channel.platform}</span>
                    <Badge 
                      variant={channel.status === "Active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {channel.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{channel.pitched}</p>
                    <p className="text-xs text-muted-foreground">Pitched</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-info">{channel.replied}</p>
                    <p className="text-xs text-muted-foreground">Replied</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">{channel.interested}</p>
                    <p className="text-xs text-muted-foreground">Interested</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-warning">{replyRate.toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground">Reply Rate</p>
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