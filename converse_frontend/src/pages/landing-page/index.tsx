import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { RainLines } from './components/RainDropSvg';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const LandingPage = () => {
  const textRef = useRef(null);
  const secRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current, { x: '25%', opacity: 0 });
      gsap.to(textRef.current, { x: 0, opacity: 1, duration: 0.8, delay: 0.5 });
    }
    if (secRef.current) {
      gsap.set(secRef.current, { y: '50%', opacity: 0 });
      gsap.to(secRef.current, { y: 0, opacity: 1, duration: 1.9, delay: 1.9 });
    }
  }, []);

  const gradient = keyframes`
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  `;

  const { h1 } = styled;

  const AnimatedGradientText = h1`
    animation: ${gradient} 4s ease-in-out infinite;
    background: linear-gradient(to right, #ff96a4, #7e434a, #2193b0, #6dd5ed);
    background-size: 300%;
    background-clip: text;
    color: transparent;
  `;

  return (
    <motion.div
      className="relative h-screen overflow-hidden bg-gray-950"
      initial={{ opacity: 0, x: '0' }}
      animate={{ opacity: 1, x: '0' }}
      exit={{ opacity: 1, x: '-100%' }}
    >
      <div className="relative flex h-full items-center">
        <RainLines />
        <div className="max-w mx-auto w-full px-8 text-center">
          <h1
            className="text-3xl font-semibold tracking-tight md:text-5xl lg:text-8xl"
            ref={textRef}
          >
            Unlock the{' '}
            <span>
              {' '}
              <AnimatedGradientText>conversation</AnimatedGradientText>
            </span>
          </h1>
          <p
            className="lg:text-md mt-4 text-xs font-bold text-muted-foreground"
            ref={secRef}
          >
            Ready to talk?
            {localStorage.getItem('authToken') ? (
              <Link
                to={'/dashboard'}
                className="group relative p-2 px-4 text-[#00D1FF] "
              >
                Click here to explore
                <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform bg-[#00D1FF] transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            ) : (
              <Link
                to={'/signin'}
                className="group relative p-2 px-4 text-[#00D1FF] "
              >
                Login now
                <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform bg-[#00D1FF] transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            )}
          </p>
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ['20%', '20%', '50%', '50%', '20%']
            }}
          />
        </div>
        <motion.div
          className="absolute bottom-10 left-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex flex-col items-start">
            <Link
              to="/"
              onClick={() => {
                if (window.location.pathname === '/landing') {
                  window.location.reload();
                }
              }}
            >
              <span className="text-3xl font-bold">Converse</span>
            </Link>
            <span className="text-xs font-light">
              powered by{' '}
              <span className="bg-gradient-to-r from-[#00D1FF] to-[#96FFD9] bg-clip-text text-transparent">
                Gemini
              </span>{' '}
              from Google
            </span>
          </div>
        </motion.div>
        <RainLines />
      </div>
    </motion.div>
  );
};

export default LandingPage;
