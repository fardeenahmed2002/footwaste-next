'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '../contextapi/ContextProvider';
export default function CollectorPage() {
  const { user, isloggedin, loading } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!isloggedin || !user || user.role !== 'collector') {
        router.push('/login');
      }
    }
  }, [isloggedin, user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome Collector, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
