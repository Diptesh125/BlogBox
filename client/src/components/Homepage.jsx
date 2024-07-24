import React from 'react';
import { useSelector } from 'react-redux';
import Marquee from 'react-fast-marquee';
// import axios from 'axios'

import Line from '../assets/Line.svg';
import LineDark from '../assets/LineDark.svg';
import Pen from '../assets/Pen.svg';

import Button from './Button';
import BlogCard from './BlogCard';

import { arrayOfBlogs } from '../test/BlogCardTestData';

const Homepage = () => {
    const darkMode = useSelector((state) => state.theme.darkMode)
    const currLine = darkMode ? LineDark : Line
    // const [blogs, setBlogs] = useState([]);

    // Using Axios
    // const fetchMoviesWithAxios = () => {
    //     axios.get('https://dummyapi.online/api/blogposts')
    //         .then(response => setBlogs(response.data))
    //         .catch(error => console.error('Error:', error));
    // };

    // useEffect(() => {
    //     fetchMoviesWithAxios(); // or fetchMoviesWithAxios();
    // }, []);

    const gradientColor = darkMode ? '#1E1E1E' : '#fffefb';

    return (
        <div className={`w-full flex justify-center items-center relative flex-col ${darkMode ? '' : ''}`}>
            <div className="relative w-full h-[400px] flex justify-center items-center flex-col">

                <div className="w-fit relative flex justify-center items-center text-text-100 mt-10 z-10 dark:text-darkText-100">
                    <h1 className="lg:text-7xl font-[Diastema] ">
                        Stories that connect <br />
                        Ideas that <span className="font-[Pinyon] lg:text-8xl">Inspire</span>
                    </h1>
                    <img src={currLine} alt="" className="absolute bottom-0 right-0" />
                </div>

                <Button
                    text="Write"
                    textClassName="font-[GillSans] text-lg text-text-100 dark:text-darkText-100"
                    className="lg:w-[7rem] lg:h-[3rem] bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center pt-1 mt-10 z-10"
                    img={Pen}
                />
            </div>

            <Marquee
                className="h-[300px] overflow-hidden "
                pauseOnHover
            // gradient
            // gradientColor={gradientColor}
            // gradientWidth={200}
            >
                {arrayOfBlogs.map((blog, index) => (
                    <BlogCard
                        key={blog.id}
                        profilePicture={blog.profilePicture}
                        title={blog.title}
                        author={blog.author}
                        date={blog.date}
                        content={blog.description}
                        likeCount={blog.likeCount}
                        commentCount={blog.commentCount}
                        banner={blog.banner}
                        tags={blog.tags}
                        className={index % 2 === 0 ? 'mt-8' : null}
                    />
                ))}
            </Marquee>
        </div>
    );
};

export default Homepage;
