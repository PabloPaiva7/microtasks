import { useState } from "react";
import { DollarSign, TrendingUp, Plus, Calendar, Edit3, Wallet, ArrowUpCircle, Zap, Target, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { EarningsBudgetSimulator } from "@/components/EarningsBudgetSimulator";
import { CurrencyConverter } from "@/components/CurrencyConverter";

interface EarningEntry {
  id: string;
  platform: string;
  task: string;
  amount: number;
  date: string;
  status: 'concluido' | 'pendente' | 'rejeitado';
}

interface WithdrawalEntry {
  id: string;
  amount: number;
  date: string;
  description: string;
}

const platforms = ["Appen", "Toloka", "ySense", "Clickworker", "SproutGigs", "Swagbucks"];

interface WorkJourney {
  id: string;
  name: string;
  description: string;
  weeklyHours: number;
  dailyHours: number;
  schedule: string;
  estimatedEarnings: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  icon: string;
}

interface EarningsPanelProps {
  selectedJourney?: WorkJourney;
}

export const EarningsPanel = ({ selectedJourney }: EarningsPanelProps) => {
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

  const [withdrawals, setWithdrawals] = useState<WithdrawalEntry[]>([]);
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

  const totalWithdrawals = withdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0);
  const availableBalance = totalEarnings - totalWithdrawals;

  // Cálculos por período
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const todayEarnings = earnings
    .filter(entry => entry.date === todayString && entry.status === 'concluido')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const thisWeekEarnings = earnings
    .filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo && entry.status === 'concluido';
    })
    .reduce((sum, entry) => sum + entry.amount, 0);

  const thisMonthEarnings = earnings
    .filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= monthAgo && entry.status === 'concluido';
    })
    .reduce((sum, entry) => sum + entry.amount, 0);

  const handleWithdrawal = () => {
    if (availableBalance <= 0) {
      toast({
        title: "Saldo insuficiente",
        description: "Você não tem saldo disponível para saque",
        variant: "destructive"
      });
      return;
    }

    const withdrawal: WithdrawalEntry = {
      id: Date.now().toString(),
      amount: availableBalance,
      date: todayString,
      description: "Saque total disponível"
    };

    setWithdrawals([withdrawal, ...withdrawals]);
    
    toast({
      title: "Saque realizado!",
      description: `$${availableBalance.toFixed(2)} foi sacado com sucesso`,
    });
  };

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
    <Tabs defaultValue="earnings" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30">
        <TabsTrigger value="earnings" className="data-[state=active]:bg-blue-500/30 data-[state=active]:text-white">Ganhos Reais</TabsTrigger>
        <TabsTrigger value="converter" className="data-[state=active]:bg-blue-500/30 data-[state=active]:text-white">Conversor</TabsTrigger>
        <TabsTrigger value="simulator" className="data-[state=active]:bg-blue-500/30 data-[state=active]:text-white">Simulador</TabsTrigger>
      </TabsList>
      
      <TabsContent value="earnings" className="space-y-6">
      {/* Estatísticas gerais com design futurista */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-green-300">Saldo Disponível</p>
                <p className="text-2xl font-bold text-white">${availableBalance.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-blue-300">Hoje</p>
                <p className="text-2xl font-bold text-white">${todayEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-purple-300">Esta Semana</p>
                <p className="text-2xl font-bold text-white">${thisWeekEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-sm text-indigo-300">Este Mês</p>
                <p className="text-2xl font-bold text-white">${thisMonthEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-yellow-300">Pendente</p>
                <p className="text-2xl font-bold text-yellow-400">${pendingEarnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Painel de controle futurista */}
      <Card className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-600/50 shadow-2xl backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span>Central de Ganhos</span>
            </CardTitle>
            
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                    disabled={availableBalance <= 0}
                  >
                    <ArrowUpCircle className="h-4 w-4 mr-2" />
                    Sacar ${availableBalance.toFixed(2)}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Confirmar Saque</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Você está prestes a sacar ${availableBalance.toFixed(2)}. Esta ação irá zerar seu saldo disponível.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-white border-gray-600">Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleWithdrawal}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    >
                      Confirmar Saque
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Ganho
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600">
                  <DialogHeader>
                    <DialogTitle className="text-white">Registrar Novo Ganho</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="platform-select" className="text-gray-300">Plataforma</Label>
                      <Select onValueChange={(value) => setNewEntry({...newEntry, platform: value})}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Escolha a plataforma" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {platforms.map((platform) => (
                            <SelectItem key={platform} value={platform} className="text-white hover:bg-gray-700">
                              {platform}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="task-input" className="text-gray-300">Nome da Tarefa</Label>
                      <Input
                        id="task-input"
                        value={newEntry.task}
                        onChange={(e) => setNewEntry({...newEntry, task: e.target.value})}
                        placeholder="Ex: Transcrição de áudio"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="amount-input" className="text-gray-300">Valor (USD)</Label>
                      <Input
                        id="amount-input"
                        type="number"
                        step="0.01"
                        value={newEntry.amount}
                        onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                        placeholder="0.00"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="date-input" className="text-gray-300">Data</Label>
                      <Input
                        id="date-input"
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="status-select" className="text-gray-300">Status</Label>
                      <Select value={newEntry.status} onValueChange={(value: any) => setNewEntry({...newEntry, status: value})}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="concluido" className="text-white hover:bg-gray-700">Concluído</SelectItem>
                          <SelectItem value="pendente" className="text-white hover:bg-gray-700">Pendente</SelectItem>
                          <SelectItem value="rejeitado" className="text-white hover:bg-gray-700">Rejeitado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button onClick={handleAddEntry} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                      Adicionar Ganho
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Histórico de ganhos com design futurista */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-600/50 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Histórico de Ganhos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {earnings.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <DollarSign className="h-4 w-4 mx-auto text-green-400 mb-1" />
                      <span className="text-lg font-bold text-green-400">
                        ${entry.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{entry.task}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {entry.platform}
                        </Badge>
                        <span className="text-xs text-gray-400">
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
              <div className="text-center py-12 text-gray-400">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Nenhum ganho registrado</p>
                <p>Adicione seus primeiros ganhos para começar a acompanhar</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Histórico de Saques */}
        <Card className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-600/50 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
              Histórico de Saques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-lg border border-red-500/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <TrendingDown className="h-4 w-4 mx-auto text-red-400 mb-1" />
                      <span className="text-lg font-bold text-red-400">
                        -${withdrawal.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{withdrawal.description}</h4>
                      <span className="text-xs text-gray-400">
                        {new Date(withdrawal.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {withdrawals.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <ArrowUpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Nenhum saque realizado</p>
                <p>Seus saques aparecerão aqui</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </TabsContent>
      
      <TabsContent value="converter">
        <CurrencyConverter totalEarningsUSD={availableBalance} />
      </TabsContent>
      
      <TabsContent value="simulator">
        <EarningsBudgetSimulator selectedJourney={selectedJourney} />
      </TabsContent>
    </Tabs>
  );
};