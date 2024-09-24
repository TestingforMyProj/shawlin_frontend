import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landio from '../Pages/Landio'

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landio />} />
      </Routes>
    </div>
  )
}

export default Router