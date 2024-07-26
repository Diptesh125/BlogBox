import * as Yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const FILE_SIZE = 1024 * 1024; // 1MB

const validationSchema = Yup.object().shape({
    image: Yup.mixed()
        .required('*A file is required')
        .test(
            '*fileSize',
            '*File too large',
            value => value && value.size <= FILE_SIZE
        )
        .test(
            '*fileFormat',
            '*Unsupported Format',
            value => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    title: Yup.string()
        .required('*Title is required')
        .min(5, '*Title must be at least 5 characters long'),
    description: Yup.string()
        .required('*Description is required')
        .min(10, '*Description must be at least 10 characters long'),
    tags: Yup.array().of(Yup.string()).max(3, '*You can add up to 3 tags only').required('*At least one tag is required'),
});

export default validationSchema;
