import { Dispatch, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion';

interface IEvent {
    date: string,
    title: string,
    description: string
}

const events: IEvent[] = [
    {
        date: '10-06-2022',
        title: 'Event 1',
        description: 'This is the first event'
    }
];

const today = new Date();

function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

function range(start: number, end?: number): number[] {
    if (end === undefined)
        return range(0, start);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface DayProps {
    day: number;
    setSelectedDay?: Dispatch<React.SetStateAction<number>>;
    className?: string;
}

function Day({ day, setSelectedDay, className }: DayProps) {
    return <div onClick={() => setSelectedDay?.(i => i === day ? -1 : day)} className={'rounded-full aspect-square flex justify-center items-center text-sm text-white select-none' + (className ? ' ' + className : '')}>
        {day}
    </div>;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [selectedDay, setSelectedDay] = useState(-1);

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

    const prevLastDay = getDaysInMonth(prevMonth, currentYear);
    const lastDay = getDaysInMonth(currentMonth, currentYear);

    // find last monday of the month
    let lastMonday = prevLastDay;
    while ((new Date(currentYear, prevMonth, lastMonday).getDay()) !== 1) {
        lastMonday--;
    }

    let i = 0;

    let prevDays = range(lastMonday, prevLastDay).map(day => <Day day={day} className='text-zinc-500' />);
    const currentDays = range(1, lastDay).map(day => <Day day={day} setSelectedDay={setSelectedDay} className={'bg-zinc-700 text-white cursor-pointer' + ((events.find(e => new Date(e.date).getTime() === new Date(currentYear, currentMonth, day).getTime()) && ' text-sky-500') || '') + (selectedDay === day ? ' !bg-sky-500 !text-white' : '')} />);
    let nextDays = range(1, 7 - (prevDays.length + lastDay) % 7).map(day => <Day day={day} className='text-zinc-500' />);

    if (prevDays.length === 7)
        prevDays = [];

    if (nextDays.length === 7)
        nextDays = [];

    const days = [...prevDays, ...currentDays, ...nextDays];

    // split days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
        weeks.push(
            <AnimatePresence>
                {(selectedDay > -1 && (selectedDay + prevDays.length - 1) >= i && (selectedDay + prevDays.length - 1) < i + 7) && <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{
                        duration: .1
                    }}
                    layout
                    className="col-span-7 overflow-hidden"
                >
                    <div className='flex flex-col gap-3 my-1'>
                        {events.filter(e => new Date(e.date).getTime() === new Date(currentYear, currentMonth, selectedDay).getTime()).map(event => <div className='bg-zinc-700 p-4 rounded-3xl'>{event.title}</div>)}
                        <button className='p-4 bg-zinc-700 text-white rounded-3xl'>
                            <PlusIcon className='mx-auto' />
                        </button>
                    </div>
                </motion.div>}
            </AnimatePresence>
        );
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='flex justify-center w-full'>
                <div className="grid grid-cols-7 items-center w-full max-w-sm h-fit gap-2">
                <button className='flex items-center justify-center navButton aspect-square bg-sky-500 text-white rounded-full' onClick={() => setCurrentMonth(prevMonth)}>
                    <ArrowLeftIcon className='w-4 h-4' />
                </button>
                <p className='col-span-5 text-white text-center text-xl'>{months[currentMonth]}</p>
                <button className='flex items-center justify-center navButton aspect-square bg-sky-500 text-white rounded-full' onClick={() => setCurrentMonth(nextMonth)}>
                    <ArrowRightIcon className='w-4 h-4' />
                </button>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => <div className='text-center mt-2'>{day}</div>)}
                    {weeks}
                </div>
            </div>
        </div >
    );
}