/**
 * Generates a baseline 8-hour temperature history (demo data).
 * Temperatures stay mostly between 5°C – 8°C with minor fluctuations.
 */
export function generateBaseHistory() {
  const now = Date.now()
  const points = []
  for (let i = 47; i >= 0; i--) {
    const minutesAgo = i * 10
    const time = new Date(now - minutesAgo * 60 * 1000)
    const label = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // Gentle sine wave + small noise, range ~5–7.5°C
    const base = 6.2 + Math.sin(i * 0.3) * 0.9 + (Math.random() - 0.5) * 0.4
    points.push({ time: label, temp: parseFloat(base.toFixed(1)) })
  }
  return points
}

/**
 * Returns status info based on temperature.
 */
export function getStatusFromTemp(temp) {
  if (temp < 4) {
    return { label: 'TOO COLD', color: 'blue', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' }
  } else if (temp <= 8) {
    return { label: 'SAFE', color: 'green', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' }
  } else if (temp <= 10) {
    return { label: 'WARNING', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' }
  } else {
    return { label: 'ALERT', color: 'red', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
  }
}

/**
 * Filters history to last N hours.
 */
export function filterHistory(history, hours) {
  const points = hours * 6 // 1 point per 10 min
  return history.slice(-Math.min(points, history.length))
}
