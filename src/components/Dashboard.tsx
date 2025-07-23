import { useState } from "react";
import { Clock, TrendingUp, CheckCircle, Star, Target, Award, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkJourneySelector } from "@/components/WorkJourneySelector";

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

const todayGoals = [
  {
    id: 1,
    title: "Meta de Ganhos Diária",
    current: 67,
    target: 100,
    unit: "$",
    icon: TrendingUp,
    color: "text-success"
  },
  {
    id: 2,
    title: "Horas Trabalhadas",
    current: 5.5,
    target: 8,
    unit: "h",
    icon: Clock,
    color: "text-primary"
  },
  {
    id: 3,
    title: "Tarefas Concluídas",
    current: 12,
    target: 15,
    unit: "",
    icon: CheckCircle,
    color: "text-primary-light"
  }
];

const weeklyAchievements = [
  { title: "🎯 Meta Diária Batida", description: "5 dias consecutivos", unlocked: true },
  { title: "⚡ Speed Runner", description: "15 tarefas em 1 dia", unlocked: true },
  { title: "🏆 Top Performer", description: "Meta semanal 120%", unlocked: false },
  { title: "🔥 Streak Master", description: "7 dias trabalhando", unlocked: false }
];

const workShiftNotifications = [
  {
    type: "start",
    title: "🌅 Expediente Iniciado!",
    message: "Seu turno de trabalho começou. Hora de ganhar dinheiro!",
    time: "09:00"
  },
  {
    type: "break",
    title: "☕ Hora do Intervalo",
    message: "Faça uma pausa de 15 minutos. Você merece!",
    time: "12:00"
  },
  {
    type: "goal",
    title: "🎯 Meta Alcançada!",
    message: "Parabéns! Você bateu 80% da meta diária.",
    time: "15:30"
  }
];

export const Dashboard = () => {
  const [selectedJourney, setSelectedJourney] = useState<WorkJourney | undefined>();

  return (
    <div className="space-y-6">
      {/* Seletor de Jornada de Trabalho */}
      <WorkJourneySelector 
        onJourneySelect={setSelectedJourney}
        selectedJourney={selectedJourney}
      />

      {/* Status do Expediente */}
      <Card className="bg-gradient-primary shadow-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h3 className="text-lg font-semibold">Expediente em Andamento</h3>
                <p className="text-sm opacity-90">Iniciado às 09:00 • 5h 30m trabalhadas</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Pausar Expediente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metas do Dia */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Metas de Hoje</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todayGoals.map((goal) => {
              const percentage = (goal.current / goal.target) * 100;
              const IconComponent = goal.icon;
              
              return (
                <div key={goal.id} className="p-4 bg-gradient-card rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconComponent className={`h-4 w-4 ${goal.color}`} />
                    <span className="text-sm font-medium">{goal.title}</span>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-2xl font-bold">
                      {goal.current}{goal.unit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      de {goal.target}{goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {percentage.toFixed(0)}% concluído
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conquistas da Semana */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Conquistas da Semana</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {weeklyAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all ${
                  achievement.unlocked 
                    ? "bg-gradient-card border-success/20 shadow-sm" 
                    : "bg-muted/50 border-muted opacity-60"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{achievement.unlocked ? "🏅" : "🔒"}</span>
                  <div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notificações do Expediente */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Atualizações do Expediente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workShiftNotifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-accent rounded-lg"
              >
                <div className="text-xs text-muted-foreground font-mono">
                  {notification.time}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};