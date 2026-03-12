import React from 'react';

const RSVP = () => {
  return (
    <section id="rsvp">
      <h2>RSVP</h2>
      <form>
        <div>
          <label>
            <input type="radio" name="attending" value="yes" /> Attending
          </label>
          <label>
            <input type="radio" name="attending" value="no" /> Not Attending
          </label>
        </div>
        <div>
          <label>Number of Guests:</label>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Message:</label>
          <textarea />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default RSVP;
