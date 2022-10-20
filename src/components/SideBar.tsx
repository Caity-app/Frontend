import { SetStateAction, Dispatch, useRef, forwardRef, useImperativeHandle } from 'react';
import SideBarItem from './SideBarItem';
import { CalendarDaysIcon, Cog6ToothIcon, ShoppingBagIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline';

interface SideBarProps {
    setSideBarIsOpen: Dispatch<SetStateAction<boolean>>;
    sideBarIsOpen: boolean;
}

const SideBar = forwardRef(({ setSideBarIsOpen, sideBarIsOpen } : SideBarProps, ref ) => {

    const backdrop = useRef(null);
    const menu = useRef(null);

    useImperativeHandle(ref, () => ({
        get backdrop() {
            return backdrop.current;
        },
        get menu() {
            return menu.current;
        }
    }));

    const menuClick = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        console.log(event.target);
        console.log(event.currentTarget)
        if(event.target !== event.currentTarget)
            setSideBarIsOpen(false);
    }

    return (
        <div className='h-screen fixed transition-transform top-14 left-0 pointer-events-none'>
            <div ref={backdrop} className={'w-screen h-full transition-colors bg-black/20 opacity-0' + (sideBarIsOpen ? ' pointer-events-auto opacity-100': ' pointer-events-none')}></div>
            <div ref={menu} className={'w-56 -top-14 h-full absolute pt-14 bg-zinc-800 shadow-xl transition-transform pointer-events-auto select-none' + (sideBarIsOpen ? '' : ' -translate-x-full')}>
                <ul onClick={(event) => menuClick(event)} className='flex flex-col justify-between h-full pb-4'>
                    <div className='flex flex-col'>
                        <div className='flex items-end p-4 w-full h-36 bg-zinc-900 mb-4'>
                            <div className='flex items-center gap-4'>
                                <img src='images/blondie.jpg' alt='profile pic' className='w-16 aspect-square rounded-full' />
                                <span className='text-white text-xl'>Blondie</span>
                            </div>
                        </div>
                        <SideBarItem Icon={Squares2X2Icon} href='/'>Dashboard</SideBarItem>
                        <SideBarItem Icon={CalendarDaysIcon} href='/calendar'>Calendar</SideBarItem>
                        <SideBarItem Icon={ShoppingBagIcon} href='/grocerylist'>Grocery list</SideBarItem>
                    </div>
                    <SideBarItem Icon={Cog6ToothIcon} href='/settings'>Settings</SideBarItem>
                </ul>
            </div>
        </div>
    )
});

export default SideBar;