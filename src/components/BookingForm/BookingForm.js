import { useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ session }) => {
  const stripe = useStripe();
  const navigate = useNavigate();

  if (!stripe) {
    return navigate('/');
  }

  stripe.redirectToCheckout({
    sessionId: session.id,
  });

  return <></>;
};

export default BookingForm;
