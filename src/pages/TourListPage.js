import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import { axiosPublic } from '../api/axios';

import TourList from '../components/TourList/TourList';

import Spinner from '../components/UI/Spinner/Spinner';

const TourListPage = () => {
  const { tours } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={tours}>
        {({ data }) => <TourList tours={data} />}
      </Await>
    </Suspense>
  );
};

TourListPage.loader = ({ params }) =>
  defer({
    tours: axiosPublic.get(`tours`),
  });

export default TourListPage;
