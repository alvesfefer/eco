
import React, { useState, useEffect } from 'react'
import {Camera, Upload, Search, Sparkles, MapPin, AlertTriangle, Recycle, Lightbulb, Filter, Home, Cpu, HardDrive, Monitor, Smartphone, Battery, Zap, Leaf, Users, Mail, MessageCircle, TrendingUp} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { lumi } from '../lib/lumi'

interface WasteItem {
  _id: string
  name: string
  category: string
  disposal_method: string
  environmental_impact: string
  correct_disposal: string
  collection_points: string[]
  image_url?: string
  tips?: string[]
  recyclable_materials?: string[]
  danger_level: number
}

const Disposal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<WasteItem | null>(null)
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([])
  const [loading, setLoading] = useState(false)
  const [aiThinking, setAiThinking] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAllItems, setShowAllItems] = useState(false)

  useEffect(() => {
    fetchWasteItems()
  }, [])

  const fetchWasteItems = async () => {
    try {
      const { list } = await lumi.entities.waste_items.list()
      setWasteItems(list || [])
    } catch (error) {
      console.error('Erro ao carregar itens:', error)
      toast.error('Erro ao carregar base de dados')
    }
  }

  const simulateAISearch = (term: string) => {
    setAiThinking(true)
    setLoading(true)
    
    // Simula processamento da IA
    setTimeout(() => {
      const foundItem = wasteItems.find(item => 
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      )
      
      if (foundItem) {
        setSelectedItem(foundItem)
        toast.success('Item identificado pela IA')
      } else {
        toast.error('Item não encontrado na base de dados')
      }
      
      setAiThinking(false)
      setLoading(false)
    }, 2000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      toast.error('Digite o nome do item')
      return
    }
    simulateAISearch(searchTerm)
  }

  const simulatePhotoCapture = () => {
    setAiThinking(true)
    setLoading(true)
    toast.loading('Analisando foto com IA...', { duration: 2000 })
    
    // Simula análise de foto - seleciona item aleatório
    setTimeout(() => {
      const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)]
      if (randomItem) {
        setSelectedItem(randomItem)
        toast.success('Foto analisada! Item identificado!')
      }
      setAiThinking(false)
      setLoading(false)
    }, 2500)
  }

  const simulatePhotoImport = () => {
    // Simula clique no input file para desktop
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      if (input.files && input.files[0]) {
        setAiThinking(true)
        setLoading(true)
        toast.loading('Analisando imagem importada...', { duration: 2000 })
        
        setTimeout(() => {
          const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)]
          if (randomItem) {
            setSelectedItem(randomItem)
            toast.success('Imagem analisada! Item identificado!')
          }
          setAiThinking(false)
          setLoading(false)
        }, 2500)
      }
    }
    input.click()
  }

  const getDangerColor = (level: number) => {
    if (level >= 4) return 'text-red-600 bg-red-100'
    if (level >= 3) return 'text-orange-600 bg-orange-100'
    return 'text-yellow-600 bg-yellow-100'
  }

  const getDangerText = (level: number) => {
    if (level >= 4) return 'Alto Risco'
    if (level >= 3) return 'Risco Moderado'
    return 'Baixo Risco'
  }

  const getDangerExplanation = (level: number, itemName: string) => {
    if (level >= 4) return `${itemName} contém materiais altamente tóxicos que podem causar graves danos ambientais e à saúde`
    if (level >= 3) return `${itemName} possui componentes perigosos que requerem descarte especializado`
    return `${itemName} tem baixo risco, mas ainda assim deve ser descartado corretamente`
  }

  const openMapsInSorocaba = (pointType: string) => {
    const searchQuery = `${pointType} Sorocaba SP`
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
    window.open(mapsUrl, '_blank')
  }

  const registerDisposal = async () => {
    if (!selectedItem) return
    
    try {
      // Simula registro do descarte
      toast.success('Descarte registrado! +50 pontos EcoFlow!')
      
      // Animação de "Terra agradece"
      setTimeout(() => {
        toast.success('A Terra agradece você!', {
          duration: 3000,
          style: { background: '#10b981', fontSize: '16px' }
        })
      }, 1000)
      
    } catch (error) {
      toast.error('Erro ao registrar descarte')
    }
  }

  const getItemIcon = (item: WasteItem) => {
    const name = item.name.toLowerCase()
    
    // Ícones específicos para componentes de PC
    if (name.includes('placa-mãe')) return <Monitor size={24} className="text-blue-600" />
    if (name.includes('hd') || name.includes('disco')) return <HardDrive size={24} className="text-gray-600" />
    if (name.includes('ssd')) return <HardDrive size={24} className="text-blue-600" />
    if (name.includes('memória') || name.includes('ram')) return <Cpu size={24} className="text-green-600" />
    if (name.includes('fonte')) return <Zap size={24} className="text-yellow-600" />
    if (name.includes('placa de vídeo') || name.includes('gpu')) return <Monitor size={24} className="text-purple-600" />
    if (name.includes('placa de som')) return <Cpu size={24} className="text-red-600" />
    if (name.includes('placa de rede')) return <Cpu size={24} className="text-blue-600" />
    if (name.includes('processador') || name.includes('cpu')) return <Cpu size={24} className="text-orange-600" />
    if (name.includes('impressora')) return <Monitor size={24} className="text-gray-600" />
    if (name.includes('cartucho') || name.includes('toner')) return <Lightbulb size={24} className="text-black" />
    if (name.includes('teclado')) return <Monitor size={24} className="text-gray-600" />
    if (name.includes('monitor')) return <Monitor size={24} className="text-blue-600" />
    if (name.includes('televisor') && name.includes('crt')) return <Monitor size={24} className="text-gray-600" />
    if (name.includes('smart tv') || name.includes('tv')) return <Monitor size={24} className="text-black" />
    if (name.includes('console')) return <Monitor size={24} className="text-green-600" />
    if (name.includes('controle')) return <Cpu size={24} className="text-blue-600" />
    if (name.includes('roteador') || name.includes('modem')) return <Cpu size={24} className="text-orange-600" />
    if (name.includes('caixa de som') || name.includes('soundbar')) return <Monitor size={24} className="text-purple-600" />
    if (name.includes('cabo') || name.includes('fio')) return <Zap size={24} className="text-gray-600" />
    
    // Ícones para outros itens
    if (item.category === 'pilhas_baterias') return <Battery size={24} className="text-green-600" />
    if (name.includes('iphone')) return <Smartphone size={24} className="text-gray-600" />
    if (name.includes('samsung')) return <Smartphone size={24} className="text-blue-600" />
    if (name.includes('notebook')) return <Monitor size={24} className="text-gray-600" />
    if (name.includes('tablet')) return <Smartphone size={24} className="text-gray-600" />
    if (name.includes('carregador')) return <Zap size={24} className="text-yellow-600" />
    if (name.includes('fone')) return <Cpu size={24} className="text-black" />
    if (name.includes('mouse')) return <Cpu size={24} className="text-gray-600" />
    if (name.includes('webcam')) return <Monitor size={24} className="text-red-600" />
    if (name.includes('microfone')) return <Cpu size={24} className="text-blue-600" />
    if (name.includes('lâmpada')) return <Lightbulb size={24} className="text-yellow-600" />
    if (name.includes('óleo')) return <Lightbulb size={24} className="text-orange-600" />
    if (name.includes('medicamento')) return <Lightbulb size={24} className="text-red-600" />
    
    return <Smartphone size={24} className="text-gray-600" />
  }

  // Filtrar itens por categoria
  const filteredItems = selectedCategory === 'all' 
    ? wasteItems 
    : wasteItems.filter(item => item.category === selectedCategory)

  // Determinar quantos itens mostrar
  const itemsToShow = showAllItems ? filteredItems : filteredItems.slice(0, 12)

  // Categorias disponíveis
  const categories = [
    { id: 'all', name: 'Todos', icon: <Filter size={16} /> },
    { id: 'eletrônicos', name: 'Eletrônicos', icon: <Smartphone size={16} /> },
    { id: 'pilhas_baterias', name: 'Pilhas/Baterias', icon: <Battery size={16} /> },
    { id: 'lâmpadas', name: 'Lâmpadas', icon: <Lightbulb size={16} /> },
    { id: 'óleo', name: 'Óleo', icon: <Lightbulb size={16} /> },
    { id: 'medicamentos', name: 'Medicamentos', icon: <Lightbulb size={16} /> }
  ]

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

      <div className="px-6 py-8 pb-32">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            IA do Descarte Consciente
          </h1>
          <p className="text-gray-600">
            Tire uma foto, importe uma imagem ou digite o nome do item para descobrir como descartar corretamente
          </p>
        </motion.div>

        {/* Search Bar - Sempre Visível */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-6"
        >
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome do item (ex: placa-mãe, processador, HD, SSD)..."
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 px-4 pr-14 font-medium focus:border-green-500 focus:outline-none transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Action Buttons - Sempre Visíveis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={simulatePhotoCapture}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-3 px-4 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <Camera size={20} />
              Tirar Foto
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={simulatePhotoImport}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 px-4 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <Upload size={20} />
              Importar Imagem
            </motion.button>
          </div>
        </motion.div>

        {/* AI Thinking Animation */}
        <AnimatePresence>
          {aiThinking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <Sparkles size={64} className="text-green-500 mx-auto" />
                </motion.div>
                <p className="text-lg font-semibold text-gray-800">IA Analisando...</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
            >
              {/* Item Header */}
              <div className="relative">
                {selectedItem.image_url && (
                  <img 
                    src={selectedItem.image_url} 
                    alt={selectedItem.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {selectedItem.name}
                      </h2>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {selectedItem.category}
                      </span>
                    </div>
                    <div 
                      className={`px-3 py-1 rounded-full text-sm font-medium cursor-help ${getDangerColor(selectedItem.danger_level)}`}
                      title={getDangerExplanation(selectedItem.danger_level, selectedItem.name)}
                    >
                      <AlertTriangle size={16} className="inline mr-1" />
                      {getDangerText(selectedItem.danger_level)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Disposal Method */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Recycle className="text-green-600" size={20} />
                    <h3 className="font-bold text-green-800">Como Descartar</h3>
                  </div>
                  <p className="text-green-700">{selectedItem.disposal_method}</p>
                </div>

                {/* Environmental Impact */}
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="text-red-600" size={20} />
                    <h3 className="font-bold text-red-800">Impacto se Descartado Incorretamente</h3>
                  </div>
                  <p className="text-red-700">{selectedItem.environmental_impact}</p>
                </div>

                {/* Correct Disposal Benefits */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-blue-600" size={20} />
                    <h3 className="font-bold text-blue-800">Benefícios do Descarte Correto</h3>
                  </div>
                  <p className="text-blue-700">{selectedItem.correct_disposal}</p>
                </div>

                {/* Collection Points */}
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-purple-600" size={20} />
                    <h3 className="font-bold text-purple-800">Pontos de Coleta</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.collection_points.map((point, index) => (
                      <button
                        key={index}
                        onClick={() => openMapsInSorocaba(point)}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <MapPin size={12} />
                        {point}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                {selectedItem.tips && selectedItem.tips.length > 0 && (
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="text-yellow-600" size={20} />
                      <h3 className="font-bold text-yellow-800">Dicas Importantes</h3>
                    </div>
                    <ul className="space-y-1">
                      {selectedItem.tips.map((tip, index) => (
                        <li key={index} className="text-yellow-700 flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recyclable Materials */}
                {selectedItem.recyclable_materials && selectedItem.recyclable_materials.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-800 mb-3">Materiais Recicláveis</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.recyclable_materials.map((material, index) => (
                        <span 
                          key={index}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          <Recycle size={12} />
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={registerDisposal}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Registrar Descarte Consciente (+50 pontos)
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filter */}
        {!selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-gray-600" />
              <span className="font-semibold text-gray-800">Filtrar por categoria:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Items Grid */}
        {!selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedCategory === 'all' ? 'Todos os Itens' : `Categoria: ${categories.find(c => c.id === selectedCategory)?.name}`}
                <span className="text-gray-500 text-sm ml-2">({filteredItems.length} itens)</span>
              </h3>
              
              {filteredItems.length > 12 && (
                <button
                  onClick={() => setShowAllItems(!showAllItems)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {showAllItems ? 'Mostrar Menos' : `Ver Todos (${filteredItems.length})`}
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {itemsToShow.map((item) => (
                <motion.button
                  key={item._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white rounded-xl p-4 shadow-lg text-left hover:shadow-xl transition-all"
                >
                  <div className="mb-2">
                    {getItemIcon(item)}
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                  <div className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${getDangerColor(item.danger_level)}`}>
                    {getDangerText(item.danger_level)}
                  </div>
                </motion.button>
              ))}
            </div>
            
            {!showAllItems && filteredItems.length > 12 && (
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  Mostrando 12 de {filteredItems.length} itens. 
                  <button 
                    onClick={() => setShowAllItems(true)}
                    className="text-blue-500 hover:text-blue-700 ml-1 font-medium"
                  >
                    Ver todos
                  </button>
                </p>
              </div>
            )}
          </motion.div>
        )}
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

export default Disposal
