import { useState } from "react";
import { BookOpen, TrendingUp, Shield, Clock, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tips = [
  {
    id: 1,
    category: "Otimização",
    title: "Como Escolher as Melhores Tarefas",
    content: "Foque em tarefas com boa relação tempo/ganho. Tarefas de $0.30-0.50 por minuto são ideais para começar.",
    readTime: "3 min",
    difficulty: "Iniciante"
  },
  {
    id: 2,
    category: "Produtividade",
    title: "Criando uma Rotina Eficiente",
    content: "Estabeleça horários fixos para microtarefas. 30-60 minutos por dia em horários de pico (manhã ou noite) maximizam ganhos.",
    readTime: "5 min",
    difficulty: "Intermediário"
  },
  {
    id: 3,
    category: "Segurança",
    title: "Como Identificar Golpes",
    content: "Nunca pague para trabalhar. Tarefas legítimas não pedem dinheiro antecipado ou dados bancários.",
    readTime: "4 min",
    difficulty: "Essencial"
  },
  {
    id: 4,
    category: "Plataformas",
    title: "Melhores Plataformas para Iniciantes",
    content: "Appen e Toloka são ótimas para começar. Têm aprovação rápida e variedade de tarefas simples.",
    readTime: "6 min",
    difficulty: "Iniciante"
  }
];

const learningPaths = [
  {
    id: 1,
    title: "Trilha Iniciante",
    description: "Do zero ao primeiro ganho em microtarefas",
    steps: [
      "Entendendo microtarefas",
      "Criando contas nas plataformas",
      "Primeira tarefa concluída",
      "Otimizando tempo e ganhos"
    ],
    progress: 25,
    duration: "2-3 dias"
  },
  {
    id: 2,
    title: "Trilha Produtividade",
    description: "Maximizando ganhos com estratégias avançadas",
    steps: [
      "Análise de ROI por tarefa",
      "Criando rotinas eficientes",
      "Usando múltiplas plataformas",
      "Automação e ferramentas"
    ],
    progress: 0,
    duration: "1 semana"
  },
  {
    id: 3,
    title: "Trilha Especialização",
    description: "Focando em nichos de alta remuneração",
    steps: [
      "Identificando nichos lucrativos",
      "Desenvolvendo habilidades específicas",
      "Qualificações avançadas",
      "Networking e oportunidades"
    ],
    progress: 0,
    duration: "2-3 semanas"
  }
];

const quickActions = [
  {
    title: "Calculadora de Ganhos",
    description: "Estime seus ganhos baseado no tempo disponível",
    action: "Calcular",
    icon: TrendingUp
  },
  {
    title: "Checklist de Segurança",
    description: "Verifique se está protegido contra golpes",
    action: "Verificar",
    icon: Shield
  },
  {
    title: "Teste de Velocidade",
    description: "Meça sua eficiência em diferentes tipos de tarefa",
    action: "Testar",
    icon: Clock
  }
];

export const LearningCenter = () => {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "border-green-500 text-green-700";
      case "Intermediário":
        return "border-blue-500 text-blue-700";
      case "Essencial":
        return "border-red-500 text-red-700";
      default:
        return "border-gray-500 text-gray-700";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Otimização":
        return "bg-blue-100 text-blue-800";
      case "Produtividade":
        return "bg-green-100 text-green-800";
      case "Segurança":
        return "bg-red-100 text-red-800";
      case "Plataformas":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Centro de Treinamento</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="tips" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tips">Dicas Rápidas</TabsTrigger>
          <TabsTrigger value="paths">Trilhas</TabsTrigger>
          <TabsTrigger value="tools">Ferramentas</TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <Card
                key={tip.id}
                className={`shadow-card hover:shadow-card-hover transition-shadow cursor-pointer ${
                  selectedTip === tip.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className={getCategoryColor(tip.category) + " mb-2"}>
                        {tip.category}
                      </Badge>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                    <ChevronRight 
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        selectedTip === tip.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{tip.readTime}</span>
                    </span>
                    <Badge variant="outline" className={getDifficultyColor(tip.difficulty)}>
                      {tip.difficulty}
                    </Badge>
                  </div>
                  
                  {selectedTip === tip.id && (
                    <div className="bg-accent p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">{tip.content}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-4">
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <Card key={path.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                      <p className="text-muted-foreground mb-3">{path.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{path.duration}</span>
                        </span>
                        <span>{path.progress}% concluído</span>
                      </div>
                    </div>
                    <Button 
                      className={`${
                        path.progress > 0 
                          ? "bg-gradient-primary shadow-primary" 
                          : "bg-gradient-primary shadow-primary"
                      }`}
                    >
                      {path.progress > 0 ? "Continuar" : "Começar"}
                    </Button>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {path.steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 p-2 rounded ${
                          index < (path.steps.length * path.progress / 100)
                            ? "bg-success/10 text-success"
                            : "bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index < (path.steps.length * path.progress / 100)
                            ? "bg-success text-white"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="shadow-card hover:shadow-card-hover transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {action.description}
                    </p>
                    <Button className="w-full bg-gradient-primary shadow-primary">
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Recursos Recomendados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-card rounded-lg border">
                  <h4 className="font-semibold mb-2">📊 Planilha de Controle de Ganhos</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Template para organizar e acompanhar seus ganhos por plataforma
                  </p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                
                <div className="p-4 bg-gradient-card rounded-lg border">
                  <h4 className="font-semibold mb-2">⏰ Timer Pomodoro para Tarefas</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ferramenta para manter foco e produtividade durante as tarefas
                  </p>
                  <Button variant="outline" size="sm">
                    Usar Agora
                  </Button>
                </div>
                
                <div className="p-4 bg-gradient-card rounded-lg border">
                  <h4 className="font-semibold mb-2">🔍 Verificador de Plataformas</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Verifique se uma plataforma é confiável antes de se cadastrar
                  </p>
                  <Button variant="outline" size="sm">
                    Verificar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};