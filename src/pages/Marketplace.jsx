import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, TrendingDown, Building2, MapPin, Users, Star, Eye } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const properties = [
    { id: 1, name: "Burj Khalifa Penthouse", location: "Downtown Dubai", image_alt: "Luxurious penthouse in the iconic Burj Khalifa with panoramic city views", totalValue: 150000000, tokenPrice: 15000, availableTokens: 2500, totalTokens: 10000, apy: 12.5, trend: "up", rating: 4.9, investors: 847 },
    { id: 2, name: "Palm Jumeirah Villa", location: "Palm Jumeirah", image_alt: "Exclusive beachfront villa on the prestigious Palm Jumeirah island", totalValue: 85000000, tokenPrice: 85000, availableTokens: 120, totalTokens: 1000, apy: 10.8, trend: "up", rating: 4.8, investors: 623 },
    { id: 3, name: "Dubai Marina Apartment", location: "Dubai Marina", image_alt: "Modern luxury apartment in Dubai Marina with marina views", totalValue: 32000000, tokenPrice: 32000, availableTokens: 350, totalTokens: 1000, apy: 9.2, trend: "down", rating: 4.6, investors: 412 },
    { id: 4, name: "Business Bay Office", location: "Business Bay", image_alt: "Premium commercial office space in the heart of Business Bay", totalValue: 58000000, tokenPrice: 58000, availableTokens: 80, totalTokens: 1000, apy: 11.3, trend: "up", rating: 4.7, investors: 298 },
    { id: 5, name: "Jumeirah Beach Residence", location: "Jumeirah", image_alt: "Luxury beachfront resort property with private beach access", totalValue: 220000000, tokenPrice: 22000, availableTokens: 1800, totalTokens: 10000, apy: 13.7, trend: "up", rating: 4.9, investors: 1156 },
    { id: 6, name: "DIFC Corporate Hub", location: "DIFC", image_alt: "State-of-the-art corporate building in Dubai International Financial Centre", totalValue: 185000000, tokenPrice: 92500, availableTokens: 950, totalTokens: 2000, apy: 14.2, trend: "up", rating: 4.8, investors: 892 }
];

const Marketplace = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) || property.location.toLowerCase().includes(searchTerm.toLowerCase());
        if (selectedFilter === 'all') return matchesSearch;
        if (selectedFilter === 'high-yield') return matchesSearch && property.apy > 12;
        if (selectedFilter === 'trending') return matchesSearch && property.trend === 'up';
        if (selectedFilter === 'available') return matchesSearch && property.availableTokens > 100;
        return matchesSearch;
    });

    const propertyImages = [
        <img alt="Modern living room in a Burj Khalifa Penthouse" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1699225741963-5e8e15e40719" />,
        <img alt="Swimming pool of a Palm Jumeirah Villa" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1681300938609-37d2d7a44197" />,
        <img alt="Balcony view from a Dubai Marina Apartment" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1612187832084-23c2ad89bcff" />,
        <img alt="Interior of a modern Business Bay Office" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1655314873087-a3ca9343e8cf" />,
        <img alt="Bedroom in a Jumeirah Beach Residence" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1680508129080-6214e374d939" />,
        <img alt="Lobby of a DIFC Corporate Hub" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1682400249568-49cb269bff98" />
    ];

    return (
        <>
            <motion.section 
                className="max-w-7xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('marketplace.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c89b3c] focus:border-[#c89b3c]"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {[
                            { key: 'all', label: t('marketplace.filterAll') },
                            { key: 'high-yield', label: t('marketplace.filterHighYield') },
                            { key: 'trending', label: t('marketplace.filterTrending') },
                            { key: 'available', label: t('marketplace.filterAvailable') }
                        ].map(filter => (
                            <Button
                                key={filter.key}
                                onClick={() => setSelectedFilter(filter.key)}
                                variant={selectedFilter === filter.key ? "default" : "outline"}
                                className={
                                    selectedFilter === filter.key
                                        ? "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 text-black font-semibold"
                                        : "glass-effect border-gray-700 text-gray-300 hover:bg-white/10 hover:text-white"
                                }
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section 
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredProperties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            className="glass-effect rounded-2xl overflow-hidden token-card border border-gray-800 flex flex-col cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            onClick={() => navigate(`/property/${property.id}`)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                {propertyImages[property.id - 1]}
                                <div className="absolute top-3 right-3 flex items-center space-x-2">
                                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${property.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {property.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                        {property.apy}% APY
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 flex items-center px-2 py-1 bg-black/50 rounded-full text-xs text-white">
                                    <Star className="w-3 h-3 mr-1 text-yellow-400" />
                                    {property.rating}
                                </div>
                            </div>

                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2 truncate">{property.name}</h3>
                                <div className="flex items-center text-gray-400 text-sm mb-4">
                                    <MapPin className="w-4 h-4 mr-1.5" />
                                    {property.location}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold gold-gradient">${property.tokenPrice.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">{t('marketplace.pricePerToken')}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">{property.apy}%</div>
                                        <div className="text-xs text-gray-500">{t('marketplace.annualYield')}</div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                        <span>{t('marketplace.progress')}</span>
                                        <span>{((property.totalTokens - property.availableTokens) / property.totalTokens * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                                        <div className="bg-gradient-to-r from-yellow-400 to-amber-600 h-2.5 rounded-full" style={{ width: `${(property.totalTokens - property.availableTokens) / property.totalTokens * 100}%` }}></div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-5">
                                    <Button onClick={(e) => { e.stopPropagation(); navigate(`/property/${property.id}`); }} className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 hover:opacity-90 text-black font-bold">
                                        <Eye className="w-4 h-4 mr-2" />
                                        {t('marketplace.viewDetailsButton')}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProperties.length === 0 && (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">{t('marketplace.noPropertiesTitle')}</h3>
                        <p className="text-gray-500">{t('marketplace.noPropertiesSubtitle')}</p>
                    </motion.div>
                )}
            </motion.section>
        </>
    );
};

export default Marketplace;