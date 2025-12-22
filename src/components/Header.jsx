import React from 'react';
import reactLogo from '../assets/react.svg';

function Header({ activeMenu, onMenuClick }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  return (
    <header>
      {/* Menu EN HAUT À GAUCHE */}
      <nav style={{ 
        position: 'absolute',
        left: '20px',
        top: '20px',
        zIndex: 10
      }}>
        <ul style={{ 
          display: 'flex', 
          gap: '20px', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0
        }}>
          {menuItems.map((item) => (
            <li
              key={item}
              style={{ 
                cursor: 'pointer', 
                fontWeight: activeMenu === item ? 'bold' : '500',
                color: activeMenu === item ? '#61dafb' : '#e0e0e0',
                fontSize: '16px',
                borderBottom: activeMenu === item ? '2px solid #61dafb' : 'none',
                paddingBottom: '4px',
              }}
              onClick={() => onMenuClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* LOGO + TITRES AU CENTRE - SIMPLE */}
      <div style={{ 
        textAlign: 'center', 
        color: 'white',
        padding: '20px 0'
      }}>
        <img 
          src={reactLogo} 
          alt="React logo" 
          style={{ 
            width: '100px', 
            height: '100px',
            display: 'block',
            margin: '0 auto 20px auto'
          }}
        />

        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold',
          margin: '0 0 10px 0'
        }}>
          Introduction à React
        </h1>
        
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '300',
          margin: '0'
        }}>
          A la découverte des premières notions de React
        </h2>
      </div>
    </header>
  );
}

export default Header;