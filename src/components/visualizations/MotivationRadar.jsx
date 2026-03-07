import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Legend,
} from 'recharts'
import { MOTIVATIONS, MOTIVATION_IDS } from '../../data'

export default function MotivationRadar({
  consumer,
  campaign = null,
  height = 250,
}) {
  const data = MOTIVATION_IDS.map((id, i) => {
    const entry = {
      motivation: MOTIVATIONS[i].label,
      consumer: consumer.motivations[i],
    }
    if (campaign) {
      entry.campaign = campaign.motivationTargets[i]
    }
    return entry
  })

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#2a5585" />
          <PolarAngleAxis
            dataKey="motivation"
            tick={{ fill: '#a0b4c8', fontSize: 9 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Consumer"
            dataKey="consumer"
            stroke="#faa840"
            fill="#faa840"
            fillOpacity={0.2}
            strokeWidth={1.5}
          />
          {campaign && (
            <Radar
              name="Campaign"
              dataKey="campaign"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
          )}
          <Legend
            wrapperStyle={{ fontSize: 10, color: '#a0b4c8' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
