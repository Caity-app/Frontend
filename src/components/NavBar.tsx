import { CSSProperties, Dispatch, MutableRefObject, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackdropContext } from '..';
import SideBar from './SideBar';

let startX: number;
let lastX: number;
let dir: -1 | 1 = -1;

let wasOpen = false;
let dragging = false;
let mouseDown = false;

const fingerSize = 24;

type SideBarRef = MutableRefObject<{ menu: HTMLElement } | null>;

const handleEvents = (e: MouseEvent | TouchEvent, sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, backdrop: boolean, setBackdrop: Dispatch<SetStateAction<boolean>>, sideBarRef: SideBarRef, setLineStyle: Dispatch<SetStateAction<CSSProperties>>, setMenuButtonRotation: Dispatch<SetStateAction<number>>, setKey: Dispatch<SetStateAction<number>>) => {
    if (e.type === 'touchstart' || e.type === 'mousedown') {
        startX = lastX = (e instanceof MouseEvent) ? e.clientX : e.touches[0].clientX;
        wasOpen = sideBarIsOpen;
        mouseDown = true;
    } else if ((e.type === 'touchmove' || e.type === 'mousemove') && mouseDown) {
        const previousX = lastX;
        if (e instanceof MouseEvent) {
            lastX = e.clientX;
        } else if (e instanceof TouchEvent) {
            lastX = e.touches[0].clientX;
        }

        const previousDir = dir;
        dir = lastX > previousX ? 1 : -1;

        if (previousDir === 1 && dir === -1 && wasOpen)
            startX = lastX;

        if (!dragging && Math.abs(lastX - startX) > fingerSize && (e.type === 'touchmove' || startX < fingerSize || wasOpen) && (e.type === 'mousemove' || (startX > fingerSize && startX < window.innerWidth - fingerSize))) {
            dragging = true;
            startX = lastX;

            window.getSelection()?.empty();

            setSideBarIsOpen(true);
            setBackdrop(true);
            setKey(Math.random());
            if (sideBarRef?.current) {
                setBackdrop(false);
                sideBarRef.current.menu.style.transitionDuration = '0s';
            }
        }

        if (dragging && sideBarRef?.current) {
            const sideNavWidth = sideBarRef.current.menu.clientWidth;
            let offset = Math.min(wasOpen ? Math.min(lastX - startX, 0) : -sideNavWidth + lastX - startX, 0);
            sideBarRef.current.menu.style.transform = `translateX(${offset}px)`;
            const factor = 1 - -offset / sideNavWidth;
            setMenuButtonRotation(Math.max(Math.min(factor * 180, 180), 0));
            setLineStyle({
                animationDelay: Math.max(Math.min(factor * -300, 0), -300) + 'ms'
            });
        }
    } else if (e.type === 'touchend' || e.type === 'mouseup') {
        if (sideBarRef?.current) {
            sideBarRef.current.menu.style.transitionDuration = '';
            setBackdrop(false);
        }
        let open = lastX - startX > (wasOpen ? -100 : 100);
        let animationDirection = 'normal';
        if (dragging) {
            if (open && dir === -1)
                open = false;
            else if (!open && dir === 1)
                open = true;
            setSideBarIsOpen(open);
            setBackdrop(open);
            setMenuButtonRotation(open ? 180 : 0);
        } else if ((e.target as HTMLElement).matches('.backdrop')) {
            menuButtonClick(sideBarIsOpen, setSideBarIsOpen, backdrop, setBackdrop, setMenuButtonRotation, setLineStyle);
            e.preventDefault();
            // animationDirection = 'reverse';
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

function menuButtonClick(sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, backdrop: boolean, setBackdrop: Dispatch<SetStateAction<boolean>>, setMenuButtonRotation: Dispatch<SetStateAction<number>>, setLineStyle: Dispatch<SetStateAction<CSSProperties>>) {
    setMenuButtonRotation(sideBarIsOpen ? 0 : 180);
    setLineStyle({
        animationDirection: sideBarIsOpen ? 'reverse' : 'normal',
        animationPlayState: 'running',
        animationName: 'none'
    });
    setSideBarIsOpen(!sideBarIsOpen);
    setBackdrop(!sideBarIsOpen);
}

const NavBar = () => {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    const { backdrop, setBackdrop } = useContext(BackdropContext) as { backdrop: boolean; setBackdrop: React.Dispatch<React.SetStateAction<boolean>>; }
    const [menuButtonRotation, setMenuButtonRotation] = useState(0);
    const [lineStyle, setLineStyle] = useState({});
    const [key, setKey] = useState(0);

    const sideBarRef: SideBarRef = useRef(null);

    useEffect(() => {
        const events = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup'] as const;

        const h = (e: MouseEvent | TouchEvent) => handleEvents(e, sideBarIsOpen, setSideBarIsOpen, backdrop, setBackdrop, sideBarRef, setLineStyle, setMenuButtonRotation, setKey);

        events.forEach(event => {
            window.addEventListener(event, h);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, h);
            });
        };
    }, [sideBarIsOpen, backdrop, setBackdrop]);

    const closeMenu = useCallback(() => menuButtonClick(true, setSideBarIsOpen, true, setBackdrop, setMenuButtonRotation, setLineStyle), [setBackdrop]);

    return (
        <>
            <SideBar sideBarIsOpen={sideBarIsOpen} ref={sideBarRef} closeMenu={closeMenu} />
            <button onClick={() => menuButtonClick(sideBarIsOpen, setSideBarIsOpen, backdrop, setBackdrop, setMenuButtonRotation, setLineStyle)} className='navButton p-4 rounded-full !fixed top-0 z-30'>
                    <svg key={key} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' strokeLinecap='round' className='w-6 h-6 text-white transition-[transform,d] duration-300' style={{ transform: `rotate(${menuButtonRotation}deg)`, transitionDuration: menuButtonRotation === 0 || menuButtonRotation === 180 ? '300ms' : '0ms' }}>
                        <path d={sideBarIsOpen ? 'M 13.5,19.5 21,12' : 'M 3.75,17.25 20.25,17.25'} style={{...lineStyle, animationName: dragging ? 'line-top' : 'none' }} className='transition-[transform,d] duration-300 line-top' />
                        <path d='M 3.75,12 h 16.5' />
                        <path d={sideBarIsOpen ? 'M 13.5,4.5 21,12' : 'M 3.75,6.75 20.25,6.75'} style={{...lineStyle, animationName: dragging ? 'line-bottom' : 'none' }} className='transition-[transform,d] duration-300 line-bottom' />
                    </svg>
                </button>
            <nav className='fixed h-14 w-full top-0 shadow-md flex items-center justify-center bg-sky-500 z-20' onClick={closeMenu}>
                <Link to='/'>
                    <img className='p-2 h-14' src='/images/logo.svg' alt='logo'/>
                </Link>
            </nav>
        </>
    )
}

export default NavBar;