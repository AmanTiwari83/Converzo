import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import useLogoutAlert from '../utils/LogoutAlert';
import { BASE_URL } from '../utils/constant';

const MyProfile = () => {
    const [, navigate] = useLocation();

        const user = JSON.parse(localStorage.getItem('user'));
    // useEffect(() => {
    //     if (currentUser) {
    //         localStorage.setItem("")
    //         setUser(currentUser);
    //     }
    // }, []);

    const logoutAlert = useLogoutAlert();

    const handleLogout = () => {
        logoutAlert()
    }

    // if (!user) {
    //     return <div className="text-center text-gray-500 mt-10">No user data found</div>;
    // }

    return (
          <div className="flex flex-col bg-gray-100">
                    {/* Header */}
                    <header className="  p-4 text-center text-xl font-semibold">
                        My Profile
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
                                onClick={() => navigate("/")}
                                className=" px-6 py-2 bg-green-700 text-white rounded"
                            >
                                <Link to='/chat'>Back</Link>
                            </button>
                            <button
                                onClick={() => handleLogout()}
                                className=" px-6 py-2 bg-red-700 text-white rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </main>
                </div>
    );
};

export default MyProfile;
