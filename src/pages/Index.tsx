import { DashboardStats } from "@/components/DashboardStats";
import { ClientManagement } from "@/components/ClientManagement";
import { RevenueChart } from "@/components/RevenueChart";
import { LeadFunnel } from "@/components/LeadFunnel";
import { DeliveryTracker } from "@/components/DeliveryTracker";
import { RevisionTracker } from "@/components/RevisionTracker";
import { OutreachTracker } from "@/components/OutreachTracker";
import { UpcomingRenewals } from "@/components/UpcomingRenewals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, Users, Calendar, ChevronDown, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isRenewalsOpen, setIsRenewalsOpen] = useState(true);
  const [isRevisionsOpen, setIsRevisionsOpen] = useState(false);
  const [isOutreachOpen, setIsOutreachOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Agency Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Solo Agency Management & Client Tracking
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-success to-success/80 text-success-foreground border-0 px-3 py-2">
              <Globe className="h-4 w-4 mr-1" />
              All Sites Online
            </Badge>
            <Badge variant="outline" className="border-info/50 text-info px-3 py-2">
              <Calendar className="h-4 w-4 mr-1" />
              3 Renewals This Week
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Top KPIs */}
        <DashboardStats />

        {/* Revenue & Lead Funnel */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <LeadFunnel />
        </div>

        {/* Delivery & Client Management */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DeliveryTracker />
          <ClientManagement />
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Upcoming Renewals */}
          <Collapsible open={isRenewalsOpen} onOpenChange={setIsRenewalsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto text-left">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold text-lg">Upcoming Renewals</span>
                  <Badge variant="secondary">4 pending</Badge>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isRenewalsOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <UpcomingRenewals />
            </CollapsibleContent>
          </Collapsible>

          {/* Revision Tracker */}
          <Collapsible open={isRevisionsOpen} onOpenChange={setIsRevisionsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto text-left">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span className="font-semibold text-lg">Revision Status</span>
                  <Badge variant="destructive">1 exhausted</Badge>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isRevisionsOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <RevisionTracker />
            </CollapsibleContent>
          </Collapsible>

          {/* Outreach Stats */}
          <Collapsible open={isOutreachOpen} onOpenChange={setIsOutreachOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto text-left">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold text-lg">Outreach Stats</span>
                  <Badge variant="outline">32% reply rate</Badge>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isOutreachOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <OutreachTracker />
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button 
                onClick={() => navigate('/billing/invoices')}
                className="flex items-center justify-center space-x-2 p-4 h-auto"
                variant="outline"
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">Generate Invoice</span>
              </Button>
              <Button 
                onClick={() => navigate('/users')}
                className="flex items-center justify-center space-x-2 p-4 h-auto"
                variant="outline"
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Client Portal</span>
              </Button>
              <Button 
                onClick={() => navigate('/billing/revenue')}
                className="flex items-center justify-center space-x-2 p-4 h-auto"
                variant="outline"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
