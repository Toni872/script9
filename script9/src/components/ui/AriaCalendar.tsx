'use client'

import React from 'react'
import { Calendar, CalendarCell, CalendarGrid, CalendarGridHeader, CalendarGridBody, CalendarHeaderCell, Heading, Button as AriaButton, Group } from 'react-aria-components'
import { getLocalTimeZone, today, DateValue } from '@internationalized/date'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface AriaCalendarProps {
    value?: Date
    onChange?: (date: Date) => void
    minToday?: boolean
}

// Transforma DateValue (React Aria) a Date JS
function toJSDate(v: DateValue): Date {
    return v.toDate(getLocalTimeZone())
}

export default function AriaCalendar({ value, onChange, minToday = true }: AriaCalendarProps) {
    const defaultValue = value
        ? today(getLocalTimeZone()) // unused but required by types when controlled
        : undefined

    const minValue = minToday ? today(getLocalTimeZone()) : undefined

    return (
        <div className="p-2">
            <Calendar
                aria-label="Selector de fecha"
                className="text-white"
                minValue={minValue}
                onChange={(d) => onChange?.(toJSDate(d))}
                defaultValue={undefined}
            >
                <Group className="flex items-center justify-between mb-2">
                    <AriaButton slot="previous" className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-white hover:bg-white/10">
                        <ChevronLeft className="h-4 w-4" />
                    </AriaButton>
                    <Heading className="text-sm font-semibold" />
                    <AriaButton slot="next" className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-white hover:bg-white/10">
                        <ChevronRight className="h-4 w-4" />
                    </AriaButton>
                </Group>
                <CalendarGrid className="rounded-xl overflow-hidden">
                    <CalendarGridHeader>
                        {(day) => (
                            <CalendarHeaderCell className="w-10 h-10 text-center text-white/70 text-sm">
                                {day}
                            </CalendarHeaderCell>
                        )}
                    </CalendarGridHeader>
                    <CalendarGridBody>
                        {(date) => (
                            <CalendarCell
                                date={date}
                                className={({ isSelected, isDisabled, isOutsideMonth, isFocused }) => [
                                    'w-10 h-10 text-sm flex items-center justify-center rounded-lg transition-colors',
                                    isSelected ? 'bg-[#8B5CF6] text-white' : 'hover:bg-white/10 text-white',
                                    isDisabled ? 'opacity-40 cursor-not-allowed' : '',
                                    isOutsideMonth ? 'text-white/40' : '',
                                    isFocused ? 'ring-2 ring-white/30' : ''
                                ].join(' ')}
                            />
                        )}
                    </CalendarGridBody>
                </CalendarGrid>
            </Calendar>
        </div>
    )
}




