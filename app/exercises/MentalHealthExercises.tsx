'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Exercise {
  id: number;
  title: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructions: string[];
  benefits: string[];
  icon: string;
  color: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: '5-4-3-2-1 Grounding',
    category: 'Anxiety Relief',
    duration: '5-10 minutes',
    difficulty: 'Beginner',
    description: 'Use your senses to ground yourself in the present moment and reduce anxiety.',
    instructions: [
      'Find 5 things you can see around you',
      'Notice 4 things you can touch',
      'Listen for 3 things you can hear',
      'Identify 2 things you can smell',
      'Name 1 thing you can taste'
    ],
    benefits: ['Reduces anxiety', 'Increases mindfulness', 'Grounds you in present'],
    icon: 'ri-eye-line',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Progressive Muscle Relaxation',
    category: 'Stress Relief',
    duration: '15-20 minutes',
    difficulty: 'Beginner',
    description: 'Systematically tense and relax muscle groups to release physical tension.',
    instructions: [
      'Start with your toes - tense for 5 seconds, then relax',
      'Move up to your calves, thighs, and so on',
      'Work through each muscle group systematically',
      'End with your face and head muscles',
      'Notice the contrast between tension and relaxation'
    ],
    benefits: ['Reduces muscle tension', 'Improves sleep', 'Lowers stress hormones'],
    icon: 'ri-body-scan-line',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Thought Challenging',
    category: 'Cognitive Restructuring',
    duration: '10-15 minutes',
    difficulty: 'Intermediate',
    description: 'Identify and challenge negative thought patterns using CBT techniques.',
    instructions: [
      'Write down the negative thought',
      'What evidence supports this thought?',
      'What evidence contradicts it?',
      'What would you tell a friend in this situation?',
      'Create a more balanced, realistic thought'
    ],
    benefits: ['Reduces negative thinking', 'Improves mood', 'Builds resilience'],
    icon: 'ri-brain-line',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Loving-Kindness Meditation',
    category: 'Self-Compassion',
    duration: '10-20 minutes',
    difficulty: 'Intermediate',
    description: 'Cultivate compassion for yourself and others through guided meditation.',
    instructions: [
      'Start by sending loving thoughts to yourself',
      'Extend compassion to someone you love',
      'Include a neutral person in your life',
      'Send kindness to someone difficult',
      'Expand to all beings everywhere'
    ],
    benefits: ['Increases self-compassion', 'Reduces self-criticism', 'Improves relationships'],
    icon: 'ri-heart-line',
    color: 'bg-pink-500'
  },
  {
    id: 5,
    title: 'Values Clarification',
    category: 'Life Purpose',
    duration: '20-30 minutes',
    difficulty: 'Advanced',
    description: 'Identify your core values and align your actions with what matters most.',
    instructions: [
      'List what you value most in life',
      'Rank your top 5 values in order of importance',
      'For each value, write why it matters to you',
      'Identify how you currently honor each value',
      'Set goals to better align with your values'
    ],
    benefits: ['Increases life satisfaction', 'Improves decision-making', 'Reduces conflict'],
    icon: 'ri-compass-line',
    color: 'bg-orange-500'
  },
  {
    id: 6,
    title: 'Body Scan Meditation',
    category: 'Mindfulness',
    duration: '15-25 minutes',
    difficulty: 'Beginner',
    description: 'Systematically focus on different parts of your body to increase awareness.',
    instructions: [
      'Lie down comfortably and close your eyes',
      'Start focusing on your toes',
      'Slowly move attention up through your body',
      'Notice sensations without trying to change them',
      'End by feeling your whole body as one'
    ],
    benefits: ['Increases body awareness', 'Reduces chronic pain', 'Improves sleep'],
    icon: 'ri-focus-line',
    color: 'bg-teal-500'
  },
  {
    id: 7,
    title: 'Gratitude Practice',
    category: 'Positive Psychology',
    duration: '5-10 minutes',
    difficulty: 'Beginner',
    description: 'Cultivate appreciation and positive emotions through gratitude exercises.',
    instructions: [
      'Write down 3 things you\'re grateful for today',
      'For each item, write why you\'re grateful',
      'Include small and large things',
      'Notice how this makes you feel',
      'Consider sharing gratitude with someone'
    ],
    benefits: ['Improves mood', 'Increases life satisfaction', 'Strengthens relationships'],
    icon: 'ri-heart-3-line',
    color: 'bg-yellow-500'
  },
  {
    id: 8,
    title: 'STOP Technique',
    category: 'Mindfulness',
    duration: '2-5 minutes',
    difficulty: 'Beginner',
    description: 'A quick mindfulness technique for stressful moments.',
    instructions: [
      'STOP what you\'re doing',
      'Take a deep breath',
      'Observe your thoughts, feelings, and body',
      'Proceed with awareness and intention'
    ],
    benefits: ['Reduces reactivity', 'Increases awareness', 'Improves decision-making'],
    icon: 'ri-hand-line',
    color: 'bg-red-500'
  }
];

const categories = ['All', 'Anxiety Relief', 'Stress Relief', 'Cognitive Restructuring', 'Self-Compassion', 'Life Purpose', 'Mindfulness', 'Positive Psychology'];

export default function MentalHealthExercises() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const filteredExercises = selectedCategory === 'All' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  const markAsCompleted = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      const updated = [...completedExercises, exerciseId];
      setCompletedExercises(updated);
      localStorage.setItem('completedExercises', JSON.stringify(updated));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Mental Health Exercises</h1>
            <p className="text-gray-600">Evidence-based techniques to improve your mental well-being</p>
          </div>
          <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
            <i className="ri-arrow-left-line text-xl mr-2"></i>
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{exercises.length}</div>
            <div className="text-sm text-gray-600">Total Exercises</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{completedExercises.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{Math.round((completedExercises.length / exercises.length) * 100)}%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>

        {selectedExercise ? (
          /* Exercise Detail View */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedExercise(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <i className="ri-arrow-left-line text-xl mr-2"></i>
                Back to exercises
              </button>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedExercise.difficulty)}`}>
                  {selectedExercise.difficulty}
                </span>
                <span className="text-sm text-gray-600">{selectedExercise.duration}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 ${selectedExercise.color} rounded-full flex items-center justify-center mr-4`}>
                    <i className={`${selectedExercise.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedExercise.title}</h2>
                    <p className="text-gray-600">{selectedExercise.category}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-lg">{selectedExercise.description}</p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h3>
                  <div className="space-y-3">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => markAsCompleted(selectedExercise.id)}
                    disabled={completedExercises.includes(selectedExercise.id)}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                      completedExercises.includes(selectedExercise.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {completedExercises.includes(selectedExercise.id) ? '✓ Completed' : 'Mark as Completed'}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Benefits</h3>
                  <div className="space-y-2">
                    {selectedExercise.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Tips for Success</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Find a quiet, comfortable space</p>
                    <p>• Set aside dedicated time</p>
                    <p>• Be patient with yourself</p>
                    <p>• Practice regularly for best results</p>
                    <p>• Adjust the technique to fit your needs</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">When to Use</h3>
                  <div className="text-sm text-gray-700">
                    {selectedExercise.category === 'Anxiety Relief' && (
                      <p>Use when feeling anxious, overwhelmed, or need to ground yourself in the present moment.</p>
                    )}
                    {selectedExercise.category === 'Stress Relief' && (
                      <p>Practice when experiencing physical tension, before sleep, or during stressful periods.</p>
                    )}
                    {selectedExercise.category === 'Cognitive Restructuring' && (
                      <p>Apply when caught in negative thought patterns or experiencing cognitive distortions.</p>
                    )}
                    {selectedExercise.category === 'Self-Compassion' && (
                      <p>Use when being self-critical, feeling isolated, or need to cultivate kindness.</p>
                    )}
                    {selectedExercise.category === 'Mindfulness' && (
                      <p>Practice daily to increase awareness and presence in your daily life.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Exercise Grid View */
          <>
            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercises Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${exercise.color} rounded-lg flex items-center justify-center`}>
                      <i className={`${exercise.icon} text-xl text-white`}></i>
                    </div>
                    {completedExercises.includes(exercise.id) && (
                      <div className="bg-green-100 text-green-800 rounded-full p-1">
                        <i className="ri-check-line text-sm"></i>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{exercise.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{exercise.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {exercise.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}