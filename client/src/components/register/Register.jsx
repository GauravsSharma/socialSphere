import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser } from '../../actions/User';
import { Toaster, toast } from 'sonner'
const Register = ({ setIsSideBarHidden }) => {
  const [avatar, setAvatar] = useState({});
  const { loading } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('*Name is required'),
    email: Yup.string().email('*Invalid email format').required('*Email is required'),
    password: Yup.string()
      .min(6, '*Password must be at least 6 characters long')
      .required('*Password is required'),
  });
  useEffect(() => {
    setIsSideBarHidden(false);
    return () => setIsSideBarHidden(true);
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (values) => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        await dispatch(registerUser(values.name, values.email, values.password, avatar))
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Signup success',
      error: 'Error while signup',
    });
    dispatch(loadUser())
  };

  return (
    <div className='text-white flex h-screen w-full'>
      <div className="hidden md:block relative h-full w-[60%]">
        <img src="https://images.unsplash.com/photo-1490077476659-095159692ab5?q=80&w=1451&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='h-full w-full object-cover' />
      </div>

      <Formik initialValues={
        {
          name: '',
          email: '',
          password: '',
        }
      } onSubmit={(e) => handleSubmit(e)} validationSchema={validationSchema}>
        {() => (
          <Form className='w-full md:w-[50%] flex flex-col justify-center items-center py-10'>
            <h1 className="font-briem text-4xl font-bold gradient">SocialSphere</h1>
            <div className='flex flex-col w-full justify-center items-center mt-10 gap-5'>
              <h1 className='text-slate-300 w-[60%] font-semibold'>Hello user,👋 </h1>

              <div className='w-full flex flex-col justify-center items-center'>
                <Field
                  type="text"
                  name="name"
                  placeholder='Enter your name'
                  className='border-2 border-[#F2613F] text-black px-5 py-1 rounded-lg text-lg w-[60%]'
                />
                <ErrorMessage name="name" component="div" className="text-red-500  text-left text-sm w-[60%] my-1 mx-1" />

              </div>
              <div className='w-full flex flex-col justify-center items-center'>
                <Field
                  type="email"
                  name="email"
                  placeholder='Enter your email'
                  className='border-2 border-[#F2613F] px-5 text-black py-1 rounded-lg text-lg w-[60%]'
                />
                <ErrorMessage name="email" component="div" className="text-red-500  text-left text-sm w-[60%]" />
              </div>

              <div className='w-full flex flex-col justify-center items-center'>
                <Field
                  type="password"
                  name="password"
                  placeholder='Enter your password'
                  className='border-2 border-[#F2613F] px-5 py-1 text-black rounded-lg text-lg w-[60%]'
                />
                <ErrorMessage name="password" component="div" className="text-red-500  text-left text-sm w-[60%]" />
              </div>
              <div className='w-full flex flex-col justify-center items-center'>
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) => handleFileChange(e)}
                  placeholder='Choose avatar'
                  className='border-2 border-[#F2613F] px-5 rounded-lg text-lg w-[60%]'
                />
                <ErrorMessage name="password" component="div" className="text-red-500  text-left text-sm w-[60%]" />
              </div>

              <button type="submit" className='w-[60%] py-2 bg-[#F2613F] rounded-lg text-md font-semibold' disabled={loading}>
                Signup
              </button>

              <p className=' font-sm'>Already exists ?
                <Link to="/login" className='text-blue-500 underline'> Login</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster richColors/>
    </div>
  )
}
export default Register
