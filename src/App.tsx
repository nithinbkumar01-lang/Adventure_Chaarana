import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { TrekDetailsPage } from './pages/TrekDetailsPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { SafetyPage } from './pages/SafetyPage';
import { SiteDataProvider } from './context/SiteDataContext';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

function AppContent({ showPromo, setShowPromo }: { showPromo: boolean; setShowPromo: (value: boolean) => void }) {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return <AdminPage />;

  return (
    <SiteDataProvider>
      <ScrollToTop />
      <Layout showPromo={showPromo} setShowPromo={setShowPromo}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/trek/:slug" element={<TrekDetailsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/safety-code" element={<SafetyPage />} />
        </Routes>
      </Layout>
    </SiteDataProvider>
  );
}

export default function App() {
  const [showPromo, setShowPromo] = useState(false);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent showPromo={showPromo} setShowPromo={setShowPromo} />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
