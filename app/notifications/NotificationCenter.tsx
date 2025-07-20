'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'tip' | 'check-in' | 'emergency';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Daily Check-in Reminder',
    message: 'Take a moment to reflect on your day and log your mood.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    actionUrl: '/journal',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'tip',
    title: 'Mindfulness Tip',
    message: 'Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    priority: 'low'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Streak Achievement!',
    message: 'Congratulations! You\'ve completed 7 days of mood tracking.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    read: true,
    priority: 'high'
  },
  {
    id: '4',
    type: 'check-in',
    title: 'Weekly Mental Health Check',
    message: 'How has your week been? Consider scheduling time for self-care.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: false,
    actionUrl: '/chat',
    priority: 'medium'
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Breathing Exercise',
    message: 'Take 5 minutes for a calming breathing exercise to reduce stress.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: true,
    actionUrl: '/breathing',
    priority: 'low'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'reminders' | 'tips'>('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderSettings, setReminderSettings] = useState({
    dailyCheckIn: true,
    weeklyReview: true,
    breathingReminders: true,
    moodAlerts: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(sampleNotifications);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }

    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotificationsEnabled(settings.enabled);
      setReminderSettings(settings.reminders);
    }
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(notif => notif.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      localStorage.setItem('notifications', JSON.stringify([]));
    }
  };

  const updateNotificationSettings = () => {
    const settings = {
      enabled: notificationsEnabled,
      reminders: reminderSettings
    };
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    
    if ('Notification' in window && notificationsEnabled) {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    updateNotificationSettings();
  }, [notificationsEnabled, reminderSettings]);

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.read;
      case 'reminders': return notif.type === 'reminder';
      case 'tips': return notif.type === 'tip';
      default: return true;
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return 'ri-alarm-line';
      case 'achievement': return 'ri-trophy-line';
      case 'tip': return 'ri-lightbulb-line';
      case 'check-in': return 'ri-heart-pulse-line';
      case 'emergency': return 'ri-alarm-warning-line';
      default: return 'ri-notification-line';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    switch (type) {
      case 'reminder': return 'border-l-blue-500 bg-blue-50';
      case 'achievement': return 'border-l-green-500 bg-green-50';
      case 'tip': return 'border-l-yellow-500 bg-yellow-50';
      case 'check-in': return 'border-l-purple-500 bg-purple-50';
      case 'emergency': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your mental health journey</p>
          </div>
          <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">
            <i className="ri-arrow-left-line text-xl mr-2"></i>
            Back to Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { key: 'all', label: 'All', count: notifications.length },
                  { key: 'unread', label: 'Unread', count: unreadCount },
                  { key: 'reminders', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length },
                  { key: 'tips', label: 'Tips', count: notifications.filter(n => n.type === 'tip').length }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      filter === tab.key
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
                </div>
                <div className="flex space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 whitespace-nowrap"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={clearAllNotifications}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 whitespace-nowrap"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <i className="ri-notification-off-line text-4xl text-gray-400 mb-3"></i>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                filteredNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-sm border-l-4 ${getNotificationColor(notification.type, notification.priority)} ${
                      !notification.read ? 'ring-2 ring-indigo-100' : ''
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <i className={`${getNotificationIcon(notification.type)} text-xl text-gray-600`}></i>
                          <div>
                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-indigo-600 hover:text-indigo-800 text-sm transition-colors duration-200 whitespace-nowrap"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <i className="ri-close-line text-lg"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                        {notification.actionUrl && (
                          <Link
                            href={notification.actionUrl}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 whitespace-nowrap"
                          >
                            Take action →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Enable Notifications</label>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      notificationsEnabled ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {notificationsEnabled && (
                  <>
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Reminder Types</h4>
                      <div className="space-y-3">
                        {Object.entries(reminderSettings).map(([key, enabled]) => (
                          <div key={key} className="flex items-center justify-between">
                            <label className="text-sm text-gray-600">
                              {key === 'dailyCheckIn' && 'Daily Check-in'}
                              {key === 'weeklyReview' && 'Weekly Review'}
                              {key === 'breathingReminders' && 'Breathing Reminders'}
                              {key === 'moodAlerts' && 'Mood Alerts'}
                            </label>
                            <button
                              onClick={() => setReminderSettings({
                                ...reminderSettings,
                                [key]: !enabled
                              })}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                                enabled ? 'bg-indigo-500' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                                  enabled ? 'translate-x-5' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total notifications</span>
                  <span className="text-sm font-medium text-gray-900">{notifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unread</span>
                  <span className="text-sm font-medium text-indigo-600">{unreadCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This week</span>
                  <span className="text-sm font-medium text-gray-900">
                    {notifications.filter(n => {
                      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                      return new Date(n.timestamp) > weekAgo;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}