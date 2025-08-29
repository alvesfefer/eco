
import React, { useState, useEffect } from 'react'
import {Calendar, TrendingUp, Award, Leaf, Droplets, Recycle, Home, BarChart3, Target, Users, Mail, MessageCircle, MapPin} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { lumi } from '../lib/lumi'

interface DisposalRecord {
  _id: string
  item_name: string
  category: string
  disposal_date: string
  points_earned: number
  location: string
  notes: string
}

const History: React.FC = () => {
  const [disposalHistory, setDisposalHistory] = useState<DisposalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchDisposalHistory()
  }, [])

  const fetchDisposalHistory = async () => {
    try {
      const { list } = await lumi.entities.user_disposals.list()
      setDisposalHistory(list || [])
      
      // Calcular estatísticas
      const points = (list || []).reduce((sum, record) => sum + record.points_earned, 0)
      setTotalPoints(points)
      setTotalItems((list || []).length)
      
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'pilhas_baterias': <Recycle className="text-green-600" size={24} />,
      'lâmpadas': <Leaf className="text-yellow-600" size={24} />,
      'óleo': <Droplets className="text-orange-600" size={24} />,
      'eletrônicos': <BarChart3 className="text-blue-600" size={24} />,
      'medicamentos': <Target className="text-red-600" size={24} />,
      'plásticos': <Recycle className="text-green-600" size={24} />,
      'vidros': <Recycle className="text-blue-600" size={24} />,
      'papel': <Recycle className="text-brown-600" size={24} />
    }
    return icons[category] || <Recycle className="text-gray-600" size={24} />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getEnvironmentalImpact = () => {
    // Cálculos baseados no número de itens descartados
    const waterSaved = totalItems * 1000 // Litros
    const co2Reduced = totalItems * 2.5 // Kg
    const treesEquivalent = Math.floor(totalItems / 10)
    
    return { waterSaved, co2Reduced, treesEquivalent }
  }

  const { waterSaved, co2Reduced, treesEquivalent } = getEnvironmentalImpact()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Leaf size={64} className="text-green-500 mx-auto" />
          </motion.div>
          <p className="text-gray-600">Carregando seu histórico verde...</p>
        </div>
      </div>
    )
  }

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
            Meu Histórico Verde
          </h1>
          <p className="text-gray-600">
            Acompanhe seu impacto positivo no meio ambiente
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Award size={24} />
              <Target size={24} />
            </div>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-green-100 text-sm">Pontos EcoMind</div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Recycle size={24} />
              <BarChart3 size={24} />
            </div>
            <div className="text-2xl font-bold">{totalItems}</div>
            <div className="text-blue-100 text-sm">Itens Descartados</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Droplets size={24} />
              <Droplets size={24} />
            </div>
            <div className="text-2xl font-bold">{waterSaved.toLocaleString()}</div>
            <div className="text-purple-100 text-sm">Litros Protegidos</div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Leaf size={24} />
              <Leaf size={24} />
            </div>
            <div className="text-2xl font-bold">{treesEquivalent}</div>
            <div className="text-orange-100 text-sm">Árvores Equivalentes</div>
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} />
            <h2 className="text-xl font-bold">Seu Impacto Ambiental</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="mb-2">
                <Droplets size={32} className="mx-auto" />
              </div>
              <div className="text-2xl font-bold">{waterSaved.toLocaleString()}</div>
              <div className="text-green-100">litros de água protegidos</div>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <Leaf size={32} className="mx-auto" />
              </div>
              <div className="text-2xl font-bold">{co2Reduced}</div>
              <div className="text-green-100">kg de CO₂ evitados</div>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <Leaf size={32} className="mx-auto" />
              </div>
              <div className="text-2xl font-bold">{treesEquivalent}</div>
              <div className="text-green-100">árvores plantadas (equiv.)</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white/20 rounded-xl">
            <p className="text-center text-green-100">
              Parabéns! Você já fez a diferença para o planeta. Continue assim, herói ambiental!
            </p>
          </div>
        </motion.div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar size={24} />
            Histórico de Descartes
          </h3>

          {disposalHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <Leaf size={64} className="text-green-500 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Comece sua jornada verde!
              </h3>
              <p className="text-gray-600">
                Seus primeiros descartes conscientes aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {disposalHistory.map((record, index) => (
                <motion.div
                  key={record._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        {getCategoryIcon(record.category)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{record.item_name}</h4>
                        <p className="text-sm text-gray-600">{record.location}</p>
                        <p className="text-xs text-gray-500">{formatDate(record.disposal_date)}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        +{record.points_earned} pts
                      </div>
                    </div>
                  </div>
                  
                  {record.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{record.notes}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-6 text-white text-center"
        >
          <div className="mb-3">
            <Leaf size={32} className="mx-auto" />
          </div>
          <h3 className="text-lg font-bold mb-2">Cada descarte importa!</h3>
          <p className="text-purple-100">
            Você está construindo um futuro mais sustentável. Continue fazendo a diferença!
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

export default History
