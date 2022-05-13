import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast"
/* import { createTheme, ThemeProvider } from '@mui/material/styles';
 const theme = createTheme({
  palette: {
    primary: {
      light: '#ffd699',
      main: '#ffa726',
      dark: '#b2741a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d4e157',
      main: '#8bc34a',
      dark: '#618833',
      contrastText: '#000',
    },
  },
}); */


function App() {
/*   const background = {
    backgroundImage: 'url'('2794169.jpg'),
    filter: "blur"(4px);
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  } */

  return (
   
      <div className="App">
        <main className="main" /*style={background}*/>
          <Forecast />
        </main>
        <footer>
          Page created by Brit Tudósok, Inc.
        </footer>
      </div>
  
  );
}

export default App;