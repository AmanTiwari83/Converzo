import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "wouter"
import { BASE_URL } from '../utils/constant'
import swal from 'sweetalert'
import showToast from '../utils/Toast'

const Options = ({ setMessages }) => {
    const [roomId, setroomId] = useState(null)

    useEffect(() => {
        const { sender, receiver } = JSON.parse(localStorage.getItem("roomUser"))
        const room = [sender, receiver].sort().join('_');
        setroomId(room)
    }, [])

    const handleClearChat = async () => {

        await swal({
            title: "Are you sure?",
            text: "Once you clear all chats you will not revert this.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const res =await  axios.delete(`${BASE_URL}/messages/clear`, {
                        data: { roomId } // ✅ pass in request body
                    });
                    console.log(res)
                    if (res.status === 200) {
                        setMessages(null)
                        showToast(res?.data?.message)
                    } else {
                        showToast(res?.data?.message , "error")
                    }
                } catch (err) {
                    showToast(err?.response?.data?.message || "Something went wrong", "error");
                }
            } else {
                showToast("Messages are not Removed.", "info");
            }
        });



    };

    return (
        <div className='fixed top-18 right-0 max-w-[70%] min-w-[50%]  min p-5 bg-gray-100 rounded z-50 flex flex-col items-center justify-start'>
            <Link to="/user/viewprofile" className='w-full'>
                <div className=' w-full py-2 font-semibold'>
                    Profile
                </div>
            </Link>
            <div className='w-full' onClick={() => handleClearChat()}>
                <div className=' w-full py-2 font-semibold'>
                    Clear All Chats
                </div>
            </div>
            <Link to="/" className='w-full'>
                <div className=' w-full py-2 font-semibold'>
                    Go Back
                </div>
            </Link>

        </div>
    )
}

export default Options