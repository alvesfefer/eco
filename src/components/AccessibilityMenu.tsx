
import React, { useState } from 'react'
import {Settings, Volume2, Type, Contrast, Globe, Hand} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [librasActive, setLibrasActive] = useState(false)
  const [fontSize, setFontSize] = useState('normal')
  const [highContrast, setHighContrast] = useState(false)
  const { currentLanguage, setLanguage, t } = useLanguage()

  const toggleLibras = () => {
    setLibrasActive(!librasActive)
    if (!librasActive) {
      alert(t('accessibility.activateLibras') + '! ' + (currentLanguage === 'pt' ? 'Clique em qualquer elemento para ver a tradução em Libras.' : currentLanguage === 'en' ? 'Click on any element to see the sign language translation.' : 'Haz clic en cualquier elemento para ver la traducción en lengua de señas.'))
    }
  }

  const changeFontSize = (size: string) => {
    setFontSize(size)
    const root = document.documentElement
    switch(size) {
      case 'small':
        root.style.fontSize = '14px'
        break
      case 'large':
        root.style.fontSize = '18px'
        break
      case 'extra-large':
        root.style.fontSize = '22px'
        break
      default:
        root.style.fontSize = '16px'
    }
  }

  const toggleContrast = () => {
    setHighContrast(!highContrast)
    document.body.classList.toggle('high-contrast', !highContrast)
  }

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  const fontSizeOptions = [
    { size: 'small', label: currentLanguage === 'pt' ? 'Pequena' : currentLanguage === 'en' ? 'Small' : 'Pequeña' },
    { size: 'normal', label: currentLanguage === 'pt' ? 'Normal' : currentLanguage === 'en' ? 'Normal' : 'Normal' },
    { size: 'large', label: currentLanguage === 'pt' ? 'Grande' : currentLanguage === 'en' ? 'Large' : 'Grande' },
    { size: 'extra-large', label: currentLanguage === 'pt' ? 'Muito Grande' : currentLanguage === 'en' ? 'Extra Large' : 'Muy Grande' }
  ]

  return (
    <>
      {/* Botão de Acessibilidade */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('accessibility.menu')}
      >
        <Settings size={24} />
      </motion.button>

      {/* Indicador Libras */}
      {librasActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 right-4 bg-purple-600 text-white px-3 py-2 rounded-full text-sm font-bold z-50"
        >
          <Hand size={16} className="inline mr-1" />
          {currentLanguage === 'pt' ? 'LIBRAS ATIVO' : currentLanguage === 'en' ? 'SIGN LANGUAGE ACTIVE' : 'LENGUA DE SEÑAS ACTIVA'}
        </motion.div>
      )}

      {/* Menu de Acessibilidade */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">{t('accessibility.menu')}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Libras */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Hand size={20} />
                  {t('accessibility.libras')}
                </h3>
                <button
                  onClick={toggleLibras}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    librasActive 
                      ? 'bg-purple-100 border-purple-500 text-purple-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {librasActive ? t('accessibility.deactivateLibras') : t('accessibility.activateLibras')}
                </button>
              </div>

              {/* Idioma */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Globe size={20} />
                  {t('accessibility.language')}
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                        currentLanguage === lang.code
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanho da Fonte */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Type size={20} />
                  {t('accessibility.fontSize')}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.size}
                      onClick={() => changeFontSize(option.size)}
                      className={`p-2 rounded-lg border-2 transition-all text-sm ${
                        fontSize === option.size
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alto Contraste */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Contrast size={20} />
                  {t('accessibility.contrast')}
                </h3>
                <button
                  onClick={toggleContrast}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    highContrast
                      ? 'bg-gray-800 border-gray-800 text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {highContrast ? t('accessibility.deactivateContrast') : t('accessibility.activateContrast')}
                </button>
              </div>

              {/* Leitor de Tela */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Volume2 size={20} />
                  {currentLanguage === 'pt' ? 'Leitor de Tela' : currentLanguage === 'en' ? 'Screen Reader' : 'Lector de Pantalla'}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {currentLanguage === 'pt' 
                    ? 'Este site é compatível com leitores de tela como NVDA, JAWS e VoiceOver.'
                    : currentLanguage === 'en'
                    ? 'This site is compatible with screen readers like NVDA, JAWS and VoiceOver.'
                    : 'Este sitio es compatible con lectores de pantalla como NVDA, JAWS y VoiceOver.'
                  }
                </p>
                <button className="w-full p-3 rounded-lg border-2 bg-gray-50 border-gray-200 text-gray-600">
                  {currentLanguage === 'pt' 
                    ? 'Testar Leitor de Tela'
                    : currentLanguage === 'en'
                    ? 'Test Screen Reader'
                    : 'Probar Lector de Pantalla'
                  }
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default AccessibilityMenu
