import React, { useState } from 'react';
import './calendar.scss'; 

function CustomCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const notFullyBooked = [new Date(2025, 5, 24).toDateString()];
  const fullyBooked = [new Date(2025, 5, 27).toDateString()];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDay = startOfMonth.getDay();
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const stringDate = date.toDateString();
    const isSelected = selectedDate?.toDateString() === stringDate;
    const isNotFullyBooked = notFullyBooked.includes(stringDate);
    const isFullyBooked = fullyBooked.includes(stringDate);

    let className = 'calendar-day';
    if (isSelected) className += ' selected';
    else if (isNotFullyBooked) className += ' not-fully-booked';
    else if (isFullyBooked) className += ' fully-booked';

    return (
      <div
        key={day}
        className={className}
        onClick={() => setSelectedDate(date)}
      >
        {day}
      </div>
    );
  };

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(renderDay(i));
  }

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="calendar-wrapper">
      <div className="calendar-legend">
        <h4>Legend</h4>
        <div><span className="legend-dot selected" /> Chosen Date</div>
        <div><span className="legend-dot not-fully-booked" /> Not fully booked</div>
        <div><span className="legend-dot fully-booked" /> Fully booked</div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <span>
            {currentDate.toLocaleString('default', { month: 'long' }).toUpperCase()} {currentDate.getFullYear()}
          </span>
          <button onClick={nextMonth}>&gt;</button>
        </div>

        <div className="calendar-weekdays">
          {weekdays.map((day) => <div key={day}>{day}</div>)}
        </div>

        <div className="calendar-grid">{days}</div>
      </div>
    </div>
  );
}

export default CustomCalendar;
