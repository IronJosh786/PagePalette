import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BookmarkProvider from './contexts/BookmarkContext.jsx'
import BooksContextProvider from './contexts/BooksContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BooksContextProvider>
    <BookmarkProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BookmarkProvider>
  </BooksContextProvider>
)
