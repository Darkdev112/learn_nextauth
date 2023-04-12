import Head from 'next/head'
import Link from 'next/link'
import { getSession, useSession, signOut } from 'next-auth/react';

export default function Home() {
  const {data : session} = useSession();

  const handleSignOut = () => {
    signOut();
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main>
        {session?User({session, handleSignOut}):Guest()}
      </main>
    </>
  )
}

function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>
      <div className='flex justify-center'>
        <Link href="/login" legacyBehavior><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
      </div>
    </main>
  )
}

function User({session, handleSignOut}) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>
      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
      <div className='flex justify-center'>
        <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50' onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className='flex justify-center'>
        <Link href="/profile" legacyBehavior><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</a></Link>
      </div>
    </main>
  )
}

export async function getServerSideProps(context){
  const {req} = context;
  const session = await getSession({req})

  if(!session){
    return{
      redirect : {
        destination : '/login',
        permanent : false
      }
    }
  }

  return{
    props : {session}
  }

}