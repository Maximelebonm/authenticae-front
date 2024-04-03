import { useState } from 'react'
import './App.css'
import { HomeScreen } from './screens/homeScreen/homeScreen'
import { Header } from './components/header/header'
import { RoutesContainer } from './routes/routes'
import { BrowserRouter } from 'react-router-dom';


function App() {


  return (
    <>
    <BrowserRouter>
        <Header/>
        <main id='mainContainer'>
          <RoutesContainer/>
        </main>
    </BrowserRouter>

    </>
  )
}

export default App
