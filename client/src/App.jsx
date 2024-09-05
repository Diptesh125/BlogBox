import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
import SignInPage from './auth/SignInPage'
import SignUpPage from './auth/SignUpPage'

import CreateBlog from './components/CreateBlog'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import MyFeed from './components/MyFeed'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedPage from './components/ProtectedPage'

import gsap from 'gsap'
import { useEffect, useState } from 'react'

import { show, hide } from './app/features/gradientSlice'
import BlogPage from './components/BlogPage'
import Author from './components/Author'

// import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
// import * as reactSpring from '@react-spring/three'
// import * as drei from '@react-three/drei'
// import * as fiber from '@react-three/fiber'

const App = () => {
  const [extraCss, setExtraCss] = useState('')
  const darkMode = useSelector(state => state.theme.darkMode)
  const isVisible = useSelector(state => state.visibility.isVisible)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(show())
      setExtraCss("h-screen")
    } else {
      dispatch(hide())
      setExtraCss('')
    }

  }, [location, dispatch])

  useEffect(() => {
    const element = document.getElementById('a');
    if (element && isVisible) {
      const animateBackground = () => {
        if (darkMode) {
          const b1 = "linear-gradient(217deg, rgba(30,30,30,0.9), rgba(30,30,30,0) 70.71%), linear-gradient(127deg, rgba(0,111,255,0.9), rgba(0,111,255,0) 70.71%)";
          const b2 = "linear-gradient(17deg, rgba(30,30,30,0.7), rgba(30,30,30,0) 70.71%), linear-gradient(200deg, rgba(0,111,255,0.9), rgba(0,111,255,0.2) 70.71%)";

          gsap.fromTo(element,
            { width: '100%', height: '100%', background: b1 },
            { ease: "none", duration: 10, background: b2, repeat: -1, yoyo: true }
          );
        } else {
          const b1 = "linear-gradient(217deg, rgba(113,196,239,0.9), rgba(113,196,239,0) 70.71%), linear-gradient(127deg, rgba(255,254,251,0.9), rgba(255,254,251,0) 70.71%)";
          const b2 = "linear-gradient(17deg, rgba(113,196,239,0.7), rgba(113,196,239,0) 70.71%), linear-gradient(200deg, rgba(255,254,251,0.9), rgba(255,254,251,0.2) 70.71%)";

          gsap.fromTo(element,
            { width: '100%', height: '100%', background: b1 },
            { ease: "none", duration: 10, background: b2, repeat: -1, yoyo: true }
          );
        }
      };

      animateBackground();
    }
  }, [darkMode, isVisible]);

  return (
    <div className={`${extraCss} w-full flex items-center flex-col ${darkMode ? 'dark' : ''}`}>
      <div className='h-full w-full flex items-center flex-col dark:bg-darkBg-100'>
        <div className='md:w-2/3 lg:h-full lg:w-1/2'>

          {isVisible && (
            <div id='a' className='w-full h-fit absolute top-0 left-0'></div>
          )}

          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signIn' redirectUrl={'/protected'} routing="path" element={<SignInPage />} />
            <Route path='/signUp' redirectUrl={'/protected'} routing="path" element={<SignUpPage />} />
            <Route path='/protected' element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
              <ProtectedRoute>
                <Navbar />
              </ProtectedRoute>
            } />
            <Route path='/myFeed' element={
              <ProtectedRoute>
                <MyFeed />
              </ProtectedRoute>
            } lazy={() => import('./components/MyFeed')} />
            <Route path='/explore' element={
              <ProtectedRoute>
                <Navbar />
              </ProtectedRoute>
            } />
            <Route path='/submit-form' element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            } />
            <Route path="/blog/:blogId" element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            } />
            <Route path='/author/:id' element={
              <ProtectedRoute>
                <Author />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App