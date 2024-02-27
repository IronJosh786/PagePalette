import React from 'react'
import { BookmarkContext } from '../contexts/BookmarkContext.jsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Bookmark() {
  
    const {isOpen, handleClose, bookmarked} = useContext(BookmarkContext);

    const display = (item) => {
        
        const {id, image} = item;
        
        return(
            <Link  key={id} to={`/detailedView/${id}`}>
                <div className='w-32 cursor-pointer'>
                    <div className='h-52 w-full'>
                        <img className='h-full w-full object-cover object-center rounded-xl' src={image} alt="image" />
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div className={`scroller z-20 bg-white h-full w-full md:w-[35%] xl:w-[30%] fixed top-0 ${isOpen ? 'right-0' : '-right-full'} shadow-xl p-4 overflow-scroll all ease-in-out duration-500`}>
            <div className='flex justify-between items-center'>
                <h2 className='font-semibold text-md md:text-lg xl:text-xl'>Your Palette</h2>
                <div className='w-8 h-8 rounded-full bg-[#e2e2e2] flex items-center justify-center text-md md:text-lg xl:text-xl hover:cursor-pointer' onClick={handleClose}><i className="ri-close-line"></i></div>
            </div>
            <div className='flex flex-wrap justify-center gap-4 mt-8'>
                {bookmarked.map(display)}
            </div>
        </div>
  )
}

export default Bookmark