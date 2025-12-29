"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
    value: number[]
    min?: number
    max?: number
    step?: number
    onValueChange?: (value: number[]) => void
    className?: string
}

export function Slider({
    value,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    className,
    ...props
}: SliderProps) {
    const currentValue = value[0] || min

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value)
        if (onValueChange) {
            onValueChange([newVal])
        }
    }

    const percentage = ((currentValue - min) / (max - min)) * 100

    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={handleChange}
                className="absolute w-full h-full opacity-0 cursor-pointer z-20"
            />

            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-800">
                <div
                    className="absolute h-full bg-emerald-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div
                className="block h-5 w-5 rounded-full border-2 border-emerald-500 bg-black ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-10"
                style={{
                    position: 'absolute',
                    left: `calc(${percentage}% - 10px)`
                }}
            />
        </div>
    )
}
