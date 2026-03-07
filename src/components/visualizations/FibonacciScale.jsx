import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { FIBONACCI, FIB_MAX } from '../../engine'

// Generates comparison data: linear vs fibonacci scaling
const data = Array.from({ length: 12 }, (_, i) => ({
  index: i,
  label: `${i}`,
  linear: (i / 11) * 100,
  fibonacci: (FIBONACCI[i] / FIB_MAX) * 100,
}))

export default function FibonacciScale({ height = 180 }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a5585" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6889a8', fontSize: 9 }}
            axisLine={{ stroke: '#2a5585' }}
          />
          <YAxis
            tick={{ fill: '#6889a8', fontSize: 9 }}
            axisLine={{ stroke: '#2a5585' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#163761',
              border: '1px solid #2a5585',
              borderRadius: 8,
              fontSize: 11,
            }}
            labelStyle={{ color: '#a0b4c8' }}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="linear"
            name="Linear"
            stroke="#6889a8"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="fibonacci"
            name="Fibonacci"
            stroke="#ef4537"
            strokeWidth={2}
            dot={{ fill: '#ef4537', r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
