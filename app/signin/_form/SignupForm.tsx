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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { insertUserSchema } from '@/lib/db/schema';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertUserSchema
  .omit({ created: true, id: true })
  .extend({
    confirm_password: z.string()
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords dont match!',
    path: ['confirm_password']
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      confirm_password: '',
      role: 'user'
    }
  });

  const submit = async (values: FormValues) => {
    console.log('values', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
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
                This is your public display name.
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
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                Choose a password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="confirm" {...field} />
              </FormControl>
              <FormDescription>
                Enter your password again
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Se;ect a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['admin', 'user'].map(role => (
                      <SelectItem key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              <FormDescription>
                Enter your password again
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
