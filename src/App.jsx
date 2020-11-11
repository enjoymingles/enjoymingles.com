import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./App.css";
import "./style.scss";
import { fetchPost } from "./mEvent";
import Swal from "sweetalert2";

function App() {
  const localizer = momentLocalizer(moment);

  const { isLoading, error, data } = useQuery("fetchEvents", async () => {
    const { data: events } = await axios("http://localhost:8000/events");
    events.map((e) => {
      e.start = moment(e.start, "YYYYMMDD hh:mm:ss").toDate();
      e.end = moment(e.end, "YYYYMMDD hh:mm:ss").toDate();
    });
    return events;
  });

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      let newEvent = {
        start: start,
        end: end,
        title: title,
      };
      const response = fetchPost("http://localhost:8000/events", newEvent);
      if (response.data.code === 0) {
        Swal.fire({
          title: "성공.",
          icon: "success",
        });
      }
    }
  };

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
        {error && <div>Something went wrong …</div>}
        {data && (
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={data}
            showMultiDayTimes
            style={{ height: "100vh" }}
            onSelectSlot={handleSelect}
            onSelectEvent={(event) => alert(event.description)}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
              },
            })}
            selectable={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
