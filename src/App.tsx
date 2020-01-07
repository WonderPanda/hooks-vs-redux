import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HookPowered } from './components/HookPowered';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <HookPowered />
      </header>
    </div>
  );
}

export default App;
