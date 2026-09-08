import React from 'react'
import {
  Snowflake,
  RefreshCw,
  Layers,
  Thermometer,
  Wrench,
  Users,
  Zap,
  ChevronDown,
} from 'lucide-react'

const PROCESS_STEPS = [
  { icon: '🥛', label: 'MILK', sub: 'Fresh collected milk', color: 'bg-blue-50 border-blue-200' },
  { icon: '🔩', label: 'SS304 INNER VESSEL', sub: 'Food-grade stainless steel', color: 'bg-slate-50 border-slate-300' },
  { icon: '❄️', label: 'PCM COOLING', sub: 'Pre-charged phase change material', color: 'bg-cyan-50 border-cyan-200' },
  { icon: '🧱', label: 'PUF INSULATION', sub: 'Polyurethane foam layer', color: 'bg-amber-50 border-amber-200' },
  { icon: '📡', label: 'DS18B20 SENSOR', sub: 'Digital temperature sensing', color: 'bg-red-50 border-red-200' },
  { icon: '💻', label: 'ESP32', sub: 'Microcontroller & data relay', color: 'bg-purple-50 border-purple-200' },
  { icon: '📊', label: 'SMARTCHILL DASHBOARD', sub: 'Real-time monitoring UI', color: 'bg-green-50 border-green-200' },
]

const FEATURES = [
  {
    icon: Snowflake,
    bg: 'bg-cyan-50',
    color: 'text-cyan-600',
    title: 'Passive Cooling',
    desc: 'No compressor or electricity needed for cooling. PCM absorbs heat passively during transport.',
  },
  {
    icon: RefreshCw,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    title: 'Reusable PCM',
    desc: 'Phase Change Material can be recharged repeatedly — simply freeze or cool it before the next use.',
  },
  {
    icon: Layers,
    bg: 'bg-amber-50',
    color: 'text-amber-600',
    title: 'Thermal Insulation',
    desc: 'High-density PUF foam minimises external heat ingress, extending effective cooling duration.',
  },
  {
    icon: Thermometer,
    bg: 'bg-red-50',
    color: 'text-red-600',
    title: 'Temperature Monitoring',
    desc: 'DS18B20 sensor + ESP32 provides real-time temperature visibility from farm to collection point.',
  },
  {
    icon: Wrench,
    bg: 'bg-slate-50',
    color: 'text-slate-600',
    title: 'Low Maintenance',
    desc: 'Minimal moving parts and durable food-grade materials ensure long lifespan with low upkeep cost.',
  },
  {
    icon: Users,
    bg: 'bg-green-50',
    color: 'text-green-600',
    title: 'Farmer Friendly',
    desc: 'Designed for small-scale dairy farmers — lightweight, affordable, and easy to operate without technical knowledge.',
  },
]

export default function HowItWorks() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">How It Works</h2>
        <p className="text-slate-500 text-sm mt-1">Understanding the SmartChill Can cooling and monitoring system</p>
      </div>

      {/* Power highlight */}
      <div className="bg-blue-600 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-base font-bold text-white">No external power required during transport</p>
          <p className="text-sm text-blue-100 mt-0.5">
            PCM is pre-charged before use. The battery only powers the ESP32 and DS18B20 sensor — not the cooling.
          </p>
        </div>
      </div>

      {/* Process Flow */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 mb-6">System Process Flow</h3>

        <div className="flex flex-col items-center gap-1">
          {PROCESS_STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <div className={`w-full max-w-sm border rounded-xl px-5 py-3 flex items-center gap-3 ${step.color}`}>
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{step.label}</p>
                  <p className="text-xs text-slate-500">{step.sub}</p>
                </div>
              </div>
              {i < PROCESS_STEPS.length - 1 && (
                <ChevronDown className="w-5 h-5 text-slate-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div>
        <h3 className="text-base font-semibold text-slate-800 mb-4">Key Features</h3>
        <div className="grid grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, bg, color, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-1.5">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PCM explanation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 mb-4">How PCM Cooling Works</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              step: '1',
              bg: 'bg-blue-50',
              num: 'bg-blue-600',
              title: 'Pre-Charge',
              desc: 'PCM material is cooled below its melting point (typically ~4–6°C) at a dairy facility or using ice before the transport journey begins.',
            },
            {
              step: '2',
              bg: 'bg-cyan-50',
              num: 'bg-cyan-600',
              title: 'Phase Transition',
              desc: 'During transport, the PCM absorbs heat from the milk as it melts from solid to liquid, maintaining a constant low temperature.',
            },
            {
              step: '3',
              bg: 'bg-green-50',
              num: 'bg-green-600',
              title: 'Stable Cooling',
              desc: 'PUF insulation slows heat ingress, allowing the PCM to sustain 4–8°C for 6–8 hours — enough for most rural transport routes.',
            },
          ].map(({ step, bg, num, title, desc }) => (
            <div key={step} className={`rounded-xl p-4 ${bg} border border-opacity-50 border-slate-200`}>
              <div className={`w-7 h-7 ${num} rounded-full flex items-center justify-center mb-3`}>
                <span className="text-xs font-bold text-white">{step}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SIH context */}
      <div className="bg-slate-800 rounded-2xl p-5 flex items-start gap-4">
        <span className="text-2xl shrink-0">🏆</span>
        <div>
          <p className="text-sm font-bold text-white">Smart India Hackathon 2026 – Problem SIH26110</p>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            "Development of a Low-Cost Light-weight Milk Chilling Can for Small-Scale Dairy Farmers."
            SmartChill Can addresses milk spoilage during the critical first-mile transport gap in rural India.
          </p>
        </div>
      </div>
    </div>
  )
}
