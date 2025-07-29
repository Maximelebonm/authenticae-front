import './App.css'
import { Header } from './components/header/header'
import { RoutesContainer } from './routes/routes'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './screens/authContext';
import { Footer } from './components/footer/footer';
import { ScrollToTop } from './helpers/scrollTotop';

function App() {


  return (
    <>
      <BrowserRouter>
         <ScrollToTop/>
      <AuthProvider>
          <Header/>
          <main id='mainContainer'>
            <RoutesContainer/>
          </main>
      <Footer/>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
