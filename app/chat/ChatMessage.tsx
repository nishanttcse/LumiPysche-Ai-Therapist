
'use client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  cognitivePatterns?: string[];
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEmotionColor = (emotion?: string) => {
    const colors: { [key: string]: string } = {
      depression: 'text-indigo-600',
      anxiety: 'text-yellow-600',
      anger: 'text-red-600',
      grief: 'text-purple-600',
      trauma: 'text-pink-600',
      shame: 'text-orange-600',
      mania: 'text-emerald-600',
      paranoia: 'text-rose-600',
      dissociation: 'text-slate-600',
      joy: 'text-green-600',
      contentment: 'text-blue-600',
      hope: 'text-cyan-600',
      burnout: 'text-amber-600',
      loneliness: 'text-gray-600',
      confusion: 'text-violet-600',
      focus: 'text-teal-600',
      neutral: 'text-gray-600'
    };
    return colors[emotion || 'neutral'] || 'text-gray-600';
  };

  const getEmotionIcon = (emotion?: string) => {
    const icons: { [key: string]: string } = {
      depression: 'ri-emotion-sad-line',
      anxiety: 'ri-alarm-warning-line',
      anger: 'ri-emotion-unhappy-line',
      grief: 'ri-heart-line',
      trauma: 'ri-shield-cross-line',
      shame: 'ri-eye-close-line',
      mania: 'ri-lightning-line',
      paranoia: 'ri-eye-line',
      dissociation: 'ri-ghost-line',
      joy: 'ri-emotion-happy-line',
      contentment: 'ri-leaf-line',
      hope: 'ri-sun-line',
      burnout: 'ri-battery-low-line',
      loneliness: 'ri-user-line',
      confusion: 'ri-question-line',
      focus: 'ri-focus-line',
      neutral: 'ri-emotion-normal-line'
    };
    return icons[emotion || 'neutral'] || 'ri-emotion-normal-line';
  };

  const getSeverityBadge = (severity?: string) => {
    const badges: { [key: string]: string } = {
      mild: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      severe: 'bg-red-100 text-red-800'
    };
    return badges[severity || 'mild'] || 'bg-gray-100 text-gray-800';
  };

  if (message.sender === 'ai') {
    return (
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="ri-stethoscope-line text-blue-600"></i>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg px-4 py-4 shadow-sm max-w-3xl border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-blue-700">Dr. LUMI</span>
              <span className="text-xs text-gray-500 ml-2">Neuropsychology AI</span>
            </div>
            <p className="text-gray-800 leading-relaxed">{message.text}</p>
          </div>
          <div className="flex items-center mt-2 text-xs text-gray-500 space-x-3">
            <span suppressHydrationWarning={true}>{formatTime(message.timestamp)}</span>
            {message.emotion && (
              <>
                <div className="flex items-center space-x-1">
                  <i className={`${getEmotionIcon(message.emotion)} ${getEmotionColor(message.emotion)}`}></i>
                  <span className={getEmotionColor(message.emotion)}>
                    {message.emotion}
                  </span>
                  {message.severity && (
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityBadge(message.severity)}`}>
                      {message.severity}
                    </span>
                  )}
                </div>
              </>
            )}
            {message.cognitivePatterns && message.cognitivePatterns.length > 0 && (
              <div className="flex items-center space-x-1">
                <i className="ri-brain-line text-purple-600"></i>
                <span className="text-purple-600">
                  Patterns: {message.cognitivePatterns.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 justify-end">
      <div className="flex-1 flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg px-4 py-3 max-w-2xl">
          <p className="leading-relaxed">{message.text}</p>
          <div className="mt-2 text-blue-100 text-xs" suppressHydrationWarning={true}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
        <i className="ri-user-heart-line text-gray-600"></i>
      </div>
    </div>
  );
}
