import React from 'react'
import Navbar from './components/Navbar/Navbar'



import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/SidebarNew/Sidebar'

function App() {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
      
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Order/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
