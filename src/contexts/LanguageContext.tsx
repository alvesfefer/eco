
import React, { createContext, useContext, useState, useEffect } from 'react'

interface Translations {
  [key: string]: {
    [lang: string]: string
  }
}

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations: Translations = {
  // Header/Navigation
  'nav.home': { pt: 'Início', en: 'Home', es: 'Inicio' },
  'nav.disposal': { pt: 'Descarte', en: 'Disposal', es: 'Descarte' },
  'nav.chat': { pt: 'Chat IA', en: 'AI Chat', es: 'Chat IA' },
  'nav.history': { pt: 'Histórico', en: 'History', es: 'Historial' },
  'nav.achievements': { pt: 'Conquistas', en: 'Achievements', es: 'Logros' },
  'nav.map': { pt: 'Mapa', en: 'Map', es: 'Mapa' },
  'nav.about': { pt: 'Sobre Nós', en: 'About Us', es: 'Acerca de' },

  // Home Page
  'home.title': { pt: 'EcoFlow', en: 'EcoFlow', es: 'EcoFlow' },
  'home.subtitle': { pt: 'IA para Descarte Consciente', en: 'AI for Conscious Disposal', es: 'IA para Descarte Consciente' },
  'home.byTeam': { pt: 'by Soda Bug', en: 'by Soda Bug', es: 'by Soda Bug' },
  'home.question': { pt: 'O que você quer descartar hoje?', en: 'What do you want to dispose of today?', es: '¿Qué quieres desechar hoy?' },
  'home.description': { pt: 'Descubra o jeito certo de descartar e ajude a proteger nosso planeta', en: 'Discover the right way to dispose and help protect our planet', es: 'Descubre la forma correcta de desechar y ayuda a proteger nuestro planeta' },
  'home.takePhoto': { pt: 'Tirar Foto', en: 'Take Photo', es: 'Tomar Foto' },
  'home.typeName': { pt: 'Digitar Nome', en: 'Type Name', es: 'Escribir Nombre' },
  'home.askAI': { pt: 'Pergunte à EcoFlow AI', en: 'Ask EcoFlow AI', es: 'Pregunta a EcoFlow AI' },
  'home.aiDescription': { pt: 'Tire suas dúvidas sobre descarte, reciclagem e impacto ambiental', en: 'Clear your doubts about disposal, recycling and environmental impact', es: 'Resuelve tus dudas sobre descarte, reciclaje e impacto ambiental' },
  'home.chatWithAI': { pt: 'Conversar com a IA', en: 'Chat with AI', es: 'Conversar con IA' },
  'home.quickActions': { pt: 'Ações Rápidas', en: 'Quick Actions', es: 'Acciones Rápidas' },
  'home.chatAI': { pt: 'Conversar com a IA', en: 'Chat with AI', es: 'Conversar con IA' },
  'home.chatDescription': { pt: 'Perguntas sobre descarte e reciclagem', en: 'Questions about disposal and recycling', es: 'Preguntas sobre descarte y reciclaje' },
  'home.greenHistory': { pt: 'Meu Histórico Verde', en: 'My Green History', es: 'Mi Historial Verde' },
  'home.historyDescription': { pt: 'Veja seu impacto ambiental positivo', en: 'See your positive environmental impact', es: 'Ve tu impacto ambiental positivo' },
  'home.achievements': { pt: 'Conquistas', en: 'Achievements', es: 'Logros' },
  'home.achievementsDescription': { pt: 'Suas medalhas de herói ambiental', en: 'Your environmental hero medals', es: 'Tus medallas de héroe ambiental' },
  'home.collectionPoints': { pt: 'Pontos de Coleta', en: 'Collection Points', es: 'Puntos de Recolección' },
  'home.mapDescription': { pt: 'Encontre locais próximos para descarte', en: 'Find nearby disposal locations', es: 'Encuentra lugares cercanos para descarte' },
  'home.ourGoals': { pt: 'Nossas Metas', en: 'Our Goals', es: 'Nuestras Metas' },
  'home.goalsDescription': { pt: 'Impacto positivo que estamos gerando juntos', en: 'Positive impact we are generating together', es: 'Impacto positivo que estamos generando juntos' },
  'home.waterProtected': { pt: 'Litros de água protegidos', en: 'Liters of water protected', es: 'Litros de agua protegidos' },
  'home.itemsRecycled': { pt: 'Itens reciclados', en: 'Items recycled', es: 'Artículos reciclados' },
  'home.consciousUsers': { pt: 'Usuários conscientes', en: 'Conscious users', es: 'Usuarios conscientes' },
  'home.achievementsUnlocked': { pt: 'Conquistas desbloqueadas', en: 'Achievements unlocked', es: 'Logros desbloqueados' },
  'home.ecoTip': { pt: 'Dica Eco do Dia', en: 'Eco Tip of the Day', es: 'Consejo Eco del Día' },
  'home.tipText': { pt: 'Uma pilha comum jogada no lixo pode contaminar até 20 mil litros de água! Sempre descarte em pontos de coleta especializados.', en: 'A common battery thrown in the trash can contaminate up to 20 thousand liters of water! Always dispose at specialized collection points.', es: 'Una batería común tirada a la basura puede contaminar hasta 20 mil litros de agua! Siempre desecha en puntos de recolección especializados.' },

  // About Page
  'about.title': { pt: 'Sobre o EcoFlow', en: 'About EcoFlow', es: 'Acerca de EcoFlow' },
  'about.description': { pt: 'O EcoFlow é uma plataforma educativa e gamificada que revoluciona a forma como as pessoas descartam resíduos. Utilizando inteligência artificial avançada, oferecemos orientações precisas sobre descarte consciente, promovemos a reciclagem e criamos uma comunidade engajada na proteção ambiental.', en: 'EcoFlow is an educational and gamified platform that revolutionizes how people dispose of waste. Using advanced artificial intelligence, we provide precise guidance on conscious disposal, promote recycling and create a community engaged in environmental protection.', es: 'EcoFlow es una plataforma educativa y gamificada que revoluciona la forma en que las personas desechan residuos. Utilizando inteligencia artificial avanzada, ofrecemos orientación precisa sobre descarte consciente, promovemos el reciclaje y creamos una comunidad comprometida con la protección ambiental.' },
  'about.mission': { pt: 'Nossa Missão', en: 'Our Mission', es: 'Nuestra Misión' },
  'about.missionText': { pt: 'Transformar a relação das pessoas com o descarte de resíduos através da tecnologia, educação e gamificação. Nosso objetivo é criar uma sociedade mais consciente ambientalmente, onde cada indivíduo compreende o impacto de suas ações e é incentivado a fazer escolhas sustentáveis que protegem nosso planeta para as futuras gerações.', en: 'Transform people\'s relationship with waste disposal through technology, education and gamification. Our goal is to create a more environmentally conscious society, where each individual understands the impact of their actions and is encouraged to make sustainable choices that protect our planet for future generations.', es: 'Transformar la relación de las personas con el descarte de residuos a través de la tecnología, educación y gamificación. Nuestro objetivo es crear una sociedad más consciente ambientalmente, donde cada individuo comprende el impacto de sus acciones y es incentivado a hacer elecciones sostenibles que protegen nuestro planeta para las futuras generaciones.' },

  // Footer
  'footer.about': { pt: 'Sobre o EcoFlow', en: 'About EcoFlow', es: 'Acerca de EcoFlow' },
  'footer.aboutText': { pt: 'Promovemos o descarte consciente e incentivamos a reciclagem usando tecnologia de IA para proteger o meio ambiente e inspirar hábitos sustentáveis.', en: 'We promote conscious disposal and encourage recycling using AI technology to protect the environment and inspire sustainable habits.', es: 'Promovemos el descarte consciente e incentivamos el reciclaje usando tecnología de IA para proteger el medio ambiente e inspirar hábitos sostenibles.' },
  'footer.quickLinks': { pt: 'Links Rápidos', en: 'Quick Links', es: 'Enlaces Rápidos' },
  'footer.contact': { pt: 'Contato', en: 'Contact', es: 'Contacto' },
  'footer.rights': { pt: 'Todos os direitos reservados', en: 'All rights reserved', es: 'Todos los derechos reservados' },

  // Accessibility
  'accessibility.menu': { pt: 'Menu de Acessibilidade', en: 'Accessibility Menu', es: 'Menú de Accesibilidad' },
  'accessibility.libras': { pt: 'Libras', en: 'Sign Language', es: 'Lengua de Señas' },
  'accessibility.activateLibras': { pt: 'Ativar Libras', en: 'Activate Sign Language', es: 'Activar Lengua de Señas' },
  'accessibility.deactivateLibras': { pt: 'Desativar Libras', en: 'Deactivate Sign Language', es: 'Desactivar Lengua de Señas' },
  'accessibility.language': { pt: 'Idioma', en: 'Language', es: 'Idioma' },
  'accessibility.fontSize': { pt: 'Tamanho da Fonte', en: 'Font Size', es: 'Tamaño de Fuente' },
  'accessibility.contrast': { pt: 'Contraste', en: 'Contrast', es: 'Contraste' },
  'accessibility.activateContrast': { pt: 'Ativar Alto Contraste', en: 'Activate High Contrast', es: 'Activar Alto Contraste' },
  'accessibility.deactivateContrast': { pt: 'Desativar Alto Contraste', en: 'Deactivate High Contrast', es: 'Desactivar Alto Contraste' },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt')

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    localStorage.setItem('ecoflow-language', lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ecoflow-language')
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
