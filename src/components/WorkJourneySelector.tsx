import { useState } from "react";
import { Briefcase, Clock, Calendar, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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

const workJourneys: WorkJourney[] = [
  {
    id: "clt-40h",
    name: "Expediente CLT - 40h",
    description: "Segunda à Sexta, 8h por dia",
    weeklyHours: 40,
    dailyHours: 8,
    schedule: "Seg-Sex: 09:00-18:00",
    estimatedEarnings: "$800-1200/mês",
    difficulty: "Intermediário",
    icon: "💼"
  },
  {
    id: "clt-44h",
    name: "Expediente CLT - 44h",
    description: "Segunda à Sábado, incluindo meio período aos sábados",
    weeklyHours: 44,
    dailyHours: 8,
    schedule: "Seg-Sex: 09:00-18:00, Sáb: 09:00-13:00",
    estimatedEarnings: "$880-1320/mês",
    difficulty: "Intermediário",
    icon: "📋"
  },
  {
    id: "clt-44h-extras",
    name: "CLT 44h + 4h Extras",
    description: "Expediente completo + 4h extras aos domingos",
    weeklyHours: 48,
    dailyHours: 8,
    schedule: "Seg-Sáb: Normal + Dom: 4h extras",
    estimatedEarnings: "$960-1440/mês",
    difficulty: "Avançado",
    icon: "⚡"
  },
  {
    id: "freelance-20h",
    name: "Freelance Pós-Expediente - 20h",
    description: "Perfeito para quem já trabalha e quer renda extra",
    weeklyHours: 20,
    dailyHours: 4,
    schedule: "Noites: 19:00-23:00 (Seg-Sex)",
    estimatedEarnings: "$400-600/mês",
    difficulty: "Iniciante",
    icon: "🌙"
  },
  {
    id: "freelance-30h",
    name: "Freelance 30h - Fins de Semana",
    description: "Intensivo nos fins de semana",
    weeklyHours: 30,
    dailyHours: 15,
    schedule: "Sáb-Dom: 8h-23h (com pausas)",
    estimatedEarnings: "$600-900/mês",
    difficulty: "Intermediário",
    icon: "🎯"
  },
  {
    id: "flexible",
    name: "Bolsa Horária Flexível",
    description: "Você escolhe quando e quanto trabalhar",
    weeklyHours: 0,
    dailyHours: 0,
    schedule: "Horário totalmente flexível",
    estimatedEarnings: "$20-40/hora",
    difficulty: "Iniciante",
    icon: "🔄"
  },
  {
    id: "part-time",
    name: "Turno Parcial - 20h",
    description: "Meio período com horário fixo",
    weeklyHours: 20,
    dailyHours: 4,
    schedule: "Seg-Sex: 09:00-13:00 ou 14:00-18:00",
    estimatedEarnings: "$400-600/mês",
    difficulty: "Iniciante",
    icon: "⏰"
  },
  {
    id: "intensive",
    name: "Turno Intensivo - 60h",
    description: "Para máxima dedicação e ganhos",
    weeklyHours: 60,
    dailyHours: 12,
    schedule: "Seg-Sex: 08:00-20:00",
    estimatedEarnings: "$1200-1800/mês",
    difficulty: "Avançado",
    icon: "🚀"
  }
];

interface WorkJourneySelectorProps {
  onJourneySelect: (journey: WorkJourney) => void;
  selectedJourney?: WorkJourney;
}

export const WorkJourneySelector = ({ onJourneySelect, selectedJourney }: WorkJourneySelectorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectJourney = (journey: WorkJourney) => {
    onJourneySelect(journey);
    setIsDialogOpen(false);
    toast({
      title: "Jornada de Trabalho Definida!",
      description: `Você escolheu: ${journey.name}. Sua escala será gerada automaticamente.`,
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Sua Jornada de Trabalho</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedJourney ? (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-card rounded-lg border">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{selectedJourney.icon}</span>
                <div>
                  <h3 className="font-semibold">{selectedJourney.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedJourney.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center p-2 bg-accent rounded">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-medium">{selectedJourney.weeklyHours}h/semana</p>
                </div>
                <div className="text-center p-2 bg-accent rounded">
                  <Target className="h-4 w-4 mx-auto mb-1 text-success" />
                  <p className="text-sm font-medium">{selectedJourney.estimatedEarnings}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline">{selectedJourney.difficulty}</Badge>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Trocar Jornada
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Escolha Sua Jornada de Trabalho</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {workJourneys.map((journey) => (
                        <Card
                          key={journey.id}
                          className="cursor-pointer hover:shadow-card-hover transition-shadow"
                          onClick={() => handleSelectJourney(journey)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="text-xl">{journey.icon}</span>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{journey.name}</h4>
                                <p className="text-xs text-muted-foreground">{journey.description}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span>Carga horária:</span>
                                <span className="font-medium">{journey.weeklyHours}h/semana</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Estimativa:</span>
                                <span className="font-medium text-success">{journey.estimatedEarnings}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {journey.difficulty}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Defina sua Jornada de Trabalho</p>
            <p className="text-muted-foreground mb-6">
              Escolha um modelo que se adapte à sua disponibilidade e objetivos
            </p>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary shadow-primary">
                  <Trophy className="h-4 w-4 mr-2" />
                  Escolher Jornada
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Escolha Sua Jornada de Trabalho</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {workJourneys.map((journey) => (
                    <Card
                      key={journey.id}
                      className="cursor-pointer hover:shadow-card-hover transition-shadow"
                      onClick={() => handleSelectJourney(journey)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-xl">{journey.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{journey.name}</h4>
                            <p className="text-xs text-muted-foreground">{journey.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span>Carga horária:</span>
                            <span className="font-medium">{journey.weeklyHours}h/semana</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Estimativa:</span>
                            <span className="font-medium text-success">{journey.estimatedEarnings}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {journey.difficulty}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
};