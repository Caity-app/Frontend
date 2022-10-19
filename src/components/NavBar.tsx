import { Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';
import { SetStateAction, useState } from 'react';
import SideBar from './SideBar';

const NavBar = () => {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
    return (
        <>
            <SideBar setSideBarIsOpen={setSideBarIsOpen} sideBarIsOpen={sideBarIsOpen}/>
            <div className='w-full h-14 shadow-md flex items-center justify-between px-4'>
                <button onClick={() => setSideBarIsOpen(true)}>
                    <Bars3Icon className={'transition-transform' + (sideBarIsOpen ? ' rotate-90' : '')}/>
                </button>
                <button>
                    <HomeIcon />
                </button>
            </div>
        </>
    )
}

export default NavBar;