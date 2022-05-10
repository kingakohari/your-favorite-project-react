import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast"


function App() {
  const background = {
    backgroundImage: 'url(https://source.unsplash.com/random/?weather)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
      <div className="App">
        {/* <header className="App-header">
          <h1>React Weather App</h1>
        </header> */}
        <main className="main" style={background}>
          <Forecast />
        </main>
        <footer>
          Page created by Brit Tudósok, Inc.
        </footer>
    </div>
  );
}

export default App;
