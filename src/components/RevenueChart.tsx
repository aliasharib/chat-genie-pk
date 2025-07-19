import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Oct', revenue: 185000, clients: 42 },
  { month: 'Nov', revenue: 220000, clients: 48 },
  { month: 'Dec', revenue: 198000, clients: 45 },
  { month: 'Jan', revenue: 245000, clients: 52 },
  { month: 'Feb', revenue: 268000, clients: 58 },
  { month: 'Mar', revenue: 284500, clients: 63 },
];

const subscriptionData = [
  { plan: 'Basic', count: 28, revenue: 224000 },
  { plan: 'Standard', count: 22, revenue: 440000 },
  { plan: 'Premium', count: 13, revenue: 390000 },
];

export const RevenueChart = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
            <Badge className="bg-gradient-to-r from-success to-success/80 text-success-foreground border-0">
              +8.7% Growth
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `Rs ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(var(--shadow))',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`Rs ${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Subscription Plans</CardTitle>
            <Badge variant="outline" className="border-primary/50 text-primary">
              63 Total Clients
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subscriptionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="plan" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(var(--shadow))',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number, name: string) => [
                  name === 'count' ? `${value} clients` : `Rs ${value.toLocaleString()}`,
                  name === 'count' ? 'Active Clients' : 'Monthly Revenue'
                ]}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="count"
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {subscriptionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-muted/20 to-transparent">
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${
                    item.plan === 'Premium' ? 'bg-primary' : 
                    item.plan === 'Standard' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <span className="text-sm font-medium">{item.plan}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">Rs {item.revenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{item.count} clients</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};