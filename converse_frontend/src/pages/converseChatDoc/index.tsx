import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/logout';

const ChatDocPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation(
    (message: string) => {
      return axios.post(
        'http://127.0.0.1:5000/chat_with_doc',
        { input_message: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
    },
    {
      onSuccess: (response: any) => {
        if (response && response.data && response.data.ai_response) {
          const reply = response.data.ai_response;
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: inputMessage },
            { role: 'ai', content: reply },
          ]);
          setInputMessage('');
        } else {
          console.error('Invalid response received from server:', response);
        }
      },
      onError: (error: any) => {
        console.error('Error sending message:', error);
      },
    }
  );
  

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      sendMessage(inputMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        await axios.post('http://127.0.0.1:5000/upload_doc', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUploadSuccess(true);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadSuccess(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadSuccess(null);
    }
  };

  const textRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current, { y: 0, opacity: 0 });
      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 2 });
    }
  }, []);

  useEffect(() => {
    if (secRef.current) {
      gsap.set(secRef.current, { x: 50, opacity: 0 });
      gsap.to(secRef.current, { x: 0, opacity: 1, duration: 2 });
    }
  }, []);

  return (
    <div className="flex h-screen">
      <div className="hidden w-64 flex-col bg-gray-800 text-white md:flex">
        <div className="p-4 text-lg" ref={textRef}>
          Converse
        </div>
        <div className="p-2 flex flex-col items-center justify-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2 rounded-lg w-auto bg-gray-400 p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button className="text-xs" onClick={handleFileUpload}>
            Upload File
          </Button>
          {uploadSuccess === true && <p className="text-green-500">File uploaded successfully!</p>}
          {uploadSuccess === false && <p className="text-red-500">Failed to upload file!</p>}
        </div>
        <LogoutButton />
      </div>
      <div className="relative flex w-full flex-grow flex-col overflow-hidden bg-gradient-to-r from-gray-950 to-gray-900 p-5">
        <div className="flex flex-grow flex-col overflow-hidden p-5">
          <div className="text-md text-left font-semibold tracking-tight md:text-lg lg:text-xl" ref={secRef}>
            Chat with Converse-Docs
          </div>
          <div className="chat-messages flex-grow">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role} mb-2 rounded-md p-3 text-lg ${
                  message.role === 'user'
                    ? 'text-white'
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
                }`}
              >
                {message.role === 'user' && <span className="mr-2">✨</span>}
                {message.role === 'ai' && <span className="mr-2">🤖</span>}
                {message.content}
              </div>
            ))}
            {isSendingMessage && (
              <div className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline h-12 w-12 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
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
          <div className="flex items-center justify-between p-5">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              className="flex-grow rounded-md bg-gray-600 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`ml-4 h-6 w-6 cursor-pointer text-gray-500 ${
                isSendingMessage ? 'opacity-50 pointer-events-none' : ''
              }`}
              onClick={handleSendMessage}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDocPage;
