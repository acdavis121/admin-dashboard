'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { signInSchema } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signIn } from "next-auth/react"

type FormValues = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(signInSchema)
  });

  const submit = async (values: FormValues) => {
    console.log('values', values);
    try {
      const res = await signIn('credentials', values, {
        redirect:false
      });
      console.log('res', res)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="user" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>Login</Button>
      </form>
    </Form>
  );
}
