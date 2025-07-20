
'use client';

interface Session {
  date: string;
  duration: string;
  topic: string;
  rating: number;
}

interface SessionHistoryProps {
  sessions: Session[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`ri-star-${i < rating ? 'fill' : 'line'} text-yellow-400`}
      ></i>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Sessions</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-chat-3-line text-blue-600"></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{session.topic}</h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span>{formatDate(session.date)}</span>
                  <span>•</span>
                  <span>{session.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {renderStars(session.rating)}
              </div>
              <button className="text-gray-400 hover:text-blue-600 cursor-pointer">
                <i className="ri-more-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Average session rating</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(4)}
            </div>
            <span className="font-medium text-gray-800">4.3/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
