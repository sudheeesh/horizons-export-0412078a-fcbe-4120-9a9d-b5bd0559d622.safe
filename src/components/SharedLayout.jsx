import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, Briefcase, LogOut } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const SharedLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { isLoggedIn, logout } = useAuth();

    const getHeaderText = () => {
        switch (location.pathname) {
            case '/marketplace':
                return t('marketplace.title');
            case '/connect-wallet':
                return t('connectWallet.title');
            case '/my-assets':
                return t('myAssets.title');
            default:
                if (location.pathname.startsWith('/property/')) {
                    return t('propertyDetail.title');
                }
                return 'TokenEstate';
        }
    };
    
    const showBackButton = location.pathname !== '/marketplace';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <motion.header 
                className="p-4 md:p-6 border-b border-gray-800/50 sticky top-0 z-20 bg-gray-900/50 backdrop-blur-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <nav className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {showBackButton ? (
                            <Button onClick={() => navigate('/marketplace')} variant="ghost" size="sm" className="text-gray-300 hover:bg-white/10">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t('backButton')}
                            </Button>
                        ) : (
                             <Link to="/" className="text-xl md:text-2xl font-bold gold-gradient">
                                TokenEstate
                            </Link>
                        )}
                        <div className="hidden sm:block text-xl md:text-2xl font-bold gold-gradient">
                            {getHeaderText()}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-4">
                        <LanguageSwitcher />
                        {isLoggedIn ? (
                            <>
                                <Button onClick={() => navigate('/my-assets')} variant="ghost" size="icon" className="text-gray-300 hover:bg-white/10 hover:text-[#c89b3c]">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="sr-only">{t('myAssets.title')}</span>
                                </Button>
                                <Button onClick={logout} variant="outline" size="sm" className="glass-effect border-red-500 text-red-400 hover:bg-red-500/20 hover:text-red-400">
                                    <LogOut className="w-4 h-4 md:mr-2" />
                                    <span className="hidden md:inline">{t('logout')}</span>
                                </Button>
                            </>
                        ) : (
                             <>
                                <Button onClick={() => navigate('/login')} variant="ghost" className="text-gray-300 hover:bg-white/10 hover:text-white">{t('login')}</Button>
                                <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-4 py-2 rounded-md">{t('signup')}</Button>
                            </>
                        )}
                        <Button onClick={() => navigate('/connect-wallet')} variant="outline" className="glass-effect border-[#c89b3c] text-white hover:bg-[#c89b3c]/20">
                            <Wallet className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">{t('connectWallet.connectButton')}</span>
                        </Button>
                    </div>
                </nav>
            </motion.header>
            <main className="p-4 md:p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default SharedLayout;