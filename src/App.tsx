import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Clients from "./components/Clients";

function App() {
    return (
        <div className="min-h-screen">
            <Header/>
            <Hero/>
            <About/>
            <Services/>
            <Clients/>
            <Contact/>
            <Footer/>
        </div>
    );
}

export default App;