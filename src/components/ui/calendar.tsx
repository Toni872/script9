import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                // Fondo y tipografía adaptados a la barra (modo oscuro translúcido)
                "p-4 text-white",
                className
            )}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-base font-semibold text-white",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-8 w-8 bg-transparent p-0 hover:bg-white/10 rounded-lg transition-colors text-white"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex mb-2",
                head_cell:
                    "text-white/60 rounded-md w-10 font-medium text-sm text-center",
                row: "flex w-full mt-1",
                cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-white/10 [&:has([aria-selected])]:bg-white/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-lg transition-colors text-white"
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-[#8B5CF6] text-white hover:bg-[#7c3aed] hover:text-white focus:bg-[#8B5CF6] focus:text-white rounded-lg font-medium",
                day_today: "bg-white/10 text-white font-semibold rounded-lg",
                day_outside:
                    "day-outside text-white/40 opacity-50 aria-selected:bg-white/10 aria-selected:text-white/60 aria-selected:opacity-30",
                day_disabled: "text-white/40 opacity-50 cursor-not-allowed",
                day_range_middle:
                    "aria-selected:bg-white/10 aria-selected:text-white",
                day_hidden: "invisible",
                ...classNames,
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
