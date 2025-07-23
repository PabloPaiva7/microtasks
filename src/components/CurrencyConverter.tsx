import { useState, useEffect } from "react";
import { Calculator, ArrowRightLeft, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface CurrencyConverterProps {
  totalEarningsUSD: number;
}

export const CurrencyConverter = ({ totalEarningsUSD }: CurrencyConverterProps) => {
  const [exchangeRate, setExchangeRate] = useState(5.20); // Taxa padrão USD/BRL
  const [customAmount, setCustomAmount] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simular atualização da taxa de câmbio (em produção, viria de uma API)
  const updateExchangeRate = async () => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular variação realista da taxa (±3%)
    const variation = (Math.random() - 0.5) * 0.06;
    const newRate = exchangeRate * (1 + variation);
    
    setExchangeRate(parseFloat(newRate.toFixed(4)));
    setLastUpdated(new Date());
    setIsLoading(false);
    
    toast({
      title: "Taxa atualizada!",
      description: `Nova taxa: R$ ${newRate.toFixed(4)} por USD`,
    });
  };

  const customAmountUSD = parseFloat(customAmount) || 0;
  const totalEarningsBRL = totalEarningsUSD * exchangeRate;
  const customAmountBRL = customAmountUSD * exchangeRate;

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 shadow-2xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          <Calculator className="h-5 w-5 text-blue-400" />
          <span>Conversor de Moeda</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Taxa de Câmbio Atual */}
        <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="h-4 w-4 text-blue-400" />
              <span className="font-semibold text-blue-100">USD → BRL</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={updateExchangeRate}
              disabled={isLoading}
              className="hover:bg-blue-500/20 text-blue-400"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              R$ {exchangeRate.toFixed(4)}
            </div>
            <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-300">
              Última atualização: {lastUpdated.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Badge>
          </div>
        </div>

        {/* Conversão dos Ganhos Totais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">Seus Ganhos</span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">
                ${totalEarningsUSD.toFixed(2)}
              </div>
              <div className="text-lg font-semibold text-green-300">
                R$ {totalEarningsBRL.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Valor em Reais</span>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-purple-300">
                Taxa: {exchangeRate.toFixed(4)}
              </div>
              <div className="text-2xl font-bold text-white">
                R$ {totalEarningsBRL.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Calculadora Personalizada */}
        <div className="p-4 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-xl border border-indigo-500/30">
          <Label className="text-indigo-300 font-medium mb-3 block">
            Converter Valor Personalizado
          </Label>
          
          <div className="space-y-3">
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="bg-white/10 border-indigo-500/50 text-white placeholder:text-gray-400"
                />
                <div className="text-xs text-indigo-300 mt-1">USD</div>
              </div>
              
              <div className="flex items-center">
                <ArrowRightLeft className="h-4 w-4 text-indigo-400" />
              </div>
              
              <div className="flex-1">
                <div className="h-10 px-3 py-2 bg-white/10 border border-indigo-500/50 rounded-md flex items-center">
                  <span className="text-white font-medium">
                    {customAmountBRL.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-indigo-300 mt-1">BRL</div>
              </div>
            </div>
            
            {customAmountUSD > 0 && (
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-indigo-300">
                  ${customAmountUSD.toFixed(2)} USD = <span className="font-bold text-white">R$ {customAmountBRL.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Taxa aplicada: R$ {exchangeRate.toFixed(4)}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};