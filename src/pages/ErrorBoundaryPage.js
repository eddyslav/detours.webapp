import { useRouteError } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import ErrorBoundary from '../components/UI/ErrorBoundary/ErrorBoundary';

const ErrorBoundaryPage = () => {
  const error = useRouteError();

  return (
    <>
      <Header />

      <ErrorBoundary error={error} />

      <Footer />
    </>
  );
};

export default ErrorBoundaryPage;
