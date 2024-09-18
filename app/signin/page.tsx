import { redirect } from 'next/navigation';
import { signIn, auth, providerMap } from '@/lib/auth';
import { AuthError } from 'next-auth';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const SIGNIN_ERROR_URL = '';

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined, error: string | undefined };
}) {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className={props.searchParams.error ? 'text-red-500' : ''}>
            { props.searchParams.error ? 'Error signing in. Please check your credentials and try again' : 'Enter your Username and Password'}
          </CardDescription>
          
        </CardHeader>
        <CardContent>
          <form
          className='flex flex-col gap-3'
            action={async (formData) => {
              'use server';
              try {
                await signIn('credentials', formData, {
                  redirectTo: props.searchParams?.callbackUrl ?? '/'
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <Label htmlFor='email'>Email</Label>
            <Input type='email' name='email' id='email' />
            <Label htmlFor='password'>Password</Label>
            <Input type='password' name='password' id='password' />
            <Button className='w-full' type='submit'>Sign In</Button>
            
          </form>
          <Separator className="mt-6" />
        </CardContent>
        <CardFooter>
          {Object.values(providerMap).map((provider) => (
            <form
            className='w-full'
              key={provider.id}
              action={async () => {
                'use server';
                try {
                  await signIn(provider.id, {
                    redirectTo: props.searchParams?.callbackUrl ?? ''
                  });
                } catch (error) {
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }

                  // Otherwise if a redirects happens Next.js can handle it
                  // so you can just re-thrown the error and let Next.js handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <Button className='w-full' type="submit">
                Sign in with {provider.name}
              </Button>
            </form>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}

// <div className="flex flex-col gap-2">
//   <form
//     action={async (formData) => {
//       "use server"
//       try {
//         await signIn("credentials", formData)
//       } catch (error) {
//         if (error instanceof AuthError) {
//           return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
//         }
//         throw error
//       }
//     }}
//   >
//     <label htmlFor="email">
//       Email
//       <input name="email" id="email" />
//     </label>
//     <label htmlFor="password">
//       Password
//       <input name="password" id="password" />
//     </label>
//     <input type="submit" value="Sign In" />
//   </form>
//   {Object.values(providerMap).map((provider) => (
//     <form
//       action={async () => {
//         "use server"
//         try {
//           await signIn(provider.id, {
//             redirectTo: props.searchParams?.callbackUrl ?? "",
//           })
//         } catch (error) {
//           // Signin can fail for a number of reasons, such as the user
//           // not existing, or the user not having the correct role.
//           // In some cases, you may want to redirect to a custom error
//           if (error instanceof AuthError) {
//             return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
//           }

//           // Otherwise if a redirects happens Next.js can handle it
//           // so you can just re-thrown the error and let Next.js handle it.
//           // Docs:
//           // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
//           throw error
//         }
//       }}
//     >
//       <button type="submit">
//         <span>Sign in with {provider.name}</span>
//       </button>
//     </form>
//   ))}
// </div>

// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { signIn } from '@/lib/auth';
// import SignupForm from './_form/SignupForm';

// export default function SignupPage() {
//   return (
//     <div className="min-h-screen flex justify-center items-start md:items-center p-8">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle className="text-2xl">Signup</CardTitle>
//           <CardDescription>
//             Create a Username and Password below
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <SignupForm />
//         </CardContent>
//         <CardFooter>
//           <form
//             action={async () => {
//               'use server';
//               await signIn('github', {
//                 redirectTo: '/'
//               });
//             }}
//             className="w-full"
//           >
//             <Button className="w-full">Or Sign in with GitHub</Button>
//           </form>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
