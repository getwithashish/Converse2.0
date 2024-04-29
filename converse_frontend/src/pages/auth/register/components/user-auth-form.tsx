import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../user-auth.css';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import axios from 'axios';

export default function UserAuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    username: '',
    password: '',
  };
  const form = useForm({
    defaultValues
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', data);
  
      if (response.status === 201) {
        console.log('User created successfully:', response.data.msg);
        router.push('/signin'); // Redirect to login page after successful registration
      } else {
        console.error('Registration error:', response.data.msg);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{zIndex:1}}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="relative">
                <Input
                  type="text"
                  placeholder="Username"
                  disabled={loading}
                  {...field}
                  {...register('username')}
                  className="white-border bg-neutral-600"
                />
                <FormLabel htmlFor="username" className={field.value ? 'active' : ''}></FormLabel>
                <FormMessage>{errors.username && errors.username.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password"
                  disabled={loading}
                  {...field}
                  {...register('password')}
                  className="white-border bg-neutral-600" 
                />
                <div className="absolute inset-y-0 right-0 flex items-center justify-center pb-2 pr-3">
                  {showPassword ? (
                    <EyeOffIcon
                      className="h-4 w-4 text-neutral-500 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeIcon
                      className="h-4 w-4 text-neutral-500 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <FormLabel htmlFor="password" className={field.value ? 'active' : ''}></FormLabel>
                <FormMessage>{errors.password && errors.password.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button disabled={loading} className="w-half ml-auto p-2" type="submit">
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </Form>
      <div className="relative p-2">
        <div className="relative flex justify-center text-xs">
          <span className=" px-2 p-1 text-muted-foreground">
            Already have an account?
          </span>
          <Link to={'/signin'} className='group relative p-1'>
            <span style={{ textTransform: 'uppercase' }}>L</span>ogin Now
            <span className='absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform bg-white transition-transform duration-500 group-hover:scale-x-100'></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
