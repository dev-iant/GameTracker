import react, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Home from './components/Home'
import ShowOne from './components/ShowOne'
import Edit from './components/Edit'
import Form from './components/Form'
import RandomGame from './components/RandomGame'
import RandomAdd from './components/RandomAdd'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path='/game/view/:id' element={ <ShowOne /> } />
          <Route path='/game/edit/:id' element={ <Edit /> } />
          <Route path='/game/new' element={ <Form /> } />
          <Route path='/game/random' element={ <RandomGame /> } />
          <Route path='/game/:name' element={ <RandomAdd /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
