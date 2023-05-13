import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { BackdropContext } from "../index";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const ManualGroceryItem = () => {
    const { backdrop, setBackdrop } = useContext(BackdropContext) as { backdrop: boolean; setBackdrop: React.Dispatch<React.SetStateAction<boolean>>; }
    useEffect(() => {
        setBackdrop(true);    
    }, []);

    return (
        createPortal(
            <AnimatePresence>
                {backdrop && <motion.div 
                    initial={{ opacity: 0, scale: 0.5, translateX: '-50%', translateY: '-50%' }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col bg-zinc-800 px-6 p-6 shadow-md rounded-xl z-50 top-1/2 left-1/2 fixed m-auto">
                    <button onClick={() => setBackdrop(false)} className='self-end max-w-full absolute right-2 top-2'>
                        <XMarkIcon className='text-zinc-300 !w-5' />
                    </button>
                    <label className='flex pl-6 w-64 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600'>
                        <TagIcon className='text-zinc-300 !w-8' />

                        <input type='text' placeholder='Product name' name='productName' className='bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none' />
                    </label>
                    <button className='rounded-full bg-sky-500 text-white text-xl px-4 max-w-full shadow-md'>
                        Add
                    </button>                      
                </motion.div>}
            </AnimatePresence>
            ,
            document.getElementById('root') as HTMLElement
        )
    );
}

export default ManualGroceryItem;