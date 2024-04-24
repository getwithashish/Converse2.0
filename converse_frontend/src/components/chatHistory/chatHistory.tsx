import React from 'react';

const ChatHistory: React.FC = () => {
  return (
    <div className='p-2'>
      <button className='bg-neutral-500 hover:bg-neutral-700 text-white text-xs font-bold py-2 px-2 rounded m-2 w-full '>New Chat</button>
      <button className='bg-neutral-500 hover:bg-neutral-700 text-white  text-xs font-bold py-2 px-2 rounded m-2 w-full'>Clear chat history</button>
      <div className="py-10">
        <div className="chat-session">
          <span className='text-white text-sm font-bold'>Past Chats</span>
        </div>
        <div className="bg-neutral-500 hover:bg-neutral-700 text-white text-xs font-bold py-2 px-2 rounded m-2 w-full ">
          <h3>Chat session-1</h3>
        </div>
        <div className="bg-neutral-500 hover:bg-neutral-700 text-white text-xs font-bold py-2 px-2 rounded m-2 w-full ">
          <h3>Chat session-2</h3>
        </div>
        <div className="bg-neutral-500 hover:bg-neutral-700 text-white text-xs font-bold py-2 px-2 rounded m-2 w-full ">
          <h3>Chat session-3</h3>
        </div>
      </div>
      <div className='absolute bottom-0'>
        <button className=' hover:bg-neutral-700 text-white text-xs font-bold py-2 px-2 rounded m-2 w-full '>Logout</button>
      </div>
    </div>
  );
};

export default ChatHistory;
