import React from 'react'
import { useLocation } from 'wouter';
import { BASE_URL } from '../utils/constant';

const Usertab = ({ user }) => {
    const [ , navigate] = useLocation();
    const handleClick = (user) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        // Here you can add logic to handle the click, like navigating to a chat page
        localStorage.setItem('roomUser', JSON.stringify({ receiver : user.name , sender : currentUser.name , receiverId : user._id , profilePicture: user.profilePicture }));
        navigate('/chat');
    }
    return (
        <div onClick={()=>handleClick(user)} className='flex items-center gap-8 bg-white shadow-md border-b-1 border-black-100 p-3'>
            <img className='h-15 w-15 rounded-full' 
            src={ `${BASE_URL}/uploads/${user?.profilePicture}`} // Fallback image
            alt=""  />
            <h4 className='font-semibold text-xl'>{user.name}</h4>
        </div>
    )
}

export default Usertab