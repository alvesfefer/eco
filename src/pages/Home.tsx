
import React from 'react'
import { Link } from 'react-router-dom'
import {Camera, Type, Leaf, Users, Award, TrendingUp, MessageCircle, Bot, Home, Droplets, Recycle, Target, BarChart3, MapPin, Mail} from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const HomePage: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Header minimalista com navegação e logo */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="text-green-600 p-2">
          <Home size={24} />
        </div>
        
        <Link to="/sobre-nos">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
            <span className="text-white font-bold text-sm">ECO</span>
          </div>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mb-4"
              >
                <Leaf size={64} className="text-green-200" />
              </motion.div>
              <h1 className="text-4xl font-bold mb-2">{t('home.title')}</h1>
              <p className="text-green-100 text-lg">{t('home.subtitle')}</p>
              <p className="text-green-200 text-sm mt-1">{t('home.byTeam')}</p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {t('home.question')}
              </h2>
              <p className="text-green-100 mb-6">
                {t('home.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/disposal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-green-600 rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Camera size={24} />
                    {t('home.takePhoto')}
                  </motion.button>
                </Link>
                
                <Link to="/disposal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-500 text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Type size={24} />
                    {t('home.typeName')}
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Nova seção da IA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Bot size={32} className="text-blue-200" />
                <h3 className="text-xl font-bold">{t('home.askAI')}</h3>
              </div>
              <p className="text-blue-100 mb-4">
                {t('home.aiDescription')}
              </p>
              <Link to="/ai-chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white rounded-xl py-3 px-8 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all mx-auto"
                >
                  <MessageCircle size={20} />
                  {t('home.chatWithAI')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Seção Nossas Metas - Posição Original */}
      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-800 mb-2">{t('home.ourGoals')}</h2>
            <p className="text-green-600">{t('home.goalsDescription')}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg text-center border-l-4 border-blue-500">
              <div className="mb-2">
                <Droplets className="mx-auto text-blue-600" size={32} />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">1M+</div>
              <div className="text-xs text-gray-700 font-medium">{t('home.waterProtected')}</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg text-center border-l-4 border-green-500">
              <div className="mb-2">
                <Recycle className="mx-auto text-green-600" size={32} />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">50K+</div>
              <div className="text-xs text-gray-700 font-medium">{t('home.itemsRecycled')}</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg text-center border-l-4 border-purple-500">
              <div className="mb-2">
                <Users className="mx-auto text-purple-600" size={32} />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">15K+</div>
              <div className="text-xs text-gray-700 font-medium">{t('home.consciousUsers')}</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-lg text-center border-l-4 border-orange-500">
              <div className="mb-2">
                <Award className="mx-auto text-orange-600" size={32} />
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">200+</div>
              <div className="text-xs text-gray-700 font-medium">{t('home.achievementsUnlocked')}</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t('home.quickActions')}</h3>
          
          <div className="grid gap-4">
            <Link to="/ai-chat">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all text-white"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{t('home.chatAI')}</h4>
                  <p className="text-blue-100 text-sm">{t('home.chatDescription')}</p>
                </div>
                <div>
                  <MessageCircle size={24} />
                </div>
              </motion.div>
            </Link>
            
            <Link to="/history">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{t('home.greenHistory')}</h4>
                  <p className="text-sm text-gray-600">{t('home.historyDescription')}</p>
                </div>
                <div>
                  <BarChart3 className="text-green-600" size={24} />
                </div>
              </motion.div>
            </Link>
            
            <Link to="/achievements">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Award className="text-yellow-600" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{t('home.achievements')}</h4>
                  <p className="text-sm text-gray-600">{t('home.achievementsDescription')}</p>
                </div>
                <div>
                  <Target className="text-yellow-600" size={24} />
                </div>
              </motion.div>
            </Link>
            
            <Link to="/map">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{t('home.collectionPoints')}</h4>
                  <p className="text-sm text-gray-600">{t('home.mapDescription')}</p>
                </div>
                <div>
                  <MapPin className="text-blue-600" size={24} />
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Environmental Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <Leaf size={24} />
            <h3 className="font-bold text-lg">{t('home.ecoTip')}</h3>
          </div>
          <p className="text-green-50">
            {t('home.tipText')}
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-br from-green-700 via-emerald-700 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src={"eco/SodaBug.jpg"}
                alt="Logo EcoFlow"
                className="w-20 h-20 rounded-full shadow-lg border-2 border-white"
              />
              <h3 className="mt-3 text-lg font-bold">SodaBug</h3>
            </div>

            {/* Sobre */}
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Leaf size={20} />
                {t('footer.about')}
              </h4>
              <p className="text-green-100 text-sm leading-relaxed">
                {t('footer.aboutText')}
              </p>
            </div>

            {/* Links rápidos */}
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <MapPin size={20} />
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li><Link to="/ai-chat" className="hover:text-white transition-colors">{t('home.chatAI')}</Link></li>
                <li><Link to="/history" className="hover:text-white transition-colors">{t('home.greenHistory')}</Link></li>
                <li><Link to="/achievements" className="hover:text-white transition-colors">{t('home.achievements')}</Link></li>
                <li><Link to="/map" className="hover:text-white transition-colors">{t('home.collectionPoints')}</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Mail size={20} />
                {t('footer.contact')}
              </h4>
              <p className="text-green-100 text-sm">Email: suporte@ecoflow.com</p>
              <p className="text-green-100 text-sm">Parcerias: parcerias@ecoflow.com</p>

              {/* Redes sociais */}
              <div className="flex justify-center md:justify-start gap-5 mt-4">
                <a href="mailto:suporte@ecoflow.com" className="hover:text-blue-300 transition-colors">
                  <Mail size={24} />
                </a>
                <a href="https://instagram.com/seu_perfil" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  <Users size={24} />
                </a>
                <a href="https://www.tiktok.com/@seu_perfil" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                  <MessageCircle size={24} />
                </a>
                <a href="https://youtube.com/seu_canal" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                  <TrendingUp size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/20 pt-4 text-center text-sm text-green-200">
            © {new Date().getFullYear()} EcoFlow - by Soda Bug. {t('footer.rights')}.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
