import { AppDataContext } from './components';
import { ManeRouter } from './components/ManeRouter';

function App() {
  return (
     <AppDataContext.Provider value={INITIA}>
      <ManeRouter/>
    </AppDataContext.Provider>
  );
}

export default App;
