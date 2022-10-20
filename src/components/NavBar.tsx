import { HomeIcon } from '@heroicons/react/24/outline';
import { CSSProperties, Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';

let startX: number;
let lastX: number;
let wasOpen = false;
let dragging = false;
let mouseDown = false;

type SideBarRef = MutableRefObject<{ backdrop: HTMLElement, menu: HTMLElement } | null>;

const handleEvents = (e: MouseEvent | TouchEvent, sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, sideBarRef: SideBarRef, setLineStyle: Dispatch<SetStateAction<CSSProperties>>, setMenuButtonRotation: Dispatch<SetStateAction<number>>, setKey: Dispatch<SetStateAction<number>>) => {
    if (e.type === 'touchstart' || e.type === 'mousedown') {
        startX = lastX = (e instanceof MouseEvent) ? e.clientX : e.touches[0].clientX;

        wasOpen = sideBarIsOpen;

        if (!(e.target as HTMLElement).closest('nav')) {
            mouseDown = true;
        }
    } else if (e.type === 'touchmove' || e.type === 'mousemove') {
        if (mouseDown) {
            if (e instanceof MouseEvent) {
                lastX = e.clientX;
            } else if (e instanceof TouchEvent) {
                lastX = e.touches[0].clientX;
            }

            if (!dragging && Math.abs(lastX - startX) > 25 && (e.type === 'touchmove' || startX < 24 || wasOpen) && (e.type === 'mousemove' || startX > 24)) {
                dragging = true;
                startX = lastX;

                setSideBarIsOpen(false);
                setKey(Math.random());
                if (sideBarRef?.current) {
                    sideBarRef.current.backdrop.style.opacity = '0';
                    sideBarRef.current.menu.style.transitionDuration = sideBarRef.current.backdrop.style.transitionDuration = '0s';
                }
            }

            if (dragging && sideBarRef?.current) {
                const sideNavWidth = sideBarRef.current.menu.clientWidth;
                let offset = Math.min(wasOpen ? Math.min(lastX - startX, 0) : -sideNavWidth + lastX - startX, 0);
                sideBarRef.current.menu.style.transform = `translateX(${offset}px)`;
                const factor = 1 - -offset / sideNavWidth;
                sideBarRef.current.backdrop.style.opacity = factor.toString();
                setMenuButtonRotation(Math.max(Math.min(factor * 180, 180), 0));
                setLineStyle({
                    animationDelay: Math.max(Math.min(factor * -300, 0), -300) + 'ms'
                });
            }
        }
    } else {
        if (sideBarRef?.current)
            sideBarRef.current.menu.style.transitionDuration = sideBarRef.current.backdrop.style.transitionDuration = sideBarRef.current.backdrop.style.opacity = '';
        const open = lastX - startX > (wasOpen ? -100 : 100);
        if (dragging) {
            setSideBarIsOpen(open);
            setMenuButtonRotation(open ? 180 : 0);
        }
        let animationDirection = 'normal';
        if (Math.abs(lastX - startX) < 25 && e.target === sideBarRef?.current?.backdrop) {
            menuButtonClick(sideBarIsOpen, setSideBarIsOpen, setMenuButtonRotation, setLineStyle);
            e.preventDefault();
            animationDirection = 'reverse';
        }

        if (dragging)
            setLineStyle({
                animationDirection,
                animationDelay: open ? '-300ms' : '0ms'
            });

        dragging = mouseDown = false;
        if (sideBarRef?.current)
            sideBarRef.current.menu.style.transform = '';
    }
}

function menuButtonClick(sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, setMenuButtonRotation: Dispatch<SetStateAction<number>>, setLineStyle: Dispatch<SetStateAction<CSSProperties>>) {
    if (sideBarIsOpen) {
        setMenuButtonRotation(0);
        setLineStyle({
            animationDirection: 'reverse',
            animationPlayState: 'running'
        });
    } else {
        setMenuButtonRotation(180);
        setLineStyle({
            animationDirection: 'normal',
            animationPlayState: 'running'
        });
    }
    setSideBarIsOpen(!sideBarIsOpen);
}

const NavBar = () => {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    const [menuButtonRotation, setMenuButtonRotation] = useState(0);
    const [lineStyle, setLineStyle] = useState({});
    const [key, setKey] = useState(0);

    const sideBarRef: SideBarRef = useRef(null);

    useEffect(() => {
        const events = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup'] as const;

        const h = (e: MouseEvent | TouchEvent) => handleEvents(e, sideBarIsOpen, setSideBarIsOpen, sideBarRef, setLineStyle, setMenuButtonRotation, setKey);

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
            <SideBar sideBarIsOpen={sideBarIsOpen} ref={sideBarRef} />
            <nav className='fixed w-full shadow-md flex items-center justify-between bg-sky-500'>
                <button onClick={() => menuButtonClick(sideBarIsOpen, setSideBarIsOpen, setMenuButtonRotation, setLineStyle)} className='p-4 rounded-full'>
                    <svg key={key} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' strokeLinecap='round' className='w-6 h-6 text-white transition-all duration-300' style={{ transform: `rotate(${menuButtonRotation}deg)`, transitionDuration: menuButtonRotation === 0 || menuButtonRotation === 180 ? '300ms' : '0ms' }}>
                        <path d={sideBarIsOpen ? 'M 13.5,19.5 21,12' : 'M 3.75,17.25 20.25,17.25'} style={lineStyle} className='transition-all duration-300 line-top' />
                        <path d='M 3.75,12 h 16.5' />
                        <path d={sideBarIsOpen ? 'M 13.5,4.5 21,12' : 'M 3.75,6.75 20.25,6.75'} style={lineStyle} className='transition-all duration-300 line-bottom' />
                    </svg>
                </button>

                <button className='p-4 rounded-full'>
                    <Link to='/'>
                        <HomeIcon className='text-amber-100 ' />
                    </Link>
                </button>
            </nav>
        </>
    )
}

export default NavBar;