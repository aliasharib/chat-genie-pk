import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Shield, Star } from "lucide-react";

interface Client {
  id: string;
  name: string;
  business: string;
  subscription: 'Premium' | 'Standard' | 'Basic';
  status: 'Active' | 'Inactive' | 'Trial';
  revenue: string;
  messages: number;
  joinDate: string;
}

const ClientCard = ({ client }: { client: Client }) => {
  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'Premium': return 'bg-gradient-to-r from-primary to-info text-primary-foreground';
      case 'Standard': return 'bg-gradient-to-r from-success to-success/80 text-success-foreground';
      case 'Basic': return 'bg-gradient-to-r from-warning to-warning/80 text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-success';
      case 'Inactive': return 'text-destructive';
      case 'Trial': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {client.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold">{client.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{client.business}</p>
            </div>
          </div>
          <Badge className={`${getSubscriptionColor(client.subscription)} border-0 px-2 py-1`}>
            {client.subscription}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <div className="flex items-center space-x-1">
            <div className={`h-2 w-2 rounded-full ${client.status === 'Active' ? 'bg-success' : client.status === 'Trial' ? 'bg-warning' : 'bg-destructive'}`} />
            <span className={`text-sm font-medium ${getStatusColor(client.status)}`}>
              {client.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <span className="text-sm font-semibold text-success">{client.revenue}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Messages</span>
          <span className="text-sm font-medium">{client.messages.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="text-xs">Joined {client.joinDate}</span>
          </div>
          {client.subscription === 'Premium' && (
            <Star className="h-4 w-4 text-warning fill-warning" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const ClientOverview = () => {
  const clients: Client[] = [
    {
      id: '1',
      name: 'Ahmed Fashion Store',
      business: 'Clothing & Accessories',
      subscription: 'Premium',
      status: 'Active',
      revenue: 'Rs 45,200',
      messages: 12847,
      joinDate: 'Jan 2024'
    },
    {
      id: '2',
      name: 'Karachi Sweets',
      business: 'Food & Beverages',
      subscription: 'Standard',
      status: 'Active',
      revenue: 'Rs 28,900',
      messages: 8943,
      joinDate: 'Feb 2024'
    },
    {
      id: '3',
      name: 'Tech Solutions PK',
      business: 'IT Services',
      subscription: 'Premium',
      status: 'Active',
      revenue: 'Rs 67,800',
      messages: 15629,
      joinDate: 'Dec 2023'
    },
    {
      id: '4',
      name: 'Beauty Palace',
      business: 'Cosmetics',
      subscription: 'Basic',
      status: 'Trial',
      revenue: 'Rs 12,400',
      messages: 3287,
      joinDate: 'Mar 2024'
    },
    {
      id: '5',
      name: 'Sports Corner',
      business: 'Sports Equipment',
      subscription: 'Standard',
      status: 'Active',
      revenue: 'Rs 34,600',
      messages: 7892,
      joinDate: 'Jan 2024'
    },
    {
      id: '6',
      name: 'Home Decor Hub',
      business: 'Furniture & Decor',
      subscription: 'Basic',
      status: 'Inactive',
      revenue: 'Rs 8,900',
      messages: 1234,
      joinDate: 'Feb 2024'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Client Overview</h2>
        <Badge variant="outline" className="border-primary/50 text-primary">
          {clients.filter(c => c.status === 'Active').length} Active
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};