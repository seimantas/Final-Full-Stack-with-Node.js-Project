import { useContext, useEffect, useState } from 'react';
import { ItHavePremissionContext } from './components/ItHavePremissinContext/ItHavePremissionContext';
import { ItHavePremission } from './components/ItHavePremissinContext/type';
import { ManeRouter } from './components/ManeRouter';

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

  return (
    <ItHavePremissionContext.Provider value={{isLogdin,setIsLogdin}}>
      <ManeRouter/>
    </ItHavePremissionContext.Provider>
  );
}

export default App;