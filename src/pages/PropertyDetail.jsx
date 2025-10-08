import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { TrendingUp, Building2, MapPin, Users, Star, DollarSign, Minus, Plus, Bitcoin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const properties = [
    { id: 1, name: "Burj Khalifa Penthouse", location: "Downtown Dubai", image_alt: "Luxurious penthouse in the iconic Burj Khalifa with panoramic city views", totalValue: 150000000, tokenPrice: 15000, availableTokens: 2500, totalTokens: 10000, apy: 12.5, trend: "up", rating: 4.9, investors: 847, description: { en: "An unparalleled luxury penthouse at the top of the world, offering 360-degree views of Dubai. High-end finishes, private pool, and 24/7 concierge services.", fr: "Un penthouse de luxe inégalé au sommet du monde, offrant des vues à 360 degrés sur Dubaï. Finitions haut de gamme, piscine privée et services de conciergerie 24/7." } },
    { id: 2, name: "Palm Jumeirah Villa", location: "Palm Jumeirah", image_alt: "Exclusive beachfront villa on the prestigious Palm Jumeirah island", totalValue: 85000000, tokenPrice: 85000, availableTokens: 120, totalTokens: 1000, apy: 10.8, trend: "up", rating: 4.8, investors: 623, description: { en: "An exclusive beachfront villa with private beach access, infinity pool, and lush gardens. The pinnacle of island luxury.", fr: "Une villa exclusive en bord de mer avec accès privé à la plage, piscine à débordement et jardins luxuriants. Le summum du luxe insulaire." } },
    { id: 3, name: "Dubai Marina Apartment", location: "Dubai Marina", image_alt: "Modern luxury apartment in Dubai Marina with marina views", totalValue: 32000000, tokenPrice: 32000, availableTokens: 350, totalTokens: 1000, apy: 9.2, trend: "down", rating: 4.6, investors: 412, description: { en: "Modern and elegant apartment with stunning views of the Dubai Marina. Enjoy restaurants, shops, and vibrant nightlife at your doorstep.", fr: "Appartement moderne et élégant avec une vue imprenable sur la marina de Dubaï. Profitez des restaurants, boutiques et de la vie nocturne animée à votre porte." } },
    { id: 4, name: "Business Bay Office", location: "Business Bay", image_alt: "Premium commercial office space in the heart of Business Bay", totalValue: 58000000, tokenPrice: 58000, availableTokens: 80, totalTokens: 1000, apy: 11.3, trend: "up", rating: 4.7, investors: 298, description: { en: "Prime commercial office space in the heart of Dubai's business district. A prestigious address for any ambitious company.", fr: "Espace de bureau commercial de premier ordre au cœur du quartier des affaires de Dubaï. Une adresse prestigieuse pour toute entreprise ambitieuse." } },
    { id: 5, name: "Jumeirah Beach Residence", location: "Jumeirah", image_alt: "Luxury beachfront resort property with private beach access", totalValue: 220000000, tokenPrice: 22000, availableTokens: 1800, totalTokens: 10000, apy: 13.7, trend: "up", rating: 4.9, investors: 1156, description: { en: "Investment opportunity in a luxury beachfront resort. Benefit from high rental yields and a world-class location.", fr: "Opportunité d'investissement dans un complexe hôtelier de luxe en bord de mer. Bénéficiez de rendements locatifs élevés et d'un emplacement de classe mondiale." } },
    { id: 6, name: "DIFC Corporate Hub", location: "DIFC", image_alt: "State-of-the-art corporate building in Dubai International Financial Centre", totalValue: 185000000, tokenPrice: 92500, availableTokens: 950, totalTokens: 2000, apy: 14.2, trend: "up", rating: 4.8, investors: 892, description: { en: "A state-of-the-art office building in the Dubai International Financial Centre. Ideal for investors seeking stable rental income and strong capital appreciation.", fr: "Un immeuble de bureaux ultramoderne dans le centre financier international de Dubaï. Idéal pour les investisseurs recherchant des revenus locatifs stables et une forte appréciation du capital." } }
];

const propertyImages = [
    <img alt="Modern living room in a Burj Khalifa Penthouse" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1699225741963-5e8e15e40719" />,
    <img alt="Swimming pool of a Palm Jumeirah Villa" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1681300938609-37d2d7a44197" />,
    <img alt="Balcony view from a Dubai Marina Apartment" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1612187832084-23c2ad89bcff" />,
    <img alt="Interior of a modern Business Bay Office" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1655314873087-a3ca9343e8cf" />,
    <img alt="Bedroom in a Jumeirah Beach Residence" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1680508129080-6214e374d939" />,
    <img alt="Lobby of a DIFC Corporate Hub" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1682400249568-49cb269bff98" />
];

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const property = properties.find(p => p.id === parseInt(id));
    const [tokenAmount, setTokenAmount] = useState(1);
    
    if (!property) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">{t('propertyDetail.notFound')}</h2>
                <Button onClick={() => navigate('/marketplace')} className="mt-4">{t('propertyDetail.backToMarketplace')}</Button>
            </div>
        );
    }
    
    const handlePurchase = () => {
        toast({
            title: t('propertyDetail.purchaseToastTitle').replace('{tokenAmount}', tokenAmount),
            description: t('propertyDetail.purchaseToastDescription'),
        });
    }

    const totalPrice = property.tokenPrice * tokenAmount;
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';

    return (
        <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <motion.div 
                        className="rounded-2xl overflow-hidden h-96 w-full glass-effect border border-gray-800"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                         {propertyImages[property.id - 1]}
                    </motion.div>
                    <motion.div
                        className="mt-8 glass-effect rounded-2xl p-6 border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">{t('propertyDetail.aboutTitle')}</h2>
                        <p className="text-gray-300 leading-relaxed">{property.description[language]}</p>
                    </motion.div>
                </div>

                <div className="lg:col-span-2">
                    <motion.div 
                        className="glass-effect rounded-2xl p-6 border border-gray-800 sticky top-28"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-1">{property.name}</h1>
                        <div className="flex items-center text-gray-400 text-md mb-6">
                            <MapPin className="w-4 h-4 mr-2" /> {property.location}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-4 rounded-lg bg-gray-800/50">
                                <div className="text-3xl font-bold gold-gradient">${property.tokenPrice.toLocaleString(locale)}</div>
                                <div className="text-xs text-gray-400">{t('propertyDetail.pricePerToken')}</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-gray-800/50">
                                <div className="text-3xl font-bold text-green-400">{property.apy}%</div>
                                <div className="text-xs text-gray-400">{t('propertyDetail.annualYield')}</div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm mb-8">
                            <div className="flex justify-between"><span><Star className="w-4 h-4 inline mr-2 text-yellow-400" />{t('propertyDetail.rating')}</span> <span className="font-semibold">{property.rating}/5.0</span></div>
                            <div className="flex justify-between"><span><Users className="w-4 h-4 inline mr-2 text-blue-400" />{t('propertyDetail.investors')}</span> <span className="font-semibold">{property.investors}</span></div>
                            <div className="flex justify-between"><span><Building2 className="w-4 h-4 inline mr-2" />{t('propertyDetail.tokensAvailable')}</span> <span className="font-semibold">{property.availableTokens.toLocaleString(locale)} / {property.totalTokens.toLocaleString(locale)}</span></div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-3">{t('propertyDetail.quantity')}</label>
                            <div className="flex items-center justify-between">
                                <Button size="icon" variant="outline" className="glass-effect rounded-full" onClick={() => setTokenAmount(Math.max(1, tokenAmount - 1))}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-2xl font-bold w-24 text-center">{tokenAmount}</span>
                                <Button size="icon" variant="outline" className="glass-effect rounded-full" onClick={() => setTokenAmount(Math.min(property.availableTokens, tokenAmount + 1))}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 rounded-lg p-4 text-center text-black mb-6">
                            <p className="font-semibold">{t('propertyDetail.totalPrice')}</p>
                            <p className="text-3xl font-bold">${totalPrice.toLocaleString(locale)}</p>
                            <p className="text-sm opacity-80">~ {(totalPrice / 60000).toFixed(4)} BTC</p>
                        </div>
                        
                        <Button onClick={handlePurchase} size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">
                            <Bitcoin className="w-5 h-5 mr-3" />
                            {t('propertyDetail.payWithBitcoin')}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default PropertyDetail;