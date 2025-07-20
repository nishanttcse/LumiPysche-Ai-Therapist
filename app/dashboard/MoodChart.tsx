
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodEntry {
  date: string;
  mood: number;
  emotion: string;
  notes?: string;
}

interface MoodChartProps {
  data: MoodEntry[];
}

export default function MoodChart({ data }: MoodChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = data.map(entry => ({
    ...entry,
    displayDate: formatDate(entry.date)
  })).slice(-14); // Show last 14 days

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-blue-600">Mood: {data.mood}/10</p>
          <p className="text-gray-600 capitalize">Emotion: {data.emotion}</p>
          {data.notes && <p className="text-sm text-gray-500 mt-1">{data.notes}</p>}
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <i className="ri-line-chart-line text-4xl mb-2"></i>
          <p>No mood data yet. Start logging your daily mood to see trends!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="displayDate" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            domain={[1, 10]}
            stroke="#666"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
