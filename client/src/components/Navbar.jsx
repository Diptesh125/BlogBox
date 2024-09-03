import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkTheme } from '../app/features/themeSlice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

import Logo from '../assets/Logo.svg';
import Moon from '../assets/Moon.svg';
import Sun from '../assets/Sun.svg';
import Button from './Button';

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);

    const navigate = useNavigate();
    const location = useLocation();
    const { isSignedIn, isLoaded } = useUser();

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
        <div className='w-full md:h-[4.50rem] border-[1px] border-accent-100 dark:border-darkAccent-100 bg-white/10 drop-shadow-lg backdrop-blur-lg rounded-full my-8 relative flex items-center justify-between '>
            <div className='h-10 flex items-center md:w-[10%] ml-10'>
                <img src={Logo} alt="Logo" className='h-6 cursor-pointer' onClick={() => navigate('/')} />
            </div>
            <div className='flex justify-center items-center font-[GillSans] text-md text-text-200 hover:text-text-100 pt-1 dark:text-white'>
                <button className='px-4 pt-3 pb-2 hover:rounded-full hover:bg-darkPrimary-200 dark:hover:text-text-200' onClick={() => navigate('/MyFeed')}>{isSignedIn ? 'My Feed' : 'Home'}</button>
                <button className='px-4 pt-3 pb-2 hover:rounded-full hover:bg-darkPrimary-200 dark:hover:text-text-200' onClick={() => navigate('/Explore')}>Explore</button>
            </div>
            <div className='flex justify-center items-center mr-10 dark:text-white'>
                <img src={darkMode ? Sun : Moon} onClick={() => dispatch(toggleDarkTheme())} className='h-6 pr-3 cursor-pointer' />

                <Button
                    text="Write"
                    textClassName="font-[GillSans] text-sm"
                    className="md:w-[4.75rem] md:h-[2rem] bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center pt-1 mr-2 "
                    onClick={() => navigate('/submit-form')}
                />

                <div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link to='/signin'>
                            <Button text="Sign In" textClassName="font-[GillSans] text-sm" className="md:w-[4.75rem] md:h-[2rem] bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center pt-1" />
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
