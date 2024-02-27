import Navbar from './components/Navbar'
import AllBooks from './components/AllBooks'
import Bookmark from './components/Bookmark'
import Footer from './components/Footer'
import DetailedBook from './components/DetailedBook'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='font-poppins'>
      <Router>
        <div className='w-[90%] mx-auto'>
          <Navbar />
          <Routes>
            <Route path='/' element={<AllBooks />}/>
            <Route path='/detailedView/:id' element={<DetailedBook />}/>
          </Routes>
          <Bookmark />
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App
