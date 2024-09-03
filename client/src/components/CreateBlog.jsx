import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../schema/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { setImagePreview, clearImagePreview } from '../app/features/imagePreviewerSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@clerk/clerk-react';

import Navbar from './Navbar';
import CustomTagsInput from './TagsInput';

import UploadIcon from '../assets/Upload.svg';
import Button from './Button';

const CreateBlog = () => {
    const dispatch = useDispatch();
    const imagePreview = useSelector((state) => state.imagePreview.imagePreview);

    const { user } = useUser()

    return (
        <Formik
            initialValues={{
                image: null,
                title: '',
                description: '',
                tags: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('image', values.image);
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('tags', JSON.stringify(values.tags));
                formData.append('authorId', user.id);

                console.log('Form Data:', {
                    image: values.image,
                    title: values.title,
                    description: values.description,
                    tags: values.tags,
                    author: user.id,
                });

                axios.post('http://localhost:8080/blog/submit-form', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => {

                        console.log(response.data);
                        setSubmitting(false);
                        toast("Published");
                        dispatch(clearImagePreview());
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                        setSubmitting(false);
                    });
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className='w-full'>
                    <ToastContainer />
                    <Navbar />
                    <div className='h-10 w-full flex justify-between items-center'>
                        <div className='h-full flex'>
                            <label htmlFor="image" className='flex items-center bg-bg-200 hover:bg-primary-200 rounded-full px-4 py-2 pr-6 dark:bg-darkBg-200 dark:hover:bg-darkPrimary-200 dark:text-darkText-100'>
                                <img src={UploadIcon} alt="" className='h-full w-10 ' />
                                <p className='font-[Poppins-Regular] text-sm '>Upload a Banner</p>
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    setFieldValue('image', file);
                                    if (file) {
                                        dispatch(setImagePreview(URL.createObjectURL(file)));
                                    } else {
                                        dispatch(clearImagePreview());
                                    }
                                }}
                                className='hidden h-10'
                            />
                            <ErrorMessage name="image" component="div" className='text-red-500' />

                            <div className='h-full flex items-center justify-center ml-2'>
                                <CustomTagsInput
                                    value={values.tags}
                                    onChange={(tags) => setFieldValue('tags', tags)}
                                    className='focus:outline-none'
                                />
                                <ErrorMessage name="tags" component="div" />
                            </div>
                        </div>

                        <Button text="Publish" type="submit" className="md:h-full bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center font-[Poppins-Regular] px-6" textClassName="text-text-100 dark:text-darkText-100" />
                    </div>

                    {values.image && imagePreview && (
                        <div className='w-full h-64 flex justify-center items-center mt-4'>
                            <img src={imagePreview} alt="Preview" className='h-64 rounded-lg object-contain' />
                        </div>
                    )}

                    <div className='flex justify-center flex-col mt-2'>
                        <Field id="title" name="title" placeholder="Article Title..." className="w-full h-18 bg-bg-100 dark:bg-darkBg-100 font-[Poppins-Bold] text-4xl text-text-100 dark:text-darkText-100 focus:outline-none" />
                        <ErrorMessage name="title" component="div" className=' text-red-500' />
                    </div>

                    <div className='h-full w-full mt-2'>
                        <Field
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            as="textarea"
                            className="h-screen w-full text-lg font-[Poppins-Regular] bg-bg-100 dark:bg-darkBg-100 text-text-100 dark:text-darkText-100 focus:outline-none "
                        />
                        <ErrorMessage name="description" component="div" />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateBlog;
