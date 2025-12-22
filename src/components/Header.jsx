import React from 'react';
import reactLogo from '../assets/react.svg';

function Header({ activeMenu, onMenuClick }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  return (
    <header>
      {/* MENU À GAUCHE */}
      <nav>
        <ul style={{ 
          display: 'flex',
          gap: '20px',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {menuItems.map(item => (
            <li
              key={item}
              onClick={() => onMenuClick(item)}
              style={{
                cursor: 'pointer',
                fontWeight: activeMenu === item ? 'bold' : '500',
                color: activeMenu === item ? '#61dafb' : '#e0e0e0',
                borderBottom: activeMenu === item ? '2px solid #61dafb' : 'none',
                paddingBottom: '4px'
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* CONTENU CENTRÉ */}
      <div className="header-center">
        <img
          src={reactLogo}
          alt="React logo"
          width={100}
          height={100}
        />

        <h1>Introduction à React</h1>

        <h2>À la découverte des premières notions de React</h2>
      </div>
    </header>
  );
}

export default Header;
