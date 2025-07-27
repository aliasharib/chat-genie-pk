import { useState } from "react";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  Eye,
  FileText,
  Users,
  Lock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Activity,
  Settings,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface ComplianceMetric {
  id: string;
  name: string;
  status: "compliant" | "warning" | "violation";
  score: number;
  lastChecked: string;
  description: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  riskLevel: "low" | "medium" | "high";
  ipAddress: string;
}

interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  status: "active" | "resolved" | "acknowledged";
  regulation: string;
}

const complianceMetrics: ComplianceMetric[] = [
  {
    id: "1",
    name: "GDPR Compliance",
    status: "compliant",
    score: 96,
    lastChecked: "2024-01-20T10:30:00Z",
    description: "Data protection and privacy compliance"
  },
  {
    id: "2",
    name: "CCPA Compliance",
    status: "compliant",
    score: 94,
    lastChecked: "2024-01-20T09:15:00Z",
    description: "California Consumer Privacy Act compliance"
  },
  {
    id: "3",
    name: "Data Retention",
    status: "warning",
    score: 78,
    lastChecked: "2024-01-20T08:45:00Z",
    description: "Data retention policy adherence"
  },
  {
    id: "4",
    name: "Access Controls",
    status: "compliant",
    score: 98,
    lastChecked: "2024-01-20T11:00:00Z",
    description: "User access and authentication controls"
  },
  {
    id: "5",
    name: "Message Content",
    status: "violation",
    score: 65,
    lastChecked: "2024-01-20T07:20:00Z",
    description: "Message content compliance scanning"
  }
];

const auditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-01-20T11:30:00Z",
    user: "admin@nuvora.com",
    action: "User Access Granted",
    resource: "Client Data Export",
    details: "Granted access to client data export for user john.doe@company.com",
    riskLevel: "medium",
    ipAddress: "192.168.1.100"
  },
  {
    id: "2",
    timestamp: "2024-01-20T11:15:00Z",
    user: "system",
    action: "Data Deletion",
    resource: "Message History",
    details: "Automated deletion of messages older than 2 years per retention policy",
    riskLevel: "low",
    ipAddress: "127.0.0.1"
  },
  {
    id: "3",
    timestamp: "2024-01-20T10:45:00Z",
    user: "jane.smith@company.com",
    action: "Privacy Request",
    resource: "Personal Data",
    details: "GDPR data subject access request processed",
    riskLevel: "low",
    ipAddress: "10.0.0.50"
  },
  {
    id: "4",
    timestamp: "2024-01-20T10:30:00Z",
    user: "compliance@nuvora.com",
    action: "Policy Update",
    resource: "Privacy Policy",
    details: "Updated privacy policy to include new data processing activities",
    riskLevel: "medium",
    ipAddress: "192.168.1.200"
  },
  {
    id: "5",
    timestamp: "2024-01-20T09:20:00Z",
    user: "security@nuvora.com",
    action: "Security Scan",
    resource: "System Infrastructure",
    details: "Completed automated security vulnerability scan",
    riskLevel: "high",
    ipAddress: "192.168.1.150"
  }
];

const complianceAlerts: ComplianceAlert[] = [
  {
    id: "1",
    title: "Message Content Violation Detected",
    description: "Automated scan detected potential non-compliant content in client messages",
    severity: "high",
    timestamp: "2024-01-20T07:20:00Z",
    status: "active",
    regulation: "Industry Standards"
  },
  {
    id: "2",
    title: "Data Retention Policy Update Required",
    description: "New regulation requires updating data retention periods",
    severity: "medium",
    timestamp: "2024-01-19T15:30:00Z",
    status: "acknowledged",
    regulation: "GDPR"
  },
  {
    id: "3",
    title: "Access Log Anomaly",
    description: "Unusual access pattern detected for administrative functions",
    severity: "critical",
    timestamp: "2024-01-19T12:45:00Z",
    status: "resolved",
    regulation: "Internal Security"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "compliant":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "warning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "violation":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function Compliance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  const overallComplianceScore = Math.round(
    complianceMetrics.reduce((sum, metric) => sum + metric.score, 0) / complianceMetrics.length
  );

  const activeViolations = complianceMetrics.filter(m => m.status === "violation").length;
  const warningsCount = complianceMetrics.filter(m => m.status === "warning").length;
  const compliantCount = complianceMetrics.filter(m => m.status === "compliant").length;

  const filteredAuditLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportAuditLogs = () => {
    toast({
      title: "Export Started",
      description: "Audit logs are being prepared for download.",
    });
  };

  const runComplianceScan = () => {
    toast({
      title: "Compliance Scan Initiated",
      description: "Full compliance scan is now running. Results will be available shortly.",
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance & Monitoring</h1>
          <p className="text-muted-foreground">Monitor regulatory compliance and audit system activities</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportAuditLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button onClick={runComplianceScan} className="hover-scale">
            <Shield className="h-4 w-4 mr-2" />
            Run Scan
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {complianceAlerts.some(alert => alert.severity === "critical" && alert.status === "active") && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Compliance Alert</AlertTitle>
          <AlertDescription>
            You have {complianceAlerts.filter(a => a.severity === "critical" && a.status === "active").length} critical compliance issue(s) requiring immediate attention.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Compliance Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallComplianceScore}%</div>
                <div className="mt-2">
                  <Progress value={overallComplianceScore} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {overallComplianceScore >= 90 ? "Excellent" : overallComplianceScore >= 75 ? "Good" : "Needs Attention"}
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Violations</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{activeViolations}</div>
                <p className="text-xs text-muted-foreground">Active violations</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{warningsCount}</div>
                <p className="text-xs text-muted-foreground">Warnings pending</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliant</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{compliantCount}</div>
                <p className="text-xs text-muted-foreground">Policies compliant</p>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Compliance Status
              </CardTitle>
              <CardDescription>Current status of all compliance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{metric.name}</h4>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Last checked: {new Date(metric.lastChecked).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{metric.score}%</div>
                      <Progress value={metric.score} className="w-20 h-2 mt-1" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Alerts
              </CardTitle>
              <CardDescription>Latest compliance alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {complianceAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge variant="outline">
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>{alert.regulation}</span>
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          {/* Audit Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audit Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Complete log of system activities and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(log.riskLevel)}>
                          {log.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Risk Assessment Summary
                </CardTitle>
                <CardDescription>Current risk levels across different categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { category: "Data Privacy", risk: "Low", score: 15, color: "bg-green-500" },
                  { category: "Access Control", risk: "Low", score: 8, color: "bg-green-500" },
                  { category: "Content Compliance", risk: "High", score: 75, color: "bg-red-500" },
                  { category: "Data Retention", risk: "Medium", score: 45, color: "bg-yellow-500" },
                  { category: "Third-party Integrations", risk: "Low", score: 20, color: "bg-green-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.category}</h4>
                      <Badge className={getSeverityColor(item.risk.toLowerCase())}>
                        {item.risk} Risk
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${item.color}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{item.score}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Remediation Actions
                </CardTitle>
                <CardDescription>Recommended actions to improve compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    action: "Review message content filters",
                    priority: "High",
                    effort: "Medium",
                    impact: "High"
                  },
                  {
                    action: "Update data retention policies",
                    priority: "Medium",
                    effort: "Low",
                    impact: "Medium"
                  },
                  {
                    action: "Implement additional access controls",
                    priority: "Low",
                    effort: "High",
                    impact: "Medium"
                  },
                  {
                    action: "Enhance audit logging",
                    priority: "Medium",
                    effort: "Medium",
                    impact: "High"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.action}</h4>
                      <Badge className={getSeverityColor(item.priority.toLowerCase())}>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>Effort: {item.effort}</span>
                      <span>Impact: {item.impact}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  GDPR Compliance
                </CardTitle>
                <CardDescription>General Data Protection Regulation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Data Subject Requests</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Compliant
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Processing Records</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Compliant
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Privacy by Design</span>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Review Needed
                  </Badge>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate GDPR Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  CCPA Compliance
                </CardTitle>
                <CardDescription>California Consumer Privacy Act</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Consumer Rights</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Compliant
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Disclosure</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Compliant
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Opt-out Mechanisms</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Compliant
                  </Badge>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate CCPA Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Industry Standards
                </CardTitle>
                <CardDescription>Sector-specific compliance requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>ISO 27001</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Certified
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>SOC 2 Type II</span>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    In Progress
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>HIPAA (if applicable)</span>
                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                    Not Applicable
                  </Badge>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Compliance Summary
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection Impact Assessment</CardTitle>
              <CardDescription>Current DPIA status and upcoming requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">📋 Recent DPIA Activities</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Website security assessment completed (Jan 15, 2024)</li>
                  <li>• Third-party integration review in progress (Due: Jan 25, 2024)</li>
                  <li>• Annual privacy risk assessment scheduled (Feb 1, 2024)</li>
                  <li>• Data retention policy update assessment pending</li>
                </ul>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200">Completed Assessments</h4>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">7</p>
                  <p className="text-sm text-green-600 dark:text-green-400">This quarter</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">Pending Reviews</h4>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">3</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Require attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}