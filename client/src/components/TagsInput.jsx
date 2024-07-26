import React from 'react';
import TagsInput from 'react-tagsinput';
import './TagsInput.css';

const CustomTagsInput = ({ value, onChange, className }) => {
    const handleChange = (tags) => {
        if (tags.length <= 3) {
            onChange(tags);
        }
    };

    return (
        <TagsInput value={value} onChange={handleChange} />
    );
};

export default CustomTagsInput;
