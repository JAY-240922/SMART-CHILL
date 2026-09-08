import React from 'react'
import {
  Thermometer,
  ShieldCheck,
  Snowflake,
  Battery,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Activity,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts'
import { filterHistory } from '../utils/demoData'

function StatCard({ icon: Icon, iconBg, iconColor, label, value, valueSub, badge, badgeBg, badgeText }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {badge && (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeBg} ${badgeText}`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{valueSub}</p>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const temp = payload[0].value
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-3 py-2 text-sm">
        <p className="text-slate-500 mb-1">{label}</p>
        <p className="font-semibold text-blue-600">{temp}°C</p>
      </div>
    )
  }
  return null
}

export default function Dashboard({ temperature, history, pcm, battery, demoRunning, onStart, onPause, onReset, statusInfo }) {
  const chartData = filterHistory(history, 8)

  // Sample every 4th point so the chart isn't too dense
  const displayData = chartData.filter((_, i) => i % 2 === 0)

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Smart Milk Chilling Dashboard</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor milk temperature and cooling conditions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Activity className="w-3 h-3" />
            DEMO MODE
          </span>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-700">Simulation Controls</p>
          <p className="text-xs text-slate-400 mt-0.5">Simulate real-time temperature changes for demo</p>
        </div>
        <div className="flex items-center gap-2">
          {!demoRunning ? (
            <button
              onClick={onStart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Demo
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Pause className="w-4 h-4" />
              Pause Demo
            </button>
          )}
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Thermometer}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Current Temperature"
          value={`${temperature.toFixed(1)}°C`}
          valueSub="Milk temperature"
        />
        <StatCard
          icon={ShieldCheck}
          iconBg={statusInfo.color === 'green' ? 'bg-green-50' : statusInfo.color === 'orange' ? 'bg-orange-50' : 'bg-red-50'}
          iconColor={statusInfo.color === 'green' ? 'text-green-600' : statusInfo.color === 'orange' ? 'text-orange-600' : 'text-red-600'}
          label="Cooling Status"
          value={statusInfo.label}
          valueSub="Target: 4–8°C"
          badge={statusInfo.label}
          badgeBg={statusInfo.bg}
          badgeText={statusInfo.text}
        />
        <StatCard
          icon={Snowflake}
          iconBg="bg-cyan-50"
          iconColor="text-cyan-600"
          label="PCM Status"
          value={`${pcm}%`}
          valueSub="Cooling capacity"
          badge="Pre-charged"
          badgeBg="bg-cyan-100"
          badgeText="text-cyan-700"
        />
        <StatCard
          icon={Battery}
          iconBg="bg-slate-50"
          iconColor="text-slate-600"
          label="Battery"
          value={`${battery}%`}
          valueSub="Monitoring unit"
          badge="Good"
          badgeBg="bg-green-100"
          badgeText="text-green-700"
        />
      </div>

      {/* Temperature Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-semibold text-slate-800">Milk Temperature History</h3>
          <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
            DEMO DATA
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-5">Last 8 hours • Simulated sensor readings</p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={displayData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              interval={Math.floor(displayData.length / 6)}
            />
            <YAxis
              domain={[2, 14]}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Target range highlight */}
            <ReferenceArea y1={4} y2={8} fill="#dcfce7" fillOpacity={0.5} strokeOpacity={0} />
            <ReferenceLine y={4} stroke="#16a34a" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: '4°C min', position: 'insideTopLeft', fontSize: 10, fill: '#16a34a' }} />
            <ReferenceLine y={8} stroke="#16a34a" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: '8°C max', position: 'insideTopLeft', fontSize: 10, fill: '#16a34a' }} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#2563eb', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-blue-600 rounded"></div>
            <span className="text-xs text-slate-500">Temperature</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-300"></div>
            <span className="text-xs text-slate-500">Target range (4–8°C)</span>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 mb-3">Recent Alerts</h3>
        {statusInfo.label === 'SAFE' ? (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-700">No active temperature alerts</p>
              <p className="text-xs text-green-600 mt-0.5">System operating within target range.</p>
            </div>
          </div>
        ) : (
          <div className={`flex items-start gap-3 ${statusInfo.bg} border ${statusInfo.border} rounded-xl p-4`}>
            <Thermometer className={`w-5 h-5 ${statusInfo.text} shrink-0 mt-0.5`} />
            <div>
              <p className={`text-sm font-semibold ${statusInfo.text}`}>
                Temperature {statusInfo.label === 'TOO COLD' ? 'below' : 'above'} safe range — {statusInfo.label}
              </p>
              <p className={`text-xs ${statusInfo.text} opacity-80 mt-0.5`}>
                Current: {temperature.toFixed(1)}°C · Target: 4°C – 8°C
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
