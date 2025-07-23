import { useState } from "react";
import { Search, Filter, Clock, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const allTasks = [
  {
    id: 1,
    title: "Transcrição de Áudio - Podcasts",
    platform: "Appen",
    category: "Áudio",
    duration: "25-35 min",
    earning: "$8-12",
    difficulty: "Fácil",
    rating: 4.5,
    description: "Transcreva trechos de podcasts em inglês",
    requirements: ["Inglês intermediário", "Fones de ouvido"],
  },
  {
    id: 2,
    title: "Categorização de Produtos",
    platform: "Toloka",
    category: "Imagem",
    duration: "15-20 min",
    earning: "$5-8",
    difficulty: "Muito Fácil",
    rating: 4.8,
    description: "Categorize produtos em e-commerce",
    requirements: ["Atenção aos detalhes"],
  },
  {
    id: 3,
    title: "Pesquisa sobre Hábitos de Consumo",
    platform: "ySense",
    category: "Pesquisa",
    duration: "45-60 min",
    earning: "$12-18",
    difficulty: "Médio",
    rating: 4.3,
    description: "Responda questionário sobre comportamento do consumidor",
    requirements: ["Perfil demográfico específico"],
  },
  {
    id: 4,
    title: "Teste de App Mobile",
    platform: "Clickworker",
    category: "Teste de App",
    duration: "20-30 min",
    earning: "$6-10",
    difficulty: "Fácil",
    rating: 4.6,
    description: "Teste funcionalidades de aplicativo e reporte bugs",
    requirements: ["Smartphone Android/iOS"],
  },
  {
    id: 5,
    title: "Moderação de Conteúdo",
    platform: "SproutGigs",
    category: "Imagem",
    duration: "30-40 min",
    earning: "$7-11",
    difficulty: "Médio",
    rating: 4.2,
    description: "Analise e modere conteúdo de rede social",
    requirements: ["Conhecimento de políticas de conteúdo"],
  },
  {
    id: 6,
    title: "Verificação de Dados",
    platform: "Swagbucks",
    category: "Pesquisa Rápida",
    duration: "10-15 min",
    earning: "$3-5",
    difficulty: "Muito Fácil",
    rating: 4.4,
    description: "Verifique informações de empresas online",
    requirements: ["Acesso à internet"],
  },
];

const categories = ["Todos", "Áudio", "Imagem", "Pesquisa", "Teste de App", "Pesquisa Rápida"];
const platforms = ["Todas", "Appen", "Toloka", "Clickworker", "SproutGigs", "ySense", "Swagbucks"];
const difficulties = ["Todas", "Muito Fácil", "Fácil", "Médio"];

export const TaskCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedPlatform, setSelectedPlatform] = useState("Todas");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas");

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || task.category === selectedCategory;
    const matchesPlatform = selectedPlatform === "Todas" || task.platform === selectedPlatform;
    const matchesDifficulty = selectedDifficulty === "Todas" || task.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesPlatform && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Banco de Tarefas Disponíveis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Dificuldade" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de tarefas */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{task.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{task.platform}</Badge>
                    <Badge variant="outline">{task.category}</Badge>
                    <Badge 
                      variant="outline"
                      className={
                        task.difficulty === "Muito Fácil" ? "border-green-500 text-green-700" :
                        task.difficulty === "Fácil" ? "border-blue-500 text-blue-700" :
                        "border-orange-500 text-orange-700"
                      }
                    >
                      {task.difficulty}
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Requisitos:</span> {task.requirements.join(", ")}
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-success mb-2">
                    {task.earning}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
                    <Clock className="h-3 w-3" />
                    <span>{task.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{task.rating}</span>
                  </div>
                  <Button className="bg-gradient-primary shadow-primary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Acessar Tarefa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Nenhuma tarefa encontrada</p>
              <p>Tente ajustar os filtros ou termo de busca</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};