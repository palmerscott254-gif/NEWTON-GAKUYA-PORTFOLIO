import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import ErrorBoundary from '@components/ErrorBoundary';
import LoadingSpinner from '@components/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('@pages/Home'));
const Projects = lazy(() => import('@pages/Projects'));
const About = lazy(() => import('@pages/About'));
const Contact = lazy(() => import('@pages/Contact'));

export default function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn">
        Go Home
      </a>
    </div>
  );
}
