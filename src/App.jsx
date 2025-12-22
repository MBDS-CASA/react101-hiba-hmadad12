
import { useState } from 'react'
import './App.css'


import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import RandomNote from "./components/RandomNote.jsx";
function App() {

  return (
    <>
      <Header />
      <MainContent />
      <RandomNote />
      <Footer />
    </>
  )
}

export default App