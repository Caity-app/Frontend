import { Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';

let startX: number;
let lastX: number;
let wasOpen = false;
let dragging = false;
let firstMove = true;
let mouseDown = false;

interface MouseEvent extends Event {
    clientX: number;
}

interface TouchEvent extends Event {
    touches: TouchList;
}

type SideBarRef = MutableRefObject<{ backdrop: HTMLElement, menu: HTMLElement } | null>;

const handleEvents = (e: MouseEvent | TouchEvent, sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, sideBarRef: SideBarRef) => {
    if (e.type === 'touchstart' || e.type === 'mousedown') {
        if (e instanceof MouseEvent) {
            startX = lastX = e.clientX;
        } else if (e instanceof TouchEvent) {
            startX = lastX = e.touches[0].clientX;
        }
        wasOpen = sideBarIsOpen;
        mouseDown = true;

        if (!wasOpen && startX < 16 && !(e.target as HTMLElement).closest('nav')) {
            dragging = true;
            setSideBarIsOpen(false);
            if (sideBarRef?.current) {
                const sideNavWidth = sideBarRef.current.menu.clientWidth;
                sideBarRef.current.menu.style.transform = `translateX(${-sideNavWidth + lastX}px)`;
                sideBarRef.current.backdrop.style.opacity = '0';
            }
        }
    } else if (e.type === 'touchmove' || e.type === 'mousemove') {
        if (mouseDown) {
            if (e instanceof MouseEvent) {
                lastX = e.clientX;
            } else if (e instanceof TouchEvent) {
                lastX = e.touches[0].clientX;
            }

            if (firstMove) {
                if (sideBarRef?.current)
                    sideBarRef.current.menu.style.transitionDuration = sideBarRef.current.backdrop.style.transitionDuration = '0s';
                firstMove = false;
            }

            if (!dragging && wasOpen && Math.abs(lastX - startX) > 25) {
                dragging = true;
                startX = lastX;
            }

            if (dragging && sideBarRef?.current) {
                const sideNavWidth = sideBarRef.current.menu.clientWidth;
                let offset = wasOpen ? Math.min(lastX - startX, 0) : Math.min(-sideNavWidth + Math.max(lastX, 0), 0);
                sideBarRef.current.menu.style.transform = `translateX(${offset}px)`;
                sideBarRef.current.backdrop.style.opacity = (1 - -offset / sideNavWidth).toString();
            }
        }
    } else {
        if (sideBarRef?.current)
            sideBarRef.current.menu.style.transitionDuration = sideBarRef.current.backdrop.style.transitionDuration = sideBarRef.current.backdrop.style.opacity = '';
        if (dragging) {
            console.log(lastX - startX > (wasOpen ? -100 : 100));
            setSideBarIsOpen(lastX - startX > (wasOpen ? -100 : 100));
        }
        if (Math.abs(lastX - startX) < 25 && e.target === sideBarRef?.current?.backdrop) {
            setSideBarIsOpen(false);
            e.preventDefault();
        }
        dragging = mouseDown = false;
        firstMove = true;
        if (sideBarRef?.current)
            sideBarRef.current.menu.style.transform = '';
    }
}

const NavBar = () => {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const sideBarRef: SideBarRef = useRef(null);

    useEffect(() => {
        const events = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup'] as const;

        const h = (e: MouseEvent | TouchEvent) => handleEvents(e, sideBarIsOpen, setSideBarIsOpen, sideBarRef);

        events.forEach(event => {
            window.addEventListener(event, h);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, h);
            });
        };
    });

    return (
        <>
            <SideBar setSideBarIsOpen={setSideBarIsOpen} sideBarIsOpen={sideBarIsOpen} ref={sideBarRef} />
            <nav className='fixed w-full shadow-md flex items-center justify-between bg-sky-500'>
                <button onClick={() => setSideBarIsOpen(!sideBarIsOpen)} className='p-4 rounded-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' strokeLinecap='round' className={'w-6 h-6 text-white transition-all duration-300' + (sideBarIsOpen ? ' rotate-180' : '')}>
                        <path d={sideBarIsOpen ? 'M 13.5,19.5 21,12' : 'M 3.75,17.25 20.25,17.25'} className='transition-all duration-300' />
                        <path d='M 3.75,12 h 16.5' />
                        <path d={sideBarIsOpen ? 'M 13.5,4.5 21,12' : 'M 3.75,6.75 20.25,6.75'} className='transition-all duration-300' />
                    </svg>
                </button>

                <button className='p-4 rounded-full'>
                    <HomeIcon className='text-amber-100 ' />
                </button>
            </nav>
        </>
    )
}

export default NavBar;