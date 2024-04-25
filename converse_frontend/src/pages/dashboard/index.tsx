import PageHead from '@/components/shared/page-head.jsx';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';
import NeuralLines from './components/NeuralLines';
import { Link } from 'react-router-dom';
import { UserName } from '@/components/username';

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
      <div className="z-0 flex w-full flex-col overflow-hidden bg-gradient-to-b from-gray-900 md:flex-row ">
        <div className="inset-0 flex-1 items-center justify-center p-4 md:p-4 lg:p-8">
          <div className="flex">
            <div className="flex-1 space-y-2 md:space-y-4">
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
            <UserName />
          </div>
          <div
            className="space-y-2 sm:mt-10 sm:space-y-2 md:space-y-2 lg:space-y-4 "
            ref={paraRef}
          >
            <div className="text-md md:text-md font-bold tracking-tight">
              Pick your power
            </div>
            <div className="grid grid-cols-1 items-center justify-center gap-8 p-4 md:grid-cols-2 md:p-8 lg:grid-cols-3">
              <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
                <Link to={'/chat'}>
                  <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow transition duration-300 ease-in-out hover:scale-105 dark:border-gray-700 dark:bg-gray-950">
                    <img
                      className="rounded-t-lg"
                      src="../../../public/Converse 1.png"
                      alt=""
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                        <AnimatedGradientText>CONVERSE</AnimatedGradientText>
                      </h5>

                      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-white md:text-base lg:text-sm">
                        Ask me, Anything!
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to={'/chat_with_doc'}>
                  <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow transition duration-300 ease-in-out hover:scale-105 dark:border-gray-700 dark:bg-gray-950">
                    <img
                      className="rounded-t-lg"
                      src="../../../public/Converse 2.png"
                      alt=""
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                        <AnimatedGradientTextTwo>
                          CONVERSE DOCUMENT
                        </AnimatedGradientTextTwo>
                      </h5>
                      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-white md:text-base lg:text-sm">
                        {' '}
                        Let the AI do the magic with Documents
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to={'/chat_with_db'}>
                  <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow transition duration-300  ease-in-out hover:scale-105 dark:border-gray-700 dark:bg-gray-950">
                    <img
                      className="rounded-t-lg "
                      src="../../../public/Converse 3.png"
                      alt=""
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                        <AnimatedGradientTextTwo>
                          CONVERSE DATABASE
                        </AnimatedGradientTextTwo>
                      </h5>
                      <p className="mb-3 text-sm font-normal text-gray-700 dark:text-white md:text-base lg:text-sm">
                        {' '}
                        Ask me anything from the Database
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
