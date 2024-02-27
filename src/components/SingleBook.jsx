import React from 'react';
import { Link } from 'react-router-dom';

function SingleBook({ book }) {
    const isbn13 = book?.volumeInfo?.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || 'noId';
    const id = book?.id;
    const image = book?.volumeInfo?.imageLinks?.smallThumbnail || 'noImage';
    const title = book?.volumeInfo?.title || 'Title Not Available';
    const author = book?.volumeInfo?.authors?.join(', ') || 'Author Not Available';
    const date = book?.volumeInfo?.publishedDate && new Date(book.volumeInfo.publishedDate).getFullYear() || 'NA';

    if(image === 'noImage') {
        return null;
    }

    return (
        <Link to={`/detailedView/${isbn13}`}>
            <div key={id} className='shrink-0 w-32 md:w-40 cursor-pointer transition hover:scale-105'>
                <div className='h-52 md:h-60 w-full'>
                    <img className='h-full w-full object-cover object-center rounded-xl' src={image} alt="image" />
                </div>
                <div className='flex justify-between w-full mt-2'>
                    <div className='flex flex-col'>
                        <h3 className='font-bold line-clamp-1'>{title}</h3>
                        <p className='mt-1 text-gray-600 line-clamp-3'>{author}</p>
                    </div>
                    <div className='font-bold'>{date}</div>
                </div>
            </div>
        </Link>
    );
}

export default SingleBook;
