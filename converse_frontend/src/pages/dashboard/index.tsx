import PageHead from '@/components/shared/page-head.jsx';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import NeuralLines from './components/NeuralLines';
import { Link } from 'react-router-dom';


const gradientOne = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

const gradientTwo = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

const gradientThree = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

const AnimatedGradientText = styled.h1`
  animation: ${gradientOne} 3s ease-in-out infinite;
  background: linear-gradient(to right, #00d1ff, #6dd5ed);
  background-size: 300%;
  background-clip: text;
  color: transparent;
`;

const AnimatedGradientTextTwo = styled.h1`
  animation: ${gradientTwo} 3s ease-in-out infinite;
  background: linear-gradient(to right, #6dd5ed, #00d1ff);
  background-size: 300%;
  background-clip: text;
  color: transparent;
`;

const AnimatedGradientTextThree = styled.h1`
  animation: ${gradientThree} 2s ease-in-out infinite;
  background: linear-gradient(to right, #6dd5ed, #00d1ff, #6dd5ed);
  background-size: 300%;
  background-clip: text;
  color: transparent;
`;
const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
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

  return (
    <>
      <BackgroundContainer>
      <NeuralLines />
    </BackgroundContainer>
      <PageHead title="Converse" />      
      <div className="flex flex-col overflow-hidden w-full md:flex-row bg-gradient-to-b from-gray-900 z-0 ">
        <div className="flex-1 p-4 md:p-4 lg:p-8 inset-0 items-center justify-center">
          <div className="space-y-2 md:space-y-4">
            <h2
              className="text-4xl font-bold tracking-tight md:text-5xl"
              ref={textRef}
            >
              Chat your way
            </h2>
            <h3
              className="text-lg font-bold tracking-tight md:text-xl"
              ref={secRef}
            >
              with Text, Documents, or Databases
            </h3>
          </div>
          <div className="space-y-2 sm:mt-10 sm:space-y-2 md:space-y-2 lg:space-y-4 "
          ref={paraRef}>
            <div className="text-md font-bold tracking-tight md:text-md">
              Pick your power
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8 items-center justify-center">
              <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-950 dark:border-gray-700 transition duration-300 ease-in-out hover:scale-105">
                  <img className="rounded-t-lg" src="../../../public/Converse 1.png" alt="" />
                  <div className="p-5">
                    <Link to={'/chat'}>
                    <h5 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <AnimatedGradientText>CONVERSE</AnimatedGradientText>
                      </h5>
                    </Link>       
                    <p className="mb-3 text-sm md:text-base lg:text-sm font-normal text-gray-700 dark:text-white">AI at your fingertips</p>
                  </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-950 dark:border-gray-700 transition duration-300 ease-in-out hover:scale-105">
                  <img className="rounded-t-lg" src="../../../public/Converse 2.png" alt="" />
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <AnimatedGradientTextTwo>CONVERSE - Docs</AnimatedGradientTextTwo>
                      </h5>
                    </a>
                    <p className="mb-3 text-sm md:text-base lg:text-sm font-normal text-gray-700 dark:text-white"> Let the AI do the magic</p>
                  </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-950 dark:border-gray-700  transition duration-300 ease-in-out hover:scale-105">
                  <img className="rounded-t-lg " src="../../../public/Converse 3.png" alt="" />
                  <div className="p-5">
                  <Link to={'/chat_with_db'}>
                      <h5 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <AnimatedGradientTextTwo>CONVERSE - DataB</AnimatedGradientTextTwo>
                      </h5>
                    </Link>
                    <p className="mb-3 text-sm md:text-base lg:text-sm font-normal text-gray-700 dark:text-white"> Throw everything that you got at me!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
