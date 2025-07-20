'use client';

import { useState, useEffect } from 'react';

const breathingExercises = [
  {
    id: 1,
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8. Perfect for anxiety and sleep.',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
    benefits: ['Reduces anxiety', 'Improves sleep', 'Calms nervous system']
  },
  {
    id: 2,
    name: 'Box Breathing',
    description: 'Equal counts for inhale, hold, exhale, hold. Used by Navy SEALs.',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 6,
    benefits: ['Increases focus', 'Reduces stress', 'Improves performance']
  },
  {
    id: 3,
    name: 'Belly Breathing',
    description: 'Deep diaphragmatic breathing to activate rest response.',
    inhale: 6,
    hold: 2,
    exhale: 8,
    cycles: 5,
    benefits: ['Activates parasympathetic', 'Reduces cortisol', 'Improves digestion']
  },
  {
    id: 4,
    name: 'Coherent Breathing',
    description: 'Balanced 5-second inhale and exhale for heart coherence.',
    inhale: 5,
    hold: 0,
    exhale: 5,
    cycles: 10,
    benefits: ['Heart rate variability', 'Emotional balance', 'Mental clarity']
  }
];

export default function BreathingExercise() {
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [timeLeft, setTimeLeft] = useState(selectedExercise.inhale);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handlePhaseTransition();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handlePhaseTransition = () => {
    if (currentPhase === 'inhale') {
      if (selectedExercise.hold > 0) {
        setCurrentPhase('hold');
        setTimeLeft(selectedExercise.hold);
      } else {
        setCurrentPhase('exhale');
        setTimeLeft(selectedExercise.exhale);
      }
    } else if (currentPhase === 'hold') {
      setCurrentPhase('exhale');
      setTimeLeft(selectedExercise.exhale);
    } else if (currentPhase === 'exhale') {
      if (currentCycle < selectedExercise.cycles) {
        setCurrentCycle(currentCycle + 1);
        setCurrentPhase('rest');
        setTimeLeft(2);
      } else {
        handleSessionComplete();
      }
    } else if (currentPhase === 'rest') {
      setCurrentPhase('inhale');
      setTimeLeft(selectedExercise.inhale);
    }
  };

  const handleSessionComplete = () => {
    setIsActive(false);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(selectedExercise.inhale);
    setTotalSessions(totalSessions + 1);
  };

  const startExercise = () => {
    setIsActive(true);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(selectedExercise.inhale);
  };

  const pauseExercise = () => {
    setIsActive(!isActive);
  };

  const stopExercise = () => {
    setIsActive(false);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(selectedExercise.inhale);
  };

  const selectExercise = (exercise: typeof selectedExercise) => {
    setSelectedExercise(exercise);
    setIsActive(false);
    setCurrentCycle(1);
    setCurrentPhase('inhale');
    setTimeLeft(exercise.inhale);
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'rest': return 'Rest';
      default: return 'Breathe';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-green-600';
      case 'rest': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Breathing Exercises</h1>
          <p className="text-gray-600">Practice mindful breathing to reduce stress and improve well-being</p>
          {totalSessions > 0 && (
            <div className="mt-4 inline-block bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-600">Sessions completed today: </span>
              <span className="font-semibold text-blue-600">{totalSessions}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercise Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Exercise</h2>
            <div className="space-y-3">
              {breathingExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  onClick={() => selectExercise(exercise)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedExercise.id === exercise.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800 mb-1">{exercise.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                  <div className="flex text-xs text-gray-500 space-x-2">
                    <span>In: {exercise.inhale}s</span>
                    {exercise.hold > 0 && <span>Hold: {exercise.hold}s</span>}
                    <span>Out: {exercise.exhale}s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breathing Circle */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedExercise.name}</h2>
                <p className="text-gray-600">{selectedExercise.description}</p>
              </div>

              {/* Breathing Circle */}
              <div className="relative mb-8">
                <div 
                  className={`w-64 h-64 mx-auto rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center shadow-lg transition-all duration-1000 ${
                    isActive && currentPhase === 'inhale' ? 'scale-110' : 
                    isActive && currentPhase === 'exhale' ? 'scale-90' : 'scale-100'
                  }`}
                >
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">{timeLeft}</div>
                    <div className="text-xl font-medium">{getPhaseInstruction()}</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Cycle {currentCycle} of {selectedExercise.cycles}</span>
                  <span>{Math.round((currentCycle / selectedExercise.cycles) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentCycle / selectedExercise.cycles) * 100}%` }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startExercise}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                  >
                    Start Exercise
                  </button>
                ) : (
                  <>
                    <button
                      onClick={pauseExercise}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Pause
                    </button>
                    <button
                      onClick={stopExercise}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Stop
                    </button>
                  </>
                )}
              </div>

              {/* Benefits */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Benefits:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}