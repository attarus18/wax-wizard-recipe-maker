
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Droplet, Scale, Palette, CirclePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Constants for calculations
const DENSITY_RATIO = {
  soy: 0.9, // Soy wax is less dense than water
  paraffin: 0.85, // Paraffin is less dense than water
};

const CandleCalculator: React.FC = () => {
  const { toast } = useToast();
  const [waterWeight, setWaterWeight] = useState<string>('');
  const [waxType, setWaxType] = useState<'soy' | 'paraffin'>('soy');
  const [fragrancePercentage, setFragrancePercentage] = useState<number>(6); // Default 6%
  const [colorantGramsPerKg, setColorantGramsPerKg] = useState<number>(2); // Default 2g per kg
  
  const [waxWeight, setWaxWeight] = useState<number>(0);
  const [fragranceWeight, setFragranceWeight] = useState<number>(0);
  const [colorantWeight, setColorantWeight] = useState<number>(0);
  
  // Calculate wax weight based on water weight and wax type
  useEffect(() => {
    const waterWeightNum = parseFloat(waterWeight);
    if (!isNaN(waterWeightNum) && waterWeightNum > 0) {
      const calculatedWaxWeight = waterWeightNum / DENSITY_RATIO[waxType];
      setWaxWeight(Number(calculatedWaxWeight.toFixed(1)));
    } else {
      setWaxWeight(0);
    }
  }, [waterWeight, waxType]);
  
  // Calculate fragrance and colorant weights
  useEffect(() => {
    if (waxWeight > 0) {
      const calculatedFragranceWeight = (waxWeight * fragrancePercentage) / 100;
      setFragranceWeight(Number(calculatedFragranceWeight.toFixed(1)));
      
      const calculatedColorantWeight = (waxWeight * colorantGramsPerKg) / 1000;
      setColorantWeight(Number(calculatedColorantWeight.toFixed(2)));
    } else {
      setFragranceWeight(0);
      setColorantWeight(0);
    }
  }, [waxWeight, fragrancePercentage, colorantGramsPerKg]);

  const handleReset = () => {
    setWaterWeight('');
    setWaxType('soy');
    setFragrancePercentage(6);
    setColorantGramsPerKg(2);
  };

  const handleCalculate = () => {
    if (parseFloat(waterWeight) <= 0) {
      toast({
        title: "Inserisci un peso valido",
        description: "Il peso dell'acqua deve essere maggiore di zero.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Calcolo completato",
      description: "La ricetta della candela è stata calcolata con successo.",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-candle-amber/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-candle-cream to-candle-light border-b border-candle-amber/20">
          <CardTitle className="text-3xl text-candle-dark text-center">Wax Wizard</CardTitle>
          <CardDescription className="text-center">Calcolatore di Ricette per Candele</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="measurement" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="measurement" className="flex gap-2 items-center">
                <Droplet size={18} /> Misura
              </TabsTrigger>
              <TabsTrigger value="wax" className="flex gap-2 items-center">
                <Scale size={18} /> Cera
              </TabsTrigger>
              <TabsTrigger value="fragrance" className="flex gap-2 items-center">
                <CirclePercent size={18} /> Fragranza
              </TabsTrigger>
              <TabsTrigger value="colorant" className="flex gap-2 items-center">
                <Palette size={18} /> Colore
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="measurement" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="waterWeight">Peso dell'acqua (g)</Label>
                  <Input 
                    id="waterWeight"
                    type="number"
                    placeholder="Inserisci il peso dell'acqua in grammi"
                    value={waterWeight}
                    onChange={(e) => setWaterWeight(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Riempi il contenitore con acqua e pesalo in grammi per ottenere la capacità.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="wax" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "border rounded-md p-4 cursor-pointer transition-all",
                      waxType === "soy" 
                        ? "border-primary bg-primary/10 shadow-md" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setWaxType("soy")}
                  >
                    <h3 className="font-medium mb-2">Cera di Soia</h3>
                    <p className="text-sm text-muted-foreground">Naturale, brucia più lentamente</p>
                  </div>
                  
                  <div
                    className={cn(
                      "border rounded-md p-4 cursor-pointer transition-all",
                      waxType === "paraffin" 
                        ? "border-primary bg-primary/10 shadow-md" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setWaxType("paraffin")}
                  >
                    <h3 className="font-medium mb-2">Paraffina</h3>
                    <p className="text-sm text-muted-foreground">Tradizionale, più economica</p>
                  </div>
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
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button onClick={handleCalculate}>Calcola</Button>
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-center">Ricetta Finale</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Cera {waxType === 'soy' ? 'di Soia' : 'Paraffina'}</h4>
                <p className="text-2xl font-semibold">{waxWeight} g</p>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Fragranza ({fragrancePercentage}%)</h4>
                <p className="text-2xl font-semibold">{fragranceWeight} g</p>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Colorante ({colorantGramsPerKg}g/kg)</h4>
                <p className="text-2xl font-semibold">{colorantWeight} g</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-2">Note:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Sciogliere la cera a fuoco basso fino a 70-80°C</li>
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
