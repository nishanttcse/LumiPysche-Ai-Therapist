
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MoodChart from './MoodChart';
import SessionHistory from './SessionHistory';

interface MoodEntry {
  date: string;
  mood: number;
  emotion: string;
  notes?: string;
}

export default function DashboardPage() {
  const [currentMood, setCurrentMood] = useState(5);
  
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showMoodLogger, setShowMoodLogger] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [todaysNotes, setTodaysNotes] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    joinDate: '2024-01-01',
    timezone: 'UTC-5 (EST)',
    notifications: true,
    sessionReminders: true,
    dataSharing: false
  });

  useEffect(() => {
    // Load existing mood data
    const savedMoods = localStorage.getItem('moodEntries');
    if (savedMoods) {
      setMoodEntries(JSON.parse(savedMoods));
    } else {
      // Generate sample data for demonstration
      const sampleData: MoodEntry[] = [
        { date: '2024-01-15', mood: 6, emotion: 'anxious', notes: 'Work stress' },
        { date: '2024-01-16', mood: 7, emotion: 'neutral', notes: 'Better day' },
        { date: '2024-01-17', mood: 5, emotion: 'sad', notes: 'Feeling lonely' },
        { date: '2024-01-18', mood: 8, emotion: 'happy', notes: 'Good therapy session' },
        { date: '2024-01-19', mood: 6, emotion: 'neutral', notes: 'Okay day' },
        { date: '2024-01-20', mood: 7, emotion: 'happy', notes: 'Spent time with friends' },
        { date: '2024-01-21', mood: 4, emotion: 'sad', notes: 'Difficult morning' }
      ];
      setMoodEntries(sampleData);
      localStorage.setItem('moodEntries', JSON.stringify(sampleData));
    }
  }, []);

  const getMoodLabel = (mood: number): string => {
    const labels = ['Terrible', 'Very Bad', 'Bad', 'Below Average', 'Poor', 'Average', 'Good', 'Very Good', 'Great', 'Excellent', 'Amazing'];
    return labels[mood - 1] || 'Unknown';
  };

  const getMoodEmoji = (mood: number): string => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😔';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '😊';
    return '😄';
  };

  const logMood = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = {
      date: today,
      mood: currentMood,
      emotion: currentMood <= 4 ? 'sad' : currentMood <= 6 ? 'neutral' : 'happy',
      notes: todaysNotes
    };

    const updatedEntries = [...moodEntries.filter(entry => entry.date !== today), newEntry];
    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    setShowMoodLogger(false);
    setTodaysNotes('');
  };

  const averageMood = moodEntries.length > 0
    ? Math.round(moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length * 10) / 10
    : 0;

  const recentSessions = [
    { date: '2024-01-21', duration: '45 min', topic: 'Anxiety Management', rating: 4 },
    { date: '2024-01-19', duration: '38 min', topic: 'Daily Stress', rating: 5 },
    { date: '2024-01-17', duration: '52 min', topic: 'Mood Support', rating: 4 },
    { date: '2024-01-15', duration: '41 min', topic: 'CBT Exercises', rating: 5 }
  ];

  const handleProfileUpdate = () => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    setShowUserProfile(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <Link href="/" className="font-pacifico text-xl text-blue-600 cursor-pointer">
              LUMIPSYCHE
            </Link>
            <nav className="flex space-x-6">
              <Link href="/chat" className="text-gray-600 hover:text-blue-600 cursor-pointer">Chat</Link>
              <Link href="/dashboard" className="text-blue-600 font-medium cursor-pointer">Dashboard</Link>
              <Link href="/exercises" className="text-gray-600 hover:text-blue-600 cursor-pointer">Exercises</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <i className="ri-notification-line text-xl"></i>
            </button>
            <button
              onClick={() => setShowUserProfile(true)}
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              <i className="ri-user-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's how you're doing on your mental health journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-blue-600">{averageMood}/10</p>
              </div>
              <div className="text-2xl">{getMoodEmoji(averageMood)}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions This Week</p>
                <p className="text-2xl font-bold text-green-600">4</p>
              </div>
              <i className="ri-chat-3-line text-2xl text-green-600"></i>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Streak Days</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <i className="ri-fire-line text-2xl text-purple-600"></i>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progress Score</p>
                <p className="text-2xl font-bold text-orange-600">78%</p>
              </div>
              <i className="ri-trophy-line text-2xl text-orange-600"></i>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mood Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Mood Trends</h2>
                <button
                  onClick={() => setShowMoodLogger(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Log Today's Mood
                </button>
              </div>
              <MoodChart data={moodEntries} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/chat" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-chat-3-line text-blue-600 text-xl mr-3"></i>
                  <span className="text-gray-700">Start Chat Session</span>
                </Link>
                <Link href="/exercises" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-heart-pulse-line text-green-600 text-xl mr-3"></i>
                  <span className="text-gray-700">Breathing Exercise</span>
                </Link>
                <button className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left cursor-pointer">
                  <i className="ri-book-open-line text-purple-600 text-xl mr-3"></i>
                  <span className="text-gray-700">Journal Entry</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Insight</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm leading-relaxed">
                  "Your mood has been steadily improving over the past week. Keep up the great work with your daily check-ins and therapy sessions!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="mt-8">
          <SessionHistory sessions={recentSessions} />
        </div>
      </div>

      {/* Mood Logger Modal */}
      {showMoodLogger && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h3>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Mood Level</span>
                <span className="text-sm font-medium text-gray-800">{currentMood}/10 - {getMoodLabel(currentMood)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={currentMood}
                onChange={(e) => setCurrentMood(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={todaysNotes}
                onChange={(e) => setTodaysNotes(e.target.value)}
                placeholder="What's contributing to your mood today?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                rows={3}
                maxLength={200}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowMoodLogger(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={logMood}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                Save Mood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">User Profile</h3>
              <button
                onClick={() => setShowUserProfile(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Info */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-line text-3xl text-blue-600"></i>
                </div>
                <h4 className="text-lg font-medium text-gray-800">{userProfile.name}</h4>
                <p className="text-sm text-gray-600">{userProfile.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Member since {new Date(userProfile.joinDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Account Settings */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Account Settings</h5>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={userProfile.timezone}
                    onChange={(e) => setUserProfile({ ...userProfile, timezone: e.target.value })}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option>UTC-8 (PST)</option>
                    <option>UTC-7 (MST)</option>
                    <option>UTC-6 (CST)</option>
                    <option>UTC-5 (EST)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Privacy & Notifications</h5>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates and reminders</p>
                  </div>
                  <button
                    onClick={() => setUserProfile({ ...userProfile, notifications: !userProfile.notifications })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      userProfile.notifications ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userProfile.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Session Reminders</p>
                    <p className="text-xs text-gray-500">Daily mood check-in reminders</p>
                  </div>
                  <button
                    onClick={() => setUserProfile({ ...userProfile, sessionReminders: !userProfile.sessionReminders })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      userProfile.sessionReminders ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userProfile.sessionReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Anonymous Data Sharing</p>
                    <p className="text-xs text-gray-500">Help improve mental health research</p>
                  </div>
                  <button
                    onClick={() => setUserProfile({ ...userProfile, dataSharing: !userProfile.dataSharing })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      userProfile.dataSharing ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userProfile.dataSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800">Account Actions</h5>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <i className="ri-download-line text-gray-600"></i>
                    <span className="text-sm text-gray-700">Export My Data</span>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <i className="ri-shield-line text-gray-600"></i>
                    <span className="text-sm text-gray-700">Privacy Policy</span>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <i className="ri-customer-service-line text-gray-600"></i>
                    <span className="text-sm text-gray-700">Contact Support</span>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleProfileUpdate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
