import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FormEvent } from "react";

function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const [username, password] = formData.values();
}

const Login = () => {
    return (<div className='flex flex-col h-full'>
        <div className='flex gap-8 m-8 mt-24 mb-8 whitespace-nowrap'>
            <h1 className='text-6xl font-bold text-white'>Sign In</h1>
            <h1 className='text-6xl font-bold text-white/30'>Register</h1>
        </div>

        <form className='flex flex-col m-8 mb-0 gap-8' onSubmit={handleLogin}>
            <label className='flex pl-6 gap-2 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600'>
                <UserIcon className='text-zinc-300 !w-8' />

                <input type='text' placeholder='Username' name='username' className='bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none' />
            </label>

            <label className='flex pl-6 gap-2 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600'>
                <LockClosedIcon className='text-zinc-300 !w-8' />

                <input type='password' placeholder='Password' name='password' className='bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none' />
            </label>

            <button className='p-4 rounded-full bg-sky-500 text-white text-xl w-56 mt-6 max-w-full mx-auto shadow-lg shadow-sky-500/40'>Login</button>
        </form>

        <div className='flex flex-grow-[1] justify-around items-center mx-auto max-w-sm gap-4'>
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