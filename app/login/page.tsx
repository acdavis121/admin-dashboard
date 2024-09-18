import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { signIn } from '@/lib/auth';
import LoginForm from './_comp/form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your Username and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        <Separator className='mt-6' />
        </CardContent>
        <CardFooter>
          <form
            action={async () => {
              'use server';
              await signIn('github', {
                redirectTo: '/'
              });
            }}
            className="w-full"
          >
            <Button className="w-full">Or Sign in with GitHub</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
