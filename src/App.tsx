import './App.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  getPublicGuestToken,
  setPublicGuestToken,
} from './eg_SFCC_FE_core/api/apiAuth';

function App() {
  useEffect(() => {
    if (Cookies.get('token')) {
      setPublicGuestToken();
    } else getPublicGuestToken();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Empower Global web app</p>
      </header>
    </div>
  );
}

export default App;
