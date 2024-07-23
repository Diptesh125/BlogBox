import React from 'react';
import { useSelector } from 'react-redux';
import Marquee from 'react-fast-marquee';
// import axios from 'axios'

import Line from '../../assets/LineDark.svg';
import LineDark from '../../assets/LineDark.svg';
import Pen from '../../assets/Pen.svg';
import Blob from '../../assets/Blob.svg';

import Button from '../Button/Button';
import BlogCard from '../BlogCard/BlogCard';

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

    const gradientColor = darkMode ? '#191919' : 'white';

    return (
        <div className={`w-full flex justify-center items-center relative flex-col ${darkMode ? 'dark:bg-darkBg' : ''}`}>
            <div className="relative w-full h-[400px] flex justify-center items-center flex-col">
                <img src={Blob} alt="" className="w-full absolute -top-5 z-10" />

                <div className="w-fit relative flex justify-center items-center text-black mt-10 z-10 dark:text-white">
                    <h1 className="lg:text-7xl font-[Diastema] ">
                        Stories that connect <br />
                        Ideas that <span className="font-[Pinyon] lg:text-8xl">Inspire</span>
                    </h1>
                    <img src={currLine} alt="" className="absolute bottom-0 right-0" />
                </div>

                <Button
                    text="Write"
                    textClassName="font-[GillSans] text-lg text-black dark:text-white"
                    className="lg:w-[7rem] lg:h-[3rem] bg-buttonBg rounded-full flex justify-center items-center pt-1 mt-10 z-10"
                    img={Pen}
                />
            </div>

            <Marquee
                className="h-[300px] overflow-hidden"
                pauseOnHover
                gradient
                gradientColor={gradientColor}
                gradientWidth={200}
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
