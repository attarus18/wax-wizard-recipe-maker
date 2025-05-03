
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Droplet, Scale, Palette, CirclePercent, Calculator, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CandleCalculator: React.FC = () => {
  const { toast } = useToast();
  const [totalWeight, setTotalWeight] = useState<string>('');
  const [fragrancePercentage, setFragrancePercentage] = useState<number>(6); // Default 6%
  const [soyPercentage, setSoyPercentage] = useState<number>(100); // Default 100% soy
  const [colorantGramsPerKg, setColorantGramsPerKg] = useState<number>(2); // Default 2g per kg
  
  const [soyCandleWeight, setSoyCandleWeight] = useState<number>(0);
  const [paraffinCandleWeight, setParaffinCandleWeight] = useState<number>(0);
  const [fragranceWeight, setFragranceWeight] = useState<number>(0);
  const [colorantWeight, setColorantWeight] = useState<number>(0);
  const [calculated, setCalculated] = useState<boolean>(false);
  
  const handleReset = () => {
    setTotalWeight('');
    setSoyPercentage(100);
    setFragrancePercentage(6);
    setColorantGramsPerKg(2);
    setSoyCandleWeight(0);
    setParaffinCandleWeight(0);
    setFragranceWeight(0);
    setColorantWeight(0);
    setCalculated(false);
    
    toast({
      title: "Reset completato",
      description: "Tutti i valori sono stati reimpostati.",
    });
  };

  const handleCalculate = () => {
    const totalWeightValue = parseFloat(totalWeight);
    if (totalWeightValue <= 0 || isNaN(totalWeightValue)) {
      toast({
        title: "Inserisci un peso valido",
        description: "Il peso totale della candela deve essere maggiore di zero.",
        variant: "destructive",
      });
      return;
    }
    
    // Convertire le percentuali in decimali
    const fragranceDecimal = fragrancePercentage / 100;
    const soyDecimal = soyPercentage / 100;
    const paraffinDecimal = 1 - soyDecimal; // La somma deve essere 100%
    
    // Calcolo secondo la formula fornita
    const fragranceWeightValue = totalWeightValue * fragranceDecimal;
    const totalWaxWeight = totalWeightValue - fragranceWeightValue;
    const soyWaxWeight = totalWaxWeight * soyDecimal;
    const paraffinWaxWeight = totalWaxWeight * paraffinDecimal;
    
    // Calcolo del colorante (in base al peso totale della cera)
    const colorantWeightValue = (totalWaxWeight * colorantGramsPerKg) / 1000;
    
    // Aggiorno lo stato con i valori calcolati
    setFragranceWeight(Number(fragranceWeightValue.toFixed(1)));
    setSoyCandleWeight(Number(soyWaxWeight.toFixed(1)));
    setParaffinCandleWeight(Number(paraffinWaxWeight.toFixed(1)));
    setColorantWeight(Number(colorantWeightValue.toFixed(2)));
    setCalculated(true);
    
    toast({
      title: "Calcolo completato",
      description: "La ricetta della candela è stata calcolata con successo.",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-candle-amber/20 shadow-lg bg-white">
        <CardHeader className="bg-white border-b border-candle-amber/20">
          <CardTitle className="text-3xl text-candle-dark text-center">Wax Wizard</CardTitle>
          <CardDescription className="text-center">Calcolatore di Ricette per Candele</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 bg-white">
          <Tabs defaultValue="measurement" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="measurement" className="flex gap-2 items-center text-candle-dark">
                <Calculator size={18} /> Peso Totale
              </TabsTrigger>
              <TabsTrigger value="wax" className="flex gap-2 items-center text-candle-dark">
                <Scale size={18} /> Cera
              </TabsTrigger>
              <TabsTrigger value="fragrance" className="flex gap-2 items-center text-candle-dark">
                <CirclePercent size={18} /> Fragranza
              </TabsTrigger>
              <TabsTrigger value="colorant" className="flex gap-2 items-center text-candle-dark">
                <Palette size={18} /> Colore
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="measurement" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="totalWeight">Peso Totale della Candela (g)</Label>
                  <Input 
                    id="totalWeight"
                    type="number"
                    placeholder="Inserisci il peso totale desiderato della candela in grammi"
                    value={totalWeight}
                    onChange={(e) => setTotalWeight(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Inserisci il peso totale desiderato della candela finita (inclusa cera, fragranza e colorante).
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="wax" className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="soyPercentage">Percentuale di Cera di Soia</Label>
                    <span className="font-medium">{soyPercentage}%</span>
                  </div>
                  <Slider 
                    id="soyPercentage"
                    min={0} 
                    max={100} 
                    step={5}
                    value={[soyPercentage]} 
                    onValueChange={(values) => setSoyPercentage(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0% (Solo Paraffina)</span>
                    <span>Miscela 50/50</span>
                    <span>100% (Solo Soia)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    La percentuale di paraffina sarà automaticamente {100 - soyPercentage}% per garantire che la somma sia 100%.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="fragrance" className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="fragrance">Percentuale di Fragranza</Label>
                    <span className="font-medium">{fragrancePercentage}%</span>
                  </div>
                  <Slider 
                    id="fragrance"
                    min={3} 
                    max={12} 
                    step={0.5}
                    value={[fragrancePercentage]} 
                    onValueChange={(values) => setFragrancePercentage(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Leggera (3%)</span>
                    <span>Standard (6%)</span>
                    <span>Forte (12%)</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="colorant" className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="colorant">Intensità del Colore (g/kg)</Label>
                    <span className="font-medium">{colorantGramsPerKg}g/kg</span>
                  </div>
                  <Slider 
                    id="colorant"
                    min={0.5} 
                    max={5} 
                    step={0.5}
                    value={[colorantGramsPerKg]} 
                    onValueChange={(values) => setColorantGramsPerKg(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Tenue (0.5g)</span>
                    <span>Media (2g)</span>
                    <span>Intensa (5g)</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex gap-4 justify-center mt-8 mb-4">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2 text-candle-dark border-candle-amber/30 hover:bg-candle-amber/10"
            >
              <RefreshCw size={18} />
              Reset
            </Button>
            <Button 
              onClick={handleCalculate}
              className="bg-candle-amber hover:bg-candle-amber/80 text-white"
            >
              Calcola
            </Button>
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-center text-candle-dark">Ricetta Finale</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-candle-amber/20 rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-sm font-medium text-candle-dark mb-1">Cera di Soia ({soyPercentage}%)</h4>
                <p className="text-2xl font-semibold text-candle-dark">{soyCandleWeight} g</p>
              </div>
              
              <div className="bg-white border border-candle-amber/20 rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-sm font-medium text-candle-dark mb-1">Paraffina ({100 - soyPercentage}%)</h4>
                <p className="text-2xl font-semibold text-candle-dark">{paraffinCandleWeight} g</p>
              </div>
              
              <div className="bg-white border border-candle-amber/20 rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-sm font-medium text-candle-dark mb-1">Fragranza ({fragrancePercentage}%)</h4>
                <p className="text-2xl font-semibold text-candle-dark">{fragranceWeight} g</p>
              </div>
              
              <div className="bg-white border border-candle-amber/20 rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-sm font-medium text-candle-dark mb-1">Colorante ({colorantGramsPerKg}g/kg)</h4>
                <p className="text-2xl font-semibold text-candle-dark">{colorantWeight} g</p>
              </div>
            </div>
            
            <div className="bg-white border border-candle-amber/20 rounded-lg p-4 mt-4 shadow-sm">
              <h4 className="font-medium mb-2 text-candle-dark">Note:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-candle-dark">
                <li>Sciogliere la cera a fuoco basso fino a 70-80°C</li>
                <li>Se si utilizza una miscela di cere, mescolare bene durante la fusione</li>
                <li>Aggiungere il colorante e mescolare bene</li>
                <li>Lasciare raffreddare fino a 60-65°C</li>
                <li>Aggiungere la fragranza e mescolare per 2 minuti</li>
                <li>Versare nel contenitore e lasciare solidificare per 24 ore</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandleCalculator;
