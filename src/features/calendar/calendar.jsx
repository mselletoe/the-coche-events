import React, { useState } from 'react';
import './calendar.scss';

function Calendar({ 
  bookedDates = [],
  fullyBookedDates = [], 
  currentDate = new Date(), 
  selectedDate,
  onDateClick = () => {},
  className = '' 
}) {
  const [displayDate, setDisplayDate] = useState(currentDate);

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  
  const dayNames = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];


  const createSafeDate = (year, month, day) => {
    return new Date(year, month, day, 12);
  };

  const today = createSafeDate(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();

  const firstDay = createSafeDate(currentYear, currentMonth, 1);
  const lastDay = createSafeDate(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();

  const startingDayOfWeek = firstDay.getDay();
  const prevMonth = createSafeDate(currentYear, currentMonth, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const navigateMonth = (direction) => {
    const newDate = new Date(displayDate);
    newDate.setMonth(currentMonth + direction);
    setDisplayDate(newDate);
  };

  const formatDateKey = (date) => {
    return date.getFullYear() + '-' +
      String(date.getMonth() + 1).padStart(2, '0') + '-' +
      String(date.getDate()).padStart(2, '0');
  };

  const isToday = (date) => {
    const compareDate = createSafeDate(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return compareDate.getTime() === today.getTime();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return formatDateKey(date) === formatDateKey(selectedDate);
  };

  const getDateStatus = (date) => {
    const dateKey = formatDateKey(date);

    if (isSelected(date)) return 'selected';
    if (isToday(date)) return 'today';
    if (fullyBookedDates.includes(dateKey)) return 'fully-booked';
    if (bookedDates.includes(dateKey)) return 'booked';

    return 'available';
  };

  const handleDateClick = (date) => {
    const dateKey = formatDateKey(date);
    const isBooked = bookedDates.includes(dateKey);
    const isFullyBooked = fullyBookedDates.includes(dateKey);
    const isAlreadySelected = selectedDate && formatDateKey(selectedDate) === dateKey;

    if (fullyBookedDates.includes(dateKey)) return; // prevent selecting fully booked

    onDateClick(date);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = createSafeDate(currentYear, currentMonth - 1, daysInPrevMonth - i);
      days.push(
        <div key={`prev-${daysInPrevMonth - i}`} className="calendar-day other-month">
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = createSafeDate(currentYear, currentMonth, day);
      const status = getDateStatus(date);

      days.push(
        <div
          key={`current-${day}`}
          className={`calendar-day current-month ${status}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    // Next month days
    const totalCells = 42;
    const remainingCells = totalCells - days.length;

    for (let day = 1; day <= remainingCells; day++) {
      const date = createSafeDate(currentYear, currentMonth + 1, day);
      days.push(
        <div key={`next-${day}`} className="calendar-day other-month">
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`calendar-container ${className}`}>
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateMonth(-1)} aria-label="Previous month">
          <i className="fas fa-chevron-left"></i>
        </button>
        <h2 className="month-title">{monthNames[currentMonth]}</h2>
        <button className="nav-button" onClick={() => navigateMonth(1)} aria-label="Next month">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="day-headers">
        {dayNames.map((day, index) => (
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
}

export default Calendar;