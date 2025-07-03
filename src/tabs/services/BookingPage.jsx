import { useParams } from 'react-router-dom';
import BookingForm from '../../features/booking-form/booking-form';

function BookingPage() {
  const { style } = useParams(); // e.g., "birthday"

  return (
    <div className="booking-form-container">
      <BookingForm selectedStyle={style} /> {/* ✅ Pass it in */}
    </div>
  );
}

export default BookingPage;
