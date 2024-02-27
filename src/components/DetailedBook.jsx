import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookmarkContext } from '../contexts/BookmarkContext';
import { useContext } from 'react';
import conf from '../../conf/conf';

function DetailedBook() {

    const googleKey = conf.googleKey;
    const {id} = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true)

    const {bookmarked, addToBookmark, removeFromBookmark} = useContext(BookmarkContext);

    if(id === 'noId') {
      return(<div className='h-full w-full flex items-center justify-center my-24'>No Information Available</div>)
    }

    const image = book?.volumeInfo?.imageLinks?.smallThumbnail || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    const title = book?.volumeInfo?.title || 'Title Not Available';
    const author = book?.volumeInfo?.authors || 'Author Not Available';
    const description = book?.volumeInfo?.description || 'NA';

    const isPresent = bookmarked.find(item => item.id == id);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}&key=${googleKey}`);
            let data = await response.json();
            data = data.items[0] || {};
            setBook(data);
            setLoading(false);
        } catch (error) {
          console.error('Error fetching book data:', error.message);
        }
      };

    useEffect(() => {
        fetchData();
    }, [id]);

    if(loading) {
      return <div className='flex items-center justify-center h-full w-full my-24'>Loading...</div>
    }

    return (
      <div className='w-full h-full flex flex-col md:flex-row mt-20 md:mt-32 gap-4 md:gap-20 md:justify-center md:items-center'>
          <div>
              <img className='h-80 w-60 object-cover rounded-xl mx-auto' src={image} alt="image" />
          </div>
          <div className='flex flex-col gap-4 mx-auto md:mx-0 text-center md:text-left'>
              <h2 className='text-xl md:text-2xl xl:text-3xl font-semibold'>{title}</h2>
              <h4 className='text-base md:text-lg xl:text-xl text-gray-500'>{author}</h4>
              <p className='max-w-[60ch]'>{description}</p>
              <div className='flex gap-4 justify-center md:justify-start'>
                <button onClick={() => addToBookmark({id, image, title, author, description})} className={`${isPresent ? 'hidden' : 'flex'} cursor-pointer md:text-left rounded-lg p-1 transition bg-[#91c8ff] ring-[#91c8ff] hover:ring-4  hover:bg-white`}>Add to your Palette</button>
                <button onClick={() => removeFromBookmark(id)} className={`${isPresent ? 'flex' : 'hidden'} cursor-pointer md:text-left rounded-lg p-1 transition bg-red-400 hover:ring-4 ring-red-400 hover:bg-white`}>Remove from your Palette</button>
              </div>
          </div>
      </div>
    )
}

export default DetailedBook