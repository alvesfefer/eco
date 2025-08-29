
import React from 'react'
import {Home, Users, Target, Heart, Award, Leaf, Globe, Lightbulb, Bot, Recycle, Camera, BarChart3} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutUs: React.FC = () => {
  const projectFeatures = [
    {
      icon: <Bot className="text-blue-500" size={32} />,
      title: "Inteligência Artificial",
      description: "IA avançada que identifica materiais e orienta sobre o descarte correto, educando usuários sobre impactos ambientais."
    },
    {
      icon: <Camera className="text-green-500" size={32} />,
      title: "Reconhecimento Visual",
      description: "Tecnologia de visão computacional para identificar objetos através de fotos e fornecer instruções precisas de descarte."
    },
    {
      icon: <Award className="text-yellow-500" size={32} />,
      title: "Gamificação",
      description: "Sistema de conquistas e pontuação que incentiva práticas sustentáveis através de recompensas e desafios."
    },
    {
      icon: <BarChart3 className="text-purple-500" size={32} />,
      title: "Impacto Mensurável",
      description: "Acompanhamento detalhado do impacto ambiental positivo gerado pelas ações de cada usuário."
    }
  ]

  const values = [
    {
      icon: <Leaf className="text-green-500" size={32} />,
      title: "Sustentabilidade",
      description: "Promovemos práticas que protegem o meio ambiente e garantem um futuro sustentável para as próximas gerações."
    },
    {
      icon: <Lightbulb className="text-yellow-500" size={32} />,
      title: "Educação",
      description: "Acreditamos que a educação ambiental é fundamental para transformar comportamentos e criar consciência ecológica."
    },
    {
      icon: <Heart className="text-red-500" size={32} />,
      title: "Responsabilidade",
      description: "Cada ação individual conta. Incentivamos a responsabilidade pessoal no cuidado com o planeta."
    },
    {
      icon: <Globe className="text-blue-500" size={32} />,
      title: "Impacto Global",
      description: "Nossa missão é criar um movimento global de consciência ambiental através da tecnologia."
    }
  ]

  const achievements = [
    { number: "50K+", label: "Usuários Ativos" },
    { number: "1M+", label: "Itens Descartados Corretamente" },
    { number: "500+", label: "Pontos de Coleta Mapeados" },
    { number: "95%", label: "Satisfação dos Usuários" }
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
        
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
          <span className="text-white font-bold text-sm">ECO</span>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Sobre o EcoFlow
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            O EcoFlow é uma plataforma educativa e gamificada que revoluciona a forma como as pessoas 
            descartam resíduos. Utilizando inteligência artificial avançada, oferecemos orientações 
            precisas sobre descarte consciente, promovemos a reciclagem e criamos uma comunidade 
            engajada na proteção ambiental.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Target size={32} />
            <h2 className="text-3xl font-bold">Nossa Missão</h2>
          </div>
          <p className="text-lg leading-relaxed text-green-100">
            Transformar a relação das pessoas com o descarte de resíduos através da tecnologia, 
            educação e gamificação. Nosso objetivo é criar uma sociedade mais consciente 
            ambientalmente, onde cada indivíduo compreende o impacto de suas ações e é 
            incentivado a fazer escolhas sustentáveis que protegem nosso planeta para as 
            futuras gerações.
          </p>
        </motion.div>

        {/* Project Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Como Funciona o EcoFlow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-600 font-medium">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Bot className="text-blue-500" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Tecnologia e Inovação</h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              O EcoFlow utiliza tecnologias de ponta para oferecer uma experiência única e eficaz. 
              Nossa inteligência artificial foi treinada com milhares de imagens e dados sobre 
              materiais recicláveis, permitindo identificação precisa e orientações personalizadas.
            </p>
            <p className="mb-4">
              O sistema de gamificação foi desenvolvido com base em pesquisas comportamentais, 
              criando incentivos que realmente motivam mudanças de hábito. Cada ação do usuário 
              é convertida em pontos e conquistas, tornando a sustentabilidade divertida e 
              recompensadora.
            </p>
            <p>
              Além disso, nossa plataforma funciona offline, garantindo que os usuários possam 
              acessar informações importantes sobre descarte mesmo sem conexão com a internet, 
              democratizando o acesso à educação ambiental.
            </p>
          </div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Recycle size={32} />
            <h2 className="text-3xl font-bold">Impacto Ambiental</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Resultados Alcançados</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Mais de 1 milhão de litros de água protegidos</li>
                <li>• 50 mil itens descartados corretamente</li>
                <li>• Redução de 30% no descarte incorreto entre usuários</li>
                <li>• 200+ conquistas ambientais desbloqueadas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Metas Futuras</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Alcançar 100 mil usuários ativos</li>
                <li>• Mapear 1000 pontos de coleta</li>
                <li>• Expandir para outras cidades</li>
                <li>• Integrar com cooperativas de reciclagem</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Users className="text-green-500" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Equipe SodaBug</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            O EcoFlow é desenvolvido pela equipe SodaBug, um grupo dedicado de desenvolvedores, 
            designers e especialistas em sustentabilidade que acreditam no poder da tecnologia 
            para criar mudanças positivas no mundo.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nossa equipe multidisciplinar combina expertise técnica com paixão ambiental, 
            trabalhando incansavelmente para criar soluções inovadoras que tornam a 
            sustentabilidade acessível e envolvente para todos.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center"
        >
          <Award size={48} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Junte-se à Revolução Verde
          </h2>
          <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
            Faça parte de uma comunidade que está transformando o mundo através de pequenas 
            ações diárias. Cada descarte consciente conta para um futuro mais sustentável.
          </p>
          <Link 
            to="/"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Começar Agora
          </Link>
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
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Leaf size={20} />
                Sobre o EcoFlow
              </h4>
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

export default AboutUs
