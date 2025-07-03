import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import Usertab from './Usertab';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users`);
        const allUsers = response.data;

        const currentUser = JSON.parse(localStorage.getItem('user'));
        // Get current user from localStorage
        const currentUserId = currentUser?.id;
        const filteredUsers = allUsers.filter(
          user => user._id !== currentUserId
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  if (!users || users.length === 0) {
    return <div className="text-center text-gray-500">No other users found</div>;
  }

  return (
    <div>
      {users.map(user => (
        <Usertab key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
