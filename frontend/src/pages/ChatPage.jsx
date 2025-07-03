import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import socket from '../sockets/socket';
import { BASE_URL } from '../utils/constant';
import Options from '../components/Options';
import getCurrentDateAndTime from '../utils/dateandtime';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState('');
    const [typingUser, setTypingUser] = useState(null);
    const messagesEndRef = useRef(null);
    const [openOptions, setOpenOptions] = useState(false)
    const { sender, receiver, profilePicture } = JSON.parse(localStorage.getItem('roomUser')) || {};
    const roomId = [sender, receiver].sort().join('_');

    useEffect(() => {
        if (sender && receiver) {
            socket.emit('joinRoom', { sender, receiver });

            axios.get(`${BASE_URL}/messages/${roomId}`).then((res) => {
                setMessages(res.data);
            });

            socket.on('newPrivateMessage', (msg) => {
                setMessages((prev) => [...prev, msg]);
            });

            socket.on('userTyping', (typingUser) => {
                if (typingUser !== sender) {
                    setTypingUser(typingUser);
                    setTimeout(() => setTypingUser(null), 2000);
                }
            });

            return () => {
                socket.off('newPrivateMessage');
                socket.off('userTyping');
            };
        }
    }, [sender, receiver]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        // if (newMsg.trim()) {
        //     socket.emit('privateMessage', { sender, receiver, message: newMsg });
        //     setNewMsg('');
        // }

        if (newMsg.trim()) {
            const { time, date } = getCurrentDateAndTime(); // <-- Add this line

            const messageObj = {
                sender,
                receiver,
                message: newMsg,
                time ,
                date
            };

            socket.emit('privateMessage', messageObj);
            setNewMsg('');
        }

    };

    const handleTyping = (e) => {
        setNewMsg(e.target.value);
        socket.emit('typing', { sender, receiver });
    };

    const handleOptions = () => {
        if (openOptions) {
            setOpenOptions(false);
        } else {
            setOpenOptions(true);
        }
    }

    const closeOptions = () => {
        if (openOptions) {
            setOpenOptions(false);
        }
    }
    return (
        <div onClick={closeOptions} className="flex flex-col h-screen absolute z-10 top-0 left-0 w-full bg-white">
            {/* Header */}
            <div className="px-4 py-2 flex justify-between items-center bg-green-700 text-white text-xl font-semibold shadow-md sticky top-0 z-10">
                <div className='flex items-center gap-3'>
                    <img
                        src={`${BASE_URL}/uploads/${profilePicture}`} // Fallback image
                        className='h-14 w-14 rounded-full inline-block mr-2'
                        alt="" />
                    {receiver}
                </div>
                <h3>
                    <i onClick={handleOptions} className="ri-more-2-fill"></i>
                </h3>
            </div>

            {openOptions && <Options setMessages={setMessages} />}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages?.map((msg, index) => {
                    const isMe = msg.sender === sender;
                    return (
                        <div
                            key={index}
                            className={`max-w-[70%] px-3 py-2 overflow-y-auto overflow-x-hidden rounded-lg ${isMe ? 'bg-green-200 ml-auto' : 'bg-gray-200 mr-auto'
                                }`}
                        >
                            {!isMe ? <div className="text-xs font-semibold">{msg.sender}</div> : <div className="text-xs font-semibold">You</div>}
                            <div style={{lineHeight:"15px"}}>{msg.message}</div>
                            <div className='text-end' style={{ fontSize: "10px" }}>
                                {msg.time}  {msg.date}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Typing Indicator */}
            {typingUser && (
                <div className="px-4 py-1 text-sm italic text-gray-500">
                   <span className='border p-1 px-4 bg-gray-100 rounded-2xl' style={{borderTopLeftRadius:"0px"}}> {typingUser} is typing...</span>
                </div>
            )}

            {/* Input Box */}
            <div className="flex items-center gap-2 px-3 py-2 shadow-md">
                <input
                    value={newMsg}
                    onChange={handleTyping}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 p-3 px-4 rounded-full border border-gray-300"
                />
                <button
                    onClick={handleSend}
                    className="px-3 py-2 bg-green-700 text-white rounded-full hover:bg-green-800"
                >
                    <i className="ri-send-plane-2-fill"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
