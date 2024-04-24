import UserAuthForm from './components/user-auth-form';
import { motion, AnimatePresence } from 'framer-motion';
import { LinePath } from '@/pages/dashboard/components/LinePath';
import { Link } from 'react-router-dom';


export const SignInPage = () => {
  return (
    <>
        <motion.div
          className="relative h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0">
            <LinePath />
          </div>
          <div className="xs:p-4 h-full sm:p-4 md:p-6 lg:p-8">
            <AnimatePresence>
              <motion.div
                key="authForm"
                className="mx-auto flex w-full flex-col space-y-6"
                initial={{ x: 40 }}
                animate={{ x: 0 }}
                transition={{ ease: 'easeInOut', duration: 1 }}
              >
                <div className="text-3xl font-semibold tracking-tight sm:w-[400px] md:text-4xl lg:text-5xl">
                  Unlock the conversation
                  <p className="lg:text-md text-sm font-bold text-muted-foreground">
                    Ready to talk?
                  </p>
                </div>
                <motion.div
                  className="grid-cols grid w-full items-center justify-center space-y-2 rounded-lg bg-neutral-800 p-4 text-center md:w-[450px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  style={{ zIndex: 1 }}
                >
                  <h1 className="text-left text-xl font-semibold tracking-tight md:w-[400px]">
                    Welcome back
                  </h1>
                  <UserAuthForm />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            className="absolute bottom-10 left-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex flex-col items-start">
              <Link to="/landing">
                <span className=" text-3xl  font-bold ">Converse</span>
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
        </motion.div>
    </>
  );
};
