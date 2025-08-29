
import React, { useState, useEffect } from 'react'
import {Award, Trophy, Star, Target, Zap, Shield, Crown, Medal, Home, Leaf, Users, Mail, MessageCircle, TrendingUp, MapPin} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Achievement {
  id: string
  title: string
  description: string
  icon: JSX.Element
  category: 'bronze' | 'silver' | 'gold' | 'platinum'
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: Date
  points: number
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  useEffect(() => {
    initializeAchievements()
  }, [])

  const initializeAchievements = () => {
    const achievementsList: Achievement[] = [
      {
        id: 'first_disposal',
        title: 'Primeiro Passo Verde',
        description: 'Realize seu primeiro descarte consciente',
        icon: <Leaf className="text-green-500" size={32} />,
        category: 'bronze',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        unlockedAt: new Date('2024-01-15'),
        points: 50
      },
      {
        id: 'electronics_expert',
        title: 'Especialista em Eletrônicos',
        description: 'Descarte 10 itens eletrônicos corretamente',
        icon: <Zap className="text-blue-500" size={32} />,
        category: 'silver',
        progress: 7,
        maxProgress: 10,
        unlocked: false,
        points: 150
      },
      {
        id: 'battery_guardian',
        title: 'Guardião das Pilhas',
        description: 'Descarte 25 pilhas ou baterias',
        icon: <Shield className="text-yellow-500" size={32} />,
        category: 'gold',
        progress: 18,
        maxProgress: 25,
        unlocked: false,
        points: 250
      },
      {
        id: 'eco_warrior',
        title: 'Guerreiro Ecológico',
        description: 'Acumule 1000 pontos EcoFlow',
        icon: <Crown className="text-purple-500" size={32} />,
        category: 'platinum',
        progress: 750,
        maxProgress: 1000,
        unlocked: false,
        points: 500
      },
      {
        id: 'week_streak',
        title: 'Semana Verde',
        description: 'Faça descartes por 7 dias consecutivos',
        icon: <Star className="text-orange-500" size={32} />,
        category: 'bronze',
        progress: 4,
        maxProgress: 7,
        unlocked: false,
        points: 100
      },
      {
        id: 'ai_curious',
        title: 'Curioso da IA',
        description: 'Faça 20 perguntas para a EcoFlow AI',
        icon: <Target className="text-indigo-500" size={32} />,
        category: 'silver',
        progress: 15,
        maxProgress: 20,
        unlocked: false,
        points: 200
      },
      {
        id: 'water_protector',
        title: 'Protetor das Águas',
        description: 'Proteja 10.000 litros de água com seus descartes',
        icon: <Shield className="text-cyan-500" size={32} />,
        category: 'gold',
        progress: 8500,
        maxProgress: 10000,
        unlocked: false,
        points: 300
      },
      {
        id: 'perfect_month',
        title: 'Mês Perfeito',
        description: 'Faça pelo menos um descarte todos os dias por 30 dias',
        icon: <Medal className="text-red-500" size={32} />,
        category: 'platinum',
        progress: 12,
        maxProgress: 30,
        unlocked: false,
        points: 1000
      }
    ]
    
    setAchievements(achievementsList)
  }

  const getCategoryColor = (category: Achievement['category']) => {
    const colors = {
      bronze: 'from-orange-400 to-yellow-600',
      silver: 'from-gray-400 to-gray-600',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-purple-400 to-purple-600'
    }
    return colors[category]
  }

  const getCategoryBadge = (category: Achievement['category']) => {
    const badges = {
      bronze: { text: 'Bronze', color: 'bg-orange-500' },
      silver: { text: 'Prata', color: 'bg-gray-500' },
      gold: { text: 'Ouro', color: 'bg-yellow-500' },
      platinum: { text: 'Platina', color: 'bg-purple-500' }
    }
    return badges[category]
  }

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked
    if (filter === 'locked') return !achievement.unlocked
    return true
  })

  const totalUnlocked = achievements.filter(a => a.unlocked).length
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="min-h-screen">
      {/* Header minimalista com navegação e logo */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-green-600 hover:text-green-700 transition-colors p-2"
        >
          <Home size={24} />
        </Link>
        
        <Link to="/sobre-nos">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
            <span className="text-white font-bold text-sm">ECO</span>
          </div>
        </Link>
      </div>

      <div className="px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Conquistas
          </h1>
          <p className="text-gray-600">
            Suas medalhas de herói ambiental
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-4 text-white text-center">
            <Trophy size={32} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalUnlocked}</div>
            <div className="text-green-100 text-sm">Conquistas Desbloqueadas</div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-4 text-white text-center">
            <Star size={32} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-blue-100 text-sm">Pontos de Conquistas</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-4 text-white text-center">
            <Award size={32} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round((totalUnlocked / achievements.length) * 100)}%</div>
            <div className="text-purple-100 text-sm">Progresso Total</div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-2 mb-8"
        >
          {[
            { key: 'all', label: 'Todas' },
            { key: 'unlocked', label: 'Desbloqueadas' },
            { key: 'locked', label: 'Bloqueadas' }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === filterOption.key
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
              }`}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`relative rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                achievement.unlocked 
                  ? 'bg-white border-2 border-green-200' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className={`${getCategoryBadge(achievement.category).color} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                  {getCategoryBadge(achievement.category).text}
                </span>
              </div>

              {/* Icon */}
              <div className={`mb-4 ${achievement.unlocked ? '' : 'opacity-50'}`}>
                {achievement.icon}
              </div>

              {/* Content */}
              <div className={achievement.unlocked ? '' : 'opacity-75'}>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {achievement.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progresso</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(achievement.category)}`}
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Points */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {achievement.points} pontos
                    </span>
                  </div>

                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-green-600">
                      Desbloqueada em {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>

                {/* Unlocked Badge */}
                {achievement.unlocked && (
                  <div className="absolute -top-2 -left-2">
                    <div className="bg-green-500 text-white rounded-full p-2">
                      <Trophy size={16} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-6 text-white text-center"
        >
          <div className="mb-3">
            <Award size={32} className="mx-auto" />
          </div>
          <h3 className="text-lg font-bold mb-2">Continue sua jornada!</h3>
          <p className="text-green-100">
            Cada conquista representa um passo importante para um planeta mais sustentável. 
            Continue fazendo a diferença!
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
                src={"SodaBug.jpg"}
                alt="Logo EcoFlow"
                className="w-20 h-20 rounded-full shadow-lg border-2 border-white"
              />
              <h3 className="mt-3 text-lg font-bold">SodaBug</h3>
            </div>

            {/* Sobre */}
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Leaf size={20} />
                Sobre o EcoFlow
              </h4>
              <p className="text-green-100 text-sm leading-relaxed">
                Promovemos o descarte consciente e incentivamos a reciclagem usando tecnologia
                de IA para proteger o meio ambiente e inspirar hábitos sustentáveis.
              </p>
            </div>

            {/* Links rápidos */}
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <MapPin size={20} />
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li><Link to="/ai-chat" className="hover:text-white transition-colors">Conversar com a IA</Link></li>
                <li><Link to="/history" className="hover:text-white transition-colors">Meu Histórico Verde</Link></li>
                <li><Link to="/achievements" className="hover:text-white transition-colors">Conquistas</Link></li>
                <li><Link to="/map" className="hover:text-white transition-colors">Pontos de Coleta</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Mail size={20} />
                Contato
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
            © {new Date().getFullYear()} EcoFlow - by Soda Bug. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Achievements
