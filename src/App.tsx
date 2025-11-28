import { Suspense, lazy } from 'react';
import Layout from '@components/Layout/Layout';
import ErrorBoundary from '@components/ErrorBoundary';
import LoadingSpinner from '@components/LoadingSpinner';

// Lazy load the single page for better performance
const Home = lazy(() => import('@pages/Home'));

export default function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Home />
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}
