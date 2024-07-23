import React from 'react'

import FollowIcon from '../../assets/Follow.svg'
import HeartIcon from '../../assets/Heart.svg'
import CommentIcon from '../../assets/Comment.svg'
import ShareIcon from '../../assets/Share.svg'

const BlogCard = (props) => {
    const heading = props.title
    const text = props.content
    const tagsArray = props.tags

    // if (text.length <= maxLength) {
    //     return <p>{text}</p>;
    // }
    const truncatedText = text.substring(0, 220) + '...';
    return (

        <div className={`h-[250px] w-[400px] mr-5 ${props.className} bg-white shadow-md border-[1px] border-border hover:border-black/50 rounded-lg dark:bg-darkBg dark:border-white/30 dark:hover:border-white/50`}>
            <div className="h-[216px] m-4 text-black relative flex">

                <div className='w-2/3 relative'>
                    <div className='h-8 w-full flex relative '>
                        <img src={props.profilePicture} alt="" className='h-full w-8 rounded-full mr-2 border-[1px]' />
                        <div className='flex flex-col justify-center '>
                            <h1 className='text-xs dark:text-white' >{props.author}</h1>
                            <p className='text-[8px] dark:text-white/50'>{props.date}</p>
                        </div>
                        <div className='h-full flex absolute right-0'>
                            <img src={FollowIcon} alt="Follow Icon" className='h-full w-3 mr-1 dark:fill-white' />
                            <h1 className='h-full flex font-[GillSans] items-center text-[8px] dark:text-white'>Follow</h1>
                        </div>
                    </div>

                    <div className='w-full font-[GillSans]'>
                        <h1 className=' text-dm font-semibold mt-3 leading-4 dark:text-white'>{heading}</h1>
                        <p className='text-xs font-regular mt-2 dark:text-white/50'>
                            {truncatedText}
                        </p>
                    </div>

                    <div className='h-6 w-full flex absolute bottom-0'>
                        <div className='flex mr-2'>
                            <img src={HeartIcon} alt="" className='h-full w-4 mr-1' />
                            <h1 className='h-full flex font-[GillSans] items-center text-[10px] mt-[2px] dark:text-white'>{props.likeCount} Likes</h1>
                        </div>

                        <div className='flex mr-2'>
                            <img src={CommentIcon} alt="" className='h-full w-4 mr-1' />
                            <h1 className='h-full flex font-[GillSans] items-center text-[10px] mt-[2px] dark:text-white'>{props.commentCount} Comments</h1>
                        </div>

                        <div className='h-full flex absolute right-0'>
                            <h1 className='h-full flex font-[GillSans] items-center text-[10px] mt-[2px] dark:text-white '>Share</h1>
                            <img src={ShareIcon} alt="" className='h-full w-4 pl-1' />
                        </div>
                    </div>
                </div>

                <div className='h-full w-1/3 flex items-center flex-col'>
                    <div className='h-5/6 flex justify-center items-end'>
                        <img src={props.banner} alt="" className='h-24 w-24 rounded-md' />
                    </div>

                    <div className='h-1/3 w-full py-2 px-2 font-[GillSans] text-xs flex justify-center flex-wrap'>
                        {tagsArray.map((tag, index) => (
                            <p key={index} className='h-4 text-[7px] text-white m-[1px] px-2 pt-[5px] pb-1 border-[1px] border-white/50 rounded-lg flex items-center shadow-sm'>#{tag}</p>
                        ))}
                    </div>
                </div>



            </div>

        </div >
    )
}

export default BlogCard