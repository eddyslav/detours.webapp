import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { axiosPrivate } from '../api/axios';

import Spinner from '../components/UI/Spinner/Spinner';
import BookingForm from '../components/BookingForm/BookingForm';

const stripe = loadStripe(
  'pk_test_51MFCqmHFaDsXJjmGHbofTZ4cgSNLfmyWOtb4nQ5EZcfBFi4W42nqkifyzyatRbYy5J3NOJqALVn3ftI9ESmKW9tI00m18Bgmpm'
);

const BookingPage = () => {
  const { checkoutSession } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={checkoutSession}>
        {({ data }) => (
          <Elements stripe={stripe}>
            <BookingForm session={data} />
          </Elements>
        )}
      </Await>
    </Suspense>
  );
};

BookingPage.loader = ({ params }) =>
  defer({
    checkoutSession: axiosPrivate.get(`bookings/checkout-session/${params.id}`),
  });

export default BookingPage;
