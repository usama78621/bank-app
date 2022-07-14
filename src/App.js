import './App.scss';
import React from 'react';
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from './pages/Routes';
import { ToastContainer } from 'react-toastify';
import { useGobalContext } from './context/UserContext';
import ScreenLoade from './ScreenLoarder';
function App() {
  const { isLoader } = useGobalContext()
  return (
    <>
      {isLoader
        ? <ScreenLoade />
        : <Routes />
      }
      <ToastContainer />
    </>
  );
}

export default App;
