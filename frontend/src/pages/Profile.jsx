import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter'; // Uncomment if you need to use location
import { BASE_URL } from '../utils/constant';
import axios from 'axios';

const Profile = () => {
    //   const navigate = useNavigate();
    const [, navigate] = useLocation(); // Using wouter for navigation
    const { receiverId } = JSON.parse(localStorage.getItem('roomUser')) || {};
    const [user, setUser] = useState()

    // Fetch profile data based on receiverI
    const getProfile = async () => {
        try {
            const response = await axios(`${BASE_URL}/users/profile/${receiverId}`);
            const data = await response.data;
            if (!data.user) {
                throw new Error('User not found');
            }
            setUser(data.user);
            return data;
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    useEffect(() => {
        if (receiverId) {
            getProfile();
        } else {
            console.error('No receiverId found in localStorage');
        }
    }, [receiverId]);


    // Dummy user data (replace with real data or props/context)
    //   const user = {
    //     name: 'Aman Tiwari',
    //     email: 'aman@example.com',
    //     phone: '+91 9876543210',
    //     dob: '1999-08-15',
    //     profilePic: 'https://i.pravatar.cc/150?img=3',
    //   };

    return (
        <div className="flex flex-col bg-gray-100">
            {/* Header */}
            <header className="  p-4 text-center text-xl font-semibold">
                {user?.name.split(" ")[0]}'s Profile
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start px-4 ">
                <img
                    src={ `${BASE_URL}/uploads/${user?.profilePicture}`} // Fallback image
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="mt-4 w-full max-w-md bg-white rounded-lg shadow-md p-4 space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm">Full Name</label>
                        <p className="font-medium text-lg">{user?.name}</p>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Mobile Number</label>
                        <p className="font-medium text-lg">
                            {user?.mobile ? user.mobile : 'Not provided'}
                        </p>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Date of Birth</label>
                        <p className="font-medium text-lg">{user?.dob}</p>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Email Address</label>
                        <p className="font-medium text-lg">{user?.email}</p>
                    </div>
                </div>

                <div className='mt-4 mb-3 flex justify-beetween items-center gap-4'>
                    <button
                        onClick={() => navigate("/chat")}
                        className=" px-6 py-2 bg-green-700 text-white rounded"
                    >
                        <Link to='/chat'>Back</Link>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Profile;
