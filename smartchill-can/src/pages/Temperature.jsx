import React, { useState } from 'react'
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
import { Thermometer, Info } from 'lucide-react'
import { filterHistory } from '../utils/demoData'

const TIME_RANGES = [
  { label: '2 Hours', value: 2 },
  { label: '4 Hours', value: 4 },
  { label: '8 Hours', value: 8 },
  { label: '12 Hours', value: 12 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-3 py-2 text-sm">
        <p className="text-slate-500 mb-1">{label}</p>
        <p className="font-semibold text-blue-600">{payload[0].value}°C</p>
      </div>
    )
  }
  return null
}

export default function Temperature({ temperature, history, statusInfo }) {
  const [range, setRange] = useState(8)

  const chartData = filterHistory(history, range)
  const displayData = chartData.filter((_, i) => i % 2 === 0)

  const minTemp = Math.min(...chartData.map(d => d.temp)).toFixed(1)
  const maxTemp = Math.max(...chartData.map(d => d.temp)).toFixed(1)
  const avgTemp = (chartData.reduce((s, d) => s + d.temp, 0) / (chartData.length || 1)).toFixed(1)

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Temperature Monitor</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time temperature data from DS18B20 sensor (simulated)</p>
      </div>

      {/* Big Temp Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Thermometer className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Current Temperature</p>
            <p className="text-6xl font-bold text-slate-800 mt-1">{temperature.toFixed(1)}<span className="text-3xl font-semibold text-slate-400">°C</span></p>
            <p className="text-sm text-slate-400 mt-1">Last updated just now</p>
          </div>
        </div>
        <div className="text-right space-y-3">
          <span className={`inline-flex items-center px-5 py-2 rounded-full text-base font-bold ${statusInfo.bg} ${statusInfo.text} border ${statusInfo.border}`}>
            {statusInfo.label}
          </span>
          <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm">
            <p className="text-slate-500 font-medium">Target Range</p>
            <p className="font-bold text-slate-700 mt-0.5">4°C – 8°C</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Minimum', value: `${minTemp}°C`, color: 'text-blue-600' },
          { label: 'Average', value: `${avgTemp}°C`, color: 'text-slate-700' },
          { label: 'Maximum', value: `${maxTemp}°C`, color: 'text-orange-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">Last {range} hours</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Temperature History</h3>
            <p className="text-xs text-slate-400 mt-0.5">Demo data • 10-minute intervals</p>
          </div>
          <div className="flex gap-1.5">
            {TIME_RANGES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setRange(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                  ${range === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
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
            <ReferenceArea y1={4} y2={8} fill="#dcfce7" fillOpacity={0.5} strokeOpacity={0} />
            <ReferenceLine y={4} stroke="#16a34a" strokeDasharray="4 3" strokeWidth={1.5} />
            <ReferenceLine y={8} stroke="#16a34a" strokeDasharray="4 3" strokeWidth={1.5} />
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
      </div>

      {/* Info note */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">
          <span className="font-semibold">Demo Data</span> – Final hardware will receive temperature data from a
          DS18B20 digital temperature sensor via ESP32 microcontroller. Accuracy: ±0.5°C.
        </p>
      </div>
    </div>
  )
}
