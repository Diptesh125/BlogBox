import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkTheme } from '../app/features/themeSlice';
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

import Logo from '../assets/Logo.svg';
import Moon from '../assets/Moon.svg';
import Sun from '../assets/Sun.svg';
import Button from './Button';

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const hasRedirected = localStorage.getItem('hasRedirectedAfterLogin');

        if (!isSignedIn) {
            navigate('/');
            localStorage.removeItem('hasRedirectedAfterLogin');
        }

        if (isSignedIn && !hasRedirected) {
            navigate('/MyFeed');
            localStorage.setItem('hasRedirectedAfterLogin', 'true');
        }
    }, [isSignedIn, navigate]);

    return (
        <div className='w-full md:h-[4.50rem] border-[1px] border-accent-100 dark:border-darkAccent-100 bg-white/10 drop-shadow-lg backdrop-blur-lg rounded-full my-8 relative flex items-center justify-between px-4 md:px-10'>
            <div className='h-10 flex items-center'>
                <img src={Logo} alt="Logo" className='h-6 cursor-pointer' onClick={() => navigate('/')} />
            </div>

            <div className='flex flex-col md:flex-row justify-center items-center font-[GillSans] text-md text-text-200 hover:text-text-100 pt-1 dark:text-white'>
                <button className='px-4 py-2 md:py-0 hover:bg-darkPrimary-200 dark:hover:text-text-200 w-full md:w-auto' onClick={() => navigate('/MyFeed')}>{isSignedIn ? 'My Feed' : 'Home'}</button>
                <button className='px-4 py-2 md:py-0 hover:bg-darkPrimary-200 dark:hover:text-text-200 w-full md:w-auto' onClick={() => navigate('/Explore')}>Explore</button>
            </div>

            <div className='flex items-center'>
                <Button
                    text="Write"
                    textClassName="font-[GillSans] text-sm"
                    className="w-[4.75rem] h-[2rem] bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center pt-1 mr-2"
                    onClick={() => navigate('/submit-form')}
                />

                <img
                    src={darkMode ? Sun : Moon}
                    onClick={() => dispatch(toggleDarkTheme())}
                    className='h-6 cursor-pointer mr-2'
                />

                {/* Hamburger menu for mobile */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-text-200 dark:text-white">
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>

                {/* Navigation links - hidden on mobile unless menu is open */}
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full right-0 w-48 md:w-auto bg-white md:bg-transparent dark:bg-darkBg-100 md:dark:bg-transparent z-10 md:z-auto mt-2 md:mt-0 rounded-lg shadow-lg md:shadow-none`}>

                    <div className='flex flex-col md:flex-row justify-center items-center dark:text-white mt-2 md:mt-0'>
                        <div className="w-full md:w-auto py-2 md:py-0">
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <Link to='/signin' className="w-full md:w-auto">
                                    <Button text="Sign In" textClassName="font-[GillSans] text-sm" className="w-full md:w-[4.75rem] h-[2rem] bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center pt-1" />
                                </Link>
                            </SignedOut>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
