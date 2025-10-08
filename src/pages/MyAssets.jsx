import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';

const MyAssets = () => {
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const { isLoggedIn } = useAuth();

    const myAssetsData = isLoggedIn ? [
        // Mock data for a logged-in user. In a real app, this would be fetched.
        // For now, let's keep it empty to show the "no assets" state after login.
    ] : [];

    const portfolioData = myAssetsData.length > 0 ? [
        { name: 'Jan', value: 120000 },
        { name: 'Feb', value: 150000 },
        { name: 'Mar', value: 140000 },
        { name: 'Apr', value: 180000 },
        { name: 'May', value: 220000 },
        { name: 'Jun', value: 250000 },
        { name: 'Jul', value: 240000 },
        { name: 'Aug', value: 280000 },
        { name: 'Sep', value: 320000 },
    ] : [
        { name: 'Jan', value: 0 },
        { name: 'Feb', value: 0 },
        { name: 'Mar', value: 0 },
        { name: 'Apr', value: 0 },
        { name: 'May', value: 0 },
        { name: 'Jun', value: 0 },
        { name: 'Jul', value: 0 },
        { name: 'Aug', value: 0 },
        { name: 'Sep', value: 0 },
    ];
    
    const totalValue = myAssetsData.reduce((acc, asset) => acc + asset.value, 0);
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';
    const currency = language === 'fr' ? 'EUR' : 'USD';

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700">
                    <p className="label text-white">{`${label}`}</p>
                    <p className="intro text-green-400">{`${t('myAssets.chartValue')}: ${payload[0].value.toLocaleString(locale, { style: 'currency', currency: currency })}`}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                    className="lg:col-span-2 glass-effect rounded-2xl p-6 border border-gray-800"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-2">{t('myAssets.portfolioPerformance')}</h2>
                    <p className="text-4xl font-bold gold-gradient mb-4">{totalValue.toLocaleString(locale, { style: 'currency', currency: currency })}</p>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={portfolioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c89b3c" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#c89b3c" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" />
                                <YAxis stroke="#888888" tickFormatter={(value) => `${(value / 1000)}k`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 155, 60, 0.1)" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="value" stroke="#c89b3c" fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="glass-effect rounded-2xl p-6 border border-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">{t('myAssets.summary')}</h2>
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-gray-800 rounded-full mr-4"><DollarSign className="w-6 h-6 text-[#c89b3c]" /></div>
                            <div>
                                <p className="text-gray-400">{t('myAssets.totalValue')}</p>
                                <p className="text-2xl font-bold text-white">{totalValue.toLocaleString(locale, { style: 'currency', currency: currency })}</p>
                            </div>
                        </div>
                         <div className="flex items-center">
                            <div className="p-3 bg-gray-800 rounded-full mr-4"><TrendingUp className="w-6 h-6 text-green-400" /></div>
                            <div>
                                <p className="text-gray-400">{t('myAssets.totalReturn')}</p>
                                <p className="text-2xl font-bold text-green-400">{language === 'fr' ? '+ 0,00 € (0.0%)' : '+ $0.00 (0.0%)'}</p>
                            </div>
                        </div>
                         <div className="flex items-center">
                            <div className="p-3 bg-gray-800 rounded-full mr-4"><Building2 className="w-6 h-6 text-blue-400" /></div>
                            <div>
                                <p className="text-gray-400">{t('myAssets.properties')}</p>
                                <p className="text-2xl font-bold text-white">{myAssetsData.length}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-white mb-6">{t('myAssets.myProperties')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myAssetsData.length > 0 ? myAssetsData.map(asset => (
                        <div key={asset.id} className="glass-effect rounded-2xl p-6 border border-gray-800 hover:border-[#c89b3c] transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                                <Building2 className="w-8 h-8 text-gray-500" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">{t('myAssets.tokensHeld')}</span>
                                    <span className="font-bold text-white text-lg">{asset.tokens}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">{t('myAssets.currentValue')}</span>
                                    <span className="font-bold gold-gradient text-lg">{asset.value.toLocaleString(locale, { style: 'currency', currency: currency })}</span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="md:col-span-2 lg:col-span-3 text-center py-16 glass-effect rounded-2xl">
                             <h3 className="text-2xl font-bold text-gray-400 mb-4">{t('myAssets.noAssetsTitle')}</h3>
                             <p className="text-gray-500 mb-6">{t('myAssets.noAssetsSubtitle')}</p>
                             <Button onClick={() => navigate('/marketplace')} className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 hover:opacity-90 text-black font-bold">
                                {t('myAssets.exploreButton')}
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MyAssets;