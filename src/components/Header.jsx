import { NavLink } from 'react-router-dom';
import universityLogo from '../assets/univ.avif';

function Header() {
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Notes', path: '/notes' },
    { label: 'Etudiants', path: '/etudiants' },
    { label: 'Matières', path: '/matieres' },
    { label: 'À propos', path: '/apropos' }
  ];

  return (
    <header>
      {/* MENU À GAUCHE */}
      <nav>
        <ul
          style={{
            display: 'flex',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
        >
          {menuItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontWeight: isActive ? 'bold' : '500',
                  color: isActive ? '#61dafb' : '#e0e0e0',
                  borderBottom: isActive ? '2px solid #61dafb' : 'none',
                  paddingBottom: '4px'
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* CONTENU CENTRÉ */}
      <div className="header-center">
        <img
          src={universityLogo}
          alt="University logo"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />

        <h1>Introduction à React</h1>
        <h2>À la découverte des premières notions de React</h2>
      </div>
    </header>
  );
}

export default Header;
