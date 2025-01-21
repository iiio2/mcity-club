import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { firebase } from './services/firebase.ts'
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
    </React.StrictMode>,
  )
})
