import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import { useFormik } from 'formik'
import { register_validate } from '../../lib/validate'
import { useRouter } from 'next/router'


const Register = () => {
  const router = useRouter();

  const onSubmit = async (values) =>{
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    const data = await response.json();
    console.log(data);
    if(data)
    {
      router.push('/')
    }
  }
  
  const formik = useFormik({
    initialValues : { 
      username : "",
      email : "",
      password : "",
      cpassword : ""
    },
    validate : register_validate,
    onSubmit
  });
  const [show, setShow] = useState({
    password : false,
    cpassword : false,
  });
  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
          <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
          <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, cumque.</p>
        </div>
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          
          <div className={styles.input_group}>
            <input type="text" name='username' placeholder='Username' className={styles.input_text} {...formik.getFieldProps("username")}/>
            <span className='icon flex items-center px-4'>
              <HiOutlineUser size={25} />
            </span>
          </div>
          {(formik.errors.username && formik.touched.username) && <span className='text-rose-500'>{formik.errors.username}</span>}

          <div className={styles.input_group}>
            <input type="email" name='email' placeholder='Email' className={styles.input_text} {...formik.getFieldProps("email")}/>
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={25} />
            </span>
          </div>
          {(formik.errors.email && formik.touched.email) && <span className='text-rose-500'>{formik.errors.email}</span>}


          <div className={styles.input_group}>
            <input type={show.password ? "text" : "password"} name='password' placeholder='Password' className={styles.input_text} {...formik.getFieldProps("password")}/>
            <span className='icon flex items-center px-4' onClick={() => { setShow({
              ...show,
              password : !show.password
            })}}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {(formik.errors.password && formik.touched.password) && <span className='text-rose-500'>{formik.errors.password}</span>}

          <div className={styles.input_group}>
            <input type={show.cpassword ? "text" : "password"} name='cpassword' placeholder='Confirm Password' className={styles.input_text} {...formik.getFieldProps("cpassword")}/>
            <span className='icon flex items-center px-4' onClick={() => { setShow({
              ...show,
              cpassword : !show.cpassword
            })}}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {(formik.errors.cpassword && formik.touched.cpassword) && <span className='text-rose-500'>{formik.errors.cpassword}</span>}

          {/*login buttons*/}
          <div className="input-button">
            <button type='submit' className={styles.button}>
              Register
            </button>
          </div>
        </form>

        {/*bottom*/}
        <p className='text-center text-gray-400'>
          Have an account yet?<Link href="/login" legacyBehavior><a className='text-blue-700'>Sign In</a></Link>
        </p>
      </section>
    </Layout>
  )
}

export default Register