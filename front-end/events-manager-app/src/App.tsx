import { useContext, useEffect, useState } from 'react';
import { ItHavePremissionContext } from './components/ItHavePremissinContext/ItHavePremissionContext';
import { ItHavePremission } from './components/ItHavePremissinContext/type';
import { ManeRouter } from './components/ManeRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const loginContext=useContext<ItHavePremission>(ItHavePremissionContext)
  const [isLogdin, setIsLogdin] = useState(loginContext.isLogdin);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogdin(true);
    } else {
      setIsLogdin(false);
    }
  }, [isLogdin]);

  const theme = createTheme({
    typography: {
      fontFamily:  'BlinkMacSystemFont',
      fontSize: 18,
    },
    palette: {
      primary: {
        main: '#34495E', 
      },
      background: {
        default: '#95A5A6',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ItHavePremissionContext.Provider value={{isLogdin,setIsLogdin}}>
        <ManeRouter/>
      </ItHavePremissionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
