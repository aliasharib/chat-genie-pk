import { DashboardStats } from "@/components/DashboardStats";
import { ClientManagement } from "@/components/ClientManagement";
import { RecentActivity } from "@/components/RecentActivity";
import { RevenueChart } from "@/components/RevenueChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bot, Instagram, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              ChatBot Business Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Pakistani Instagram Automation Platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-success to-success/80 text-success-foreground border-0 px-3 py-2">
              <Bot className="h-4 w-4 mr-1" />
              System Online
            </Badge>
            <Badge variant="outline" className="border-info/50 text-info px-3 py-2">
              <Instagram className="h-4 w-4 mr-1" />
              Instagram Connected
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Key Metrics */}
        <DashboardStats />

        {/* Revenue Charts */}
        <RevenueChart />

        {/* Client Management */}
        <ClientManagement />

        {/* Recent Activity */}
        <RecentActivity />

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <button className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-200">
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">View Messages</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-gradient-to-r from-success to-success/80 text-success-foreground hover:from-success/90 hover:to-success/70 transition-all duration-200">
                <Bot className="h-5 w-5" />
                <span className="font-medium">Manage Bots</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 rounded-lg bg-gradient-to-r from-warning to-warning/80 text-warning-foreground hover:from-warning/90 hover:to-warning/70 transition-all duration-200">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
