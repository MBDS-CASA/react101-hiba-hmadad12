import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function Header() {
  return (
    <header style={{ textAlign: 'center', marginBottom: '20px' }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}
function MainContent() {
  return (
    <main style={{ textAlign: 'center', margin: '20px 0' }}>
      <p>Ici, nous afficherons des informations interessantes :)</p>
    </main>
  );
}
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="card" style={{ textAlign: 'center' }}>
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
