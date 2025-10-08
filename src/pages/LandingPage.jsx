import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, TrendingUp, Shield, Globe, Coins, Users, ArrowRight, Wallet, BarChart3, Lock, Briefcase, LogOut } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn, logout } = useAuth();

  const goToMarketplace = () => {
    navigate('/marketplace');
  };

  const advantages = t('landing.advantages');

  const stats = [
    { value: "$2.5M", label: t('landing.statsVolume'), icon: <BarChart3 className="w-8 h-8" /> },
    { value: "1,247", label: t('landing.statsInvestors'), icon: <Users className="w-8 h-8" /> },
    { value: "156", label: t('landing.statsProperties'), icon: <Building2 className="w-8 h-8" /> }
  ];

  const advantageIcons = [
    <Building2 className="w-8 h-8" />,
    <TrendingUp className="w-8 h-8" />,
    <Shield className="w-8 h-8" />,
    <Globe className="w-8 h-8" />,
    <Coins className="w-8 h-8" />,
    <Users className="w-8 h-8" />
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 parallax-bg crypto-pattern" style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 35, 0.7), rgba(26, 26, 46, 0.8)), url('https://horizons-cdn.hostinger.com/0412078a-fcbe-4120-9a9d-b5bd0559d622/b6926f3dbe95d7809a07a8ac53c42d82.png')`
      }}>
        <motion.div className="absolute inset-0" animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }} transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }} style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'
        }} />
      </div>

      <motion.header className="relative z-10 p-4 md:p-6" initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div className="text-xl md:text-2xl font-bold gold-gradient" whileHover={{
            scale: 1.05
          }}>
            TokenEstate
          </motion.div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <Button onClick={() => navigate('/my-assets')} variant="ghost" size="icon" className="text-gray-300 hover:bg-white/10 hover:text-[#c89b3c]">
                    <Briefcase className="w-5 h-5" />
                    <span className="sr-only">{t('landing.navMyAssets')}</span>
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
          </div>
        </nav>
      </motion.header>

      <motion.section className="relative z-10 text-center py-16 md:py-20 px-4 md:px-6" initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 1,
        delay: 0.2
      }}>
        <div className="max-w-6xl mx-auto">
          <motion.h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 md:mb-8 leading-tight" initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.4
          }}>
            <span className="gradient-text">{t('landing.heroTitle1')}</span>
            <br />
            <span className="gold-gradient">{t('landing.heroTitle2')}</span>
            <br />
            <span className="text-white">{t('landing.heroTitle3')}</span>
          </motion.h1>
          
          <motion.p className="text-lg md:text-2xl text-gray-300 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.6
          }}>{t('landing.heroSubtitle')}</motion.p>
          
          <motion.div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 1,
            delay: 0.8
          }}>
            <Button onClick={goToMarketplace} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg pulse-glow">
              {t('landing.exploreButton')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button onClick={() => navigate('/connect-wallet')} variant="outline" size="lg" className="glass-effect border-[#c89b3c] text-white hover:bg-[#c89b3c]/20 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-base md:text-lg">
              <Wallet className="w-5 h-5 mr-2" />
              {t('landing.navConnectWallet')}
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="relative z-10 py-16 md:py-20 px-4 md:px-6" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 1
      }} viewport={{
        once: true
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => <motion.div key={index} className="glass-effect rounded-2xl p-6 md:p-8 text-center floating-animation" style={{
              animationDelay: `${index * 0.5}s`
            }} whileHover={{
              scale: 1.05
            }}>
                  <div className="text-[#c89b3c] mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gold-gradient mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>)}
          </div>
        </div>
      </motion.section>

      <motion.section className="relative z-10 py-16 md:py-20 px-4 md:px-6" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 1
      }} viewport={{
        once: true
      }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12 md:mb-16" initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }}>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4 md:mb-6">
              {t('landing.whyTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('landing.whySubtitle')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((advantage, index) => <motion.div key={index} className="glass-effect rounded-2xl p-8 token-card" initial={{
              opacity: 0,
              y: 50
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} whileHover={{
              scale: 1.02
            }}>
                  <div className="text-blue-400 mb-6">
                    {advantageIcons[index]}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>)}
          </div>
        </div>
      </motion.section>

      <motion.section className="relative z-10 py-16 md:py-20 px-4 md:px-6" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        duration: 1
      }} viewport={{
        once: true
      }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div className="glass-effect rounded-3xl p-8 md:p-12" whileHover={{
            scale: 1.02
          }}>
            <Lock className="w-12 h-12 md:w-16 md:h-16 text-[#c89b3c] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold gold-gradient mb-6">
              {t('landing.ctaTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {t('landing.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={goToMarketplace} size="lg" className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold px-8 py-4 text-lg">
                {t('landing.ctaButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button onClick={() => navigate('/connect-wallet')} variant="outline" size="lg" className="glass-effect border-blue-500 text-white hover:bg-blue-500/20 px-8 py-4 text-lg">
                {t('landing.navConnectWallet')}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <footer className="relative z-10 py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold gold-gradient mb-4">TokenEstate</div>
          <p className="text-gray-400">
            {t('landing.footerText')}
          </p>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;