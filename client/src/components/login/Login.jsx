import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { loadUser, loginUser } from '../../actions/User';
import { Toaster, toast } from 'sonner'
const Login = ({ setIsSideBarHidden }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('*Invalid email format').required('*Email is required'),
    password: Yup.string()
      .min(6, '*Password must be at least 6 characters long')
      .required('*Password is required'),
  });

  useEffect(() => {
    setIsSideBarHidden(false);
    return () => setIsSideBarHidden(true);
  }, [setIsSideBarHidden]);

  const handleSubmit = async (values) => {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        await dispatch(loginUser(values.email, values.password));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Login success',
      error: 'Error while login',
    });
    dispatch(loadUser());
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='text-white flex justify-center items-center h-screen w-full'>
      <div className="hidden md:block relative h-full w-[60%]">
        <img src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='h-full w-full object-cover' />
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className='md:w-1/2 w-full flex flex-col justify-center items-center py-10'>
            <h1 className="font-briem text-4xl font-bold gradient">SocialSphere</h1>
            <div className='flex flex-col w-full justify-center items-center mt-20 gap-5'>
              <h1 className='text-slate-300 w-[60%] font-semibold'>Welcome back,😀</h1>
              <div className='w-full flex flex-col justify-center items-center'>
                <Field
                  type="email"
                  name="email"
                  placeholder='Enter your email'
                  className='border-2 border-[#F2613F] px-5 py-1 rounded-lg text-lg w-[60%]'
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-left text-sm w-[60%]" />
              </div>

              <div className='w-full flex flex-col justify-center items-center'>
                <Field
                  type="password"
                  name="password"
                  placeholder='Enter your password'
                  className='border-2 text-black border-[#F2613F] px-5 py-1 rounded-lg text-lg w-[60%]'
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-left text-sm w-[60%]" />
              </div>

              <div className='flex justify-between w-[60%]'>
                <div>
                  <label>
                    <Field type="checkbox" name="rememberMe" className='mr-2' />
                    Remember me
                  </label>
                </div>
                <Link to="/forgot/reset/password" className='text-blue-500 underline'>Forgot password?</Link>
              </div>

              <button type="submit" className='w-[60%] py-2 bg-[#F2613F] mt-5 rounded-lg text-md font-semibold' disabled={loading}>
                {loading ? 'Submitting...' : 'Login'}
              </button>

              <p className='mt-6 font-sm'>New to SocialSphere?
                <Link to="/register" className='text-blue-500 underline'> Signup</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster richColors/>
    </div>
  );
};

export default Login;
