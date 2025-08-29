
import React, { useState, useEffect, useRef } from 'react'
import {Send, Bot, User, ThumbsUp, ThumbsDown, Lightbulb, Recycle, MapPin, AlertTriangle, Home, Cpu, HardDrive, Monitor, Smartphone, Battery, Zap, Leaf, Users, Mail, MessageCircle, TrendingUp} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { lumi } from '../lib/lumi'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  category?: string
  helpful?: boolean
}

interface AIResponse {
  answer: string
  category: string
  confidence: number
  related_items: string[]
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Mensagem de boas-vindas
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: 'Olá! Eu sou a EcoFlow AI!\n\nEstou aqui para responder suas dúvidas sobre descarte consciente, reciclagem e impacto ambiental.\n\nPergunta qualquer coisa! Por exemplo:\n• "Como descartar processador Intel?"\n• "O que fazer com placa-mãe queimada?"\n• "Onde levar memória RAM defeituosa?"\n• "Por que não posso jogar HD no lixo?"',
      timestamp: new Date(),
      category: 'geral'
    }
    setMessages([welcomeMessage])
  }, [])

  const quickQuestions = [
    { text: "Como descartar processador/CPU?", icon: <Cpu size={16} />, category: "descarte" },
    { text: "O que fazer com placa-mãe queimada?", icon: <Monitor size={16} />, category: "descarte" },
    { text: "Onde descartar memória RAM?", icon: <Cpu size={16} />, category: "pontos_coleta" },
    { text: "Por que HD não pode ir no lixo?", icon: <HardDrive size={16} />, category: "impacto" },
    { text: "Como descartar fonte de PC?", icon: <Zap size={16} />, category: "descarte" },
    { text: "O que acontece com pilhas no lixo?", icon: <Battery size={16} />, category: "impacto" },
    { text: "Onde encontrar ecopontos?", icon: <MapPin size={16} />, category: "pontos_coleta" },
    { text: "Como descartar notebook velho?", icon: <Monitor size={16} />, category: "descarte" },
    { text: "O que fazer com carregadores?", icon: <Zap size={16} />, category: "descarte" },
    { text: "Por que reciclar eletrônicos?", icon: <Recycle size={16} />, category: "reciclagem" },
    { text: "Como descartar smartphone?", icon: <Smartphone size={16} />, category: "descarte" },
    { text: "O que são terras raras?", icon: <AlertTriangle size={16} />, category: "impacto" }
  ]

  const generateAIResponse = (question: string): AIResponse => {
    const lowercaseQuestion = question.toLowerCase()
    
    // Base de conhecimento expandida da IA
    const responses = {
      processador: {
        answer: "Processadores são componentes tecnológicos valiosos!\n\nPor que são valiosos:\n• Contêm ouro, prata e paládio nos contatos\n• Silício de alta pureza\n• Terras raras nos circuitos integrados\n\nDescarte correto:\n• Lojas de informática especializadas\n• Assistências técnicas\n• Ecopontos municipais\n• Programas de logística reversa\n\nO que acontece:\n• Ouro é extraído por eletrólise\n• Silício vira matéria-prima para novos chips\n• Terras raras são refinadas\n\nNUNCA jogue no lixo - um processador vale mais que muitas joias!",
        category: "descarte",
        confidence: 0.98,
        related_items: ["Processador Intel", "Processador AMD"]
      },
      "placa-mãe": {
        answer: "Placa-mãe é o componente mais valioso do PC!\n\nPor que é especial:\n• Maior concentração de metais preciosos\n• Circuitos integrados complexos\n• Conectores banhados a ouro\n\nDescarte seguro:\n• Assistências técnicas especializadas\n• Lojas de informática\n• Ecopontos\n• Fabricantes (logística reversa)\n\nPreparação:\n• Remova bateria CMOS\n• Retire todos os componentes\n• Embale para não quebrar\n\nRecuperação:\n• Ouro dos conectores → refinarias\n• Cobre das trilhas → 100% reciclável\n• Componentes → remanufatura\n\nUma placa-mãe tem mais ouro que uma aliança!",
        category: "descarte",
        confidence: 0.97,
        related_items: ["Placa-Mãe"]
      },
      "memória": {
        answer: "Memória RAM é tesouro tecnológico!\n\nComposição valiosa:\n• Ouro nos contatos\n• Prata nas trilhas\n• Paládio nos circuitos\n• Terras raras nos chips\n\nDescarte correto:\n• Lojas de informática\n• Assistências técnicas\n• Ecopontos\n• Fabricantes\n\nCuidados:\n• Não toque nos contatos dourados\n• Mantenha em embalagem antiestática\n• Remova cuidadosamente dos slots\n\nProcessamento:\n• Metais preciosos extraídos por eletrólise\n• Fibra de vidro reprocessada\n• Componentes viram matéria-prima\n\n8GB de RAM = 0.1g de ouro puro!",
        category: "descarte",
        confidence: 0.96,
        related_items: ["Memória RAM"]
      },
      hd: {
        answer: "HDs são componentes perigosos se descartados errado!\n\nPor que são perigosos:\n• Ímãs de neodímio super raros\n• Metais pesados tóxicos\n• Dados pessoais sensíveis\n• Componentes eletrônicos complexos\n\nDescarte OBRIGATÓRIO:\n• Assistências técnicas\n• Lojas de informática\n• Ecopontos especializados\n• Empresas de destruição de dados\n\nAntes do descarte:\n• APAGUE TODOS OS DADOS\n• Use software de destruição\n• Considere destruição física\n\nRecuperação:\n• Neodímio → novos motores\n• Alumínio → 100% reciclável\n• Terras raras → refinadas\n\nUm HD no lixo contamina milhares de litros de água!",
        category: "descarte",
        confidence: 0.99,
        related_items: ["HD", "SSD"]
      },
      fonte: {
        answer: "Fontes de PC são ALTAMENTE PERIGOSAS!\n\nRiscos críticos:\n• Capacitores mantêm carga por dias\n• Risco de choque elétrico mortal\n• Componentes tóxicos\n• Transformadores com cobre valioso\n\nDescarte especializado:\n• Assistências técnicas\n• Eletricistas profissionais\n• Ecopontos especializados\n• Fabricantes\n\nCuidados OBRIGATÓRIOS:\n• NUNCA abra a fonte\n• Aguarde 24h após desligar\n• Desconecte todos os cabos\n• Não toque em componentes internos\n\nRecuperação:\n• Cobre dos transformadores\n• Ímãs de neodímio\n• Metais da carcaça\n\nFONTE LIGADA = RISCO DE MORTE!",
        category: "descarte",
        confidence: 0.99,
        related_items: ["Fonte de Alimentação"]
      },
      pilha: {
        answer: "Pilhas são extremamente tóxicas para o planeta!\n\nToxicidade extrema:\n• 1 pilha contamina 20 mil litros de água\n• Mercúrio, chumbo, cádmio\n• Permanecem tóxicas por décadas\n• Causam câncer e malformações\n\nDescarte OBRIGATÓRIO:\n• Farmácias (maioria aceita)\n• Supermercados grandes\n• Lojas de eletrônicos\n• Ecopontos municipais\n\nProcessamento:\n• Metais são separados\n• Mercúrio é neutralizado\n• Zinco e manganês recuperados\n• Materiais viram novas pilhas\n\nComparação chocante:\n• 1 pilha = 20.000 litros de água contaminada\n• 1 copo de água = suficiente para uma pessoa por 10 dias\n\nSeu descarte consciente SALVA VIDAS!",
        category: "descarte",
        confidence: 0.99,
        related_items: ["Pilha Alcalina", "Bateria"]
      },
      óleo: {
        answer: "Óleo de cozinha é valioso quando reciclado!\n\nImpacto devastador no lixo:\n• 1 litro contamina 1 MILHÃO de litros de água\n• Entope encanamentos\n• Mata vida aquática\n• Cria ilhas de gordura nos oceanos\n\nDescarte inteligente:\n• Deixe esfriar completamente\n• Coloque em garrafa PET\n• Leve a supermercados, escolas, ONGs\n\nTransformação incrível:\n• Biodiesel para veículos\n• Sabão ecológico\n• Ração animal\n• Tinta ecológica\n\nSeu litro de óleo vira:\n• 1 litro de biodiesel OU\n• 10 barras de sabão OU\n• Energia para 1 carro por 10km\n\nDe vilão a herói ambiental!",
        category: "reciclagem",
        confidence: 0.98,
        related_items: ["Óleo de Cozinha"]
      },
      smartphone: {
        answer: "Smartphones são componentes valiosos portáteis!\n\nComposição incrível:\n• 40+ elementos da tabela periódica\n• Ouro, prata, paládio, platina\n• Terras raras super valiosas\n• Lítio da bateria\n\nAntes do descarte:\n• Factory reset completo\n• Remova SIM e cartão SD\n• Desconecte de todas as contas\n• Apague dados definitivamente\n\nDescarte especializado:\n• Assistências da marca\n• Lojas de operadoras\n• Programas trade-in\n• Ecopontos\n\nRecuperação valiosa:\n• 1 tonelada de celulares = 300g de ouro\n• Terras raras → novos dispositivos\n• Lítio → novas baterias\n• Plásticos → novos produtos\n\nSeu celular vale mais que uma aliança de ouro!",
        category: "descarte",
        confidence: 0.97,
        related_items: ["iPhone", "Samsung Galaxy"]
      },
      "terras raras": {
        answer: "Terras raras são elementos essenciais da tecnologia!\n\nO que são:\n• 17 elementos químicos super especiais\n• Neodímio, európio, térbio, disprósio...\n• Essenciais para toda tecnologia moderna\n• Mais valiosos que ouro!\n\nOnde estão:\n• Telas de celulares e TVs\n• Ímãs de HD e motores\n• Chips de processadores\n• Baterias de carros elétricos\n\nPor que são problemáticas:\n• Mineração destrói ecossistemas inteiros\n• Poluição radioativa\n• Concentradas em poucos países\n• Extremamente caras\n\nSolução: RECICLAGEM!\n• 1 tonelada de e-lixo = 10kg de terras raras\n• Evita mineração destrutiva\n• Economiza energia\n• Protege o planeta\n\nSeu descarte consciente protege florestas inteiras!",
        category: "impacto",
        confidence: 0.95,
        related_items: ["Terras Raras", "Impacto Ambiental"]
      }
    }

    // Busca por palavras-chave expandida
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseQuestion.includes(key) || 
          lowercaseQuestion.includes(key.replace('ã', 'a')) ||
          lowercaseQuestion.includes(key.replace('ê', 'e')) ||
          lowercaseQuestion.includes('cpu') && key === 'processador' ||
          lowercaseQuestion.includes('ram') && key === 'memória' ||
          lowercaseQuestion.includes('ssd') && key === 'hd' ||
          lowercaseQuestion.includes('celular') && key === 'smartphone') {
        return response
      }
    }

    // Respostas por categoria
    if (lowercaseQuestion.includes('onde') || lowercaseQuestion.includes('pontos') || lowercaseQuestion.includes('ecoponto')) {
      return {
        answer: "Para encontrar pontos de coleta especializados:\n\n**EcoFlow Map**: Use nossa aba 'Mapa' no app\n**Prefeitura**: Site oficial da sua cidade\n**Busca**: 'ecopontos + sua cidade' no Google\n\n**Tipos de pontos por categoria:**\n\n**Componentes de PC**:\n• Lojas de informática\n• Assistências técnicas\n• Fabricantes (Dell, HP, Lenovo)\n• Ecopontos especializados\n\n**Pilhas e Baterias**:\n• Farmácias (maioria aceita)\n• Supermercados\n• Lojas de eletrônicos\n• Postos de gasolina\n\n**Celulares**:\n• Lojas das operadoras\n• Assistências da marca\n• Shopping centers\n• Programas trade-in\n\n**Dica importante**: Sempre ligue antes para confirmar!",
        category: "pontos_coleta",
        confidence: 0.90,
        related_items: ["Pontos de Coleta", "Ecopontos"]
      }
    }

    if (lowercaseQuestion.includes('impacto') || lowercaseQuestion.includes('acontece') || lowercaseQuestion.includes('por que')) {
      return {
        answer: "O impacto do descarte incorreto é CATASTRÓFICO!\n\n**Números que chocam:**\n• 1 pilha = 20.000 litros de água contaminada\n• 1 litro de óleo = 1.000.000 litros de água poluída\n• 1 lâmpada fluorescente = mercúrio no ambiente por 50 anos\n• 1 celular = metais pesados no solo por 500 anos\n• 1 computador = chumbo suficiente para contaminar uma cidade pequena\n\n**Mas o descarte correto é TRANSFORMADOR:**\n✅ Vira novos produtos incríveis\n✅ Gera milhares de empregos verdes\n✅ Protege ecossistemas inteiros\n✅ Economiza recursos naturais preciosos\n✅ Reduz mineração destrutiva\n\n**Exemplo inspirador:**\n• 1 tonelada de e-lixo reciclado = 300g de ouro recuperado\n• Evita destruição de 1 hectare de floresta\n• Economiza energia equivalente a 1000 casas por 1 dia\n\nVocê é um HERÓI AMBIENTAL!",
        category: "impacto",
        confidence: 0.95,
        related_items: ["Impacto Ambiental", "Contaminação"]
      }
    }

    if (lowercaseQuestion.includes('recicl') || lowercaseQuestion.includes('benefício') || lowercaseQuestion.includes('vantagem')) {
      return {
        answer: "A reciclagem de eletrônicos é transformadora!\n\n**Transformações incríveis:**\n\n**Componentes de PC**:\n• Processadores → 300g de ouro por tonelada\n• Memórias RAM → prata e paládio puros\n• HDs → ímãs de neodímio super raros\n• Placas-mãe → circuitos para novos produtos\n\n**Smartphones**:\n• 40 celulares = 1g de ouro puro\n• Terras raras → telas de novos dispositivos\n• Lítio → baterias de carros elétricos\n• Alumínio → infinitamente reciclável\n\n**Benefícios planetários**:\n• Evita mineração destrutiva\n• Reduz 95% do consumo de energia\n• Protege habitats naturais\n• Diminui emissões de CO₂\n\n**Benefícios econômicos**:\n• Gera empregos especializados\n• Cria economia circular\n• Reduz dependência de importações\n• Desenvolve tecnologias verdes\n\nSua reciclagem alimenta a revolução tecnológica sustentável!",
        category: "reciclagem",
        confidence: 0.93,
        related_items: ["Reciclagem", "Economia Circular"]
      }
    }

    // Resposta padrão expandida
    return {
      answer: "Pergunta interessante! Embora eu não tenha uma resposta específica para isso, sou especialista em:\n\n**Componentes de PC**:\n• Processadores, memórias, placas-mãe\n• HDs, SSDs, fontes, coolers\n• Placas de vídeo, som, rede\n\n**Dispositivos móveis**:\n• Smartphones, tablets, smartwatches\n• Carregadores, cabos, fones\n• Power banks, webcams\n\n**Energia e baterias**:\n• Pilhas, baterias de notebook\n• Fontes, estabilizadores\n• Impactos ambientais\n\n**Pontos de coleta**:\n• Ecopontos, assistências\n• Lojas especializadas\n• Programas de reciclagem\n\nTente uma das perguntas sugeridas abaixo ou reformule sua dúvida!\n\nEstou aqui para te ajudar a ser um herói ambiental!",
      category: "geral",
      confidence: 0.75,
      related_items: []
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    setLoading(true)

    // Simula tempo de processamento da IA
    setTimeout(async () => {
      const aiResponse = generateAIResponse(inputValue)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.answer,
        timestamp: new Date(),
        category: aiResponse.category
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      setLoading(false)

      // Salva conversa no banco (simulado)
      try {
        await lumi.entities.ai_conversations.create({
          user_id: 'current_user',
          question: inputValue,
          answer: aiResponse.answer,
          category: aiResponse.category,
          confidence: aiResponse.confidence,
          related_items: aiResponse.related_items,
          creator: 'ecoflow_ai',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      } catch (error) {
        console.error('Erro ao salvar conversa:', error)
      }
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, helpful } : msg
      )
    )
    toast.success(helpful ? 'Obrigado pelo feedback!' : 'Vamos melhorar!')
  }

  const getCategoryIcon = (category?: string) => {
    const icons = {
      descarte: <Recycle className="text-green-500" size={16} />,
      reciclagem: <Recycle className="text-blue-500" size={16} />,
      impacto: <AlertTriangle className="text-red-500" size={16} />,
      pontos_coleta: <MapPin className="text-purple-500" size={16} />,
      geral: <Lightbulb className="text-yellow-500" size={16} />
    }
    return icons[category as keyof typeof icons] || icons.geral
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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

      {/* Chat Header */}
      <div className="bg-white shadow-sm border-b border-green-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">EcoFlow AI</h1>
            <p className="text-sm text-gray-600">Especialista em Descarte Consciente</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-xs font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-br from-green-500 to-emerald-600'
                }`}>
                  {message.type === 'user' ? 
                    <User className="text-white" size={16} /> : 
                    <Bot className="text-white" size={16} />
                  }
                </div>
                
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white shadow-lg border border-gray-100'
                }`}>
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.content}
                  </div>
                  
                  {message.type === 'ai' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(message.category)}
                          <span className="text-xs text-gray-500 capitalize">
                            {message.category?.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFeedback(message.id, true)}
                            className={`p-1 rounded-full transition-colors ${
                              message.helpful === true 
                                ? 'bg-green-100 text-green-600' 
                                : 'text-gray-400 hover:text-green-500'
                            }`}
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button
                            onClick={() => handleFeedback(message.id, false)}
                            className={`p-1 rounded-full transition-colors ${
                              message.helpful === false 
                                ? 'bg-red-100 text-red-600' 
                                : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={16} />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">EcoFlow AI está digitando...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions - Always Visible */}
      <div className="p-4 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <p className="text-sm text-gray-600 mb-3">Perguntas rápidas:</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
          {quickQuestions.map((q, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickQuestion(q.text)}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-left hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2">
                {q.icon}
                <span className="text-sm text-gray-700">{q.text}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Pergunte sobre descarte de tecnologia..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={loading || !inputValue.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </motion.button>
        </div>
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

export default AIChat
