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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import '../user-auth.css';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const formSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: UserFormValue) => {
    try {
      const response = await axios.post('/login', data);
      if (response.status === 200) {
        const responseData = response.data;
        const username = responseData.username;
        console.log('Logged in as:', username);
        router.push('/dashboard');
      } else {
        console.error('Login error:', response.data.msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ zIndex: 1 }}>
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
                  disabled={false}
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
                  disabled={false} 
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
          <Button className="w-half p-2 mt-4" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <div className="relative p-2">
        <div className="relative flex justify-center text-xs">
          <span className="px-2 p-1 text-muted-foreground">
            Don't have an account?
          </span>
          <Link to={'/register'} className='group relative p-1'>
            <span style={{ textTransform: 'uppercase' }}>R</span>egister Now
            <span className='absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform bg-white transition-transform duration-500 group-hover:scale-x-100'></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
