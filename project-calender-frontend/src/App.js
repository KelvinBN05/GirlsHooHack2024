// The Best Website 
import React, { useState } from 'react';
import './App.css';
// I cant rememeber if this is what I'm meant to do here 
function App() {
  const [major, setMajor] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [events, setEvents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mockup event filtering logic - hopefully here is where the web scraping will be used 
    const mockEvents = [
      { title: "Data Science Seminar", time: "2:00 PM", major: "Data Science" },
      { title: "Entrepreneurship Talk", time: "4:00 PM", major: "Business" },
      { title: "Chemistry Lab Workshop", time: "11:00 AM", major: "Chemistry" }
    ];

    const filteredEvents = mockEvents.filter(event => 
      event.major.toLowerCase() === major.toLowerCase() && event.time.includes(timeWindow)
    );

    setEvents(filteredEvents.length ? filteredEvents : [{ title: "No events found" }]);
  };

  return (
    <div className="App">
      <header>
        <h1>UVA Event Finder</h1>
      </header>

      <section className="input-section">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="major">Select Your Major:</label>
            <select id="major" value={major} onChange={(e) => setMajor(e.target.value)}>
              <option value="">--Choose Major--</option>
              <option value="Data Science">Data Science</option>
              <option value="Business">Business</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeWindow">Choose Time Window:</label>
            <input 
              type="text" 
              id="timeWindow" 
              placeholder="Choose your start date/time! " 
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)} 
            />
          </div>

          <button type="submit">Find Events</button>
        </form>
      </section>

      <section className="event-list">
        <h2>Event Results:</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.title} - {event.time}</li>
          ))}
        </ul>
      </section>

      <footer>
        <h2>Discover More at UVA</h2>
        <img
          className="footer-img"
          src="https://images.unsplash.com/photo-1601077454444-15666045a3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg5NzZ8MHwxfGFsbHwxfHx8fHx8fHwxNjExMjU2MDI2&ixlib=rb-1.2.1&q=80&w=1080"
          alt="UVA campus"
        />
      </footer>
    </div>
  );
}
// random image don't trip 
// one image at the bottom, two on the sides - ideally 
export default App;
