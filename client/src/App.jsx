import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'

import CreateBlog from './components/CreateBlog'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import TestMyFeed from './components/TestMyFeed'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedPage from './components/ProtectedPage'

import gsap from 'gsap'
import { useEffect } from 'react'

import { show, hide } from './app/features/gradientSlice'

// import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
// import * as reactSpring from '@react-spring/three'
// import * as drei from '@react-three/drei'
// import * as fiber from '@react-three/fiber'

const App = () => {
  const darkMode = useSelector(state => state.theme.darkMode)
  const isVisible = useSelector(state => state.visibility.isVisible)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(show())
    } else {
      dispatch(hide())
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
    <div className={`h-screen w-full flex items-center flex-col ${darkMode ? 'dark' : ''}`}>
      <div className='h-full w-full flex items-center flex-col dark:bg-darkBg-100'>
        <div className='md:w-2/3 lg:h-full lg:w-1/2'>
          {/* <ShaderGradientCanvas
            importedFiber={{ ...fiber, ...drei, ...reactSpring }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          >
            z<ShaderGradient control='query' urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.2&cPolarAngle=80&cameraZoom=9.1&color1=%2371c4ef&color2=%2371c4ef&color3=%23fffefb&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&toggleAxis=false&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.1&uStrength=1.5&uTime=8&wireframe=false&zoomOut=false' controlsEnabled={false} disablePan={true} disableZoom={true} disableRotate={true} />
          </ShaderGradientCanvas> */}
          {isVisible && (
            <div id='a' className='w-full h-screen absolute top-0 left-0'></div>
          )}

          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/signIn' redirectUrl={'/protected'} routing="path" element={<SignIn />} />
            <Route path='/signUp' redirectUrl={'/protected'} routing="path" element={<SignUp />} />
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
                <TestMyFeed />
              </ProtectedRoute>
            } />
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
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App