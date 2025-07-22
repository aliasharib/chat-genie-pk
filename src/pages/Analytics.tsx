import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageSquare, TrendingUp, Clock, Target, Users, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Sample data for charts
  const conversationData = [
    { date: 'Mon', conversations: 324, responses: 298, avgTime: 2.3 },
    { date: 'Tue', conversations: 567, responses: 534, avgTime: 1.8 },
    { date: 'Wed', conversations: 892, responses: 847, avgTime: 2.1 },
    { date: 'Thu', conversations: 634, responses: 601, avgTime: 2.6 },
    { date: 'Fri', conversations: 723, responses: 695, avgTime: 1.9 },
    { date: 'Sat', conversations: 445, responses: 421, avgTime: 2.4 },
    { date: 'Sun', conversations: 367, responses: 341, avgTime: 2.8 }
  ];

  const subscriptionPerformance = [
    { tier: 'Basic', conversations: 2456, conversion: 12.4, revenue: 45200, clients: 23 },
    { tier: 'Pro', conversations: 5671, conversion: 18.7, revenue: 127800, clients: 15 },
    { tier: 'Enterprise', conversations: 8934, conversion: 24.3, revenue: 256700, clients: 8 },
    { tier: 'Custom', conversations: 3421, conversion: 31.2, revenue: 89400, clients: 4 }
  ];

  const topicsData = [
    { topic: 'Product Inquiry', count: 1245, percentage: 28 },
    { topic: 'Support Request', count: 876, percentage: 20 },
    { topic: 'Pricing Question', count: 654, percentage: 15 },
    { topic: 'Technical Issue', count: 543, percentage: 12 },
    { topic: 'Account Setup', count: 432, percentage: 10 },
    { topic: 'Billing Query', count: 321, percentage: 7 },
    { topic: 'Feature Request', count: 287, percentage: 6 },
    { topic: 'General Info', count: 98, percentage: 2 }
  ];

  const clientAnalytics = [
    { client: 'Ahmed Fashion Store', messages: 12847, conversion: 34.2, revenue: 45200, satisfaction: 4.8 },
    { client: 'Tech Solutions PK', messages: 15629, conversion: 28.7, revenue: 67800, satisfaction: 4.6 },
    { client: 'Karachi Sweets', messages: 8943, conversion: 31.5, revenue: 28900, satisfaction: 4.9 },
    { client: 'Sports Corner', messages: 7892, conversion: 26.3, revenue: 34600, satisfaction: 4.4 },
    { client: 'Beauty Palace', messages: 3287, conversion: 19.8, revenue: 12400, satisfaction: 4.2 }
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6', '#ec4899'];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive conversation insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,567</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12.3%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-0.3s</span> faster than last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2.1%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+1.2%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Conversation Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Conversation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="responses" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subscription Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Performance by Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subscriptionPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tier" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conversion" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Most Common Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={topicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {topicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {topicsData.map((topic, index) => (
                    <div key={topic.topic} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium">{topic.topic}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{topic.count}</span>
                        <Badge variant="outline" className="text-xs">
                          {topic.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Conversation Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" strokeWidth={3} />
                    <Line type="monotone" dataKey="responses" stroke="hsl(var(--success))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgTime" fill="hsl(var(--info))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Client Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Client</th>
                      <th className="text-right p-2">Messages</th>
                      <th className="text-right p-2">Conversion</th>
                      <th className="text-right p-2">Revenue</th>
                      <th className="text-right p-2">Satisfaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientAnalytics.map((client, index) => (
                      <tr key={client.client} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{client.client}</td>
                        <td className="p-2 text-right">{client.messages.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <Badge variant="outline" className="text-success border-success/50">
                            {client.conversion}%
                          </Badge>
                        </td>
                        <td className="p-2 text-right font-semibold">Rs {client.revenue.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-sm font-medium">{client.satisfaction}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-3 h-3 rounded-full ${i < Math.floor(client.satisfaction) ? 'bg-warning' : 'bg-muted'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Subscription Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscriptionPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="tier" type="category" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI Insights */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  Key Wins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  • Response time improved by 18% this week
                </div>
                <div className="text-sm">
                  • Enterprise clients showing 31% higher conversion
                </div>
                <div className="text-sm">
                  • Ahmed Fashion Store increased engagement by 24%
                </div>
                <div className="text-sm">
                  • Product inquiry conversations up 15%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  • Weekend response times 23% slower
                </div>
                <div className="text-sm">
                  • Basic tier clients need more engagement
                </div>
                <div className="text-sm">
                  • Technical issues taking longer to resolve
                </div>
                <div className="text-sm">
                  • Sara Ahmed's account needs attention
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
                <h4 className="font-semibold mb-2">Optimize Weekend Coverage</h4>
                <p className="text-sm text-muted-foreground">
                  Consider implementing automated responses for basic queries during weekends to maintain response times.
                </p>
              </div>
              <div className="p-4 bg-success/5 border-l-4 border-success rounded">
                <h4 className="font-semibold mb-2">Upsell Basic Tier Clients</h4>
                <p className="text-sm text-muted-foreground">
                  Basic tier clients show 40% more engagement - perfect opportunity for Pro tier upgrades.
                </p>
              </div>
              <div className="p-4 bg-info/5 border-l-4 border-info rounded">
                <h4 className="font-semibold mb-2">Create Technical FAQ</h4>
                <p className="text-sm text-muted-foreground">
                  Common technical issues could be resolved faster with an automated knowledge base.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;