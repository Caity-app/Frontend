import { SetStateAction, Dispatch } from 'react';
import SideBarItem from './SideBarItem';
import { CalendarDaysIcon, Cog6ToothIcon, ShoppingBagIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline';

interface SideBarProps {
    setSideBarIsOpen: Dispatch<SetStateAction<boolean>>;
    sideBarIsOpen: boolean;
}
const SideBar = ({ setSideBarIsOpen, sideBarIsOpen } : SideBarProps ) => {
    return (
        <div className='h-screen fixed transition-transform pointer-events-none z-10'>
            <div className={'w-screen h-full transition-all' + (sideBarIsOpen ? ' bg-black/50 pointer-events-auto': ' pointer-events-none')} onClick={() => setSideBarIsOpen(false)}></div>
            <div className={'w-fit h-full absolute left-0 top-0 bg-zinc-800 transition-transform pointer-events-auto' + (sideBarIsOpen ? '' : ' -translate-x-full')}>
                <ul className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col'>
                        <SideBarItem Icon={UserCircleIcon} className='mb-8'>Profile</SideBarItem>
                        <SideBarItem Icon={Squares2X2Icon}>Dashboard</SideBarItem>
                        <SideBarItem Icon={CalendarDaysIcon}>Calendar</SideBarItem>
                        <SideBarItem Icon={ShoppingBagIcon}>Shopping</SideBarItem>
                    </div>
                    <SideBarItem Icon={Cog6ToothIcon}>Settings</SideBarItem>
                </ul>

            </div>
        </div>
        
    )
}

export default SideBar;