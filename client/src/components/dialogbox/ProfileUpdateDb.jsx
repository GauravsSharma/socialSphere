import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toaster, toast } from 'sonner'
import { loadUser, updateProfile } from '../../actions/User';
import Loader from "../loader/Loader"
const ProfileUpdateDb = ({ isOpen, setIsOpen, handleClick }) => {
    const { user} = useSelector(state => state.user);
    const { message,error,loading} = useSelector(state => state.likePost);
    const [image, setImage] = useState(user?.avatar.url);
    const dispatch = useDispatch();
    const readImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    const initialValues = {
        name: user?.name || '',
        email: user?.email || ''
    };
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch({
                type:"CLEAR_ERROR"
            })
        }
        else if (message) {
            toast.success(message)
            dispatch({
                type:"CLEAR_MESSAGE"
            })
        }
    }, [error, message, loading])

    const onSubmit = async (values) => {
        const updateUserProfile = async () => {
            try {
                await dispatch(updateProfile(values.name, values.email, image));
                dispatch(loadUser());
            } catch (error) {
                throw new Error("Error updating profile");
            }
        };
    
        try {
            await toast.promise(updateUserProfile(), {
                loading: 'Loading',
                success: 'Profile Updated',
                error: 'Error while updating',
            });
            
        } catch (error) {
            console.error("Error loading user:", error);
        }
    };
    
    return (
        <>
            {isOpen && (
                <div
                    className='h-screen w-[98vw] flex justify-center items-center bg-black/40 fixed top-0 left-0'
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className='h-auto md:h-[50%] w-[95%] md:w-[50%] bg-[#260701] rounded-lg overflow-y-auto flex flex-col gap-3 p-5'
                        onClick={(e) => handleClick(e)}
                    >
                        <h1 className='text-lg text-white font-bold'>Edit profile</h1>
                        <div className='h-20 w-full bg-[#260701] rounded-lg flex justify-between items-center px-3'>
                            <div className='flex gap-2 items-center'>
                                <img src={image} alt="user-image" className='h-14 w-14 rounded-full' />
                                <div>
                                    <h1 className='text-lg font-semibold text-white'>{user?.username}</h1>
                                    <h1 className='text-sm font-semibold text-white'>{user?.name}</h1>
                                </div>
                            </div>
                            <input type="file" onChange={readImage} id='photo' className='hidden' />
                            <label htmlFor='photo' className='px-3 md:py-1 py-2 bg-[#F2613F] text-lf font-semibold rounded-md text-white'>
                                Change photo
                            </label>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {() => (
                                <Form className='mt-3'>
                                    <div className='flex justify-center w-full gap-2 md:flex-row flex-col'>
                                        <div className='flex-col flex items-start w-full md:w-1/2'>
                                            <label htmlFor='name' className='text-white font-semibold'>Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                id='name'
                                                className='bg-transparent border-2 rounded-lg px-2 py-1 text-white mt-1 w-full'
                                            />
                                            <ErrorMessage name="name" component="div" className='text-red-500' />
                                        </div>
                                        <div className='flex-col flex items-start w-full md:w-1/2'>
                                            <label htmlFor='email' className='text-white font-semibold'>Email</label>
                                            <Field
                                                type="email"
                                                name="email"
                                                id='email'
                                                className='bg-transparent border-2 rounded-lg px-2 py-1 text-white mt-1 w-full'
                                            />
                                            <ErrorMessage name="email" component="div" className='text-red-500' />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='px-3 flex justify-center items-center gap-3 md:py-1 py-2 bg-[#F2613F] font-semibold rounded-md text-white mt-3 w-full'>
                                        Update {loading && <Loader />}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <Toaster position="top-right" richColors/>
                </div>
            )}
        </>
    );
};

export default ProfileUpdateDb;
