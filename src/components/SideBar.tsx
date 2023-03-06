import { useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import SideBarItem from './SideBarItem';
import { CalendarDaysIcon, Cog6ToothIcon, ShoppingBagIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

interface SideBarProps {
    sideBarIsOpen: boolean;
    closeMenu: () => void;
}

const SideBar = forwardRef(({ sideBarIsOpen, closeMenu }: SideBarProps, ref) => {

    const backdrop = useRef(null);
    const menu = useRef(null);

    const { pathname } = useLocation();

    useImperativeHandle(ref, () => ({
        get backdrop() {
            return backdrop.current;
        },
        get menu() {
            return menu.current;
        }
    }));

    const menuClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((event.target as HTMLElement).closest('a'))
            closeMenu();
    }, [closeMenu]);

    return (
        <>
            <div ref={backdrop} className={'backdrop' + (sideBarIsOpen ? ' pointer-events-auto opacity-100' : ' pointer-events-none')} onDragStart={e => e.preventDefault()}></div>
            <div ref={menu} className={'w-[min(18rem,75%)] top-0 h-full fixed z-10 bg-zinc-800 transition-transform select-none rounded-r-[1.75rem] overflow-x-hidden' + (sideBarIsOpen ? ' shadow-2xl' : ' -translate-x-full')} onDragStart={e => e.preventDefault()}>
                <div className='flex flex-col h-full' onClick={(event) => menuClick(event)}>
                    <div className='flex items-end p-6 w-full h-44 bg-zinc-900'>
                        <Link to='/profile' className='group flex items-center gap-4 w-full'>
                            <img src='images/blondie.jpg' alt='profile pic' className={'w-16 aspect-square rounded-full outline outline-8 outline-transparent group-hover:outline-zinc-700 transition-[outline]' + (pathname === '/profile' ? ' !outline-sky-500' : '')} />
                            <span className={'flex-1 text-white text-xl p-2 pl-4 -ml-4 mr-2 group-hover:mr-0 rounded-r-full group-hover:bg-zinc-700 whitespace-nowrap overflow-hidden overflow-ellipsis transition-[margin,background] !duration-150' + (pathname === '/profile' ? ' bg-sky-500 group-hover:bg-sky-500 mr-0' : '')}>
                                Blondie
                            </span>
                        </Link>
                    </div>
                    <SideBarItem Icon={Squares2X2Icon} href='/'>Dashboard</SideBarItem>
                    <SideBarItem Icon={CalendarDaysIcon} href='/calendar'>Calendar</SideBarItem>
                    <SideBarItem Icon={ShoppingBagIcon} href='/grocerylist'>Grocery list</SideBarItem>
                    <SideBarItem Icon={Cog6ToothIcon} href='/settings' className='mt-auto'>Settings</SideBarItem>
                </div>
            </div>
        </>
    )
});

export default SideBar;