import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import Layout from './components/Layout/Layout';

import TourListPage from './pages/TourListPage';
import TourDetailPage from './pages/TourDetailPage';
import MyBookingsPage from "./pages/MyBookingsPage";

import BookingPage from './pages/BookingPage';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import { loader as logoutLoader } from './pages/LogoutPage';

import ErrorBoundaryPage from './pages/ErrorBoundaryPage';

import { RequireAuth } from './utils';

const router = createBrowserRouter(
  createRoutesFromElements(
	<Route path='/' element={<Layout/>} errorElement={<ErrorBoundaryPage/>}>
	  <Route index element={<TourListPage/>} loader={TourListPage.loader}/>
	  <Route
		path=':slug'
		element={<TourDetailPage/>}
		loader={TourDetailPage.loader}
	  />

	  <Route path='/login' element={<LoginPage/>} action={LoginPage.action}/>

	  <Route
		path='/sign-up'
		element={<SignUpPage/>}
		action={SignUpPage.action}
	  />

	  <Route
		path='/booking/:id'
		element={
		  <RequireAuth>
			<BookingPage/>
		  </RequireAuth>
		}
		loader={BookingPage.loader}
	  />

	  <Route
		path='/my-bookings'
		element={
		  <RequireAuth>
			<MyBookingsPage/>
		  </RequireAuth>
		}
		loader={MyBookingsPage.loader}
	  />

	  <Route path='/logout' loader={logoutLoader}/>
	</Route>
  )
);

const App = () => (
  <>
	<ReactNotifications/>
	<RouterProvider router={router}/>
  </>
);

export default App;
