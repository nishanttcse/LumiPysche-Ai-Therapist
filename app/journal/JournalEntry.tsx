'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  date: string;
  time: string;
}

const moodOptions = [
  { value: 'excellent', label: 'Excellent', color: 'bg-green-500', emoji: '😊' },
  { value: 'good', label: 'Good', color: 'bg-blue-500', emoji: '🙂' },
  { value: 'okay', label: 'Okay', color: 'bg-yellow-500', emoji: '😐' },
  { value: 'poor', label: 'Poor', color: 'bg-orange-500', emoji: '😟' },
  { value: 'terrible', label: 'Terrible', color: 'bg-red-500', emoji: '😢' }
];

const tagSuggestions = [
  'Anxiety', 'Depression', 'Stress', 'Work', 'Family', 'Health', 'Sleep', 'Exercise',
  'Therapy', 'Medication', 'Gratitude', 'Goals', 'Breakthrough', 'Setback', 'Trigger'
];

export default function JournalEntry() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: '',
    tags: [] as string[]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [customTag, setCustomTag] = useState('');

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim() || !currentEntry.mood) {
      alert('Please fill in all required fields');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      ...currentEntry,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    setCurrentEntry({ title: '', content: '', mood: '', tags: [] });
    setIsWriting(false);
  };

  const deleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    }
  };

  const addTag = (tag: string) => {
    if (!currentEntry.tags.includes(tag)) {
      setCurrentEntry({
        ...currentEntry,
        tags: [...currentEntry.tags, tag]
      });
    }
  };

  const removeTag = (tag: string) => {
    setCurrentEntry({
      ...currentEntry,
      tags: currentEntry.tags.filter(t => t !== tag)
    });
  };

  const addCustomTag = () => {
    if (customTag.trim() && !currentEntry.tags.includes(customTag.trim())) {
      addTag(customTag.trim());
      setCustomTag('');
      setShowTagInput(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = !filterMood || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  const getMoodEmoji = (mood: string) => {
    return moodOptions.find(m => m.value === mood)?.emoji || '😐';
  };

  const getMoodColor = (mood: string) => {
    return moodOptions.find(m => m.value === mood)?.color || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Journal</h1>
            <p className="text-gray-600">Track your thoughts, moods, and progress</p>
          </div>
          <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
            <i className="ri-arrow-left-line text-xl mr-2"></i>
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{entries.length}</div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{entries.filter(e => e.date === new Date().toLocaleDateString()).length}</div>
            <div className="text-sm text-gray-600">Today's Entries</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{entries.filter(e => ['excellent', 'good'].includes(e.mood)).length}</div>
            <div className="text-sm text-gray-600">Good Mood Days</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{new Set(entries.flatMap(e => e.tags)).size}</div>
            <div className="text-sm text-gray-600">Unique Tags</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Writing Area */}
          <div className="lg:col-span-2">
            {!isWriting ? (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <i className="ri-quill-pen-line text-6xl text-purple-400 mb-4"></i>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to write?</h2>
                <p className="text-gray-600 mb-6">Express your thoughts and track your emotional journey</p>
                <button
                  onClick={() => setIsWriting(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  Start New Entry
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">New Journal Entry</h2>
                
                {/* Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={currentEntry.title}
                    onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Give your entry a title..."
                  />
                </div>

                {/* Mood */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling? *</label>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={mood.value}
                        onClick={() => setCurrentEntry({...currentEntry, mood: mood.value})}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 whitespace-nowrap ${
                          currentEntry.mood === mood.value
                            ? `border-purple-500 ${mood.color} text-white`
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        {mood.emoji} {mood.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your thoughts *</label>
                  <textarea
                    value={currentEntry.content}
                    onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                    rows={8}
                    maxLength={2000}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                    placeholder="What's on your mind today? How are you feeling? What happened that was significant?"
                  />
                  <div className="text-xs text-gray-500 mt-1">{currentEntry.content.length}/2000 characters</div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tagSuggestions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors duration-200 whitespace-nowrap ${
                          currentEntry.tags.includes(tag)
                            ? 'bg-purple-100 border-purple-300 text-purple-700'
                            : 'bg-gray-100 border-gray-300 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowTagInput(!showTagInput)}
                      className="px-3 py-1 text-xs rounded-full border border-dashed border-gray-400 text-gray-600 hover:border-purple-400 transition-colors duration-200 whitespace-nowrap"
                    >
                      + Add Custom
                    </button>
                  </div>

                  {showTagInput && (
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Enter custom tag..."
                        onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                      />
                      <button
                        onClick={addCustomTag}
                        className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors duration-200 whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {currentEntry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentEntry.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-purple-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsWriting(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEntry}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 whitespace-nowrap"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Search & Filter</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Search entries..."
                />
                <select
                  value={filterMood}
                  onChange={(e) => setFilterMood(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="">All Moods</option>
                  {moodOptions.map(mood => (
                    <option key={mood.value} value={mood.value}>
                      {mood.emoji} {mood.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Recent Entries</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredEntries.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No entries found</p>
                ) : (
                  filteredEntries.slice(0, 10).map(entry => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800 text-sm truncate flex-1 mr-2">{entry.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">{entry.content}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{entry.date} at {entry.time}</span>
                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {entry.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                            {entry.tags.length > 2 && (
                              <span className="text-gray-400">+{entry.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}