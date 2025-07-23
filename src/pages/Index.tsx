import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Dashboard } from "@/components/Dashboard";
import { TaskCenter } from "@/components/TaskCenter";
import { TaskSchedule } from "@/components/TaskSchedule";
import { EarningsPanel } from "@/components/EarningsPanel";
import { LearningCenter } from "@/components/LearningCenter";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedJourney, setSelectedJourney] = useState<WorkJourney | undefined>();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard selectedJourney={selectedJourney} onJourneySelect={setSelectedJourney} />;
      case "tasks":
        return <TaskCenter />;
      case "schedule":
        return <TaskSchedule />;
      case "earnings":
        return <EarningsPanel selectedJourney={selectedJourney} />;
      case "learning":
        return <LearningCenter />;
      default:
        return <Dashboard selectedJourney={selectedJourney} onJourneySelect={setSelectedJourney} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 md:ml-0">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
