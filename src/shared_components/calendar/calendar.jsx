import React, { useState } from 'react';
import './calendar.scss';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);

    const days = [];

    // Blank cells before start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
    }

    // Actual days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-cell day ${isSelected ? 'selected' : ''}`}
          onClick={() => onDateSelect(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>{'<'}</button>
        <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
        <button onClick={goToNextMonth}>{'>'}</button>
      </div>
      <div className="calendar-grid day-labels">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="calendar-cell label">{d}</div>
        ))}
      </div>
      <div className="calendar-grid">{generateCalendar()}</div>
    </div>
  );
};

export default Calendar;
