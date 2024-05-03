import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { UserName } from '@/components/username';
import { Link, useNavigate } from 'react-router-dom';
import { InstructionModal } from '../converseChatDb/components/instructionIndex';

const ChatDocPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [noDocumentUpload, setNoDocumentUpload] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation(
    (message: string) => {
      return axios.post(
        import.meta.env.VITE_CONVERSE_URL + '/chat_with_doc',
        { input_message: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
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
            { role: 'ai', content: reply }
          ]);
          setInputMessage('');
        } else {
          console.error('Invalid response received from server:', response);
        }
      },
      onError: (error: any) => {
        console.error('Error sending message:', error);
        if (error.response && error.response.status === 401) {
          setIsSessionExpired(true);
        }
      }
    }
  );

  const handleSignInRedirect = () => {
    navigate('/signin');
  };

  const handleSendMessage = () => {
    if (!selectedFile) {
      setNoDocumentUpload(true);
    }

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
        await axios.post(
          import.meta.env.VITE_CONVERSE_URL + '/upload_doc',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        );
        setUploadSuccess(true);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadSuccess(false);
      }
    }
    if (uploadSuccess) {
      setTimeout(() => {
        setIsFileUploadOpen(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsFileUploadOpen(false);
      }, 1000);
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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/landing');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isChooseMenuOpen, setIsChooseMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleFileUpload = () => {
    setIsFileUploadOpen(!isFileUploadOpen);
  };

  const toggleChooseMenu = () => {
    setIsChooseMenuOpen(!isChooseMenuOpen);
  };
  const handleOptionClick = () => {
    setIsChooseMenuOpen(false);
  };

  return (
    <div className="flex h-screen">
      <nav className="fixed start-0 top-0 z-10 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 lg:p-2">
          <Link
            to={'/landing'}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
              Converse
            </span>
          </Link>
          <div className="flex max-w-screen-xl flex-wrap items-end justify-end p-4">
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen ? 'true' : 'false'}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`w-full items-center justify-between md:order-1  md:flex md:w-auto ${isMenuOpen ? '' : 'hidden'}`}
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
              <li className='md:p-0" block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent'>
                <UserName />
              </li>
              <li
                className='group relative block cursor-pointer rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0'
                onClick={toggleInstructions}
              >
                View Instructions
                {showInstructions && (
                  <InstructionModal onClose={toggleInstructions} />
                )}
                <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
              
              </li>
              <li
                className="group relative block cursor-pointer rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0 "
                onClick={toggleFileUpload}
              >
                Upload Document
                <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
              </li>
             
              <li>
                <Link
                  to={'/landing'}
                  className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0"
                >
                  Home
                  <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                </Link>
              </li>
              <li
                className='md:p-0" group relative block cursor-pointer rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent
              '
                onClick={toggleChooseMenu}
              >
                Choose your AI
                <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
              </li>
              <li>
                <Link
                  to={'/register'}
                  className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0 "
                >
                  Register
                  <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/landing'}
                  onClick={handleLogout}
                  className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0"
                >
                  Logout
                  <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {isFileUploadOpen && (
          <div className="absolute left-0 top-full w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center p-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="mb-2 rounded-lg bg-gray-400 p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button className="text-xs" onClick={handleFileUpload}>
                Upload File
              </Button>
              {uploadSuccess === true && (
                <p className="text-green-500">File uploaded successfully!</p>                
              )}
              {uploadSuccess === false && (
                <p className="text-red-500">Failed to upload file!</p>
              )}              
            </div>
          </div>
        )}
        {isChooseMenuOpen && (
          <>
            <div className="absolute left-0 top-full w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
              <div className="flex flex-col items-end justify-end p-5">
                <ul className="mt-4 flex flex-col items-end justify-end rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
                  <li>
                    <Link
                      to={'/chat_with_ai'}
                      onClick={handleOptionClick}
                      className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0"
                    >
                      Converse
                      <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/chat_with_doc'}
                      onClick={handleOptionClick}
                      className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0"
                    >
                      Converse DocAssist
                      <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/chat_with_db'}
                      onClick={handleOptionClick}
                      className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0 "
                    >
                      Converse DataSage
                      <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
      <div className="lg:pt relative flex w-full flex-grow flex-col overflow-hidden bg-gradient-to-r from-gray-950 to-gray-900 p-5 pt-20">
        <div className="flex flex-grow flex-col overflow-hidden p-5">
          <div
            className="text-md text-left font-semibold tracking-tight md:text-lg lg:text-xl"
            ref={secRef}
          >
            Chat with Converse DocAssist
          </div>
          <div className="chat-messages flex-grow overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role} mb-2 rounded-md p-3 text-lg ${
                  message.role === 'user'
                    ? 'text-sm text-white'
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 text-sm text-white'
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
                isSendingMessage ? 'pointer-events-none opacity-50' : ''
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
      {isSessionExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-gray-800 p-6 text-center shadow-lg ">
            <h2 className="mb-4 text-sm font-bold">Session Expired</h2>
            <p className="mb-4 text-xs">
              Your session has expired. Please log in again.
            </p>
            <button
              onClick={handleSignInRedirect}
              className="rounded-md bg-blue-500 px-4 py-2 text-xs text-white"
            >
              Log In
            </button>
          </div>
        </div>
      )}
      {noDocumentUpload && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-gray-800 p-6 text-center shadow-lg ">
            <h2 className="mb-4 text-sm font-bold">Upload not found</h2>
            <p className="mb-4 text-xs">
              Please upload a document before sending a message
            </p>
            <button
              className="rounded-md bg-red-500 px-4 py-2 text-xs text-white"
              onClick={() => setNoDocumentUpload(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDocPage;
