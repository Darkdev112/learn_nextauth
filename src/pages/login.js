import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import {HiAtSymbol, HiFingerPrint} from 'react-icons/hi'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useFormik } from 'formik'
import login_validate from '../../lib/validate'
import { useRouter } from 'next/router'


const Login = () => {
  const router = useRouter();
  const onSubmit = async(values) =>{
    const status = await signIn("credentials",{
      redirect : false,
      email : values.email,
      password : values.password,
      callbackUrl : "/"
    })
    
    if(status.ok)
    {
      router.push(status.url)
    }
  }

  const formik = useFormik({
    initialValues:{
      email : "",
      password : ""
    },
    validate : login_validate,
    onSubmit
  });
  const [show,setShow] = useState(false);

  const handleGoogleSignIn = async () => {
    signIn('google',{callbackUrl : "http://localhost:3000"})  
  }

  const handleGithubSignIn = async () => {
    signIn('github',{callbackUrl : "http://localhost:3000"})  
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
          <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
          <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, cumque.</p>
        </div>
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input type="email" name='email' placeholder='Email' className={styles.input_text} {...formik.getFieldProps("email")}/>
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={25}/>
            </span>
          </div>
          
          {(formik.errors.email && formik.touched.email) && <span className='text-rose-500'>{formik.errors.email}</span>}

          <div className={styles.input_group}>
            <input type={show? "text":"password"} name='password' placeholder='Password' className={styles.input_text} {...formik.getFieldProps("password")}/>
            <span className='icon flex items-center px-4' onClick={()=>{setShow(!show)}}>
              <HiFingerPrint size={25}/>
            </span>
          </div>

          {(formik.errors.password && formik.touched.password) && <span className='text-rose-500'>{formik.errors.password}</span>}

          {/*login buttons*/}
          <div className="input-button">
            <button type='submit' className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button type='button' className={styles.button_custom} onClick={handleGoogleSignIn}>
              Sign In with Google<Image src={`/assets/google.svg`} width={20} height={20}></Image>
            </button>
          </div>
          <div className="input-button">
            <button type='button' className={styles.button_custom} onClick={handleGithubSignIn}>
              Sign In with Github<Image src={`/assets/github.svg`} width={25} height={25}></Image>
            </button>
          </div>
        </form>

        {/*bottom*/}
        <p className='text-center text-gray-400'>
          don't have an account yet?<Link href="/register" legacyBehavior><a className='text-blue-700'>Sign Up</a></Link>
        </p>
      </section>
    </Layout>
  )
}

export default Login