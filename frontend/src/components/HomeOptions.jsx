import React from 'react'
import { Link } from "wouter"
import useLogoutAlert from '../utils/LogoutAlert'

const HomeOptions = () => {
        const logoutAlert = useLogoutAlert()

        const handleLogout = () => {
            logoutAlert()
        }
    return (
        <div className='fixed top-14 right-0 max-w-[70%] min-w-[50%]  min p-5 bg-gray-100 rounded z-50 flex flex-col items-center justify-start'>
            <Link to="/myprofile" className='w-full'>
                <div className=' w-full py-2 font-semibold'>
                    My Profile
                </div>
            </Link>
            <div onClick={handleLogout} className='w-full'>
                <div className=' w-full py-2 font-semibold'>
                    Logout
                </div>
            </div>

        </div>
    )
}

export default HomeOptions