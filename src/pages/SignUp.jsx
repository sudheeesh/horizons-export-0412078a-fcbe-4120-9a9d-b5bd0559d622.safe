import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Mail, Lock, User } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSignUp = (e) => {
        e.preventDefault();
        toast({
            title: t('auth.signupSuccessTitle'),
            description: t('auth.signupSuccessDescription'),
        });
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
            <motion.div 
                className="w-full max-w-md glass-effect rounded-2xl p-8 border border-gray-800"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <Link to="/" className="text-3xl font-bold gold-gradient mb-2 inline-block">TokenEstate</Link>
                    <h1 className="text-2xl font-bold text-white">{t('auth.signupTitle')}</h1>
                    <p className="text-gray-400">{t('auth.signupSubtitle')}</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('auth.emailLabel')}</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">{t('auth.passwordLabel')}</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3">
                        {t('auth.signupButton')}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-8">
                    {t('auth.alreadyAccount')} <Link to="/login" className="font-medium text-[#c89b3c] hover:underline">{t('auth.loginLink')}</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignUp;