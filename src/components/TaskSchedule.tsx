import { useState } from "react";
import { Calendar, Clock, Plus, Trash2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface ScheduledTask {
  id: string;
  title: string;
  platform: string;
  time: string;
  day: string;
  duration: string;
  earning: string;
  reminder: boolean;
}

const weekDays = [
  "Segunda-feira",
  "Terça-feira", 
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo"
];

const availableTasks = [
  "Transcrição de Áudio - Appen",
  "Categorização de Imagens - Toloka",
  "Pesquisa de Mercado - ySense",
  "Teste de App - Clickworker",
  "Moderação de Conteúdo - SproutGigs"
];

export const TaskSchedule = () => {
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>([
    {
      id: "1",
      title: "Transcrição de Áudio",
      platform: "Appen",
      time: "09:00",
      day: "Segunda-feira",
      duration: "30 min",
      earning: "$8-12",
      reminder: true
    },
    {
      id: "2", 
      title: "Categorização de Imagens",
      platform: "Toloka",
      time: "14:00",
      day: "Quarta-feira",
      duration: "20 min",
      earning: "$5-8",
      reminder: false
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    day: "",
    reminder: false
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.time || !newTask.day) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para agendar a tarefa",
        variant: "destructive"
      });
      return;
    }

    const task: ScheduledTask = {
      id: Date.now().toString(),
      title: newTask.title,
      platform: newTask.title.split(" - ")[1] || "Plataforma",
      time: newTask.time,
      day: newTask.day,
      duration: "25-35 min",
      earning: "$8-12",
      reminder: newTask.reminder
    };

    setScheduledTasks([...scheduledTasks, task]);
    setNewTask({ title: "", time: "", day: "", reminder: false });
    setIsDialogOpen(false);
    
    toast({
      title: "Tarefa agendada!",
      description: `${task.title} foi adicionada à sua agenda para ${task.day} às ${task.time}`,
    });
  };

  const handleDeleteTask = (id: string) => {
    setScheduledTasks(scheduledTasks.filter(task => task.id !== id));
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi removida da sua agenda",
    });
  };

  const groupTasksByDay = () => {
    const grouped: Record<string, ScheduledTask[]> = {};
    
    weekDays.forEach(day => {
      grouped[day] = scheduledTasks.filter(task => task.day === day);
    });
    
    return grouped;
  };

  const groupedTasks = groupTasksByDay();

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Escala de Trabalho Semanal</span>
            </CardTitle>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary shadow-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Tarefa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agendar Nova Tarefa</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="task-select">Selecionar Tarefa</Label>
                    <Select onValueChange={(value) => setNewTask({...newTask, title: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha uma tarefa" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTasks.map((task) => (
                          <SelectItem key={task} value={task}>
                            {task}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="day-select">Dia da Semana</Label>
                    <Select onValueChange={(value) => setNewTask({...newTask, day: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        {weekDays.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="time-input">Horário</Label>
                    <Input
                      id="time-input"
                      type="time"
                      value={newTask.time}
                      onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reminder-checkbox"
                      checked={newTask.reminder}
                      onChange={(e) => setNewTask({...newTask, reminder: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="reminder-checkbox">Ativar lembrete</Label>
                  </div>
                  
                  <Button onClick={handleAddTask} className="w-full bg-gradient-primary">
                    Agendar Tarefa
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Agenda semanal */}
      <div className="space-y-4">
        {weekDays.map((day) => (
          <Card key={day} className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {groupedTasks[day].length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma tarefa agendada</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {groupedTasks[day].map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <Clock className="h-4 w-4 mx-auto text-primary mb-1" />
                          <span className="text-sm font-medium">{task.time}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{task.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {task.platform}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-success border-success">
                              {task.earning}
                            </Badge>
                            {task.reminder && (
                              <Badge variant="outline" className="text-xs">
                                <Bell className="h-3 w-3 mr-1" />
                                Lembrete
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};