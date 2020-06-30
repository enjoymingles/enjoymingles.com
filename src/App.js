import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events.js";

import "./App.css";
import "./style.scss"

function App() {
  const localizer = momentLocalizer(moment);

  const handleEvent = (event) => {
    alert(event.description)
  }

  return (
    <div>
      <div className="jumbotron">
          <div className="container">
            <h1>
              Mingles Calendar <i className="fa fa-calendar" />
            </h1>
            <p>밍글스 아지트 Upcoming Events</p>
          </div>
      </div>
      <div className="examples">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          showMultiDayTimes
          style={{ height: "100vh" }}
          onSelectEvent={event => handleEvent(event)}
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
      </div>
    </div>
  );
}

export default App;
