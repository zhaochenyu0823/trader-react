import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './pages/NavBar'
import './styles/index.css'
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';



Amplify.configure(config);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar/>
  </React.StrictMode>,
)
