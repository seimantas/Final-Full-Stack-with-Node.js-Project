import { useContext, useEffect, useState } from 'react';
import { ItHavePremissionContext } from './components';
import { Events } from './components/Events';
import { ManeRouter } from './components/ManeRouter';

function App() {
  const loginContext=useContext(ItHavePremissionContext)
  const [isLogdin, setIsLogdin] = useState(loginContext.isLogdin);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogdin(true);
    } else {
      setIsLogdin(false);
    }
  }, [isLogdin]);

  return (
    <ItHavePremissionContext.Provider value={{isLogdin,setIsLogdin}}>
      <ManeRouter/>
    </ItHavePremissionContext.Provider>
  );
}

export default App;
