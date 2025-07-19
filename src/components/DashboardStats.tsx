import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, MessageSquare, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card to-secondary/20 border-border/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-1 text-xs">
          <TrendingUp className={`h-3 w-3 ${trend === 'up' ? 'text-success' : 'text-destructive'}`} />
          <span className={trend === 'up' ? 'text-success' : 'text-destructive'}>
            {change}
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardStats = () => {
  const stats = [
    {
      title: "Active Clients",
      value: "1,247",
      change: "+12.3%",
      icon: <Users className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: "Monthly Revenue",
      value: "Rs 2,84,500",
      change: "+8.7%",
      icon: <DollarSign className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: "Messages Processed",
      value: "98,247",
      change: "+15.2%",
      icon: <MessageSquare className="h-4 w-4" />,
      trend: 'up' as const,
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+2.1%",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};