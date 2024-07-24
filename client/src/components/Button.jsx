import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Button = ({ className, img, text, textClassName, onClick }) => {
    const darkMode = useSelector((state) => state.theme.darkMode)
    const logoStyle = {
        fill: darkMode ? 'white' : 'black',
    };

    const navigate = useNavigate()

    return (
        <button className={className} onClick={onClick}>
            <p className={textClassName}>{text}</p>
            {img && <img src={img} className='w-5 ml-1 pb-1' style={logoStyle} />}
        </button>
    )
}

export default Button