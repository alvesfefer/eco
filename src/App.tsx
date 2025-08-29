
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Disposal from './pages/Disposal'
import History from './pages/History'
import Achievements from './pages/Achievements'
import Map from './pages/Map'
import AIChat from './pages/AIChat'
import AboutUs from './pages/AboutUs'
import Navbar from './components/Navbar'
import AccessibilityMenu from './components/AccessibilityMenu'

function App() {
  // Register Service Worker for offline functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return (
    <LanguageProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { 
            background: '#059669', 
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '500'
          },
          success: { 
            iconTheme: { primary: '#10b981', secondary: '#fff' },
            style: { background: '#10b981' } 
          },
          error: { 
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
            style: { background: '#ef4444' } 
          }
        }}
      />
      
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <Navbar />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/disposal" element={<Disposal />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/history" element={<History />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/map" element={<Map />} />
              <Route path="/sobre-nos" element={<AboutUs />} />
            </Routes>
          </main>
          
          {/* Accessibility Menu */}
          <AccessibilityMenu />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
