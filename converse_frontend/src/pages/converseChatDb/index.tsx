import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
 
const ChatDBPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { mutate, isLoading } = useMutation(
    (inputMessage: string) => axios.post("http://127.0.0.1:5000/chat_with_db", { input_message: inputMessage }, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    }}),
    {
      onSuccess: (response: any) => {
        const aiReply = response.data.ai_response;
        setMessages([...messages, { role: "user", content: inputMessage }]);
        setMessages([...messages, { role: "ai", content: aiReply }]);
        setInputMessage("");
      },
      onError: (error: any) => {
        console.error("Error sending message:", error);
      },
    }
  );
 
  const handleSendMessage = () => {
    mutate(inputMessage);
  };
 
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-grow overflow-hidden p-5">
        <div className="text-left text-4xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Chat with Converse
        </div>
        <div className="chat-messages flex-grow">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role} p-3 mb-2 text-lg rounded-md ${
                message.role === 'user' ? 'text-black' : 'bg-gradient-to-r from-gray-600 to-gray-800 text-white'
              }`}
            >
              {message.role === 'user' && <span className="mr-2">✨</span>}
              {message.role === 'ai' && <span className="mr-2">🤖</span>}
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center p-5">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="border-2 bg-transparent border-[#00D1FF] text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm flex-grow"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600 ml-4"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default ChatDBPage;