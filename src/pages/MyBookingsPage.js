import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { axiosPrivate } from "../api/axios";

import Spinner from "../components/UI/Spinner/Spinner";
import TourList from "../components/TourList/TourList";

const MyBookingsPage = () => {
  const { tours } = useLoaderData();

  return <Suspense fallback={<Spinner/>}>
	<Await resolve={tours}>
	  {({ data }) => <TourList tours={data.map(x => x.tour)}/>}
	</Await>
  </Suspense>
};

MyBookingsPage.loader = () => defer({
  tours: axiosPrivate.get('bookings/my')
});

export default MyBookingsPage;
