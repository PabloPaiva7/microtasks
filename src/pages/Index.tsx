import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Dashboard } from "@/components/Dashboard";
import { TaskCenter } from "@/components/TaskCenter";
import { TaskSchedule } from "@/components/TaskSchedule";
import { EarningsPanel } from "@/components/EarningsPanel";
import { LearningCenter } from "@/components/LearningCenter";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return <TaskCenter />;
      case "schedule":
        return <TaskSchedule />;
      case "earnings":
        return <EarningsPanel />;
      case "learning":
        return <LearningCenter />;
      default:
        return <Dashboard />;
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
