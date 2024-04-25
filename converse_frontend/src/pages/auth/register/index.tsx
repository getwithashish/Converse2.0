import { LinePath } from '@/pages/dashboard/components/LinePath';
import UserAuthForm from './components/user-auth-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <motion.div
      className="relative h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 z-0">
        <LinePath />
      </div>
      <div className="md:flex md:h-full md:flex-col md:justify-end md:px-2 lg:p-2">
        <div className="xs:p-2 h-full sm:p-4 md:p-3 lg:p-4">
          <motion.div
            className="flex w-full flex-col justify-end space-y-6 md:justify-center"
            initial={{ x: 40 }}
            animate={{ x: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
              <div className="text-left text-3xl font-semibold tracking-tight sm:w-[500px] md:text-4xl lg:text-5xl">
                Unlock the conversation
                <p className="lg:text-md text-sm font-bold text-muted-foreground">
                  Ready to talk?
                </p>
              </div>
            <motion.div className="grid-cols grid w-full items-end justify-center space-y-2 rounded-lg bg-gray-900 p-4 text-center md:w-[450px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{zIndex: 1}}
            >
              <h1 className="text-left text-xl font-semibold tracking-tight md:w-[400px] ">
                Create an account
              </h1>
              <UserAuthForm />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-10 left-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-start">
          <Link to='/landing'>
          <span className=" text-3xl  font-bold ">
            Converse
          </span>
          </Link>          
          <span className="text-xs font-light">
            powered by <span className='bg-gradient-to-r from-[#00D1FF] to-[#96FFD9] text-transparent bg-clip-text'>Gemini</span> from Google
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
