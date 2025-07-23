import { useState } from "react";
import { DollarSign, TrendingUp, Plus, Calendar, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface EarningEntry {
  id: string;
  platform: string;
  task: string;
  amount: number;
  date: string;
  status: 'concluido' | 'pendente' | 'rejeitado';
}

const platforms = ["Appen", "Toloka", "ySense", "Clickworker", "SproutGigs", "Swagbucks"];

export const EarningsPanel = () => {
  const [earnings, setEarnings] = useState<EarningEntry[]>([
    {
      id: "1",
      platform: "Appen",
      task: "Transcrição de Áudio",
      amount: 12.50,
      date: "2024-01-20",
      status: "concluido"
    },
    {
      id: "2",
      platform: "Toloka",
      task: "Categorização de Imagens",
      amount: 8.30,
      date: "2024-01-20",
      status: "concluido"
    },
    {
      id: "3",
      platform: "ySense",
      task: "Pesquisa de Mercado",
      amount: 15.75,
      date: "2024-01-19",
      status: "pendente"
    },
    {
      id: "4",
      platform: "Clickworker",
      task: "Teste de App",
      amount: 9.20,
      date: "2024-01-19",
      status: "concluido"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    platform: "",
    task: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "concluido" as const
  });

  const handleAddEntry = () => {
    if (!newEntry.platform || !newEntry.task || !newEntry.amount) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para adicionar o ganho",
        variant: "destructive"
      });
      return;
    }

    const entry: EarningEntry = {
      id: Date.now().toString(),
      platform: newEntry.platform,
      task: newEntry.task,
      amount: parseFloat(newEntry.amount),
      date: newEntry.date,
      status: newEntry.status
    };

    setEarnings([entry, ...earnings]);
    setNewEntry({
      platform: "",
      task: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      status: "concluido"
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Ganho adicionado!",
      description: `$${entry.amount.toFixed(2)} foi adicionado ao seu painel de ganhos`,
    });
  };

  // Cálculos de estatísticas
  const totalEarnings = earnings.reduce((sum, entry) => 
    entry.status === 'concluido' ? sum + entry.amount : sum, 0
  );
  
  const pendingEarnings = earnings.reduce((sum, entry) => 
    entry.status === 'pendente' ? sum + entry.amount : sum, 0
  );

  const thisWeekEarnings = earnings
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo && entry.status === 'concluido';
    })
    .reduce((sum, entry) => sum + entry.amount, 0);

  const thisMonthEarnings = earnings
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return entryDate >= monthAgo && entry.status === 'concluido';
    })
    .reduce((sum, entry) => sum + entry.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'concluido':
        return <Badge className="bg-success text-success-foreground">Concluído</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Pendente</Badge>;
      case 'rejeitado':
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-success shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-white" />
              <div>
                <p className="text-sm text-white/80">Total Ganho</p>
                <p className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Esta Semana</p>
                <p className="text-2xl font-bold">${thisWeekEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary-light" />
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold">${thisMonthEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pendente</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel de controle */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Relatório de Ganhos</span>
            </CardTitle>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary shadow-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Ganho
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Novo Ganho</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="platform-select">Plataforma</Label>
                    <Select onValueChange={(value) => setNewEntry({...newEntry, platform: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha a plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="task-input">Nome da Tarefa</Label>
                    <Input
                      id="task-input"
                      value={newEntry.task}
                      onChange={(e) => setNewEntry({...newEntry, task: e.target.value})}
                      placeholder="Ex: Transcrição de áudio"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount-input">Valor (USD)</Label>
                    <Input
                      id="amount-input"
                      type="number"
                      step="0.01"
                      value={newEntry.amount}
                      onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date-input">Data</Label>
                    <Input
                      id="date-input"
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status-select">Status</Label>
                    <Select value={newEntry.status} onValueChange={(value: any) => setNewEntry({...newEntry, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concluido">Concluído</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="rejeitado">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleAddEntry} className="w-full bg-gradient-primary">
                    Adicionar Ganho
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Histórico de ganhos */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Histórico de Ganhos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {earnings.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <DollarSign className="h-4 w-4 mx-auto text-success mb-1" />
                    <span className="text-lg font-bold text-success">
                      ${entry.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{entry.task}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {entry.platform}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(entry.status)}
                </div>
              </div>
            ))}
          </div>
          
          {earnings.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhum ganho registrado</p>
              <p>Adicione seus primeiros ganhos para começar a acompanhar</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};