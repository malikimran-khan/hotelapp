import React from 'react'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Admin from './components/Admin'
import Login from './components/Login'
import Signup from './components/Signup'
import Insertdata from './components/Insertdata'
import Modify from './components/Modify'
import Updatedata from './components/Updatedata'
import Home1 from './components/Home1'
import Booked from './components/Booked'
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/insertdata' element={<Insertdata/>}></Route>
        <Route path='/modify' element={<Modify/>}></Route>
        <Route path='/update/:id' element={<Updatedata/>}></Route>
        <Route path='/home1' element={<Home1/>}></Route>
        <Route path='/booked/:id' element={<Booked/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
