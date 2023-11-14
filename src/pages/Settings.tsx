import { AuthContext } from "../contexts/AuthContext";
import { AuthContextType } from "../@types/auth";
import { useContext } from "react";

const Settings = () => {

    const { handleLogout: onLogout } = useContext(AuthContext) as AuthContextType;

    return (
        <div className='mx-auto w-full text-center'>
            <button
                onClick={() => {onLogout()}}
             className="">
                Logout
            </button>
        </div>
    )
}

export default Settings;
