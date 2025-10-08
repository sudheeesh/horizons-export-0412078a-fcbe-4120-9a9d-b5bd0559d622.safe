import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import Marketplace from '@/pages/Marketplace';
import ConnectWallet from '@/pages/ConnectWallet';
import MyAssets from '@/pages/MyAssets';
import PropertyDetail from '@/pages/PropertyDetail';
import SharedLayout from '@/components/SharedLayout';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}

function MainApp() {
  const { t } = useTranslation();

  return (
    <Router>
      <Helmet>
        <title>{t('appTitle')}</title>
        <meta name="description" content={t('appDescription')} />
      </Helmet>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<SharedLayout />}>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/my-assets" element={<MyAssets />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;