
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ChatMessage from './ChatMessage';
import EmotionDetector from './EmotionDetector';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  cognitivePatterns?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Dr. LUMI, your AI neuropsychology companion. I'm here to provide evidence-based support using cognitive behavioral therapy principles. I notice this is our first session - could you help me understand what brings you here today? What specific concerns or symptoms would you like to explore?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisInfo, setShowCrisisInfo] = useState(false);
  const [showTherapyTools, setShowTherapyTools] = useState(false);
  const [sessionNotes, setSessionNotes] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisisKeywords = (text: string): boolean => {
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm', 'die', 'overdose', 'want to die', 'better off dead', 'end my life'];
    return crisisKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const generateClinicalResponse = (userMessage: string, emotion: string, severity: string, cognitivePatterns: string[]): string => {
    const clinicalResponses: { [key: string]: { [key: string]: string[] } } = {
      depression: {
        mild: [
          "I'm noticing some depressive symptoms in what you've shared. From a neuropsychological perspective, depression often involves dysregulation in neurotransmitter systems, particularly serotonin, dopamine, and norepinephrine. Can you help me understand when these feelings started and what your daily routine looks like? Are you experiencing changes in sleep, appetite, or energy levels?",
          "The symptoms you're describing suggest some mood dysregulation. In clinical terms, we often see depression manifesting through the 'neurovegetative symptoms' - changes in sleep, appetite, energy, and concentration. Have you noticed any physical symptoms accompanying these emotional changes? How is your motivation for activities you usually enjoy?"
        ],
        moderate: [
          "The pattern you're describing indicates moderate depressive symptoms. Neurologically, this often correlates with altered activity in the prefrontal cortex and limbic system, affecting both emotional regulation and executive function. I'd like to assess the full clinical picture - are you experiencing anhedonia (loss of pleasure), feelings of worthlessness, or difficulty with concentration and decision-making? How long have these symptoms been present?",
          "What you're experiencing appears to represent moderate depression, which often involves disrupted circadian rhythms and dysregulated stress hormone levels. From a diagnostic standpoint, I'm hearing several concerning symptoms. Can you tell me about your sleep patterns, any changes in appetite or weight, and whether you're having thoughts of hopelessness or self-harm?"
        ],
        severe: [
          "I'm deeply concerned about the severity of depressive symptoms you're describing. This level of depression often involves significant neurochemical imbalances and structural brain changes, particularly in areas like the hippocampus and prefrontal cortex. The symptoms you're experiencing may indicate major depressive disorder with severe features. I strongly recommend immediate evaluation by a psychiatrist. Are you having any thoughts of suicide or self-harm? Do you have a safety support system in place?"
        ]
      },
      anxiety: {
        mild: [
          "I can hear the anxiety in what you're sharing. From a neurobiological perspective, anxiety activates your sympathetic nervous system - your amygdala becomes hyperactive while your prefrontal cortex struggles to regulate these fear responses. Can you describe the physical sensations you experience? Are you noticing racing thoughts, muscle tension, or changes in breathing patterns?",
          "The anxiety symptoms you're describing involve your brain's threat detection system. Your HPA axis (hypothalamic-pituitary-adrenal) may be overactive, flooding your system with stress hormones like cortisol and adrenaline. Let's identify your specific triggers - what situations or thoughts tend to activate these anxious feelings?"
        ],
        moderate: [
          "The anxiety you're experiencing appears moderate in intensity and may be significantly impacting your daily functioning. Neurologically, this suggests persistent activation of fear circuits and dysregulation of GABA (your brain's calming neurotransmitter). Are you experiencing panic attacks, avoidance behaviors, or physical symptoms like heart palpitations, sweating, or GI distress?",
          "This level of anxiety often involves multiple brain systems - your amygdala, insula, and anterior cingulate cortex are likely hyperactive. From a clinical perspective, I'm concerned about generalized anxiety disorder or panic disorder. Can you tell me about the frequency and duration of these symptoms? Are they interfering with work, relationships, or sleep?"
        ],
        severe: [
          "The severe anxiety symptoms you're describing are very concerning and likely represent a clinical anxiety disorder requiring immediate professional intervention. This level of activation can lead to exhaustion of your stress response systems and may involve panic disorder, GAD, or other anxiety conditions. Are you experiencing panic attacks, agoraphobia, or complete avoidance of certain situations? Please consider emergency evaluation if you feel unsafe."
        ]
      },
      trauma: {
        mild: [
          "I can hear that you've experienced something traumatic. Trauma responses involve your brain's natural protective mechanisms - your amygdala becomes hypervigilant while your hippocampus struggles with memory processing and your prefrontal cortex has difficulty with emotional regulation. This is a normal neurobiological response to abnormal experiences. Can you tell me what specific trauma symptoms you're noticing?",
          "Trauma affects multiple brain systems simultaneously. Your nervous system may be stuck in a state of hyperarousal or hypoarousal as a protective response. Are you experiencing flashbacks, nightmares, intrusive thoughts, or emotional numbing? How are you sleeping, and do you feel safe in your current environment?"
        ],
        moderate: [
          "The trauma symptoms you're describing suggest significant impact on your nervous system and daily functioning. This likely involves dysregulation of your stress response system and altered connectivity between brain regions involved in memory, emotion, and threat detection. Are you experiencing dissociation, severe avoidance, hypervigilance, or re-experiencing symptoms like flashbacks?",
          "Moderate trauma responses often indicate post-traumatic stress disorder (PTSD) or complex trauma. Neurobiologically, this involves changes in brain structure and function, particularly in areas responsible for memory consolidation and threat assessment. Can you describe your window of tolerance - do you swing between feeling overwhelmed and feeling numb?"
        ],
        severe: [
          "The severe trauma symptoms you're describing require specialized trauma-informed treatment. This level of impact suggests significant neurobiological changes that may include complex PTSD, dissociative disorders, or other trauma-related conditions. Your brain's survival systems are working overtime to protect you. I strongly recommend working with a trauma specialist trained in approaches like EMDR, CPT, or somatic therapies. Are you currently safe, and do you have trauma-informed professional support?"
        ]
      },
      burnout: {
        mild: [
          "What you're describing sounds like early signs of burnout. This involves chronic activation of your stress response system, leading to elevated cortisol levels and eventual adrenal fatigue. Your prefrontal cortex, responsible for executive function, becomes impaired when chronically stressed. Are you noticing changes in your sleep, energy levels, or ability to concentrate at work?"
        ],
        moderate: [
          "The symptoms you're experiencing suggest moderate burnout syndrome. This involves dysregulation of your HPA axis and chronic inflammation that affects both brain and body. You may be experiencing what we call 'emotional exhaustion' - a depletion of emotional resources. Are you feeling cynical about work, experiencing reduced sense of personal accomplishment, or having physical symptoms like headaches or GI issues?"
        ],
        severe: [
          "Severe burnout can lead to significant physical and mental health complications. Your stress response system may be completely dysregulated, potentially leading to depression, anxiety disorders, or physical illness. This requires immediate intervention and likely time away from stressors. Are you experiencing symptoms of depression or anxiety alongside the exhaustion? Do you have support for taking necessary time to recover?"
        ]
      },
      ocd: {
        mild: [
          "The intrusive thoughts and repetitive behaviors you're describing may indicate obsessive-compulsive symptoms. From a neurological perspective, OCD involves dysfunction in the cortico-striato-thalamo-cortical circuit, particularly affecting the orbital frontal cortex and caudate nucleus. Can you describe the specific obsessions (unwanted thoughts) and compulsions (repetitive behaviors) you're experiencing?"
        ],
        moderate: [
          "The OCD symptoms you're describing appear to be significantly impacting your daily life. This involves dysregulation of serotonin systems and abnormal activity in brain circuits responsible for error detection and response inhibition. Are these obsessions and compulsions taking up more than an hour of your day? How much distress are they causing, and are they interfering with work or relationships?"
        ],
        severe: [
          "Severe OCD symptoms can be completely debilitating and require immediate professional treatment. The neurobiological dysfunction involves multiple brain systems and often requires specialized treatment approaches like ERP (Exposure and Response Prevention) therapy combined with medication. Are the obsessions and compulsions completely consuming your day? Do you have access to an OCD specialist?"
        ]
      }
    };

    const symptomClusters = EmotionDetector.getSymptomClusters(userMessage);

    let patternInsight = '';
    if (cognitivePatterns.length > 0) {
      patternInsight = ` I'm also noticing some cognitive patterns in your thinking: ${cognitivePatterns.join(', ')}. These thinking patterns can often maintain or amplify emotional distress - we can work on restructuring these thoughts using CBT techniques.`;
    }

    let symptomInsight = '';
    if (symptomClusters.length > 0) {
      const clusterDescriptions: { [key: string]: string } = {
        'sleep-disturbance': 'sleep-related symptoms',
        'appetite-changes': 'appetite and eating changes',
        'cognitive-symptoms': 'cognitive and concentration difficulties',
        'physical-symptoms': 'physical/somatic symptoms',
        'social-withdrawal': 'social withdrawal patterns',
        'mood-swings': 'mood regulation challenges'
      };

      const describedClusters = symptomClusters.map(cluster => clusterDescriptions[cluster] || cluster);
      symptomInsight = ` I'm also noticing patterns of ${describedClusters.join(', ')}, which often cluster together in certain conditions and can inform our treatment approach.`;
    }

    const clinicalQuestions: { [key: string]: string[] } = {
      depression: [
        "On a scale of 1-10, how would you rate your current mood? Are you having any thoughts of death or dying?",
        "How is your energy level and motivation? Are you able to experience pleasure in activities you used to enjoy?",
        "Have you noticed changes in your sleep pattern, appetite, or ability to concentrate?"
      ],
      anxiety: [
        "Are you experiencing physical symptoms like rapid heartbeat, sweating, or shortness of breath?",
        "What situations or thoughts trigger your anxiety most intensely?",
        "Are you avoiding certain places or activities due to anxiety?"
      ],
      trauma: [
        "Are you experiencing flashbacks, nightmares, or intrusive memories of the traumatic event?",
        "Do you feel safe in your current environment? How is your sleep and ability to concentrate?",
        "Are you finding yourself avoiding reminders of what happened?"
      ]
    };

    const baseResponses = clinicalResponses[emotion]?.[severity] || [
      "Thank you for sharing these important details with me. From a clinical perspective, I'm hearing several significant elements in what you've described. The symptoms and experiences you're reporting suggest we should explore this further with a comprehensive assessment. Can you help me understand the timeline of these experiences and how they're affecting your daily functioning?"
    ];

    const selectedResponse = baseResponses[Math.floor(Math.random() * baseResponses.length)];
    const additionalQuestions = clinicalQuestions[emotion] || [];
    const randomQuestion = additionalQuestions.length > 0 ?
      ` ${additionalQuestions[Math.floor(Math.random() * additionalQuestions.length)]}` : '';

    return selectedResponse + patternInsight + symptomInsight + randomQuestion;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    if (detectCrisisKeywords(inputText)) {
      setShowCrisisInfo(true);
    }

    setTimeout(() => {
      const emotion = EmotionDetector.detectEmotion(inputText);
      const severity = EmotionDetector.getSeverityLevel(emotion, inputText);
      const cognitivePatterns = EmotionDetector.getCognitivePatterns(inputText);

      const note = `${emotion} (${severity}) - Patterns: ${cognitivePatterns.join(', ') || 'none'}`;
      setSessionNotes(prev => [...prev, note]);

      const aiResponse = generateClinicalResponse(inputText, emotion, severity, cognitivePatterns);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        emotion,
        severity,
        cognitivePatterns
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const therapyTools = [
    {
      id: 'breathing',
      title: '5-4-3-2-1 Grounding',
      description: 'Anxiety relief through sensory grounding',
      icon: 'ri-lung-line',
      color: 'blue'
    },
    {
      id: 'cognitive',
      title: 'Thought Record',
      description: 'CBT technique for challenging negative thoughts',
      icon: 'ri-brain-line',
      color: 'purple'
    },
    {
      id: 'mood',
      title: 'Mood Check-in',
      description: 'Quick emotional state assessment',
      icon: 'ri-emotion-line',
      color: 'green'
    },
    {
      id: 'progressive',
      title: 'Progressive Relaxation',
      description: 'Systematic muscle tension release',
      icon: 'ri-body-scan-line',
      color: 'orange'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Exercise',
      description: 'Present moment awareness practice',
      icon: 'ri-leaf-line',
      color: 'teal'
    },
    {
      id: 'journal',
      title: 'Gratitude Journal',
      description: 'Positive psychology intervention',
      icon: 'ri-book-open-line',
      color: 'pink'
    }
  ];

  const handleToolSelect = (toolId: string) => {
    const toolMessages: { [key: string]: string } = {
      breathing: "Let's practice the 5-4-3-2-1 grounding technique. This engages your parasympathetic nervous system to reduce anxiety. First, name 5 things you can see around you right now. Take your time and describe them in detail.",
      cognitive: "We'll use a CBT thought record to examine negative thought patterns. Think of a recent situation that upset you. What was the automatic thought that came to mind? Let's identify the thinking pattern and challenge its accuracy together.",
      mood: "Let's do a comprehensive mood assessment. On a scale of 1-10, how would you rate your current mood? Also describe any physical sensations, energy levels, and predominant emotions you're experiencing right now.",
      progressive: "Progressive muscle relaxation helps reset your nervous system. We'll systematically tense and release muscle groups. Start by getting comfortable and taking three deep breaths. Now, clench your fists tightly for 5 seconds, then release. Notice the contrast.",
      mindfulness: "This mindfulness exercise will help ground you in the present moment, activating your prefrontal cortex. Close your eyes if comfortable, and focus on your breathing. Notice each inhale and exhale without trying to change anything.",
      journal: "Gratitude practices can rewire neural pathways associated with positive emotions. Think of three specific things you're grateful for today. For each one, explain why it's meaningful to you and how it makes you feel."
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: toolMessages[toolId] || "Let's work on this therapeutic technique together. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setShowTherapyTools(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-pacifico text-xl text-blue-600 cursor-pointer">
              LUMIPSYCHE
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Dr. LUMI - Neuropsychology AI</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-500">
              Session: {new Date().toLocaleDateString()}
            </div>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 cursor-pointer">
              <i className="ri-dashboard-line text-xl"></i>
            </Link>
            <button
              onClick={() => setShowTherapyTools(true)}
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              <i className="ri-psychotherapy-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-b border-blue-200 px-6 py-2">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-blue-800">
            <i className="ri-information-line mr-2"></i>
            Clinical AI Session - Evidence-based responses using CBT and neuropsychological principles
          </p>
        </div>
      </div>

      {showCrisisInfo && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 rounded">
          <div className="flex items-start">
            <i className="ri-alert-line text-red-500 text-xl mr-3 mt-1"></i>
            <div>
              <h3 className="text-red-800 font-semibold">Immediate Crisis Support Required</h3>
              <p className="text-red-700 mt-1">
                Based on your message, I'm concerned about your safety. Please contact emergency services immediately:
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-red-800 font-semibold">Emergency: 911 | Crisis Hotline: 988</p>
                <p className="text-red-700">Crisis Text Line: Text HOME to 741741</p>
                <p className="text-red-700">National Suicide Prevention Lifeline: 1-800-273-8255</p>
              </div>
              <button
                onClick={() => setShowCrisisInfo(false)}
                className="mt-2 text-red-600 hover:text-red-800 text-sm underline cursor-pointer"
              >
                I understand - Continue session
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        <div className="flex-1 px-6 py-6 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-stethoscope-line text-blue-600"></i>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                    <span className="text-xs text-gray-500">Analyzing response...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <i className="ri-file-text-line mr-2"></i>
            Session Notes
          </h3>
          <div className="space-y-2 text-sm">
            {sessionNotes.map((note, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                {note}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Clinical Observations</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• Rapport: Building</p>
              <p>• Engagement: Active</p>
              <p>• Insight Level: Assessing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts, feelings, or concerns in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                rows={3}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{inputText.length}/1000 characters</span>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-blue-600 cursor-pointer" title="Voice Input">
                    <i className="ri-mic-line text-lg"></i>
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 cursor-pointer" title="Audio Response">
                    <i className="ri-volume-up-line text-lg"></i>
                  </button>
                  <button className="text-gray-400 hover:text-blue-600 cursor-pointer" title="Session Summary">
                    <i className="ri-file-list-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2"
            >
              <i className="ri-send-plane-line"></i>
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

      {showTherapyTools && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Therapy Tools & Exercises</h3>
              <button
                onClick={() => setShowTherapyTools(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {therapyTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-${tool.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${tool.icon} text-${tool.color}-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">{tool.title}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <i className="ri-information-line mr-2"></i>
                These evidence-based therapeutic exercises are designed to complement our conversation. Select any tool to begin a guided session with Dr. LUMI.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
