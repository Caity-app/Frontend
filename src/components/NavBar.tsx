import { CSSProperties, Dispatch, MutableRefObject, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackdropContext } from '../contexts/BackdropContext';
import SideBar from './SideBar';
import { BackdropContextType } from '../@types/backdrop';

let startX: number;
let lastX: number;
let dir: -1 | 1 = -1;

let wasOpen = false;
let dragging = false;
let mouseDown = false;

const fingerSize = 24;

type SideBarRef = MutableRefObject<{ menu: HTMLElement } | null>;

function handleSidebarMouseDown(e: MouseEvent | TouchEvent, sideBarIsOpen: boolean) {
  startX = (e instanceof MouseEvent) ? e.clientX : e.touches[0].clientX;
  lastX = startX;

  wasOpen = sideBarIsOpen;
  mouseDown = true;
}

function handleSidebarMouseMove(e: MouseEvent | TouchEvent, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, setBackdrop: BackdropContextType['setBackdrop'], sideBarRef: SideBarRef, setLineStyle: Dispatch<SetStateAction<CSSProperties>>, setMenuButtonRotation: Dispatch<SetStateAction<number>>, setKey: Dispatch<SetStateAction<number>>) {
  const previousX = lastX;

  if (e instanceof MouseEvent) {
    lastX = e.clientX;
  } else if (e instanceof TouchEvent) {
    lastX = e.touches[0].clientX;
  }

  dir = lastX > previousX ? 1 : -1;

  if (!dragging && Math.abs(lastX - startX) > fingerSize && (e.type === 'touchmove' || startX < fingerSize || wasOpen) && (e.type === 'mousemove' || (startX > fingerSize && startX < window.innerWidth - fingerSize))) {
    dragging = true;
    startX = lastX;

    window.getSelection()?.empty();

    setSideBarIsOpen(true);
    setBackdrop(1);
    setKey(Math.random());

    if (sideBarRef?.current) {
      setBackdrop(0);
      sideBarRef.current.menu.style.transitionDuration = '0s';
    }
  }

  if (dragging && sideBarRef?.current) {
    const sideNavWidth = sideBarRef.current.menu.clientWidth;
    let offset = Math.min(wasOpen ? Math.min(lastX - startX, 0) : -sideNavWidth + lastX - startX, 0);

    sideBarRef.current.menu.style.transform = `translateX(${offset}px)`;
    setBackdrop(Math.max(sideNavWidth + offset, 0) / sideNavWidth);

    const factor = 1 - -offset / sideNavWidth;
    setMenuButtonRotation(Math.max(Math.min(factor * 180, 180), 0));
    setLineStyle({
      animationDelay: Math.max(Math.min(factor * -300, 0), -300) + 'ms'
    });
  }
}

function handleSidenavMouseUp(e: MouseEvent | TouchEvent, sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, setBackdrop: BackdropContextType['setBackdrop'], sideBarRef: SideBarRef, setLineStyle: Dispatch<SetStateAction<CSSProperties>>, setMenuButtonRotation: Dispatch<SetStateAction<number>>) {
  if (sideBarRef?.current) {
    sideBarRef.current.menu.style.transitionDuration = '';
  }

  let open = lastX - startX > (wasOpen ? -100 : 100);

  if (dragging) {
    if (open && dir === -1) {
      open = false;
    } else if (!open && dir === 1) {
      open = true;
    }

    setSideBarIsOpen(open);
    setBackdrop(open ? 1 : 0);
    setMenuButtonRotation(open ? 180 : 0);

    setLineStyle({
      animationDirection: 'normal',
      animationDelay: open ? '-300ms' : '0ms'
    });
  } else if ((e.target as HTMLElement).matches('.backdrop')) {
    menuButtonClick(true, setSideBarIsOpen, setBackdrop, setMenuButtonRotation, setLineStyle);
    e.preventDefault();
  }

  dragging = false;
  mouseDown = false;

  if (sideBarRef?.current) {
    sideBarRef.current.menu.style.transform = '';
  }
}

function menuButtonClick(sideBarIsOpen: boolean, setSideBarIsOpen: Dispatch<SetStateAction<boolean>>, setBackdrop: BackdropContextType['setBackdrop'] , setMenuButtonRotation: Dispatch<SetStateAction<number>>, setLineStyle: Dispatch<SetStateAction<CSSProperties>>) {
    setMenuButtonRotation(sideBarIsOpen ? 0 : 180);
    setLineStyle({
        animationDirection: sideBarIsOpen ? 'reverse' : 'normal',
        animationPlayState: 'running',
        animationName: 'none'
    });
    setSideBarIsOpen(!sideBarIsOpen);
    setBackdrop(sideBarIsOpen ? 0 : 1);
}

const NavBar = () => {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    const { backdrop, setBackdrop } = useContext(BackdropContext) as BackdropContextType;
    const [menuButtonRotation, setMenuButtonRotation] = useState(0);
    const [lineStyle, setLineStyle] = useState({});
    const [key, setKey] = useState(0);

    const sideBarRef: SideBarRef = useRef(null);

    useEffect(() => {
        const events = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup'] as const;

        const h = (e: MouseEvent | TouchEvent) => {
          if (e.type === 'touchstart' || e.type === 'mousedown') {
            handleSidebarMouseDown(e, sideBarIsOpen);
          } else if ((e.type === 'touchmove' || e.type === 'mousemove') && mouseDown) {
            handleSidebarMouseMove(e, setSideBarIsOpen, setBackdrop, sideBarRef, setLineStyle, setMenuButtonRotation, setKey);
          } else if (e.type === 'touchend' || e.type === 'mouseup') {
            handleSidenavMouseUp(e, sideBarIsOpen, setSideBarIsOpen, setBackdrop, sideBarRef, setLineStyle, setMenuButtonRotation);
          }
        };

        events.forEach(event => {
            window.addEventListener(event, h);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, h);
            });
        };
    }, [sideBarIsOpen, backdrop, setBackdrop]);

    const closeMenu = useCallback(() => menuButtonClick(true, setSideBarIsOpen, setBackdrop, setMenuButtonRotation, setLineStyle), [setBackdrop]);

    return (
        <>
            <SideBar sideBarIsOpen={sideBarIsOpen} ref={sideBarRef} closeMenu={closeMenu} />
            <button onClick={() => menuButtonClick(sideBarIsOpen, setSideBarIsOpen, setBackdrop, setMenuButtonRotation, setLineStyle)} className='navButton p-4 rounded-full !fixed top-0 z-30'>
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
