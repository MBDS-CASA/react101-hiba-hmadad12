import React from 'react';
import reactLogo from '../assets/react.svg';

function Header({ activeMenu, onMenuClick }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  return (
    <header style={{ 
      position: 'relative',
      padding: '20px',
      borderBottom: '1px solid #444',
      backgroundColor: '#1a1a1a'
    }}>
      
      {/* Menu en haut à gauche */}
      <nav style={{ position: 'absolute', left: '20px', top: '20px' }}>
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
                transition: 'all 0.3s ease'
              }}
              onClick={() => onMenuClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logo et titre - centré */}
      <div style={{ textAlign: 'center', color: 'white' }}>
        <img src={reactLogo} alt="React logo" style={{ width: '80px', height: '80px' }} />
        <h1 style={{ margin: '20px 0 10px', fontSize: '48px', fontWeight: 'bold' }}>
          Introduction à React
        </h1>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '300', color: '#b0b0b0' }}>
          A la découverte des premières notions de React
        </h2>
      </div>
    </header>
  );
}

export default Header;