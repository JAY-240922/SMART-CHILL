import React from 'react'
import { CheckCircle2, Wifi, Battery, Thermometer, Layers, Container } from 'lucide-react'

function StatusRow({ label, status, color }) {
  const colors = {
    green: { dot: 'bg-green-500', badge: 'bg-green-50 text-green-700 border-green-200' },
    blue: { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
    orange: { dot: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700 border-orange-200' },
  }
  const c = colors[color] || colors.green
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
        {status}
      </span>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="text-xs font-semibold text-slate-800">{value}</span>
    </div>
  )
}

// SVG cross-section illustration of the SmartChill Can
function CanIllustration() {
  return (
    <svg viewBox="0 0 220 340" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Outer SS304 body */}
      <rect x="30" y="40" width="160" height="260" rx="18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
      {/* Lid */}
      <rect x="30" y="30" width="160" height="28" rx="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2"/>
      <text x="110" y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">SS304 LID</text>

      {/* PUF Insulation layer */}
      <rect x="38" y="68" width="144" height="224" rx="12" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5 3"/>
      <text x="110" y="88" textAnchor="middle" fontSize="8" fontWeight="600" fill="#92400e">PUF INSULATION</text>

      {/* PCM layer */}
      <rect x="50" y="92" width="120" height="190" rx="8" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="110" y="114" textAnchor="middle" fontSize="8" fontWeight="600" fill="#1d4ed8">PCM COOLING LAYER</text>

      {/* Inner vessel (milk) */}
      <rect x="62" y="118" width="96" height="156" rx="6" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>

      {/* Milk fill */}
      <rect x="64" y="160" width="92" height="112" rx="5" fill="#e0f2fe" opacity="0.8"/>
      <text x="110" y="215" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">MILK</text>
      <text x="110" y="230" textAnchor="middle" fontSize="8" fill="#0369a1">30–40 L</text>

      {/* Sensor wire */}
      <line x1="110" y1="118" x2="110" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="110" cy="96" r="5" fill="#ef4444" opacity="0.9"/>
      <text x="120" y="100" fontSize="7" fill="#dc2626" fontWeight="600">DS18B20</text>

      {/* ESP32 chip icon (top right) */}
      <rect x="148" y="46" width="30" height="16" rx="3" fill="#1e293b"/>
      <text x="163" y="57" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontWeight="700">ESP32</text>

      {/* Battery indicator */}
      <rect x="14" y="120" width="14" height="28" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <rect x="17" y="116" width="8" height="4" rx="1" fill="#16a34a"/>
      <rect x="15.5" y="130" width="11" height="16" rx="1" fill="#16a34a"/>
      <text x="21" y="162" textAnchor="middle" fontSize="6.5" fill="#16a34a" fontWeight="600">BAT</text>

      {/* Labels with arrows */}
      <text x="7" y="80" fontSize="7" fill="#475569" fontWeight="600">OUTER</text>
      <text x="7" y="89" fontSize="7" fill="#475569" fontWeight="600">SS304</text>
      <line x1="28" y1="82" x2="38" y2="76" stroke="#94a3b8" strokeWidth="1"/>

      <text x="170" y="140" fontSize="7" fill="#92400e" fontWeight="600">PUF</text>
      <line x1="178" y1="136" x2="182" y2="130" stroke="#fbbf24" strokeWidth="1"/>

      <text x="172" y="168" fontSize="7" fill="#1d4ed8" fontWeight="600">PCM</text>
      <line x1="170" y1="165" x2="173" y2="158" stroke="#3b82f6" strokeWidth="1"/>

      <text x="172" y="190" fontSize="7" fill="#0369a1" fontWeight="600">INNER</text>
      <text x="172" y="199" fontSize="7" fill="#0369a1" fontWeight="600">VESSEL</text>

      {/* Bottom label */}
      <text x="110" y="320" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="700">SmartChill Can – Cross Section View</text>
    </svg>
  )
}

export default function CanStatus({ battery }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Can Status</h2>
        <p className="text-slate-500 text-sm mt-1">SmartChill Can hardware overview and component status</p>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Illustration */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Can Illustration</p>
          <div className="flex-1 flex items-center justify-center">
            <CanIllustration />
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-3 space-y-5">
          {/* Specs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-1">Technical Specifications</p>
            <p className="text-xs text-slate-400 mb-4">SmartChill Can – SIH26110 Prototype</p>
            <div>
              <SpecRow label="Capacity" value="30–40 Litres" />
              <SpecRow label="Cooling Method" value="Passive PCM (Pre-charged)" />
              <SpecRow label="Insulation" value="PUF (Polyurethane Foam)" />
              <SpecRow label="Inner Material" value="Food-grade SS304 Stainless Steel" />
              <SpecRow label="Temperature Sensor" value="DS18B20 (±0.5°C accuracy)" />
              <SpecRow label="Microcontroller" value="ESP32 (Wi-Fi + BLE)" />
              <SpecRow label="Power Source" value="Battery – Electronics only" />
              <SpecRow label="Cooling Duration" value="6–8 hours (estimated)" />
            </div>
          </div>

          {/* Status indicators */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-4">Component Status</p>
            <StatusRow label="PCM Cooling" status="ACTIVE" color="green" />
            <StatusRow label="PUF Insulation" status="ACTIVE" color="green" />
            <StatusRow label="Temperature Sensor (DS18B20)" status="ONLINE" color="green" />
            <StatusRow label="ESP32 Controller" status="ONLINE" color="green" />
            <StatusRow label={`Battery Level — ${battery}%`} status={battery > 50 ? 'GOOD' : 'LOW'} color={battery > 50 ? 'green' : 'orange'} />
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Container, bg: 'bg-blue-50', color: 'text-blue-600', title: 'Food-grade SS304', desc: 'Inner vessel is made of food-safe stainless steel, safe for direct milk contact.' },
          { icon: Layers, bg: 'bg-amber-50', color: 'text-amber-600', title: 'PUF Insulation', desc: 'High-density polyurethane foam minimises heat transfer from the environment.' },
          { icon: CheckCircle2, bg: 'bg-green-50', color: 'text-green-600', title: 'No External Power', desc: 'PCM is pre-charged before use. Battery only powers sensors and ESP32.' },
        ].map(({ icon: Icon, bg, color, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
