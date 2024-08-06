import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner'
import { useParams } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/Post';
import Loader from '../loader/Loader';

const ResetPassword = ({ setIsSideBarHidden }) => {
  const [type, setType] = useState("password");
  const { token } = useParams();
  const dispatch = useDispatch()
  const { message, loading } = useSelector((state) => state.likePost)
  useEffect(() => {
    if (message) {
      dispatch({
        type: "CLEAR_MESSAGE"
      })
    }
  }, [])
  useEffect(() => {
    setIsSideBarHidden(false);
    message && toast.success(message)
  }, [setIsSideBarHidden, message]);

  const toggleType = () => {
    setType(type === "password" ? "text" : "password");
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values) => {
    dispatch(resetPassword(token, values.newPassword))
  };

  return (
    <div className='flex h-full -mr-64 w-[100vw] justify-center items-start p-10'>
      {!message && <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='w-[40%] flex justify-center items-center flex-col'>
            <h1 className='text-white text-4xl mb-5'>Reset Your Password</h1>
            <div className='flex w-full justify-center items-center'>
              <Field type={type} name="newPassword" className='px-2 my-2 py-1 w-full border-2 rounded-lg' placeholder='New password' />
              {type === "password" ? <IoIosEyeOff onClick={toggleType} className='text-white text-2xl mx-1 cursor-pointer' /> : <IoIosEye onClick={toggleType} className='text-white text-2xl mx-1 cursor-pointer' />}
            </div>
            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-left" />
            <div className='flex w-full justify-start items-center'>
              <Field type={type} name="confirmPassword" className='px-2 py-1 w-[94%] border-2 rounded-lg' placeholder='Confirm Password' />
            </div>
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-left" />
            <button className='w-full my-5 py-2 bg-orange-400 text-white text-center rounded-xl flex justify-center items-center gap-2' disabled={loading}>Reset Password
              {
                loading && <Loader />
              }
            </button>
          </Form>
        )}
      </Formik>}
      {message && <div>
        <h1 className='text-2xl text-white'>{message}</h1>
      </div>}
      <Toaster />
    </div>
  );
};

export default ResetPassword;
