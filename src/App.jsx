import './App.css'
import { Header } from './components/header/header'
import { RoutesContainer } from './routes/routes'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './screens/authContext';


function App() {


  return (
    <>
    <BrowserRouter>
     <AuthProvider>
        <Header/>
        <main id='mainContainer'>
          <RoutesContainer/>
        </main>
     </AuthProvider>
    </BrowserRouter>

    </>
  )
}

export default App
