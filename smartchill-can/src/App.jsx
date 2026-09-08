import React, { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Temperature from './pages/Temperature.jsx'
import CanStatus from './pages/CanStatus.jsx'
import Alerts from './pages/Alerts.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import { generateBaseHistory, getStatusFromTemp } from './utils/demoData.js'

const INITIAL_TEMP = 6.4
const INITIAL_PCM = 72
const INITIAL_BATTERY = 84

// Demo simulation: temperature drifts gradually upward then gets "cooled" etc.
function nextDemoTemp(current, step) {
  // Slowly oscillate between 5 and 12 over time for a demo effect
  const noise = (Math.random() - 0.5) * 0.3
  // After step 30 start rising more
  const drift = step < 30 ? 0.05 : step < 60 ? 0.12 : -0.08
  const next = current + drift + noise
  // Clamp to [4.0, 12.5]
  return Math.max(4.0, Math.min(12.5, parseFloat(next.toFixed(1))))
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  // Core sensor state
  const [temperature, setTemperature] = useState(INITIAL_TEMP)
  const [pcm, setPcm] = useState(INITIAL_PCM)
  const [battery, setBattery] = useState(INITIAL_BATTERY)
  const [history, setHistory] = useState(() => generateBaseHistory())

  // Demo simulation state
  const [demoRunning, setDemoRunning] = useState(false)
  const demoIntervalRef = useRef(null)
  const stepRef = useRef(0)

  const tick = useCallback(() => {
    setTemperature(prev => {
      const next = nextDemoTemp(prev, stepRef.current)
      stepRef.current += 1

      // Update history
      const now = new Date()
      const label = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setHistory(h => [...h.slice(-95), { time: label, temp: next }])

      // Slowly drain PCM and battery
      setPcm(p => Math.max(20, parseFloat((p - 0.05).toFixed(1))))
      setBattery(b => Math.max(10, parseFloat((b - 0.02).toFixed(1))))

      return next
    })
  }, [])

  const handleStart = useCallback(() => {
    if (demoRunning) return
    setDemoRunning(true)
    demoIntervalRef.current = setInterval(tick, 1500)
  }, [demoRunning, tick])

  const handlePause = useCallback(() => {
    setDemoRunning(false)
    clearInterval(demoIntervalRef.current)
  }, [])

  const handleReset = useCallback(() => {
    handlePause()
    stepRef.current = 0
    setTemperature(INITIAL_TEMP)
    setPcm(INITIAL_PCM)
    setBattery(INITIAL_BATTERY)
    setHistory(generateBaseHistory())
  }, [handlePause])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(demoIntervalRef.current)
  }, [])

  const statusInfo = getStatusFromTemp(temperature)

  const sharedProps = { temperature, history, pcm, battery, statusInfo }

  function renderPage() {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            {...sharedProps}
            demoRunning={demoRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
          />
        )
      case 'temperature':
        return <Temperature {...sharedProps} />
      case 'can-status':
        return <CanStatus battery={Math.round(battery)} />
      case 'alerts':
        return <Alerts temperature={temperature} statusInfo={statusInfo} />
      case 'how-it-works':
        return <HowItWorks />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-hidden flex flex-col">
        {renderPage()}
      </main>
    </div>
  )
}
