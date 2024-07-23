import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkTheme } from '../app/features/themeSlice';
import { Link } from "react-router-dom"
//import {Signin} from "../../auth/Signin.jsx"

import Logo from '../assets/Logo.svg'
import Moon from '../assets/Moon.svg'
import Sun from '../assets/Sun.svg'
import Button from './Button';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode)

    // dark:drop-shadow-[0_4px_8px_rgba(106,126,252,0.4)]
    return (
        <div className='md:h-[4.50rem] border-[1px] border-border bg-white/10 drop-shadow-lg backdrop-blur-lg rounded-full my-8 relative flex items-center justify-between '>
            <div className='h-10 flex items-center md:w-[10%] ml-10'>
                <img src={Logo} alt="Logo" className='h-6' />
            </div>
            <div className='flex justify-center items-center font-[GillSans] text-md text-lightText pt-1 dark:text-white'>
                <h1 className='px-2'>Home</h1>
                <h1 className='px-2'>Explore</h1>
            </div>
            <div className='flex justify-center items-center mr-10 dark:text-white'>
                <img src={darkMode ? Sun : Moon} onClick={() => dispatch(toggleDarkTheme())} className='h-6 pr-3 cursor-pointer dark:fill-white' />

                <div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link to='/signin'>
                            <Button text="Sign In" textClassName="font-[GillSans] text-sm" className="md:w-[4.75rem] md:h-[2rem] bg-buttonBg rounded-full flex justify-center items-center pt-1" />
                        </Link>
                    </SignedOut>
                </div>
            </div>

        </div>
    )
}

export default Navbar