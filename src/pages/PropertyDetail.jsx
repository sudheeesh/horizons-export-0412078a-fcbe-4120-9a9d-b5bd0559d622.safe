// src/pages/PropertyDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Minus, Plus, Bitcoin, DollarSign } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { QRCodeCanvas } from 'qrcode.react';

const BTC_ADDRESS = "7560e711-94ed-4d72-9d98-21137a9acaac";
const ETH_ADDRESS = "0xF2a96e3C6A3a1c6a213460a1b294b2B6415Ba833";
const SOL_ADDRESS = "7dYfExampleSolAddress1234567890AbCdEfGh";

const properties = [
  { id: 1, name: "Burj Khalifa Penthouse", location: "Downtown Dubai", tokenPrice: 15000, availableTokens: 2500, description: { en: "Luxury penthouse.", fr: "Penthouse de luxe." } },
  { id: 2, name: "Palm Jumeirah Villa", location: "Palm Jumeirah", tokenPrice: 85000, availableTokens: 120, description: { en: "Beachfront villa.", fr: "Villa en bord de mer." } },
  { id: 3, name: "Dubai Marina Apartment", location: "Dubai Marina", tokenPrice: 32000, availableTokens: 350, description: { en: "Modern apartment.", fr: "Appartement moderne." } },
  { id: 4, name: "Business Bay Office", location: "Business Bay", tokenPrice: 58000, availableTokens: 80, description: { en: "Commercial office.", fr: "Bureau commercial." } },
  { id: 5, name: "Jumeirah Beach Residence", location: "Jumeirah", tokenPrice: 22000, availableTokens: 1800, description: { en: "Luxury resort.", fr: "Complexe hôtelier de luxe." } },
  { id: 6, name: "DIFC Corporate Hub", location: "DIFC", tokenPrice: 92500, availableTokens: 950, description: { en: "Corporate building.", fr: "Bâtiment d'entreprise." } }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const property = properties.find(p => p.id === parseInt(id));
  const [tokenAmount, setTokenAmount] = useState(1);

  // Modal control
  const [modalData, setModalData] = useState(null);

  if (!property) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">{t('propertyDetail.notFound')}</h2>
        <Button onClick={() => navigate('/marketplace')} className="mt-4">{t('propertyDetail.backToMarketplace')}</Button>
      </div>
    );
  }

  const totalPrice = property.tokenPrice * tokenAmount;
  const BTC_AMOUNT = (totalPrice / 60000).toFixed(8);
  const ETH_AMOUNT = (totalPrice / 2000).toFixed(6);
  const SOL_AMOUNT = (totalPrice / 150).toFixed(3);
  const btcURI = `bitcoin:${BTC_ADDRESS}?amount=${BTC_AMOUNT}&label=${encodeURIComponent(property.name)}`;
  const ethURI = `ethereum:${ETH_ADDRESS}?value=${(ETH_AMOUNT * 1e18).toString()}&label=${encodeURIComponent(property.name)}`;
  const solURI = `solana:${SOL_ADDRESS}?amount=${SOL_AMOUNT}&label=${encodeURIComponent(property.name)}`;
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';

  // ---------------- BTC Payment ----------------
  const handlePurchaseBTC = () => {
    window.location.href = btcURI;
    setTimeout(() => {
      setModalData({
        title: "BTC Payment Info",
        amount: `${BTC_AMOUNT} BTC`,
        address: BTC_ADDRESS,
        uri: btcURI
      });
    }, 1500);
  };

  // ---------------- ETH Payment ----------------
  const handlePurchaseETH = () => {
    window.location.href = ethURI;
    setTimeout(() => {
      setModalData({
        title: "ETH Payment Info",
        amount: `${ETH_AMOUNT} ETH`,
        address: ETH_ADDRESS,
        uri: ethURI
      });
    }, 1500);
  };

  // ---------------- SOL Payment ----------------
  const handlePurchaseSOL = () => {
    window.location.href = solURI;
    setTimeout(() => {
      setModalData({
        title: "SOL Payment Info",
        amount: `${SOL_AMOUNT} SOL`,
        address: SOL_ADDRESS,
        uri: solURI
      });
    }, 1500);
  };

  return (
    <motion.div className="max-w-7xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side */}
        <div className="lg:col-span-3">
          <motion.div className="rounded-2xl overflow-hidden h-96 w-full glass-effect border border-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <img className="w-full h-full object-cover" alt={property.name} src={`https://via.placeholder.com/800x400?text=${property.name}`} />
          </motion.div>

          <motion.div className="mt-8 glass-effect rounded-2xl p-6 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-white mb-4">{t('propertyDetail.aboutTitle')}</h2>
            <p className="text-gray-300 leading-relaxed">{property.description[language]}</p>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          <motion.div className="glass-effect rounded-2xl p-6 border border-gray-800 sticky top-28"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            
            <h1 className="text-3xl font-bold text-white mb-1">{property.name}</h1>
            <div className="flex items-center text-gray-400 text-md mb-6">
              <MapPin className="w-4 h-4 mr-2" /> {property.location}
            </div>

            {/* Quantity */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-3">{t('propertyDetail.quantity')}</label>
              <div className="flex items-center justify-between">
                <Button size="icon" variant="outline" className="glass-effect rounded-full"
                  onClick={() => setTokenAmount(Math.max(1, tokenAmount - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold w-24 text-center">{tokenAmount}</span>
                <Button size="icon" variant="outline" className="glass-effect rounded-full"
                  onClick={() => setTokenAmount(Math.min(property.availableTokens, tokenAmount + 1))}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 rounded-lg p-4 text-center text-black mb-6">
              <p className="font-semibold">{t('propertyDetail.totalPrice')}</p>
              <p className="text-3xl font-bold">${totalPrice.toLocaleString(locale)}</p>
              <p className="text-sm opacity-80">
                ~ {BTC_AMOUNT} BTC | ~ {ETH_AMOUNT} ETH | ~ {SOL_AMOUNT} SOL
              </p>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-3">
              <Button onClick={handlePurchaseBTC} size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">
                <Bitcoin className="w-5 h-5 mr-3" /> {t('propertyDetail.payWithBitcoin')}
              </Button>
              <Button onClick={handlePurchaseETH} size="lg" className="w-full bg-green-400 hover:bg-green-500 text-black font-bold text-lg">
                <DollarSign className="w-5 h-5 mr-3" /> Pay with ETH
              </Button>
              <Button onClick={handlePurchaseSOL} size="lg" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg">
                Pay with SOL
              </Button>
            </div>

            {/* BTC QR */}
            <div className="text-center mt-4">
      
              <p className="mt-2 font-mono break-all">{BTC_ADDRESS}</p>
              <p className="mt-1 font-semibold">{BTC_AMOUNT} BTC</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl text-white max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-2">{modalData.title}</h2>
            <p>Send <span className="font-semibold text-yellow-400">{modalData.amount}</span> to:</p>
            <p className="font-mono break-all text-yellow-400 mt-2">{modalData.address}</p>
            <div className="mt-4 flex justify-center">
              <QRCodeCanvas value={modalData.uri} size={150} />
            </div>
            <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600" onClick={() => setModalData(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyDetail;

;
