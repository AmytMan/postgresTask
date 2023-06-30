import React from 'react'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import NotesTable from './components/NotesTable'
import Create from './components/Create';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './components/Update';
function App() {
  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<NotesTable/>}/>
        <Route path='/addnotes' element={<Create/>}/>
        <Route path='/updates/:id' element={<Update/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App