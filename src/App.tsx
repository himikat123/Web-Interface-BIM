import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './organisms/navbar/navbar';

function App() {
  return (
    <div className="App overflow-x-hidden">
      <Navbar />

      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;