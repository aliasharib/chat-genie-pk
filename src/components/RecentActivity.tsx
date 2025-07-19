import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  CreditCard, 
  UserPlus, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

interface Activity {
  id: string;
  type: 'message' | 'payment' | 'signup' | 'upgrade' | 'alert' | 'success';
  client: string;
  description: string;
  time: string;
  amount?: string;
}

const ActivityItem = ({ activity }: { activity: Activity }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4 text-info" />;
      case 'payment': return <CreditCard className="h-4 w-4 text-success" />;
      case 'signup': return <UserPlus className="h-4 w-4 text-primary" />;
      case 'upgrade': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'alert': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-success" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-info/10 text-info border-info/20';
      case 'payment': return 'bg-success/10 text-success border-success/20';
      case 'signup': return 'bg-primary/10 text-primary border-primary/20';
      case 'upgrade': return 'bg-warning/10 text-warning border-warning/20';
      case 'alert': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'success': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-card to-secondary/10 border border-border/50">
      <div className="mt-0.5">
        {getIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground truncate">
            {activity.client}
          </p>
          <span className="text-xs text-muted-foreground">{activity.time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        {activity.amount && (
          <Badge className={`mt-1 text-xs ${getBadgeColor(activity.type)}`}>
            {activity.amount}
          </Badge>
        )}
      </div>
    </div>
  );
};

export const RecentActivity = () => {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'payment',
      client: 'Ahmed Fashion Store',
      description: 'Premium subscription payment received',
      time: '2 min ago',
      amount: 'Rs 15,000'
    },
    {
      id: '2',
      type: 'message',
      client: 'Karachi Sweets',
      description: 'High volume of customer inquiries processed',
      time: '15 min ago'
    },
    {
      id: '3',
      type: 'signup',
      client: 'Mobile Mart PK',
      description: 'New client signed up for trial account',
      time: '1 hour ago'
    },
    {
      id: '4',
      type: 'upgrade',
      client: 'Beauty Palace',
      description: 'Upgraded from Basic to Standard plan',
      time: '2 hours ago',
      amount: 'Rs 8,000'
    },
    {
      id: '5',
      type: 'success',
      client: 'Tech Solutions PK',
      description: 'Achieved 95% customer satisfaction rate',
      time: '3 hours ago'
    },
    {
      id: '6',
      type: 'payment',
      client: 'Sports Corner',
      description: 'Monthly subscription renewal',
      time: '4 hours ago',
      amount: 'Rs 10,000'
    },
    {
      id: '7',
      type: 'alert',
      client: 'Home Decor Hub',
      description: 'Account inactive for 7 days - follow up required',
      time: '6 hours ago'
    },
    {
      id: '8',
      type: 'message',
      client: 'Fashion Trends',
      description: 'Automated responses to 200+ customer queries',
      time: '8 hours ago'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Badge variant="outline" className="border-primary/50 text-primary">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};