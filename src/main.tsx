import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { firebase } from './services/firebase.ts'
import App from './App.tsx'
import './resources/css/app.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

firebase.auth().onAuthStateChanged((user) => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App user={user} />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
})
