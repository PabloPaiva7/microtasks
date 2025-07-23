import { Home, Calendar, DollarSign, BookOpen, Menu, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "tasks", label: "Banco de Tarefas", icon: List },
  { id: "schedule", label: "Escala de Trabalho", icon: Calendar },
  { id: "earnings", label: "Relatório de Ganhos", icon: DollarSign },
  { id: "learning", label: "Centro de Treinamento", icon: BookOpen },
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const NavigationContent = () => (
    <div className="flex flex-col space-y-2 p-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeTab === item.id
                ? "bg-gradient-primary text-primary-foreground shadow-primary"
                : "hover:bg-accent"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block w-64 bg-card border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TaskShift
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sua jornada de trabalho online
          </p>
        </div>
        <NavigationContent />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TaskShift
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="mt-6">
                <NavigationContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};