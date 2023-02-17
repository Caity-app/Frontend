import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const [username, password] = formData.values();
}

const Login = () => {
    const [state, setState] = useState<'signin' | 'register'>('signin');

    return (<div className='flex flex-col h-full'>
        <motion.div
            animate={{ x: state === 'signin' ? 0 : '-1rem' }}
            className='flex gap-8 m-8 mt-24 mb-8 whitespace-nowrap'
        >
            <motion.h1
                onClick={(e) => setState('signin')}
                animate={{
                    width: state === 'signin' ? 'initial' : 0,
                    opacity: state === 'signin' ? 1.0 : 0.3
                }}
                transition={{ type: 'tween' }}
                className='text-6xl font-bold text-white cursor-pointer select-none'
                style={{ direction: 'rtl' }}
            >
                Sign In
            </motion.h1>
            <motion.h1
                onClick={(e) => setState('register')}
                animate={{ opacity: state === 'signin' ? 0.3 : 1.0 }}
                transition={{ type: 'tween' }}
                className='text-6xl font-bold text-white cursor-pointer select-none'
            >
                Register
            </motion.h1>
        </motion.div>

        <form className='flex flex-col m-8 mb-0 gap-8' onSubmit={handleLogin}>
            <label className='flex pl-6 gap-2 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600'>
                <UserIcon className='text-zinc-300 !w-8' />

                <input type='text' placeholder='Username' name='username' className='bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none' />
            </label>

            <label className='flex pl-6 gap-2 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600'>
                <LockClosedIcon className='text-zinc-300 !w-8' />

                <input type='password' placeholder='Password' name='password' className='bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none' />
            </label>

            <button className='p-4 rounded-full bg-sky-500 text-white text-xl w-56 mt-6 max-w-full mx-auto shadow-lg shadow-sky-500/40'>
                {state === 'signin' ? 'Sign In' : 'Register'}
            </button>
        </form>

        <div className='flex flex-grow-[1] justify-around items-center mx-auto my-8 max-w-sm gap-4'>
            <button className='w-16 aspect-square p-4 rounded-full bg-zinc-700 text-4xl flex items-center justify-center'>
                <img src='images/Google.svg' alt='Google' />
            </button>
            <button className='w-16 aspect-square p-4 rounded-full bg-zinc-700 text-4xl flex items-center justify-center'>
                <img src='images/Facebook.svg' alt='Google' />
            </button>
            <button className='w-16 aspect-square p-4 rounded-full bg-zinc-700 text-4xl flex items-center justify-center'>
                <img src='images/Apple.svg' alt='Google' />
            </button>
        </div>
    </div>)
}

export default Login;