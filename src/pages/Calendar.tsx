import { Dispatch, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, DocumentIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface IEvent {
    date: string,
    title: string,
    description: string
}

const events: IEvent[] = [
    {
        date: '11-06-2022',
        title: 'Event 1',
        description: 'This is the first event'
    }
];

const variants: Variants = {
    closed: {
        height: 0,
        overflow: 'hidden'
    },
    open: {
        height: 'auto',
        transitionEnd: {
            overflow: 'visible'
        }
    }
}

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
    number: number;
    layoutId: string;
    setSelectedDay?: Dispatch<React.SetStateAction<number>>;
    className?: string;
}

function Day({ number, layoutId, setSelectedDay, className }: DayProps) {
    return <motion.div layoutId={layoutId} onClick={() => setSelectedDay?.(i => i === number ? -1 : number)} className={`rounded-full aspect-square flex justify-center items-center m-1 text-sm text-white select-none ${className ?? ''}`}>
        {number}
    </motion.div>;
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const [selectedDay, setSelectedDay] = useState(-1);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;

    const prevLastDay = getDaysInMonth(prevMonth, currentYear);
    const lastDay = getDaysInMonth(currentMonth, currentYear);

    const lastMonday = prevLastDay - new Date(currentYear, prevMonth, prevLastDay).getDay() + 1;

    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    let gridIndex = 0;

    let prevDays = range(lastMonday, prevLastDay).map(n => <Day number={n} className='text-zinc-500' layoutId={'grid-' + gridIndex++} key={'grid-' + gridIndex}/>);
    const currentDays = range(1, lastDay).map(n => <Day number={n}setSelectedDay={setSelectedDay} className={`bg-zinc-700 text-white cursor-pointer${events.find(e => new Date(e.date).getTime() === new Date(currentYear, currentMonth, n).getTime()) ? ' text-sky-500' : ''} ${selectedDay === n ? ' !bg-sky-500 !text-white' : ''}`} layoutId={'grid-' + gridIndex++} key={'grid-' + gridIndex} />);
    let nextDays = range(1, 7 - (prevDays.length + lastDay) % 7).map(n => <Day number={n} className='text-zinc-500' layoutId={'grid-' + gridIndex++} key={'grid-' + gridIndex} />);

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
            <AnimatePresence key={'presence-' + i}>
                {(selectedDay > -1 && (selectedDay + prevDays.length - 1) >= i && (selectedDay + prevDays.length - 1) < i + 7) && <motion.div
                    variants={variants}
                    initial='closed'
                    animate='open'
                    exit='closed'
                    transition={{ type: 'tween' }}
                    className='col-span-7'
                >
                    <div className='flex flex-col gap-3 my-1'>
                        {events.filter(e => new Date(e.date).getTime() === new Date(currentYear, currentMonth, selectedDay).getTime()).map((event, i) => <motion.div layout className='bg-zinc-700 p-4 rounded-3xl' key={'event-' + i} layoutId={'event-' + i}>{event.title}</motion.div>)}

                        <motion.div layout onClick={() => setIsCreatingEvent(true)} className='flex flex-col gap-4 p-4 bg-zinc-700 text-white overflow-hidden' style={{ borderRadius: '24px' }} >
                            {isCreatingEvent ?
                                <>
                                    <motion.label layout className='flex gap-2'>
                                        <ClockIcon />
                                        <input type='time' className='w-full p-2 px-4 bg-zinc-600 rounded-full' placeholder='title' />
                                    </motion.label>
                                    <motion.label layout className='flex gap-2'>
                                        <PencilIcon />
                                        <input className='w-full p-2 px-4 bg-zinc-600 rounded-full' placeholder='title' />
                                    </motion.label>
                                    <motion.label layout className='flex gap-2'>
                                        <DocumentIcon />
                                        <textarea className='w-full p-2 px-4 bg-zinc-600 rounded-3xl' placeholder='description' />
                                    </motion.label>
                                    <motion.span layout className='flex justify-evenly ml-8'>
                                        <button className='w-fit self-center p-2 px-6 bg-sky-500 rounded-full'>
                                            Create
                                        </button>
                                        <button onClick={e => { setIsCreatingEvent(false); e.stopPropagation() }} className='w-fit self-center p-2 px-6 bg-transparent rounded-full'>
                                            Cancel
                                        </button>
                                    </motion.span>
                                </>
                                :
                                <motion.span layout>
                                    <PlusIcon className='mx-auto' />
                                </motion.span>
                            }
                        </motion.div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        );
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='flex justify-center w-full'>
                <div className="w-full max-w-sm h-fit">
                    <div className='grid grid-cols-7 items-center gap-2 mb-2'>
                        <button className='flex items-center justify-center navButton aspect-square bg-sky-500 text-white rounded-full' onClick={() => { setCurrentMonth(prevMonth); setCurrentYear(prevMonthYear) }}>
                            <ArrowLeftIcon className='w-4 h-4' />
                        </button>
                        <p className='col-span-5 text-white text-center text-xl'>{months[currentMonth]}</p>
                        <button className='flex items-center justify-center navButton aspect-square bg-sky-500 text-white rounded-full' onClick={() => { setCurrentMonth(nextMonth); setCurrentYear(nextMonthYear) }}>
                            <ArrowRightIcon className='w-4 h-4' />
                        </button>
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <div className='text-center' key={'day-name-' + i}>{day}</div>)}
                    </div>
                    <motion.div layout className='grid grid-cols-7 items-center gap-0'>
                        {weeks}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}