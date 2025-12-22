import { useState } from 'react'
import './App.css'

import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [activeMenu, setActiveMenu] = useState("Notes");

  return (
    <>
      <Header activeMenu={activeMenu} onMenuClick={setActiveMenu} />
      <MainContent activeMenu={activeMenu} />
      <Footer />
    </>
  )
}

export default App