import { useState, useMemo } from "react";
import { Calculator, DollarSign, Clock, TrendingUp, Edit3, Target, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface TaskType {
  id: string;
  name: string;
  averagePayment: number;
  averageTimeMinutes: number;
  category: string;
  platform: string;
}

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

interface TaskDistribution {
  taskType: TaskType;
  weeklyTasks: number;
  weeklyEarnings: number;
  percentage: number;
  baseWeight?: number;
}

const defaultTaskTypes: TaskType[] = [
  {
    id: "image-classification",
    name: "Classificação de Imagem",
    averagePayment: 0.02,
    averageTimeMinutes: 0.5,
    category: "Visão Computacional",
    platform: "SproutGigs"
  },
  {
    id: "audio-validation",
    name: "Validação de Áudio",
    averagePayment: 0.05,
    averageTimeMinutes: 1,
    category: "Áudio",
    platform: "Appen"
  },
  {
    id: "data-entry",
    name: "Entrada de Dados",
    averagePayment: 0.03,
    averageTimeMinutes: 0.75,
    category: "Digitação",
    platform: "Clickworker"
  },
  {
    id: "quick-survey",
    name: "Pesquisa Rápida",
    averagePayment: 0.04,
    averageTimeMinutes: 1.5,
    category: "Pesquisa",
    platform: "ySense"
  },
  {
    id: "text-transcription",
    name: "Transcrição de Texto",
    averagePayment: 0.08,
    averageTimeMinutes: 2,
    category: "Transcrição",
    platform: "Toloka"
  },
  {
    id: "content-moderation",
    name: "Moderação de Conteúdo",
    averagePayment: 0.06,
    averageTimeMinutes: 1.25,
    category: "Revisão",
    platform: "UHRS"
  }
];

interface EarningsBudgetSimulatorProps {
  selectedJourney?: WorkJourney;
}

export const EarningsBudgetSimulator = ({ selectedJourney }: EarningsBudgetSimulatorProps) => {
  const [taskTypes, setTaskTypes] = useState<TaskType[]>(defaultTaskTypes);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  // Calcular simulação baseada na jornada selecionada
  const simulation = useMemo(() => {
    if (!selectedJourney || selectedJourney.weeklyHours === 0) return null;

    const totalWeeklyMinutes = selectedJourney.weeklyHours * 60;
    
    // Distribuição proporcional das tarefas baseada na popularidade/eficiência
    const distributions: TaskDistribution[] = taskTypes.map((taskType, index) => {
      // Peso baseado na eficiência (pagamento por minuto)
      const efficiency = taskType.averagePayment / taskType.averageTimeMinutes;
      const baseWeight = efficiency * (taskTypes.length - index); // Tarefas mais eficientes têm mais peso
      
      return { taskType, baseWeight, weeklyTasks: 0, weeklyEarnings: 0, percentage: 0 };
    });

    const totalWeight = distributions.reduce((sum, dist) => sum + (dist.baseWeight || 0), 0);
    
    // Calcular distribuição real
    let totalTasks = 0;
    let totalEarnings = 0;
    
    distributions.forEach(dist => {
      const percentage = (dist.baseWeight || 0) / totalWeight;
      const timeAllocation = totalWeeklyMinutes * percentage;
      const tasksCount = Math.floor(timeAllocation / dist.taskType.averageTimeMinutes);
      const earnings = tasksCount * dist.taskType.averagePayment;
      
      dist.weeklyTasks = tasksCount;
      dist.weeklyEarnings = earnings;
      dist.percentage = percentage * 100;
      
      totalTasks += tasksCount;
      totalEarnings += earnings;
    });

    const hourlyRate = totalEarnings / selectedJourney.weeklyHours;
    const monthlyEarnings = totalEarnings * 4.33; // Média de semanas por mês
    
    return {
      distributions: distributions.filter(dist => dist.weeklyTasks > 0),
      totalWeeklyTasks: totalTasks,
      totalWeeklyEarnings: totalEarnings,
      hourlyRate,
      monthlyEarnings,
      dailyTasks: Math.round(totalTasks / (selectedJourney.weeklyHours / selectedJourney.dailyHours)),
      dailyEarnings: totalEarnings / (selectedJourney.weeklyHours / selectedJourney.dailyHours)
    };
  }, [selectedJourney, taskTypes]);

  const handleEditTask = (task: TaskType) => {
    setEditingTask({ ...task });
    setIsEditDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!editingTask) return;

    setTaskTypes(prev => 
      prev.map(task => 
        task.id === editingTask.id ? editingTask : task
      )
    );
    
    setIsEditDialogOpen(false);
    setEditingTask(null);
    
    toast({
      title: "Valores atualizados!",
      description: `${editingTask.name} foi atualizado com sucesso.`,
    });
  };

  if (!selectedJourney) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center">
          <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Simulador de Orçamento</p>
          <p className="text-muted-foreground">
            Selecione uma jornada de trabalho para ver a simulação de ganhos
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!simulation) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            Não é possível calcular simulação para jornada flexível
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <Card className="bg-gradient-primary shadow-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Simulação de Orçamento - {selectedJourney.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm opacity-90">Semanal</p>
              <p className="text-2xl font-bold">${simulation.totalWeeklyEarnings.toFixed(2)}</p>
              <p className="text-xs opacity-75">{simulation.totalWeeklyTasks} tarefas</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90">Mensal</p>
              <p className="text-2xl font-bold">${simulation.monthlyEarnings.toFixed(2)}</p>
              <p className="text-xs opacity-75">~4.33 semanas</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90">Por Hora</p>
              <p className="text-2xl font-bold">${simulation.hourlyRate.toFixed(2)}</p>
              <p className="text-xs opacity-75">{selectedJourney.weeklyHours}h/semana</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90">Diário</p>
              <p className="text-2xl font-bold">${simulation.dailyEarnings.toFixed(2)}</p>
              <p className="text-xs opacity-75">{simulation.dailyTasks} tarefas/dia</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição de Tarefas */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Distribuição de Tarefas</span>
            </CardTitle>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Ajustar Valores
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajustar Valores de Tarefa</DialogTitle>
                </DialogHeader>
                {editingTask && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label>Nome da Tarefa</Label>
                      <Input 
                        value={editingTask.name}
                        onChange={(e) => setEditingTask({...editingTask, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Pagamento Médio (USD)</Label>
                      <Input 
                        type="number" 
                        step="0.01"
                        value={editingTask.averagePayment}
                        onChange={(e) => setEditingTask({...editingTask, averagePayment: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Tempo Médio (minutos)</Label>
                      <Input 
                        type="number" 
                        step="0.25"
                        value={editingTask.averageTimeMinutes}
                        onChange={(e) => setEditingTask({...editingTask, averageTimeMinutes: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Plataforma</Label>
                      <Input 
                        value={editingTask.platform}
                        onChange={(e) => setEditingTask({...editingTask, platform: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSaveTask} className="w-full">
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulation.distributions.map((dist, index) => (
              <div key={dist.taskType.id} className="p-4 bg-gradient-card rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <DollarSign className="h-4 w-4 mx-auto text-success mb-1" />
                      <span className="text-sm font-bold text-success">
                        ${dist.weeklyEarnings.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{dist.taskType.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {dist.taskType.platform}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {dist.percentage.toFixed(1)}% do tempo
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditTask(dist.taskType)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-accent rounded">
                    <Clock className="h-3 w-3 mx-auto mb-1 text-primary" />
                    <p className="font-medium">{dist.weeklyTasks} tarefas</p>
                    <p className="text-xs text-muted-foreground">por semana</p>
                  </div>
                  <div className="text-center p-2 bg-accent rounded">
                    <DollarSign className="h-3 w-3 mx-auto mb-1 text-success" />
                    <p className="font-medium">${dist.taskType.averagePayment.toFixed(3)}</p>
                    <p className="text-xs text-muted-foreground">por tarefa</p>
                  </div>
                  <div className="text-center p-2 bg-accent rounded">
                    <TrendingUp className="h-3 w-3 mx-auto mb-1 text-primary-light" />
                    <p className="font-medium">{(dist.taskType.averagePayment / (dist.taskType.averageTimeMinutes / 60)).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">USD/hora</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumo Estilo Folha de Pagamento */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Resumo de Pagamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-accent rounded">
              <span className="font-medium">Total de Horas Trabalhadas (Semana)</span>
              <span className="font-bold">{selectedJourney.weeklyHours}h</span>
            </div>
            <div className="flex justify-between p-3 bg-accent rounded">
              <span className="font-medium">Total de Tarefas Realizadas (Semana)</span>
              <span className="font-bold">{simulation.totalWeeklyTasks} tarefas</span>
            </div>
            <div className="flex justify-between p-3 bg-gradient-success text-white rounded">
              <span className="font-medium">Ganho Bruto Semanal</span>
              <span className="font-bold text-xl">${simulation.totalWeeklyEarnings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 bg-gradient-card rounded border">
              <span className="font-medium">Taxa Horária Efetiva</span>
              <span className="font-bold text-primary">${simulation.hourlyRate.toFixed(2)}/h</span>
            </div>
            <div className="flex justify-between p-3 bg-gradient-card rounded border">
              <span className="font-medium">Projeção Mensal</span>
              <span className="font-bold text-lg">${simulation.monthlyEarnings.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};