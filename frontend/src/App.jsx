import { useState, useEffect } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaGift, FaHeart } from 'react-icons/fa';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [rsvp, setRsvp] = useState(null);
  const [memories, setMemories] = useState([]);
  const [stats, setStats] = useState(null);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    }
    fetchMemories();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${API_URL}/guests/me`);
      setUser(res.data.user);
      setRsvp(res.data.rsvp);
      if (res.data.user.role === 'admin') {
        fetchAdminData();
      }
    } catch (error) {
      localStorage.removeItem('token');
    }
  };

  const fetchAdminData = async () => {
    try {
      const [statsRes, guestsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/stats`),
        axios.get(`${API_URL}/admin/guests`)
      ]);
      setStats(statsRes.data);
      setGuests(guestsRes.data.guests);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMemories = async () => {
    try {
      const res = await axios.get(`${API_URL}/memories`);
      setMemories(res.data.memories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const endpoint = isSignUp ? '/auth/signup' : '/auth/signin';
      const res = await axios.post(`${API_URL}${endpoint}`, data);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      setShowAuth(false);
      if (isSignUp) confetti({ particleCount: 100, spread: 70 });
    } catch (error) {
      alert(error.response?.data?.error || 'Authentication failed');
    }
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      attending: formData.get('attending') === 'true',
      numberOfGuests: parseInt(formData.get('numberOfGuests')) || 1,
      message: formData.get('message'),
      dietaryRestrictions: formData.get('dietaryRestrictions'),
      giftContribution: parseFloat(formData.get('giftContribution')) || 0
    };

    try {
      const res = await axios.post(`${API_URL}/rsvp`, data);
      setRsvp(res.data.rsvp);
      if (data.attending) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
      alert('RSVP saved successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save RSVP');
    }
  };

  const handleMemory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      type: 'wish',
      content: formData.get('content')
    };

    try {
      await axios.post(`${API_URL}/memories`, data);
      alert('Your message has been submitted for approval!');
      e.target.reset();
    } catch (error) {
      alert('Please sign in to post a message');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setRsvp(null);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = user.qrCode;
    link.download = 'invitation-qr.png';
    link.click();
  };

  const eventDate = new Date('2025-12-31T18:00:00'); // UPDATE THIS DATE
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const diff = eventDate - new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">60 Years of Grace</h1>
          <p className="hero-subtitle">Celebrating a Life Well Lived</p>
          <div className="hero-date">April 27th, 2026</div>
          <p style={{fontSize: '0.85rem', color: 'rgba(0, 0, 0, 0.7)', marginTop: '0.5rem'}}>
            💡 Update title, subtitle & date in App.jsx (Hero Section)
          </p>
          {!user && (
            <button className="cta-button" onClick={() => setShowAuth(true)}>
              RSVP Now
            </button>
          )}
        </div>
      </section>

      {/* Countdown */}
      {timeLeft && (
        <section className="countdown">
          <h2>Countdown to Celebration</h2>
          <div className="countdown-grid">
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number">{timeLeft.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>A Remarkable Journey</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="image-placeholder">
                <FaHeart size={60} />
                <p>Add Dad's Photo Here</p>
                <p style={{fontSize: '0.9rem', marginTop: '1rem', color: 'rgba(255,255,255,0.8)'}}>Replace this placeholder in App.jsx</p>
                {/* TO ADD PHOTO: Place image in frontend/public/ folder */}
                {/* Then replace this div with: */}
                {/* <img src="/dad-photo.jpg" alt="Dad" style={{width: '100%', maxWidth: '400px', borderRadius: '20px'}} /> */}
              </div>
            </div>
            <div className="about-text">
              <p>
                For 60 years, he has been a pillar of strength, wisdom, and love. 
                A devoted father, loving husband, and cherished friend to many.
              </p>
              <p>
                Join us as we celebrate this milestone with stories, laughter, 
                and gratitude for all the beautiful memories we've shared.
              </p>
              <p style={{fontSize: '0.9rem', color: '#999', marginTop: '1rem', fontStyle: 'italic'}}>
                💡 Update this text in frontend/src/App.jsx (About Section)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="event-details">
        <div className="container">
          <h2>Event Details</h2>
          <div className="details-grid">
            <div className="detail-card">
              <FaCalendar size={40} />
              <h3>Date</h3>
              <p>Saturday, April 27th, 2026</p>
              <p className="venue-address">UPDATE THIS DATE</p>
            </div>
            <div className="detail-card">
              <FaClock size={40} />
              <h3>Time</h3>
              <p>6:00 PM - 11:00 PM</p>
              <p className="venue-address">UPDATE THIS TIME</p>
            </div>
            <div className="detail-card">
              <FaMapMarkerAlt size={40} />
              <h3>Venue</h3>
              <p>29 Yayah Lane. </p>
              <p className="venue-address">Kossoh Town</p>
              <p className="venue-address" style={{fontSize: '0.8rem', color: '#999'}}>UPDATE THIS VENUE</p>
            </div>
          </div>
          <div className="map-container">
            {/* UPDATE GOOGLE MAPS LOCATION */}
            {/* Get embed code from: https://www.google.com/maps */}
            {/* Search your venue → Share → Embed a map → Copy HTML */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
              title="Event Location"
            ></iframe>
            <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#999'}}>
              💡 Update this map with your actual venue location
            </p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuth && !user && (
        <div className="modal-overlay" onClick={() => setShowAuth(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuth(false)}>×</button>
            <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
            <form onSubmit={handleAuth}>
              {isSignUp && (
                <>
                  <input name="name" placeholder="Full Name" required />
                  <input name="phone" placeholder="Phone Number" required />
                </>
              )}
              <input name="email" type="email" placeholder="Email" required />
              <input name="password" type="password" placeholder="Password" required />
              <button type="submit" className="submit-button">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <p className="auth-toggle">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Guest Dashboard */}
      {user && user.role === 'guest' && (
        <section className="dashboard">
          <div className="container">
            <h2>Welcome, {user.name}!</h2>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Your RSVP</h3>
                {rsvp ? (
                  <div className="rsvp-status">
                    <p className={rsvp.attending ? 'status-confirmed' : 'status-declined'}>
                      Status: {rsvp.attending ? '✓ Confirmed' : '✗ Declined'}
                    </p>
                    {rsvp.attending && (
                      <>
                        <p>Guests: {rsvp.numberOfGuests}</p>
                        {user.tableNumber && <p>Table: {user.tableNumber}</p>}
                      </>
                    )}
                  </div>
                ) : (
                  <p>No RSVP submitted yet</p>
                )}
              </div>
              <div className="dashboard-card">
                <h3>Your QR Code</h3>
                {user.qrCode && (
                  <>
                    <img src={user.qrCode} alt="QR Code" style={{ width: '200px' }} />
                    <button onClick={downloadQR} className="download-button">
                      Download Invitation
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="rsvp-form-section">
              <h3>Update RSVP</h3>
              <form onSubmit={handleRSVP} className="rsvp-form">
                <div className="form-group">
                  <label>Will you attend?</label>
                  <select name="attending" defaultValue={rsvp?.attending?.toString()}>
                    <option value="true">Yes, I'll be there!</option>
                    <option value="false">Sorry, can't make it</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Number of Guests (including you)</label>
                  <input
                    type="number"
                    name="numberOfGuests"
                    min="1"
                    max="5"
                    defaultValue={rsvp?.numberOfGuests || 1}
                  />
                </div>
                <div className="form-group">
                  <label>Dietary Restrictions</label>
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    placeholder="Any allergies or preferences?"
                    defaultValue={rsvp?.dietaryRestrictions}
                  />
                </div>
                <div className="form-group">
                  <label>Message for the Celebrant</label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Share your wishes..."
                    defaultValue={rsvp?.message}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label><FaGift /> Gift Contribution (Optional)</label>
                  <input
                    type="number"
                    name="giftContribution"
                    placeholder="Amount"
                    defaultValue={rsvp?.giftContribution}
                  />
                </div>
                <button type="submit" className="submit-button">Save RSVP</button>
              </form>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </section>
      )}

      {/* Admin Dashboard */}
      {user && user.role === 'admin' && stats && (
        <section className="admin-dashboard">
          <div className="container">
            <h2>Admin Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <FaUsers size={40} />
                <h3>{stats.totalGuests}</h3>
                <p>Total Guests</p>
              </div>
              <div className="stat-card confirmed">
                <h3>{stats.confirmed}</h3>
                <p>Confirmed</p>
              </div>
              <div className="stat-card declined">
                <h3>{stats.declined}</h3>
                <p>Declined</p>
              </div>
              <div className="stat-card pending">
                <h3>{stats.pending}</h3>
                <p>Pending</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalSeats}</h3>
                <p>Total Seats</p>
              </div>
              <div className="stat-card">
                <FaGift size={40} />
                <h3>${stats.giftContribution}</h3>
                <p>Gift Fund</p>
              </div>
            </div>

            <div className="guest-list">
              <h3>Guest List</h3>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Guests</th>
                      <th>Table</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest) => (
                      <tr key={guest._id}>
                        <td>{guest.name}</td>
                        <td>{guest.email}</td>
                        <td>{guest.phone}</td>
                        <td>
                          {guest.rsvp ? (
                            <span className={guest.rsvp.attending ? 'badge-success' : 'badge-danger'}>
                              {guest.rsvp.attending ? 'Confirmed' : 'Declined'}
                            </span>
                          ) : (
                            <span className="badge-warning">Pending</span>
                          )}
                        </td>
                        <td>{guest.rsvp?.numberOfGuests || '-'}</td>
                        <td>{guest.tableNumber || '-'}</td>
                        <td className="message-cell">{guest.rsvp?.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </section>
      )}

      {/* Memory Wall */}
      <section className="memory-wall">
        <div className="container">
          <h2>Memory Wall</h2>
          <p className="section-subtitle">Share your wishes and memories</p>

          {user && (
            <form onSubmit={handleMemory} className="memory-form">
              <textarea
                name="content"
                placeholder="Write your birthday wish or share a memory..."
                rows="4"
                required
              ></textarea>
              <button type="submit" className="submit-button">Post Message</button>
            </form>
          )}

          <div className="memories-grid">
            {memories.map((memory) => (
              <div key={memory._id} className="memory-card">
                <p className="memory-content">"{memory.content}"</p>
                <p className="memory-author">- {memory.userId?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>With love from the family</p>
          <p>For inquiries: contact@celebration.com | +1 (555) 123-4567</p>
          <p style={{fontSize: '0.85rem', color: '#666', marginTop: '0.5rem'}}>
            💡 Update contact info in App.jsx (Footer Section)
          </p>
          <p className="footer-note">© 2025 60th Birthday Celebration</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
