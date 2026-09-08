import React from 'react'
import {
  LayoutDashboard,
  Thermometer,
  Package,
  Bell,
  BookOpen,
  Milk,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'temperature', label: 'Temperature', icon: Thermometer },
  { id: 'can-status', label: 'Can Status', icon: Package },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <Milk className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">SmartChill</h1>
            <p className="text-xs text-slate-400 font-medium">Milk Cooling System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                ${active
                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium">SIH 2026 – Problem SIH26110</p>
        <p className="text-xs text-slate-400 mt-0.5">Low-Cost Milk Chilling Can</p>
      </div>
    </aside>
  )
}
