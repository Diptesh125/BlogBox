import React from 'react'
import { useSelector } from 'react-redux'

const MyFeed = () => {
    const darkTheme = useSelector((state) => state.theme.darkTheme)
    return (
        <div>MyFeed</div>
    )
}

export default MyFeed