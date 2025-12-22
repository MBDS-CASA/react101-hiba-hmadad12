import { useState } from 'react'
import reactLogo from '../assets/react.svg'
function Header(){
  return(
    <header>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Introduction à React</h1>
        <h2>A la découverte des premières notions de React</h2>
      </header>
  );
}
export default Header;