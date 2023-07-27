"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Sidebar from './AdminSidebar';

export default function ProtectedContent() {
  const { data: session, status } = useSession(
    {
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/admin')
        }

    }

  );
  const router = useRouter();
  const allowedEmails = ["hasaanahmad10023@gmail.com", "haidersheikh1221@gmail.com", "hasaan10023@gmail.com"]

  useEffect(() => {
    // Redirect to the root page when the user is not authenticated
    if (status === 'unauthenticated' || (session && !allowedEmails.includes(session.user.email))) {
      router.push('/');
    }
  }, [status]);

  if (status === 'loading') {
    // Handle loading state if needed
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' && session?.user?.email && allowedEmails.includes(session.user.email)) {
    return (
        <Sidebar/>
    );
  }

//   unauthorized should be returned to home page
    return (
        <div>

        </div>
    )

}
