import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Users, Calendar, Download, Target } from "lucide-react";

const BillingRevenue = () => {
  const monthlyRevenue = [
    { month: "Jan", revenue: 12500, customers: 45 },
    { month: "Feb", revenue: 15200, customers: 52 },
    { month: "Mar", revenue: 18700, customers: 63 },
    { month: "Apr", revenue: 22100, customers: 71 },
    { month: "May", revenue: 19800, customers: 68 },
    { month: "Jun", revenue: 25600, customers: 82 },
  ];

  const revenueByPlan = [
    { name: "Starter", value: 2500, color: "#8884d8" },
    { name: "Pro", value: 8500, color: "#82ca9d" },
    { name: "Enterprise", value: 14600, color: "#ffc658" },
  ];

  const quarterlyTargets = [
    { quarter: "Q1", target: 50000, actual: 46400, percentage: 92.8 },
    { quarter: "Q2", target: 60000, actual: 67300, percentage: 112.2 },
    { quarter: "Q3", target: 70000, actual: 58200, percentage: 83.1 },
    { quarter: "Q4", target: 80000, actual: 0, percentage: 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue Analytics</h1>
          <p className="text-muted-foreground">Track your business performance and revenue trends</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$113,900</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
              +23.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25,600</div>
            <p className="text-xs text-muted-foreground">Current month (June)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$312</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-xs text-muted-foreground">Year over year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue and customer growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Customers']} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
            <CardDescription>Distribution of revenue across subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByPlan}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueByPlan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quarterly Targets vs Actual</CardTitle>
          <CardDescription>Performance against revenue targets by quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyTargets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'target' ? 'Target' : 'Actual']} />
              <Bar dataKey="target" fill="#e2e8f0" name="Target" />
              <Bar dataKey="actual" fill="#8884d8" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {quarterlyTargets.map((quarter) => (
          <Card key={quarter.quarter}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{quarter.quarter} Performance</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quarter.percentage}%</div>
              <p className="text-xs text-muted-foreground">
                ${quarter.actual.toLocaleString()} of ${quarter.target.toLocaleString()}
              </p>
              <Badge 
                variant={quarter.percentage >= 100 ? "default" : quarter.percentage >= 80 ? "secondary" : "destructive"}
                className="mt-2"
              >
                {quarter.percentage >= 100 ? "Target Exceeded" : quarter.percentage >= 80 ? "On Track" : "Below Target"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BillingRevenue;