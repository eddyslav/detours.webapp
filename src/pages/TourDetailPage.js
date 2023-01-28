import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import { axiosPublic } from '../api/axios';

import Spinner from '../components/UI/Spinner/Spinner';

import TourDetail from '../components/TourDetail/TourDetail';

const TourDetailPage = () => {
  const { tour } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={tour}>{({ data }) => <TourDetail tour={data} />}</Await>
    </Suspense>
  );
};

TourDetailPage.loader = ({ params: { slug } }) =>
  defer({ tour: axiosPublic.get(`tours/${slug}`) });

export default TourDetailPage;
