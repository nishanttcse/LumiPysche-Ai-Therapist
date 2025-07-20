
'use client';

class EmotionDetector {
  static detectEmotion(text: string): string {
    const lowerText = text.toLowerCase();

    // Expanded emotion keywords mapping with more clinical terms and symptom descriptors
    const emotionKeywords = {
      // Primary emotions with clinical indicators
      depression: [
        'depressed', 'hopeless', 'worthless', 'empty', 'numb', 'suicidal', 'meaningless', 'despair', 'devastated', 'hollow', 'lifeless',
        'no energy', 'tired all the time', 'can\'t get out of bed', 'sleeping too much', 'not sleeping', 'no appetite', 'eating too much',
        'feel like a burden', 'nothing matters', 'can\'t concentrate', 'memory problems', 'slow thinking', 'heavy feeling', 'crying spells',
        'withdrawal', 'isolating', 'avoiding people', 'lost interest', 'no motivation', 'feel stuck', 'dark thoughts', 'self-harm'
      ],
      anxiety: [
        'anxious', 'worried', 'panic', 'fear', 'nervous', 'restless', 'tense', 'overwhelmed', 'racing thoughts', 'hypervigilant', 'catastrophizing',
        'heart racing', 'shortness of breath', 'sweating', 'trembling', 'chest tightness', 'dizziness', 'nausea', 'stomach knots',
        'what if', 'worst case scenario', 'can\'t stop worrying', 'overthinking', 'anticipating disaster', 'avoiding situations',
        'need to escape', 'feeling trapped', 'muscle tension', 'jaw clenching', 'headaches', 'insomnia', 'startled easily'
      ],
      anger: [
        'angry', 'furious', 'rage', 'irritated', 'frustrated', 'hostile', 'aggressive', 'violent', 'explosive', 'bitter', 'resentful',
        'want to hit', 'clenched fists', 'see red', 'boiling inside', 'snap at people', 'road rage', 'losing control',
        'hate everyone', 'unfair', 'injustice', 'betrayed', 'used', 'taken advantage', 'disrespected', 'ignored'
      ],

      // Complex emotional states with symptom descriptions
      grief: [
        'grief', 'mourning', 'loss', 'bereaved', 'heartbroken', 'miss', 'gone', 'died', 'death', 'funeral', 'memorial',
        'waves of sadness', 'yearning', 'longing', 'aching', 'empty chair', 'reminders everywhere', 'anniversary reactions',
        'survivor guilt', 'why them not me', 'unfinished business', 'regrets', 'if only', 'shoulda coulda woulda'
      ],
      trauma: [
        'flashback', 'nightmare', 'triggered', 'ptsd', 'haunted', 'reliving', 'intrusive', 'avoidance', 'hyperalert', 'dissociate',
        'jumpiness', 'easily startled', 'on edge', 'scanning for danger', 'can\'t feel safe', 'trust issues', 'emotional numbing',
        'survivor guilt', 'why me', 'it\'s my fault', 'could have prevented', 'replay in mind', 'vivid memories'
      ],
      shame: [
        'ashamed', 'humiliated', 'embarrassed', 'guilty', 'inadequate', 'flawed', 'unworthy', 'disgraceful', 'mortified',
        'not good enough', 'defective', 'broken', 'damaged goods', 'hide from others', 'secret', 'exposure fears',
        'comparing myself', 'imposter syndrome', 'perfectionism', 'fear of judgment', 'self-criticism', 'inner critic'
      ],

      // Psychological conditions indicators with detailed symptoms
      mania: [
        'manic', 'euphoric', 'grandiose', 'invincible', 'racing', 'impulsive', 'reckless', 'hypersexual', 'sleepless', 'unstoppable',
        'talking fast', 'jumping topics', 'million ideas', 'no need for sleep', 'spending sprees', 'risky behavior',
        'feel like god', 'special powers', 'big plans', 'pressure in head', 'everything connected', 'hypergraphia'
      ],
      paranoia: [
        'paranoid', 'suspicious', 'watched', 'followed', 'conspiracy', 'plotting', 'dangerous', 'threatened', 'unsafe',
        'everyone against me', 'can\'t trust anyone', 'hidden meanings', 'reading between lines', 'surveillance',
        'poisoned', 'bugged', 'tracked', 'government', 'mind reading', 'thought broadcasting', 'special messages'
      ],
      dissociation: [
        'disconnected', 'unreal', 'floating', 'detached', 'spacey', 'foggy', 'derealization', 'depersonalization',
        'watching myself', 'like a dream', 'robot-like', 'autopilot', 'lost time', 'memory gaps', 'not really here',
        'out of body', 'feel fake', 'world looks strange', 'cotton wool feeling', 'glass wall between me and world'
      ],

      // Positive emotional states with nuances
      joy: [
        'happy', 'joyful', 'elated', 'euphoric', 'ecstatic', 'blissful', 'overjoyed', 'thrilled', 'delighted',
        'on cloud nine', 'walking on air', 'heart singing', 'glowing', 'radiant', 'bubbling with happiness'
      ],
      contentment: [
        'content', 'peaceful', 'serene', 'calm', 'satisfied', 'fulfilled', 'balanced', 'stable',
        'at ease', 'centered', 'grounded', 'comfortable', 'secure', 'steady', 'harmonious'
      ],
      hope: [
        'hopeful', 'optimistic', 'positive', 'encouraged', 'motivated', 'inspired', 'uplifted', 'promising',
        'light at end of tunnel', 'things getting better', 'looking forward', 'excited about future', 'silver lining'
      ],

      // Stress-related with physical symptoms
      burnout: [
        'exhausted', 'drained', 'burned out', 'overwhelmed', 'depleted', 'fatigued', 'overworked', 'stressed',
        'running on empty', 'no gas left', 'fried', 'crispy', 'can\'t cope', 'too much', 'breaking point',
        'chronic fatigue', 'adrenal fatigue', 'hit the wall', 'nothing left to give', 'stretched thin'
      ],
      loneliness: [
        'lonely', 'isolated', 'alone', 'disconnected', 'abandoned', 'rejected', 'excluded', 'solitary',
        'no one understands', 'invisible', 'forgotten', 'left out', 'social anxiety', 'afraid to reach out',
        'empty relationships', 'surface level', 'fake connections', 'crowd but still alone'
      ],

      // Cognitive and physical states
      confusion: [
        'confused', 'lost', 'unclear', 'puzzled', 'disoriented', 'bewildered', 'perplexed', 'foggy mind',
        'brain fog', 'can\'t think straight', 'mixed up', 'jumbled thoughts', 'memory issues', 'forgetful',
        'concentration problems', 'scattered', 'all over the place', 'can\'t focus', 'distracted'
      ],
      focus: [
        'focused', 'clear', 'sharp', 'alert', 'concentrated', 'mindful', 'present', 'aware',
        'in the zone', 'flow state', 'laser focused', 'tunnel vision', 'absorbed', 'engaged'
      ],

      // Additional clinical conditions
      ocd: [
        'obsessive', 'compulsive', 'checking', 'counting', 'repeating', 'contamination', 'germs', 'dirty',
        'intrusive thoughts', 'unwanted thoughts', 'disturbing images', 'rituals', 'have to do', 'something bad will happen',
        'perfectionism', 'just right feeling', 'symmetry', 'ordering', 'hoarding', 'collecting'
      ],
      adhd: [
        'can\'t focus', 'hyperactive', 'impulsive', 'restless', 'fidgety', 'scattered', 'procrastination',
        'hyperfocus', 'time blindness', 'executive function', 'organization problems', 'forgetful',
        'mind racing', 'interrupting', 'blurting out', 'can\'t sit still', 'always moving'
      ],
      eating_disorder: [
        'fat', 'ugly', 'food obsession', 'calories', 'purging', 'restricting', 'binge eating',
        'body dysmorphia', 'mirror checking', 'clothes tight', 'weigh myself', 'food rules',
        'guilt eating', 'shame eating', 'emotional eating', 'all or nothing', 'diet culture'
      ]
    };

    // Enhanced scoring with clinical weight and context
    const emotionScores: { [key: string]: number } = {};

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      emotionScores[emotion] = 0;
      keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          const weight = this.getClinicalWeight(keyword);
          const contextBonus = this.getContextualWeight(keyword, lowerText);
          emotionScores[emotion] += weight + contextBonus;
        }
      });
    }

    // Find the emotion with the highest score
    const maxScore = Math.max(...Object.values(emotionScores));
    if (maxScore === 0) return 'neutral';

    const dominantEmotion = Object.entries(emotionScores).find(
      ([, score]) => score === maxScore
    )?.[0];

    return dominantEmotion || 'neutral';
  }

  static getClinicalWeight(keyword: string): number {
    // Clinical and severe terms get higher weight
    const criticalTerms = ['suicidal', 'self-harm', 'ptsd', 'flashback', 'dissociate', 'manic', 'paranoid', 'trauma', 'can\'t get out of bed'];
    const severeTerms = ['depressed', 'anxiety', 'panic', 'grief', 'shame', 'burnout', 'obsessive', 'compulsive'];
    const moderateTerms = ['worried', 'sad', 'tired', 'stressed', 'lonely', 'confused', 'frustrated'];

    if (criticalTerms.includes(keyword)) return 4;
    if (severeTerms.includes(keyword)) return 3;
    if (moderateTerms.includes(keyword)) return 2;
    return 1;
  }

  static getContextualWeight(keyword: string, fullText: string): number {
    // Add extra weight if multiple related symptoms mentioned together
    const syndromePatterns = {
      depression: ['tired', 'sleeping', 'appetite', 'worthless', 'hopeless', 'empty'],
      anxiety: ['racing', 'worried', 'panic', 'heart', 'breathing', 'sweating'],
      trauma: ['flashback', 'nightmare', 'triggered', 'avoidance', 'hypervigilant'],
      burnout: ['exhausted', 'overwhelmed', 'drained', 'stressed', 'overworked']
    };

    let bonus = 0;
    for (const [syndrome, patterns] of Object.entries(syndromePatterns)) {
      const matchCount = patterns.filter(pattern => fullText.includes(pattern)).length;
      if (matchCount >= 2) bonus += matchCount * 0.5;
    }

    return bonus;
  }

  static getSeverityLevel(emotion: string, text: string): 'mild' | 'moderate' | 'severe' {
    const severeIndicators = [
      'can\'t', 'unable', 'impossible', 'always', 'never', 'completely', 'totally', 'extremely',
      'suicidal', 'want to die', 'end it all', 'can\'t go on', 'breaking point', 'lost everything',
      'every day', 'all the time', 'constant', 'overwhelming', 'unbearable', 'can\'t function'
    ];
    const moderateIndicators = [
      'often', 'frequently', 'usually', 'most', 'many', 'really', 'very', 'quite',
      'struggling', 'difficult', 'hard time', 'getting worse', 'affecting work', 'affecting relationships'
    ];

    const lowerText = text.toLowerCase();

    // Count severity indicators
    const severeCount = severeIndicators.filter(indicator => lowerText.includes(indicator)).length;
    const moderateCount = moderateIndicators.filter(indicator => lowerText.includes(indicator)).length;

    if (severeCount >= 2 || (severeCount >= 1 && moderateCount >= 1)) {
      return 'severe';
    } else if (moderateCount >= 2 || severeCount >= 1) {
      return 'moderate';
    }
    return 'mild';
  }

  static getCognitivePatterns(text: string): string[] {
    const patterns: { [key: string]: string[] } = {
      'catastrophizing': ['worst', 'terrible', 'disaster', 'end of world', 'ruined', 'everything will fall apart', 'nothing will work'],
      'all-or-nothing': ['always', 'never', 'completely', 'totally', 'entirely', 'perfect or failure', 'black and white'],
      'mind-reading': ['they think', 'everyone believes', 'people see me', 'others judge', 'know what they\'re thinking'],
      'fortune-telling': ['will happen', 'going to', 'know it will', 'predict', 'bound to fail', 'won\'t work out'],
      'personalization': ['my fault', 'because of me', 'I caused', 'I\'m responsible', 'if only I had'],
      'emotional-reasoning': ['feel like', 'must be true because', 'feeling means', 'gut tells me'],
      'should-statements': ['should have', 'must do', 'ought to', 'have to', 'supposed to'],
      'labeling': ['I\'m stupid', 'I\'m worthless', 'I\'m a failure', 'I\'m broken', 'I\'m damaged'],
      'mental-filter': ['only focusing on', 'can\'t see anything good', 'dwelling on', 'can\'t get over'],
      'discounting-positive': ['doesn\'t count', 'just luck', 'anyone could do', 'not a big deal', 'fluke']
    };

    const detectedPatterns: string[] = [];
    const lowerText = text.toLowerCase();

    for (const [pattern, keywords] of Object.entries(patterns)) {
      const matchCount = keywords.filter(keyword => lowerText.includes(keyword)).length;
      if (matchCount > 0) {
        detectedPatterns.push(pattern);
      }
    }

    return detectedPatterns;
  }

  // New method: Get symptom clusters for better clinical understanding
  static getSymptomClusters(text: string): string[] {
    const clusters: { [key: string]: string[] } = {
      'sleep-disturbance': ['can\'t sleep', 'insomnia', 'sleeping too much', 'nightmares', 'restless sleep', 'tired'],
      'appetite-changes': ['no appetite', 'eating too much', 'weight loss', 'weight gain', 'comfort eating'],
      'cognitive-symptoms': ['can\'t concentrate', 'memory problems', 'brain fog', 'confused', 'slow thinking'],
      'physical-symptoms': ['headaches', 'stomach problems', 'muscle tension', 'chest tightness', 'dizziness'],
      'social-withdrawal': ['avoiding people', 'isolating', 'don\'t want to go out', 'canceling plans', 'hiding'],
      'mood-swings': ['up and down', 'emotional rollercoaster', 'unpredictable', 'mood changes', 'irritable']
    };

    const detectedClusters: string[] = [];
    const lowerText = text.toLowerCase();

    for (const [cluster, symptoms] of Object.entries(clusters)) {
      const matchCount = symptoms.filter(symptom => lowerText.includes(symptom)).length;
      if (matchCount >= 1) {
        detectedClusters.push(cluster);
      }
    }

    return detectedClusters;
  }

  static getSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'happy', 'joy', 'love', 'beautiful', 'perfect', 'awesome', 'better', 'improved', 'progress', 'hopeful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'depressed', 'worried', 'scared', 'frustrated', 'upset', 'worse', 'difficult', 'struggling', 'pain'];

    const lowerText = text.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}

export default EmotionDetector;
