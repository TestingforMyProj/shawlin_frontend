import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Router from '../Components/Router'

const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <Router />
      </div>
      <Footer />
    </div>
  )
}

export default Layout