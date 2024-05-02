import './styles.css';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { UserName } from '@/components/username';
import { Robot } from '@/components/landingpage/robotSVG';

const gradientOne = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

const AnimatedGradientText = styled.h1`
  animation: ${gradientOne} 3s ease-in-out infinite;
  background: linear-gradient(to right, #b10ac9, #db09cc, #750ad9, #6dd5ed);
  background-size: 300%;
  background-clip: text;
  color: transparent;
`;

// function useParallax(value: MotionValue<number>, distance: number) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }

// function Image({ id }: { id: number }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const y = useParallax(scrollYProgress, 300);

//   let title, link, description;
//   if (id === 1) {
//     title = 'CONVERSE';
//     link = '/chat';
//     description =
//       'An interactive, AI-driven virtual assistant, ready to assist you at any time. Designed to provide personalized support and information, our chatbot is your go-to resource for questions, assistance, or exploration. Engage in natural conversation, ask anything you need, and receive instant responses. Enhancing user experience, our chatbot is accessible 24/7, offering seamless assistance right at your fingertips.';
//   } else if (id === 2) {
//     title = 'CONVERSE-DOCUMENT';
//     link = '/chat_with_doc';
//     description =
//       ' Converse is capable of reading and answering queries based on the content of uploaded documents. With intuitive user interaction and advanced document understanding, Converse can efficiently retrieves relevant information, enhancing the user experience.';
//   } else if (id === 3) {
//     title = 'CONVERSE-DATABASE';
//     link = '/chat_with_db';
//     description =
//       'Converse extends its capabilities to database content, enabling seamless querying and retrieval of information. With its intuitive interface and advanced data processing, Converse efficiently accesses and responds to user queries, enhancing the accessibility and usability of the application.';
//   }

//   return (
//     <>
//       <section className="flex">
//         <div
//           ref={ref}
//           className="flex items-center justify-center duration-300 ease-in-out hover:scale-105"
//         >
//           <img src={`../../../public/${id}.png`} />
//         </div>
//         <motion.div className="text-xl" style={{ y }}>
//           <Link to={link}>
//             <div className="w-full rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-950">
//               <div className="w-full">
//                 <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
//                   <AnimatedGradientText>{title}</AnimatedGradientText>
//                 </h5>
//                 <p className="lg:text-md text-xs font-normal text-gray-700 dark:text-white md:text-sm">
//                   {description}
//                 </p>
//                 <span className="lg:text-md text-xs transition md:text-sm ">
//                   <AnimatedGradientText>Click here!</AnimatedGradientText>
//                 </span>
//               </div>
//             </div>
//           </Link>
//         </motion.div>
//       </section>
//     </>
//   );
// }

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export const Dashboard = () => {
  const textRef = useRef(null);
  const secRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current, { x: '5%', opacity: 0 });
      gsap.to(textRef.current, { x: 0, opacity: 1, duration: 1, delay: 0 });
    }
  }, []);

  useEffect(() => {
    if (secRef.current) {
      gsap.set(secRef.current, { y: '25%', opacity: 0 });
      gsap.to(secRef.current, { y: 0, opacity: 1, duration: 1, delay: 0.6 });
    }
  }, []);
  useEffect(() => {
    if (paraRef.current) {
      gsap.set(paraRef.current, { y: 0, opacity: 0 });
      gsap.to(paraRef.current, { y: 0, opacity: 1, duration: 2, delay: 2 });
    }
  }, []);

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 200,
  //   damping: 50,
  //   restDelta: 0.1
  // });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const text_one =
    'An interactive, AI-driven virtual assistant, ready to assist you at any time. Designed to provide personalized support and information, our chatbot is your go-to resource for questions, assistance, or exploration. Engage in natural conversation, ask anything you need, and receive instant responses. Enhancing user experience, our chatbot is accessible 24/7, offering seamless assistance right at your fingertips.'.split(
      ' '
    );
  const text_two =
    'Converse is capable of reading and answering queries based on the content of uploaded documents. With intuitive user interaction and advanced document understanding, Converse can efficiently retrieves relevant information, enhancing the user experience.'.split(
      ' '
    );
  const text_three =
    'Converse extends its capabilities to database content, enabling seamless querying and retrieval of information. With its intuitive interface and advanced data processing, Converse efficiently accesses and responds to user queries, enhancing the accessibility and usability of the application.'.split(
      ' '
    );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/landing');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-gray-950">
        <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
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
                <li>
                  <Link
                    to={'/landing'}
                    className="group relative block rounded px-3 py-2 text-white transition duration-300 ease-in-out hover:text-blue-500 md:bg-transparent md:p-0"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 h-[1px] w-full scale-x-0 transform bg-blue-800 transition-transform duration-500 group-hover:scale-x-100"></span>
                  </Link>
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
        </nav>
        <div className="px-10 pt-20 lg:pt-10">
          <motion.div className="progress-bar" style={{ scaleX }} />
          <div className="w-full flex-col bg-gray-950 md:flex-row ">
            <div className="items-center justify-center p-2 md:p-2 lg:p-4">
              <div className="flex">
                <div className="flex-1 md:space-y-2 ">
                  <h2
                    className="text-xl font-bold tracking-tight md:text-xl lg:text-2xl"
                    ref={textRef}
                  >
                    Chat your way
                  </h2>
                  <h3
                    className="text-xs font-bold tracking-tight md:text-sm"
                    ref={secRef}
                  >
                    with Text, Documents, or Databases
                  </h3>
                </div>
              </div>
              <div
                className="space-y-4 sm:space-y-2 md:space-y-2 lg:space-y-4 lg:px-20 "
                ref={paraRef}
              >
                <div className="md:text-md mt-10 text-sm font-bold tracking-tight">
                  Pick your power
                </div>
                <div className="lg:pd-8 p-4 md:justify-between md:p-6 lg:justify-center">
                  <div className="flex items-center transition duration-300 ease-in-out hover:scale-105 hover:rounded-xl hover:bg-gray-900 lg:p-4">
                    <Link
                      to={'/chat_with_ai'}
                      className="group relative p-4 text-[#750ad9] "
                    >
                      <div className="flex items-center rounded-lg">
                        <img
                          className="rounded-t-lg transition duration-300 ease-in-out hover:scale-105"
                          src="../../../public/1.png"
                          alt="Converse Image"
                        />
                        <div className="flex-1 items-end justify-end p-5 text-center lg:text-left">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                            <AnimatedGradientText>
                              Converse AI
                            </AnimatedGradientText>
                          </h5>
                          <span className="App mb-3 hidden text-sm font-normal text-gray-700 dark:text-white md:block md:text-base lg:text-sm">
                            {text_one.map((el, i) => (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 2,
                                  delay: i / 4
                                }}
                                key={i}
                              >
                                {el}{' '}
                              </motion.span>
                            ))}
                          </span>
                        </div>
                        <span className="absolute bottom-0 left-0 mb-2 h-[4px] w-full scale-x-0 transform bg-[#750ad9] transition-transform duration-500 group-hover:scale-x-100"></span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center transition duration-300 ease-in-out hover:scale-105 hover:rounded-xl hover:bg-gray-900 lg:p-4">
                    <Link
                      to={'/chat_with_doc'}
                      className="group relative p-4 text-[#750ad9] "
                    >
                      <div className="flex items-center rounded-lg">
                        <img
                          className="rounded-t-lg transition duration-300 ease-in-out hover:scale-105"
                          src="../../../public/2.png"
                        />
                        <div className="flex-1 items-end justify-end p-5 text-center lg:text-left">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                            <AnimatedGradientText>
                              Converse DocuAssist
                            </AnimatedGradientText>
                          </h5>
                          <span className="App mb-3 hidden text-sm font-normal text-gray-700 dark:text-white md:block md:text-base lg:text-sm">
                            {text_two.map((el, i) => (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 5,
                                  delay: i / 4
                                }}
                                key={i}
                              >
                                {el}{' '}
                              </motion.span>
                            ))}
                          </span>
                        </div>
                        <span className="absolute bottom-0 left-0 mb-2 h-[4px] w-full scale-x-0 transform bg-[#750ad9] transition-transform duration-500 group-hover:scale-x-100"></span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center transition duration-300 ease-in-out hover:scale-105 hover:rounded-xl hover:bg-gray-900 lg:p-4">
                    <Link
                      to={'/chat_with_db'}
                      className="group relative p-4 text-[#750ad9] "
                    >
                      <div className="flex items-center rounded-lg">
                        <img
                          className="rounded-t-lg transition duration-300 ease-in-out hover:scale-105 "
                          src="../../../public/3.png"
                        />
                        <div className="flex-1 items-end justify-end p-5 text-center lg:text-left">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                            <AnimatedGradientText>
                              Converse DataSage
                            </AnimatedGradientText>
                          </h5>
                          <span className="App mb-3 hidden text-sm font-normal text-gray-700 dark:text-white md:block md:text-base lg:text-sm">
                            {text_three.map((el, i) => (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  duration: 5,
                                  delay: i / 5
                                }}
                                key={i}
                              >
                                {el}{' '}
                              </motion.span>
                            ))}
                          </span>
                        </div>
                        <span className="absolute bottom-0 left-0 mb-2 h-[4px] w-full scale-x-0 transform bg-[#750ad9] transition-transform duration-500 group-hover:scale-x-100"></span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
