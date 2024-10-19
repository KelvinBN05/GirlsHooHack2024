import React, { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [major, setMajor] = useState('');
  const [startDate, setStartDate] = useState(null); // Start of the range
  const [endDate, setEndDate] = useState(null);     // End of the range
  const [events, setEvents] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fetch events from your backend (dummy data here)
    const mockEvents = [
      { title: "Data Science Seminar", time: "2:00 PM", major: "Data Science", date: new Date("2024-10-20") },
      { title: "Entrepreneurship Talk", time: "4:00 PM", major: "Business", date: new Date("2024-10-21") },
      { title: "Chemistry Lab Workshop", time: "11:00 AM", major: "Chemistry", date: new Date("2024-10-22") }
    ];

    // Filter events by major and date range
    const filteredEvents = mockEvents.filter(event => 
      event.major.toLowerCase() === major.toLowerCase() &&
      event.date >= startDate &&
      event.date <= endDate
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
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Select a date range"
              className="time-window-input"
              dateFormat="MMMM d, yyyy" // Example: October 19, 2024
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

export default App;
