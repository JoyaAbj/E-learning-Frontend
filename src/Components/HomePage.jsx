import React from 'react'
import Herosection from './Herosection'
import Languages from './Languages'
import Teachers from './Teachers'
import Contact from './Contact'
import About from './About'

const HomePage = () => {
  return (
    <div>
      <Herosection/>
      <About/>
      <Languages/>
      <Teachers/>
      <Contact/>
    </div>
  )
}

export default HomePage
