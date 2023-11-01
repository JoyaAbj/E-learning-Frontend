import React from 'react';
import Herosection from './Herosection';
import About from './About';
import Languages from './Languages';
import Teachers from './Teachers';
import Contact from './Contact';

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
