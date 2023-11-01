import React from 'react'
import About from './About'
import Languages from './Languages'
import Teachers from './Teachers'
import Contact from './Contact'
import Herosection from './Herosection'

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
