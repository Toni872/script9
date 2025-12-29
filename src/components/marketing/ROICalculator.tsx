'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function ROICalculator() {
    // State for inputs
    const [ticketsPerMonth, setTicketsPerMonth] = useState(500);
    const [timePerTicket, setTimePerTicket] = useState(15); // Minutes
    const [agentHourlyCost, setAgentHourlyCost] = useState(20); // Euros per hour

    // State for results
    const [monthlyCost, setMonthlyCost] = useState(0);
    const [aiSavings, setAiSavings] = useState(0);

    // Calculate whenever inputs change
    useEffect(() => {
        const totalHours = (ticketsPerMonth * timePerTicket) / 60;
        const currentCost = totalHours * agentHourlyCost;

        // Assumption: AI handles 80% of Tier 1 tickets instantly at ~90% lower cost
        // Simplified: We assume AI saves 70% of the total support budget after fees
        const estimatedSavings = currentCost * 0.70;

        setMonthlyCost(currentCost);
        setAiSavings(estimatedSavings);
    }, [ticketsPerMonth, timePerTicket, agentHourlyCost]);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Inputs Section */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Calculadora de ROI</h3>
                        <p className="text-slate-400">Estima cuánto podrías ahorrar automatizando el soporte nivel 1.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Tickets Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-slate-300 font-medium flex items-center gap-2">
                                    <MessageSquareIcon className="w-4 h-4 text-emerald-400" />
                                    Tickets / mes
                                </label>
                                <span className="text-white font-bold">{ticketsPerMonth}</span>
                            </div>
                            <Slider
                                value={[ticketsPerMonth]}
                                onValueChange={(vals: number[]) => setTicketsPerMonth(vals[0])}
                                max={5000}
                                step={50}
                                className="py-2"
                            />
                        </div>

                        {/* Time per Ticket Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-slate-300 font-medium flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-emerald-400" />
                                    Minutos por ticket
                                </label>
                                <span className="text-white font-bold">{timePerTicket} min</span>
                            </div>
                            <Slider
                                value={[timePerTicket]}
                                onValueChange={(vals: number[]) => setTimePerTicket(vals[0])}
                                max={60}
                                step={1}
                                className="py-2"
                            />
                        </div>

                        {/* Hourly Cost Input */}
                        <div className="space-y-4">
                            <label className="text-slate-300 font-medium flex items-center gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-emerald-400" />
                                Coste Agente (€/hora)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                                <Input
                                    type="number"
                                    value={agentHourlyCost}
                                    onChange={(e) => setAgentHourlyCost(Number(e.target.value))}
                                    className="pl-8 bg-slate-950 border-slate-800 text-white focus:border-emerald-500/50 h-10" // Simplified styling
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="relative">
                    {/* Removed bg-gradient-to-br glow as requested */}
                    <div className="relative bg-slate-950/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm space-y-8 text-center">
                        <div className="space-y-2">
                            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Gasto Actual Estimado</p>
                            <p className="text-3xl font-bold text-white">€{monthlyCost.toLocaleString('es-ES', { maximumFractionDigits: 0 })}<span className="text-lg text-slate-500 font-normal">/mes</span></p>
                        </div>

                        <div className="w-full h-px bg-slate-800" />

                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold mb-2">
                                Ahorro Potencial
                            </div>
                            <p className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                €{aiSavings.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                                <span className="text-xl text-slate-500 font-medium">/mes</span>
                            </p>
                            <p className="text-slate-400 text-sm max-w-xs mx-auto pt-2">
                                Reducción estimada del 70% en costes operativos de soporte nivel 1.
                            </p>
                        </div>

                        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl shadow-lg shadow-emerald-500/20">
                            Empezar Ahorro Ahora
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MessageSquareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}
