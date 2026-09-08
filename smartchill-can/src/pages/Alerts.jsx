import React from 'react'
import { AlertTriangle, CheckCircle2, ThermometerSnowflake, ThermometerSun, Info } from 'lucide-react'

function AlertBand({ icon: Icon, bg, border, iconColor, title, range, desc, active, currentTemp }) {
  return (
    <div className={`rounded-2xl border p-5 flex items-start gap-4 ${active ? bg + ' ' + border : 'bg-white border-slate-200 opacity-60'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-white bg-opacity-60' : 'bg-slate-100'}`}>
        <Icon className={`w-5 h-5 ${active ? iconColor : 'text-slate-400'}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={`text-sm font-bold ${active ? iconColor : 'text-slate-500'}`}>{title}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-white bg-opacity-60 ' + iconColor : 'bg-slate-100 text-slate-400'}`}>
            {range}
          </span>
          {active && (
            <span className="ml-auto text-xs font-bold text-white bg-opacity-80 px-2 py-0.5 rounded-full bg-current" style={{ background: 'rgba(0,0,0,0.15)' }}>
              ACTIVE
            </span>
          )}
        </div>
        <p className={`text-xs leading-relaxed ${active ? iconColor + ' opacity-80' : 'text-slate-400'}`}>{desc}</p>
        {active && currentTemp !== undefined && (
          <p className={`text-xs font-semibold mt-2 ${iconColor}`}>Current: {currentTemp.toFixed(1)}°C</p>
        )}
      </div>
    </div>
  )
}

export default function Alerts({ temperature, statusInfo }) {
  const isCold = temperature < 4
  const isSafe = temperature >= 4 && temperature <= 8
  const isWarning = temperature > 8 && temperature <= 10
  const isAlert = temperature > 10

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Alerts</h2>
        <p className="text-slate-500 text-sm mt-1">Temperature threshold monitoring and notifications</p>
      </div>

      {/* Active status banner */}
      <div className={`rounded-2xl border p-5 flex items-center gap-4 ${statusInfo.bg} ${statusInfo.border}`}>
        <div className="w-12 h-12 bg-white bg-opacity-70 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-2xl">
            {isSafe ? '✅' : isCold ? '🧊' : isWarning ? '⚠️' : '🚨'}
          </span>
        </div>
        <div>
          <p className={`text-base font-bold ${statusInfo.text}`}>
            {isSafe
              ? 'No active alerts — System is within safe range'
              : isCold
              ? 'Temperature too cold — Below safe range'
              : isWarning
              ? 'Warning — Temperature approaching critical level'
              : 'Alert — Temperature above safe limit'}
          </p>
          <p className={`text-xs mt-0.5 ${statusInfo.text} opacity-80`}>
            Current: {temperature.toFixed(1)}°C · Target: 4°C – 8°C
          </p>
        </div>
      </div>

      {/* Alert band cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">Temperature Threshold Bands</h3>

        <AlertBand
          icon={ThermometerSnowflake}
          bg="bg-blue-50"
          border="border-blue-300"
          iconColor="text-blue-700"
          title="TOO COLD"
          range="Below 4°C"
          desc="Milk temperature is below the safe minimum. While not spoiled, very low temperatures may affect milk quality or indicate sensor issues."
          active={isCold}
          currentTemp={isCold ? temperature : undefined}
        />

        <AlertBand
          icon={CheckCircle2}
          bg="bg-green-50"
          border="border-green-300"
          iconColor="text-green-700"
          title="SAFE"
          range="4°C – 8°C"
          desc="Optimal temperature range for milk storage. PCM cooling is maintaining the correct temperature. No action required."
          active={isSafe}
          currentTemp={isSafe ? temperature : undefined}
        />

        <AlertBand
          icon={AlertTriangle}
          bg="bg-orange-50"
          border="border-orange-300"
          iconColor="text-orange-700"
          title="WARNING"
          range="8°C – 10°C"
          desc="Temperature is slightly above the safe range. Milk quality may be at risk if the temperature continues to rise. PCM may be depleted."
          active={isWarning}
          currentTemp={isWarning ? temperature : undefined}
        />

        <AlertBand
          icon={ThermometerSun}
          bg="bg-red-50"
          border="border-red-300"
          iconColor="text-red-700"
          title="ALERT"
          range="Above 10°C"
          desc="Critical: Milk temperature is well above safe limits. Bacterial growth risk is high. Immediate action required — transfer milk or use new PCM charge."
          active={isAlert}
          currentTemp={isAlert ? temperature : undefined}
        />
      </div>

      {/* Info note */}
      <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500">
          <span className="font-semibold text-slate-600">Demo Mode:</span> Alerts are generated using simulated demo temperature data.
          In the final product, real-time readings from the DS18B20 sensor via ESP32 will trigger these thresholds.
        </p>
      </div>

      {/* Alert history placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Alert History</h3>
        <div className="space-y-2">
          {[
            { time: 'Just now', msg: `Temperature ${temperature.toFixed(1)}°C — ${statusInfo.label}`, color: statusInfo.text },
            { time: '2 min ago', msg: 'Temperature 6.8°C — SAFE', color: 'text-green-600' },
            { time: '12 min ago', msg: 'Temperature 7.1°C — SAFE', color: 'text-green-600' },
            { time: '28 min ago', msg: 'Temperature 5.9°C — SAFE', color: 'text-green-600' },
          ].map(({ time, msg, color }, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <span className="text-xs text-slate-400 w-20 shrink-0">{time}</span>
              <span className={`text-xs font-medium ${color}`}>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
