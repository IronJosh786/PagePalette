import React from 'react';
import { useEffect } from 'react';
import { createContext, useState } from 'react';

export const BookmarkContext = createContext();

const BookmarkProvider = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  // Load bookmarked items from localStorage on component mount
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked')) || [];
    setBookmarked(storedBookmarks);
  }, []);

  // Save bookmarked items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookmarked', JSON.stringify(bookmarked));
  }, [bookmarked]);

  const addToBookmark = ({id, image, title, author, description}) => {
    const isPresent = bookmarked.find(item => item.id == id);
    if(!isPresent) {
      const newBook = {
        id: id,
        image: image,
        title: title,
        author: author,
        description: description
      }
      setBookmarked(prev => [...prev, newBook]);
    } else {
      return;
    }
  }

  const removeFromBookmark = (id) => {
    setBookmarked(list => list.filter(item => item.id != id));
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return <BookmarkContext.Provider value={{isOpen, setIsOpen, handleClose, bookmarked, addToBookmark, removeFromBookmark}}>{children}</BookmarkContext.Provider>;
};

export default BookmarkProvider;