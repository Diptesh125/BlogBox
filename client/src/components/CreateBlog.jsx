import React from 'react';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../schema/validationSchema';

const CreateBlog = () => {
    return (
        <Formik
            initialValues={{
                image: null,
                title: '',
                description: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('image', values.image);
                formData.append('title', values.title);
                formData.append('description', values.description);

                axios.post('http://localhost:8080/blog/submit-form', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => {
                        console.log(response.data);
                        setSubmitting(false);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                        setSubmitting(false);
                    });
            }}
        >
            {({ setFieldValue }) => (
                <Form>
                    <div>
                        <label htmlFor="image">Image Upload</label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={(event) => {
                                setFieldValue('image', event.currentTarget.files[0]);
                            }}
                        />
                        <ErrorMessage name="image" component="div" />
                    </div>

                    <div>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Enter title" />
                        <ErrorMessage name="title" component="div" />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Field
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            as="textarea"
                        />
                        <ErrorMessage name="description" component="div" />
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateBlog;
