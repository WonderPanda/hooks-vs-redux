import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HookPowered } from './components/HookPowered';
import { ReduxPowered } from './components/ReduxPowered';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <HookPowered />
        <ReduxPowered />
      </header>
    </div>
  );
}

export default App;
