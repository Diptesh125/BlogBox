import React from 'react'
import { useSelector } from 'react-redux';

const Button = ({ className, img, text, textClassName }) => {
    const darkMode = useSelector((state) => state.theme.darkMode)
    const logoStyle = {
        fill: darkMode ? 'white' : 'black',
    };
    return (
        <button className={className}>
            <p className={textClassName}>{text}</p>
            {img && <img src={img} className='w-5 ml-1 pb-1' style={logoStyle} />}
        </button>
    )
}

export default Button