
import React, { useState } from 'react'
import {Home, MapPin, Navigation, Phone, Clock, Star, Filter, Search} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MapPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  const collectionPoints = [
    {
      id: 1,
      name: "Ecoponto Central Sorocaba",
      address: "Av. General Carneiro, 1200 - Centro",
      phone: "(15) 3224-1234",
      hours: "Segunda a Sábado: 7h às 17h",
      types: ["eletrônicos", "pilhas", "óleo", "papel"],
      rating: 4.8,
      distance: "0.5 km"
    },
    {
      id: 2,
      name: "Cooperativa Verde Vida",
      address: "Rua das Flores, 456 - Jardim Europa",
      phone: "(15) 3225-5678",
      hours: "Segunda a Sexta: 8h às 16h",
      types: ["papel", "plástico", "metal", "vidro"],
      rating: 4.6,
      distance: "1.2 km"
    },
    {
      id: 3,
      name: "Ponto de Coleta Shopping",
      address: "Shopping Iguatemi - Piso L1",
      phone: "(15) 3226-9012",
      hours: "Todos os dias: 10h às 22h",
      types: ["eletrônicos", "pilhas", "lâmpadas"],
      rating: 4.7,
      distance: "2.1 km"
    },
    {
      id: 4,
      name: "Farmácia Descarte Seguro",
      address: "Rua da Saúde, 789 - Vila Hortência",
      phone: "(15) 3227-3456",
      hours: "Segunda a Sábado: 8h às 20h",
      types: ["medicamentos", "seringas"],
      rating: 4.9,
      distance: "0.8 km"
    }
  ]

  const filterTypes = [
    { id: 'todos', label: 'Todos', color: 'bg-gray-500' },
    { id: 'eletrônicos', label: 'Eletrônicos', color: 'bg-blue-500' },
    { id: 'papel', label: 'Papel', color: 'bg-green-500' },
    { id: 'pilhas', label: 'Pilhas', color: 'bg-red-500' },
    { id: 'óleo', label: 'Óleo', color: 'bg-yellow-500' },
    { id: 'medicamentos', label: 'Medicamentos', color: 'bg-purple-500' }
  ]

  const filteredPoints = collectionPoints.filter(point => {
    const matchesFilter = selectedFilter === 'todos' || point.types.includes(selectedFilter)
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-green-600 hover:text-green-700 transition-colors p-2"
        >
          <Home size={24} />
        </Link>
        
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
          <span className="text-white font-bold text-sm">ECO</span>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pontos de Coleta</h1>
          <p className="text-gray-600">Encontre locais próximos para descarte consciente</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterTypes.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? `${filter.color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${selectedFilter === filter.id ? 'bg-white/30' : filter.color}`} />
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Google Maps Integration Space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-100 rounded-2xl p-8 mb-8 text-center border-2 border-dashed border-gray-300"
        >
          <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-600 mb-2">Mapa Interativo</h3>
          <p className="text-gray-500 mb-4">
            Espaço reservado para integração com Google Maps API
          </p>
          <div className="bg-white rounded-xl p-4 shadow-inner">
            <p className="text-sm text-gray-400">
              Aqui será exibido o mapa interativo com a localização dos pontos de coleta,
              rotas de navegação e filtros visuais por tipo de material.
            </p>
          </div>
        </motion.div>

        {/* Collection Points List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Pontos Próximos ({filteredPoints.length})
            </h2>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Filter size={16} />
              <span className="text-sm">Ordenar</span>
            </button>
          </div>

          {filteredPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{point.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{point.address}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500" size={16} />
                      <span>{point.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation size={16} />
                      <span>{point.distance}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  <Navigation size={16} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Aceita:</p>
                <div className="flex flex-wrap gap-2">
                  {point.types.map((type) => {
                    const filterType = filterTypes.find(f => f.id === type)
                    return (
                      <span
                        key={type}
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${filterType?.color || 'bg-gray-500'}`}
                      >
                        {filterType?.label || type}
                      </span>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{point.hours}</span>
                  </div>
                </div>
                <a
                  href={`tel:${point.phone}`}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Phone size={16} />
                  <span>{point.phone}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPoints.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-600 mb-2">Nenhum ponto encontrado</h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termo de busca
            </p>
          </motion.div>
        )}

        {/* Add Point CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center"
        >
          <h3 className="text-xl font-bold mb-2">Conhece um ponto de coleta?</h3>
          <p className="text-blue-100 mb-4">
            Ajude nossa comunidade cadastrando novos locais de descarte
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Sugerir Local
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gradient-to-br from-green-700 via-emerald-700 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={"SodaBug.jpg"}
                alt="Logo EcoFlow"
                className="w-20 h-20 rounded-full shadow-lg border-2 border-white"
              />
              <h3 className="mt-3 text-lg font-bold">SodaBug</h3>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3">Sobre o EcoFlow</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                Promovemos o descarte consciente e incentivamos a reciclagem usando tecnologia
                de IA para proteger o meio ambiente e inspirar hábitos sustentáveis.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3">Links Rápidos</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li><Link to="/ai-chat" className="hover:text-white transition-colors">Conversar com a IA</Link></li>
                <li><Link to="/history" className="hover:text-white transition-colors">Meu Histórico Verde</Link></li>
                <li><Link to="/achievements" className="hover:text-white transition-colors">Conquistas</Link></li>
                <li><Link to="/map" className="hover:text-white transition-colors">Pontos de Coleta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-3">Contato</h4>
              <p className="text-green-100 text-sm">Email: suporte@ecoflow.com</p>
              <p className="text-green-100 text-sm">Parcerias: parcerias@ecoflow.com</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center text-sm text-green-200">
            © {new Date().getFullYear()} EcoFlow - by Soda Bug. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MapPage
