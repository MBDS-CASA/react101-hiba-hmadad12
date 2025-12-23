import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';

function App() {
  const [activeMenu, setActiveMenu] = useState("Notes");

  return (
    <>
      <Header activeMenu={activeMenu} onMenuClick={setActiveMenu} />
      <Menu />
      <Footer />
    </>
  )
}

export default App