import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import EventDetails from './components/EventDetails';
import Auth from './components/Auth';
import RSVP from './components/RSVP';
import Dashboard from './components/Dashboard';
import GuestList from './components/GuestList';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <EventDetails />
      <Auth />
      <RSVP />
      <Dashboard />
      <GuestList />
      <Footer />
    </div>
  );
}

export default App;