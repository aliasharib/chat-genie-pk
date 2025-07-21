import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Star, Trash2, Plus, Search, User, Building, Mail, Phone, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  subscription: 'Premium' | 'Standard' | 'Basic';
  status: 'Active' | 'Inactive' | 'Trial';
  revenue: string;
  messages: number;
  joinDate: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  notes: ''
};

const ClientCard = ({ client, onDelete }: { client: Client; onDelete: (id: string) => void }) => {
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
              <p className="text-sm text-muted-foreground">{client.company}</p>
              <p className="text-xs text-muted-foreground">{client.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${getSubscriptionColor(client.subscription)} border-0 px-2 py-1`}>
              {client.subscription}
            </Badge>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Client</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete <strong>{client.name}</strong>? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(client.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
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
          <span className="text-sm text-muted-foreground">Phone</span>
          <span className="text-sm font-medium">{client.phone}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <span className="text-sm font-semibold text-success">{client.revenue}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Messages</span>
          <span className="text-sm font-medium">{client.messages.toLocaleString()}</span>
        </div>

        {client.notes && (
          <div className="pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground">Notes: {client.notes}</span>
          </div>
        )}
        
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

export const ClientManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed@fashionstore.pk',
      phone: '+92 300 1234567',
      company: 'Ahmed Fashion Store',
      notes: 'Premium client, high engagement rates',
      subscription: 'Premium',
      status: 'Active',
      revenue: 'Rs 45,200',
      messages: 12847,
      joinDate: 'Jan 2024'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      email: 'fatima@karachisweets.com',
      phone: '+92 321 9876543',
      company: 'Karachi Sweets',
      notes: 'Seasonal business, peaks during festivals',
      subscription: 'Standard',
      status: 'Active',
      revenue: 'Rs 28,900',
      messages: 8943,
      joinDate: 'Feb 2024'
    },
    {
      id: '3',
      name: 'Muhammad Khan',
      email: 'mkhan@techsolutions.pk',
      phone: '+92 333 5566778',
      company: 'Tech Solutions PK',
      notes: 'B2B client, requires technical support',
      subscription: 'Premium',
      status: 'Active',
      revenue: 'Rs 67,800',
      messages: 15629,
      joinDate: 'Dec 2023'
    },
    {
      id: '4',
      name: 'Aisha Malik',
      email: 'aisha@beautypalace.pk',
      phone: '+92 301 4455667',
      company: 'Beauty Palace',
      notes: 'New client, trial period active',
      subscription: 'Basic',
      status: 'Trial',
      revenue: 'Rs 12,400',
      messages: 3287,
      joinDate: 'Mar 2024'
    },
    {
      id: '5',
      name: 'Omar Sheikh',
      email: 'omar@sportscorner.pk',
      phone: '+92 345 7788990',
      company: 'Sports Corner',
      notes: 'Good conversion rates, loyal customers',
      subscription: 'Standard',
      status: 'Active',
      revenue: 'Rs 34,600',
      messages: 7892,
      joinDate: 'Jan 2024'
    },
    {
      id: '6',
      name: 'Sara Ahmed',
      email: 'sara@homedecorhub.pk',
      phone: '+92 302 1122334',
      company: 'Home Decor Hub',
      notes: 'Payment issues, follow up needed',
      subscription: 'Basic',
      status: 'Inactive',
      revenue: 'Rs 8,900',
      messages: 1234,
      joinDate: 'Feb 2024'
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone is required');
    if (!formData.company.trim()) errors.push('Company is required');
    
    if (formData.email && !formData.email.includes('@')) {
      errors.push('Valid email is required');
    }

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleAddClient = () => {
    if (!validateForm()) return;

    const newClient: Client = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      notes: formData.notes,
      subscription: 'Basic',
      status: 'Trial',
      revenue: 'Rs 0',
      messages: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setClients(prev => [newClient, ...prev]);
    setFormData(initialFormData);
    setIsDialogOpen(false);
    
    toast({
      title: "Client Added",
      description: `${newClient.name} has been added successfully.`
    });
  };

  const handleDeleteClient = (clientId: string) => {
    const clientToDelete = clients.find(c => c.id === clientId);
    setClients(prev => prev.filter(c => c.id !== clientId));
    
    toast({
      title: "Client Deleted",
      description: `${clientToDelete?.name} has been removed.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Client Management</h2>
          <p className="text-muted-foreground">Manage your chatbot clients</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="border-primary/50 text-primary">
            {clients.filter(c => c.status === 'Active').length} Active
          </Badge>
          <Badge variant="outline" className="border-warning/50 text-warning">
            {clients.filter(c => c.status === 'Trial').length} Trial
          </Badge>
          <Badge variant="outline" className="border-destructive/50 text-destructive">
            {clients.filter(c => c.status === 'Inactive').length} Inactive
          </Badge>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+92 300 1234567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company *
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes about the client"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClient}>
                Add Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {searchTerm ? (
          <>Showing {filteredClients.length} of {clients.length} clients</>
        ) : (
          <>Total {clients.length} clients</>
        )}
      </div>

      {/* Client Grid */}
      {filteredClients.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            {searchTerm ? (
              <>No clients found matching "<strong>{searchTerm}</strong>"</>
            ) : (
              <>No clients added yet. Add your first client to get started.</>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} onDelete={handleDeleteClient} />
          ))}
        </div>
      )}
    </div>
  );
};