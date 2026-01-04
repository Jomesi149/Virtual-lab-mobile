import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Aesthetic Usability Effect Simulation - Data Dashboard
const AestheticUsabilitySimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, ratingA, scenarioB, ratingB, result
  const [startTime, setStartTime] = useState(0);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [ratingA, setRatingA] = useState(0);
  const [ratingB, setRatingB] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Generate consistent error log data
  const errorData = [
    { id: 1, service: 'Authentication', errors: 23, status: 'Warning' },
    { id: 2, service: 'Database', errors: 156, status: 'Critical' },
    { id: 3, service: 'API Gateway', errors: 45, status: 'Warning' },
    { id: 4, service: 'Cache', errors: 8, status: 'Normal' },
    { id: 5, service: 'Storage', errors: 67, status: 'Warning' },
  ];

  const correctAnswer = 2; // Database has highest errors (156)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenario = (scenario) => {
    setStartTime(Date.now());
    fadeAnim.setValue(0);
    setPhase(scenario);
  };

  const handleSelection = (id, scenario) => {
    const timeTaken = Date.now() - startTime;
    if (scenario === 'scenarioA') {
      setTimeA(timeTaken);
      fadeAnim.setValue(0);
      setPhase('ratingA');
    } else {
      setTimeB(timeTaken);
      fadeAnim.setValue(0);
      setPhase('ratingB');
    }
  };

  const handleRating = (rating, scenario) => {
    if (scenario === 'ratingA') {
      setRatingA(rating);
      fadeAnim.setValue(0);
      setTimeout(() => startScenario('scenarioB'), 300);
    } else {
      setRatingB(rating);
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 300);
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🎯 Aesthetic-Usability Effect
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 dashboard monitoring error. Tugas Anda:{'\n'}
          {'\n'}📊 <Text style={{ fontWeight: '600' }}>Temukan service dengan error TERTINGGI</Text>
          {'\n'}⏱️ Waktu dan kesulitan Anda akan diukur
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startScenario('scenarioA')}
        >
          <Text style={styles.startButtonText}>Mulai Simulasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - Low Fidelity (Plain Table)
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Dashboard 1 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          Tap service dengan ERROR TERTINGGI:
        </Text>
        
        {/* Low Fidelity Table */}
        <View style={styles.tablePlain}>
          <View style={styles.tableRowPlain}>
            <Text style={[styles.tableCellPlain, styles.tableHeaderPlain]}>Service</Text>
            <Text style={[styles.tableCellPlain, styles.tableHeaderPlain]}>Errors</Text>
            <Text style={[styles.tableCellPlain, styles.tableHeaderPlain]}>Status</Text>
          </View>
          {errorData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tableRowPlain}
              onPress={() => handleSelection(item.id, 'scenarioA')}
            >
              <Text style={styles.tableCellPlain}>{item.service}</Text>
              <Text style={styles.tableCellPlain}>{item.errors}</Text>
              <Text style={styles.tableCellPlain}>{item.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Rating Phase A
  if (phase === 'ratingA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          Seberapa sulit tugasnya?
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary, marginBottom: 24 }]}>
          Berikan rating kesulitan (1 = Sangat Mudah, 5 = Sangat Sulit)
        </Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.ratingButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleRating(num, 'ratingA')}
            >
              <Text style={[styles.ratingNumber, { color: colors.textPrimary }]}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Scenario B - High Fidelity (Glassmorphism)
  if (phase === 'scenarioB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Dashboard 2 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          Tap service dengan ERROR TERTINGGI:
        </Text>
        
        {/* High Fidelity Glass Cards */}
        <View style={styles.dashboardGlass}>
          {errorData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.glassCard, { backgroundColor: colors.surface }]}
              onPress={() => handleSelection(item.id, 'scenarioB')}
            >
              <View style={styles.glassHeader}>
                <Ionicons
                  name={item.status === 'Critical' ? 'alert-circle' : item.status === 'Warning' ? 'warning' : 'checkmark-circle'}
                  size={24}
                  color={item.status === 'Critical' ? '#EF4444' : item.status === 'Warning' ? '#F59E0B' : '#10B981'}
                />
                <Text style={[styles.glassService, { color: colors.textPrimary }]}>
                  {item.service}
                </Text>
              </View>
              <View style={styles.glassBody}>
                <Text style={[styles.glassErrorCount, { color: colors.accent }]}>
                  {item.errors}
                </Text>
                <Text style={[styles.glassErrorLabel, { color: colors.textSecondary }]}>
                  Errors
                </Text>
              </View>
              <View style={[styles.glassFooter, { 
                backgroundColor: item.status === 'Critical' ? '#FEE2E2' : 
                               item.status === 'Warning' ? '#FEF3C7' : '#D1FAE5' 
              }]}>
                <Text style={[styles.glassStatus, { 
                  color: item.status === 'Critical' ? '#DC2626' : 
                         item.status === 'Warning' ? '#D97706' : '#059669' 
                }]}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Rating Phase B
  if (phase === 'ratingB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          Seberapa sulit tugasnya?
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary, marginBottom: 24 }]}>
          Berikan rating kesulitan (1 = Sangat Mudah, 5 = Sangat Sulit)
        </Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.ratingButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleRating(num, 'ratingB')}
            >
              <Text style={[styles.ratingNumber, { color: colors.textPrimary }]}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const timeDiff = timeA - timeB;
    const ratingDiff = ratingA - ratingB;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi
        </Text>
        
        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.surface }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Dashboard 1 (Plain)</Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                ⏱️ {(timeA / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Kesulitan: {ratingA}/5
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Dashboard 2 (Glass)</Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                ⏱️ {(timeB / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Kesulitan: {ratingB}/5
              </Text>
            </View>
          </View>
          
          <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
            <Text style={[styles.comparisonText, { color: colors.accent }]}>
              {timeDiff > 0 
                ? `⚡ ${Math.abs((timeDiff / 1000)).toFixed(2)}s lebih cepat dengan desain menarik!` 
                : `Dashboard 1 lebih cepat ${Math.abs((timeDiff / 1000)).toFixed(2)}s`}
            </Text>
            {ratingDiff > 0 && (
              <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
                Dan terasa {Math.abs(ratingDiff)} poin lebih mudah!
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ✨ Aesthetic-Usability Effect
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Desain yang menarik secara visual tidak hanya terlihat bagus, tetapi juga dipersepsikan lebih mudah digunakan dan sering menghasilkan performa yang lebih baik!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Hick's Law / Choice Overload Simulation
const ChoiceOverloadSimulation = ({ colors, onComplete }) => {
  const [selectedSet, setSelectedSet] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startSelection = (set) => {
    setSelectedSet(set);
    setTime(0);
    setIsRunning(true);
    setFinished(false);
  };

  const makeChoice = () => {
    setIsRunning(false);
    setFinished(true);
  };

  const fewOptions = ['S', 'M', 'L'];
  const manyOptions = ['XS', 'S', 'S+', 'M-', 'M', 'M+', 'L-', 'L', 'L+', 'XL', 'XXL', 'XXXL'];

  return (
    <View style={styles.simContainer}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
        Berapa Lama Waktu untuk Memilih?
      </Text>
      <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
        Pilih salah satu skenario untuk mulai
      </Text>

      {!selectedSet && (
        <View style={styles.simRow}>
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => startSelection('few')}
          >
            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>3 Pilihan</Text>
            <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>S, M, L</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => startSelection('many')}
          >
            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>12 Pilihan</Text>
            <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>XS - XXXL</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedSet && isRunning && (
        <View>
          <Text style={[styles.timerText, { color: colors.accent }]}>
            ⏱️ {(time / 1000).toFixed(1)}s
          </Text>
          <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
            Pilih satu ukuran:
          </Text>
          <View style={styles.choiceGrid}>
            {(selectedSet === 'few' ? fewOptions : manyOptions).map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.choiceButton, { backgroundColor: colors.accent }]}
                onPress={makeChoice}
              >
                <Text style={styles.choiceButtonText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {finished && (
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⏱️ Waktu keputusan: {(time / 1000).toFixed(1)} detik
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            {selectedSet === 'many'
              ? 'Terlalu banyak pilihan membuat keputusan lebih lama!'
              : 'Pilihan yang lebih sedikit membuat keputusan lebih cepat!'}
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Hick's Law Simulation - The Emoji Hunt (Refactored)
const HicksLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [scenario, setScenario] = useState(null);
  const [category, setCategory] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [decisionTimeA, setDecisionTimeA] = useState(0);
  const [decisionTimeB, setDecisionTimeB] = useState(0);
  const [selectedEmojiA, setSelectedEmojiA] = useState(null);
  const [selectedEmojiB, setSelectedEmojiB] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const TARGET_EMOJI = '🍕';
  const TARGET_NAME = 'Pizza';

  // 40 mixed emojis for Scenario A (Chaotic)
  const allEmojis = [
    { emoji: '🦁', name: 'Lion', category: 'Hewan' },
    { emoji: '🍕', name: 'Pizza', category: 'Makanan' },
    { emoji: '⚽', name: 'Soccer', category: 'Olahraga' },
    { emoji: '🏴', name: 'Flag', category: 'Bendera' },
    { emoji: '🐶', name: 'Dog', category: 'Hewan' },
    { emoji: '🍔', name: 'Burger', category: 'Makanan' },
    { emoji: '🏀', name: 'Basketball', category: 'Olahraga' },
    { emoji: '🇮🇩', name: 'Indonesia', category: 'Bendera' },
    { emoji: '🐱', name: 'Cat', category: 'Hewan' },
    { emoji: '🍣', name: 'Sushi', category: 'Makanan' },
    { emoji: '🎾', name: 'Tennis', category: 'Olahraga' },
    { emoji: '🏁', name: 'Racing Flag', category: 'Bendera' },
    { emoji: '🐘', name: 'Elephant', category: 'Hewan' },
    { emoji: '🍜', name: 'Ramen', category: 'Makanan' },
    { emoji: '🏈', name: 'Football', category: 'Olahraga' },
    { emoji: '🚩', name: 'Red Flag', category: 'Bendera' },
    { emoji: '🦊', name: 'Fox', category: 'Hewan' },
    { emoji: '🍦', name: 'Ice Cream', category: 'Makanan' },
    { emoji: '⚾', name: 'Baseball', category: 'Olahraga' },
    { emoji: '🏳️', name: 'White Flag', category: 'Bendera' },
    { emoji: '🐼', name: 'Panda', category: 'Hewan' },
    { emoji: '🍰', name: 'Cake', category: 'Makanan' },
    { emoji: '🏐', name: 'Volleyball', category: 'Olahraga' },
    { emoji: '🇺🇸', name: 'USA', category: 'Bendera' },
    { emoji: '🦋', name: 'Butterfly', category: 'Hewan' },
    { emoji: '🌮', name: 'Taco', category: 'Makanan' },
    { emoji: '🎳', name: 'Bowling', category: 'Olahraga' },
    { emoji: '🇯🇵', name: 'Japan', category: 'Bendera' },
    { emoji: '🐝', name: 'Bee', category: 'Hewan' },
    { emoji: '🍩', name: 'Donut', category: 'Makanan' },
    { emoji: '🏊', name: 'Swimming', category: 'Olahraga' },
    { emoji: '🇬🇧', name: 'UK', category: 'Bendera' },
    { emoji: '🦅', name: 'Eagle', category: 'Hewan' },
    { emoji: '🍇', name: 'Grapes', category: 'Makanan' },
    { emoji: '🏋️', name: 'Weightlifting', category: 'Olahraga' },
    { emoji: '🇫🇷', name: 'France', category: 'Bendera' },
    { emoji: '🐢', name: 'Turtle', category: 'Hewan' },
    { emoji: '🍉', name: 'Watermelon', category: 'Makanan' },
    { emoji: '🎿', name: 'Skiing', category: 'Olahraga' },
    { emoji: '🇮🇹', name: 'Italy', category: 'Bendera' },
  ];

  // Categorized emojis for Scenario B
  const categorizedEmojis = {
    Makanan: [
      { emoji: '🍕', name: 'Pizza' },
      { emoji: '🍔', name: 'Burger' },
      { emoji: '🍣', name: 'Sushi' },
      { emoji: '🍜', name: 'Ramen' },
      { emoji: '🍦', name: 'Ice Cream' },
      { emoji: '🍰', name: 'Cake' },
      { emoji: '🌮', name: 'Taco' },
      { emoji: '🍩', name: 'Donut' },
    ],
    Hewan: [
      { emoji: '🦁', name: 'Lion' },
      { emoji: '🐶', name: 'Dog' },
      { emoji: '🐱', name: 'Cat' },
      { emoji: '🐘', name: 'Elephant' },
      { emoji: '🦊', name: 'Fox' },
      { emoji: '🐼', name: 'Panda' },
      { emoji: '🦋', name: 'Butterfly' },
      { emoji: '🐝', name: 'Bee' },
    ],
    Olahraga: [
      { emoji: '⚽', name: 'Soccer' },
      { emoji: '🏀', name: 'Basketball' },
      { emoji: '🎾', name: 'Tennis' },
      { emoji: '🏈', name: 'Football' },
      { emoji: '⚾', name: 'Baseball' },
      { emoji: '🏐', name: 'Volleyball' },
      { emoji: '🎳', name: 'Bowling' },
      { emoji: '🏊', name: 'Swimming' },
    ],
    Bendera: [
      { emoji: '🏴', name: 'Flag' },
      { emoji: '🇮🇩', name: 'Indonesia' },
      { emoji: '🏁', name: 'Racing Flag' },
      { emoji: '🚩', name: 'Red Flag' },
      { emoji: '🏳️', name: 'White Flag' },
      { emoji: '🇺🇸', name: 'USA' },
      { emoji: '🇯🇵', name: 'Japan' },
      { emoji: '🇬🇧', name: 'UK' },
    ],
  };

  // FIXED: Added scenario to dependencies to trigger fade-in when switching A→B
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase, category, scenario]);

  const startScenario = (scenarioType) => {
    setScenario(scenarioType);
    setCategory(null); // FIXED: Explicitly reset category
    setStartTime(Date.now());
    fadeAnim.setValue(0);
    setPhase('task');
  };

  const handleEmojiSelect = (emojiItem) => {
    const decisionTime = Date.now() - startTime;
    const isCorrect = emojiItem.emoji === TARGET_EMOJI;

    if (scenario === 'A') {
      setDecisionTimeA(decisionTime);
      setSelectedEmojiA({ ...emojiItem, isCorrect });
      fadeAnim.setValue(0);
      setTimeout(() => startScenario('B'), 500);
    } else {
      setDecisionTimeB(decisionTime);
      setSelectedEmojiB({ ...emojiItem, isCorrect });
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 500);
    }
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    // Don't reset fade animation - keep it visible
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🔍 Hick's Law - The Emoji Hunt
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan mencari emoji 2 kali dengan cara berbeda:{'\n'}
          {'\n'}😵 <Text style={{ fontWeight: '600' }}>Skenario 1: 40 emoji campur aduk</Text>
          {'\n'}✨ <Text style={{ fontWeight: '600' }}>Skenario 2: Pilih Kategori → 8 emoji</Text>
          {'\n'}⏱️ Waktu pencarian Anda akan diukur
          {'\n'}{'\n'}
          <Text style={{ fontWeight: '700', fontSize: 18 }}>🎯 Target: Temukan EMOJI PIZZA {TARGET_EMOJI}</Text>
          {'\n'}{'\n'}
          💡 Hipotesis: Kategorisasi membuat pencarian lebih cepat!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startScenario('A')}
        >
          <Text style={styles.startButtonText}>Mulai The Emoji Hunt</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Task Phase - Scenario A (Choice Overload - All 40 emojis)
  if (phase === 'task' && scenario === 'A') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim, flex: 1 }]}>
        <View style={[styles.taskHeader, { backgroundColor: '#FEE2E2', padding: 12, borderRadius: 12, marginBottom: 16 }]}>
          <Text style={[styles.scenarioTitle, { color: '#991B1B', fontWeight: '700', textAlign: 'center' }]}>
            😵 Skenario 1: Choice Overload
          </Text>
          <Text style={[styles.taskText, { color: '#DC2626', fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 8 }]}>
            Temukan: {TARGET_EMOJI} PIZZA
          </Text>
        </View>

        {/* All 40 emojis in chaotic grid - FIXED: Added minHeight */}
        <ScrollView style={{ flex: 1, minHeight: 400 }} showsVerticalScrollIndicator={false}>
          <View style={styles.emojiGrid}>
            {allEmojis.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.emojiCard, { 
                  backgroundColor: '#FFFFFF',
                  borderWidth: 2,
                  borderColor: '#E5E7EB',
                }]}
                onPress={() => handleEmojiSelect(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.emojiLarge}>{item.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.hintBox, { backgroundColor: colors.accentSubtle, padding: 12, borderRadius: 8, marginTop: 12 }]}>
          <Text style={[styles.hintText, { color: colors.accent, fontWeight: '600', textAlign: 'center' }]}>
            ⚡ Tap emoji Pizza secepat mungkin!
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Task Phase - Scenario B (Categorized) - FIXED: Proper layout and state
  if (phase === 'task' && scenario === 'B') {
    if (!category) {
      // Show categories - FIXED: Added flex and minHeight to prevent collapse
      return (
        <Animated.View style={[styles.simContainer, { opacity: fadeAnim, flex: 1, minHeight: 500 }]}>
          <View style={[styles.taskHeader, { backgroundColor: '#DCFCE7', padding: 12, borderRadius: 12, marginBottom: 16 }]}>
            <Text style={[styles.scenarioTitle, { color: '#166534', fontWeight: '700', textAlign: 'center' }]}>
              ✨ Skenario 2: Categorized
            </Text>
            <Text style={[styles.taskText, { color: '#15803D', fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 8 }]}>
              Temukan: {TARGET_EMOJI} PIZZA
            </Text>
          </View>

          {/* Category buttons - FIXED: Force visible rendering */}
          <View style={[styles.categoryGrid, { minHeight: 300 }]}>
            {Object.keys(categorizedEmojis).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryCard, { 
                  backgroundColor: '#FFFFFF',
                  borderWidth: 3,
                  borderColor: colors.accent,
                  minHeight: 120,
                }]}
                onPress={() => handleCategorySelect(cat)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryEmoji}>
                  {cat === 'Makanan' ? '🍕' :
                   cat === 'Hewan' ? '🦁' :
                   cat === 'Olahraga' ? '⚽' : '🏴'}
                </Text>
                <Text style={[styles.categoryName, { color: '#1F2937', fontWeight: '700', fontSize: 18 }]}>
                  {cat}
                </Text>
                <Text style={[styles.categoryCount, { color: '#6B7280', fontWeight: '600' }]}>
                  {categorizedEmojis[cat].length} emojis
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.hintBox, { backgroundColor: '#FEF3C7', padding: 12, borderRadius: 8, marginTop: 16 }]}>
            <Text style={[styles.hintText, { color: '#92400E', fontWeight: '600', textAlign: 'center' }]}>
              💡 Pilih kategori yang tepat terlebih dahulu
            </Text>
          </View>
        </Animated.View>
      );
    } else {
      // Show emojis in selected category - FIXED: Added proper layout
      return (
        <Animated.View style={[styles.simContainer, { opacity: fadeAnim, flex: 1, minHeight: 500 }]}>
          <View style={[styles.taskHeader, { backgroundColor: '#FEF3C7', padding: 12, borderRadius: 12, marginBottom: 16 }]}>
            <Text style={[styles.scenarioTitle, { color: '#92400E', fontWeight: '700', textAlign: 'center' }]}>
              📂 Kategori: {category}
            </Text>
            <Text style={[styles.taskText, { color: '#D97706', fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 8 }]}>
              Temukan: {TARGET_EMOJI} PIZZA
            </Text>
          </View>

          {/* Emojis in category */}
          <View style={[styles.emojiGrid, { minHeight: 300 }]}>
            {categorizedEmojis[category].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.emojiCard, { 
                  backgroundColor: '#FFFFFF',
                  borderWidth: 2,
                  borderColor: '#E5E7EB',
                }]}
                onPress={() => handleEmojiSelect(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.emojiLarge}>{item.emoji}</Text>
                <Text style={[styles.emojiName, { color: '#6B7280', fontSize: 11 }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.backButton, { 
              backgroundColor: '#F3F4F6',
              borderWidth: 2,
              borderColor: '#D1D5DB',
              marginTop: 16,
            }]}
            onPress={() => handleCategorySelect(null)}
          >
            <Ionicons name="arrow-back" size={16} color="#4B5563" />
            <Text style={[styles.backButtonText, { color: '#4B5563', fontWeight: '600' }]}>
              Kembali ke Kategori
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    }
  }

  // Result Phase
  if (phase === 'result') {
    const timeDiff = decisionTimeA - decisionTimeB;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi
        </Text>
        
        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.surface }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Skenario 1{'\n'}(40 choices)
              </Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {(decisionTimeA / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Decision Time
              </Text>
              <View style={styles.accuracyIndicator}>
                <Ionicons 
                  name={selectedEmojiA?.isCorrect ? 'checkmark-circle' : 'close-circle'} 
                  size={24} 
                  color={selectedEmojiA?.isCorrect ? '#22C55E' : '#EF4444'} 
                />
                <Text style={[
                  styles.accuracyText,
                  { color: selectedEmojiA?.isCorrect ? '#22C55E' : '#EF4444' }
                ]}>
                  {selectedEmojiA?.isCorrect ? '✓ Correct' : '✗ Wrong'}
                </Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Skenario 2{'\n'}(Categorized)
              </Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                {(decisionTimeB / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Decision Time
              </Text>
              <View style={styles.accuracyIndicator}>
                <Ionicons 
                  name={selectedEmojiB?.isCorrect ? 'checkmark-circle' : 'close-circle'} 
                  size={24} 
                  color={selectedEmojiB?.isCorrect ? '#22C55E' : '#EF4444'} 
                />
                <Text style={[
                  styles.accuracyText,
                  { color: selectedEmojiB?.isCorrect ? '#22C55E' : '#EF4444' }
                ]}>
                  {selectedEmojiB?.isCorrect ? '✓ Correct' : '✗ Wrong'}
                </Text>
              </View>
            </View>
          </View>
          
          {timeDiff > 0 && (
            <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
              <Text style={[styles.comparisonText, { color: colors.accent }]}>
                ⚡ {(Math.abs(timeDiff) / 1000).toFixed(2)}s lebih cepat dengan kategorisasi!
              </Text>
              {selectedEmojiB?.isCorrect && !selectedEmojiA?.isCorrect && (
                <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
                  Dan lebih akurat!
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🔍 Hick's Law (Hick-Hyman, 1952)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>Waktu keputusan meningkat logarithmically dengan jumlah pilihan.</Text> Semakin banyak opsi, semakin lama user berpikir!{'\n'}
            {'\n'}<Text style={{ fontWeight: '600' }}>Formula:</Text> RT = a + b × log₂(n){'\n'}
            RT = Reaction Time, n = jumlah choices{'\n'}
            {'\n'}💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Jangan tampilkan terlalu banyak opsi sekaligus! Gunakan kategorisasi, filters, progressive disclosure, atau search. Contoh: Amazon categories, Netflix genres, Spotify playlists. Breaking choices into smaller chunks = faster decisions dan reduced cognitive load!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Fitts's Law Simulation - Dynamic Bubble Game
const FittsLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, round1, round2, result
  const [round, setRound] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [lastTapPosition, setLastTapPosition] = useState({ x: 0, y: 0 });
  const [lastTapTime, setLastTapTime] = useState(0);
  const [movementTimes, setMovementTimes] = useState({ round1: [], round2: [] });
  const [errors, setErrors] = useState({ round1: 0, round2: 0 });
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0))[0];
  const positionAnim = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const ROUND1_SIZE = 30; // Small targets
  const ROUND2_SIZE = 80; // Large targets
  const GAME_WIDTH = SCREEN_WIDTH - 80;
  const GAME_HEIGHT = 400;
  const TAPS_PER_ROUND = 10;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [phase]);

  const generateRandomPosition = (size, preferEdges = false) => {
    const margin = size / 2 + 10;
    const maxX = GAME_WIDTH - size;
    const maxY = GAME_HEIGHT - size;

    if (preferEdges) {
      // Round 1: Prefer positions near edges (far from center)
      const edge = Math.floor(Math.random() * 4);
      switch (edge) {
        case 0: return { x: margin, y: Math.random() * maxY };
        case 1: return { x: maxX - margin, y: Math.random() * maxY };
        case 2: return { x: Math.random() * maxX, y: margin };
        default: return { x: Math.random() * maxX, y: maxY - margin };
      }
    } else {
      // Round 2: Closer to center
      const centerX = GAME_WIDTH / 2;
      const centerY = GAME_HEIGHT / 2;
      const range = 80;
      return {
        x: centerX + (Math.random() - 0.5) * range,
        y: centerY + (Math.random() - 0.5) * range,
      };
    }
  };

  const startRound = (roundNum) => {
    setRound(roundNum);
    setTapCount(0);
    scaleAnim.setValue(0);
    fadeAnim.setValue(0);
    
    const preferEdges = roundNum === 1;
    const size = roundNum === 1 ? ROUND1_SIZE : ROUND2_SIZE;
    const initialPos = generateRandomPosition(size, preferEdges);
    
    setTargetPosition(initialPos);
    setLastTapPosition(initialPos);
    setLastTapTime(Date.now());
    setPhase(`round${roundNum}`);
  };

  const calculateDistance = (pos1, pos2) => {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateFittsID = (distance, width) => {
    // Fitts' Index of Difficulty: ID = log2(D/W + 1)
    return Math.log2(distance / width + 1);
  };

  const handleTap = (event, targetSize) => {
    const now = Date.now();
    const movementTime = now - lastTapTime;
    const tapX = event.nativeEvent.locationX;
    const tapY = event.nativeEvent.locationY;

    // Check if tap is inside target
    const centerX = targetSize / 2;
    const centerY = targetSize / 2;
    const distance = Math.sqrt(
      Math.pow(tapX - centerX, 2) + Math.pow(tapY - centerY, 2)
    );
    const isHit = distance <= targetSize / 2;

    if (!isHit) {
      // Error: missed target
      const roundKey = `round${round}`;
      setErrors(prev => ({ ...prev, [roundKey]: prev[roundKey] + 1 }));
      return;
    }

    // Calculate movement distance from last tap
    const movementDistance = calculateDistance(
      lastTapPosition,
      { x: tapX, y: tapY }
    );

    // Record movement time
    const roundKey = `round${round}`;
    setMovementTimes(prev => ({
      ...prev,
      [roundKey]: [...prev[roundKey], movementTime],
    }));

    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount >= TAPS_PER_ROUND) {
      // Round complete
      if (round === 1) {
        setTimeout(() => startRound(2), 500);
      } else {
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('result');
        }, 500);
      }
    } else {
      // Generate next target position
      const preferEdges = round === 1;
      const size = round === 1 ? ROUND1_SIZE : ROUND2_SIZE;
      const newPos = generateRandomPosition(size, preferEdges);
      
      // Animate target to new position
      scaleAnim.setValue(0);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      setTargetPosition(newPos);
      setLastTapPosition({ x: tapX, y: tapY });
      setLastTapTime(now);
    }
  };

  const calculateMetrics = (roundData) => {
    if (roundData.length === 0) return { avgTime: 0, minTime: 0, maxTime: 0 };
    
    // Skip first tap (no movement time)
    const times = roundData.slice(1);
    const sum = times.reduce((acc, t) => acc + t, 0);
    const avgTime = times.length > 0 ? sum / times.length : 0;
    const minTime = times.length > 0 ? Math.min(...times) : 0;
    const maxTime = times.length > 0 ? Math.max(...times) : 0;
    
    return { avgTime, minTime, maxTime };
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🎯 Fitts's Law Game
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Tap bubble yang muncul 10 kali secara berturut-turut:{'\n'}
          {'\n'}📍 <Text style={{ fontWeight: '600' }}>Round 1: Target kecil di tepi</Text>
          {'\n'}📍 <Text style={{ fontWeight: '600' }}>Round 2: Target besar di tengah</Text>
          {'\n'}⏱️ Kecepatan dan akurasi Anda akan diukur
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startRound(1)}
        >
          <Text style={styles.startButtonText}>Mulai Game</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Round Phase
  if (phase === 'round1' || phase === 'round2') {
    const targetSize = round === 1 ? ROUND1_SIZE : ROUND2_SIZE;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Round {round} of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          Tap bubble: {tapCount}/{TAPS_PER_ROUND}
        </Text>

        {/* Game Area */}
        <View style={[styles.gameArea, { backgroundColor: colors.surface }]}>
          <View style={styles.gameGrid}>
            {/* Animated Target Bubble */}
            <Animated.View
              style={[
                styles.targetBubble,
                {
                  width: targetSize,
                  height: targetSize,
                  borderRadius: targetSize / 2,
                  backgroundColor: colors.accent,
                  position: 'absolute',
                  left: targetPosition.x,
                  top: targetPosition.y,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.bubbleTouchArea}
                onPress={(e) => handleTap(e, targetSize)}
                activeOpacity={0.7}
              >
                <Text style={styles.bubbleText}>
                  {tapCount + 1}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* Round Info */}
        <View style={[styles.roundInfo, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.roundInfoText, { color: colors.accent }]}>
            {round === 1 ? '🎯 Target Kecil (30px) - Tepi' : '🎯 Target Besar (80px) - Tengah'}
          </Text>
          <Text style={[styles.roundSubtext, { color: colors.textSecondary }]}>
            Errors: {errors[`round${round}`]}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const metrics1 = calculateMetrics(movementTimes.round1);
    const metrics2 = calculateMetrics(movementTimes.round2);
    
    // Calculate average distances and Fitts' Index
    const avgDistance1 = 150; // Approximate for edge targets
    const avgDistance2 = 80; // Approximate for center targets
    const fittsID1 = calculateFittsID(avgDistance1, ROUND1_SIZE);
    const fittsID2 = calculateFittsID(avgDistance2, ROUND2_SIZE);
    const fittsIP1 = metrics1.avgTime > 0 ? (fittsID1 / (metrics1.avgTime / 1000)).toFixed(2) : 0;
    const fittsIP2 = metrics2.avgTime > 0 ? (fittsID2 / (metrics2.avgTime / 1000)).toFixed(2) : 0;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Game
        </Text>
        
        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.surface }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Round 1{'\n'}(Small/Far)
              </Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {metrics1.avgTime.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Avg Time
              </Text>
              <Text style={[styles.statValue, { color: '#EF4444', marginTop: 8, fontSize: 16 }]}>
                {errors.round1}
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Errors
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Round 2{'\n'}(Large/Close)
              </Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                {metrics2.avgTime.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Avg Time
              </Text>
              <Text style={[styles.statValue, { color: '#22C55E', marginTop: 8, fontSize: 16 }]}>
                {errors.round2}
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Errors
              </Text>
            </View>
          </View>
          
          <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
            <Text style={[styles.comparisonText, { color: colors.accent }]}>
              ⚡ {(metrics1.avgTime - metrics2.avgTime).toFixed(0)}ms lebih cepat!
            </Text>
            <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
              {errors.round1 - errors.round2} error lebih sedikit
            </Text>
          </View>

          {/* Fitts' Index of Performance */}
          <View style={styles.fittsMetrics}>
            <Text style={[styles.fittsTitle, { color: colors.textPrimary }]}>
              📐 Fitts' Index of Performance
            </Text>
            <View style={styles.fittsRow}>
              <View style={styles.fittsItem}>
                <Text style={[styles.fittsLabel, { color: colors.textSecondary }]}>Round 1</Text>
                <Text style={[styles.fittsValue, { color: colors.textPrimary }]}>
                  {fittsIP1} bits/s
                </Text>
              </View>
              <View style={styles.fittsItem}>
                <Text style={[styles.fittsLabel, { color: colors.textSecondary }]}>Round 2</Text>
                <Text style={[styles.fittsValue, { color: colors.accent }]}>
                  {fittsIP2} bits/s
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎯 Fitts's Law
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Waktu untuk mencapai target bergantung pada jarak (D) dan ukuran (W). Target yang lebih besar dan lebih dekat = lebih cepat dan akurat!{'\n'}
            {'\n'}Formula: MT = a + b × log₂(D/W + 1)
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Miller's Law / Chunking Simulation
const ChunkingSimulation = ({ colors, onComplete }) => {
  const [step, setStep] = useState(0);

  const numbers = {
    unchunked: '085712345678',
    chunked: '0857-1234-5678',
  };

  return (
    <View style={styles.simContainer}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
        Mana yang Lebih Mudah Diingat?
      </Text>

      <View style={[styles.chunkCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.chunkLabel, { color: colors.textSecondary }]}>
          Tanpa Pemisah:
        </Text>
        <Text style={[styles.chunkNumber, { color: colors.textPrimary }]}>
          {numbers.unchunked}
        </Text>
      </View>

      <View style={[styles.chunkCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.chunkLabel, { color: colors.textSecondary }]}>
          Dengan Chunk:
        </Text>
        <Text style={[styles.chunkNumber, { color: colors.accent }]}>
          {numbers.chunked}
        </Text>
      </View>

      <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
        <Text style={[styles.resultText, { color: colors.accent }]}>
          📱 Chunking membuat informasi lebih mudah diingat!
        </Text>
        <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
          Miller's Law: Manusia hanya bisa mengingat 7±2 item. Memecah informasi menjadi chunk membantu memori.
        </Text>
        <TouchableOpacity
          style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
          onPress={onComplete}
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFF" />
          <Text style={styles.completeBtnText}>Selesai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Goal Gradient Effect Simulation (Refactored with Analytics)
const GoalGradientSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [scenario, setScenario] = useState(null);
  const [step, setStep] = useState(0);
  const [tapTimes, setTapTimes] = useState([]);
  const [scenarioATimes, setScenarioATimes] = useState([]);
  const [scenarioBTimes, setScenarioBTimes] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const progressAnim = useState(new Animated.Value(0))[0];

  const TOTAL_STEPS = 10; // Actual work to do
  const SCENARIO_A_START = 0; // Start from 0%
  const SCENARIO_B_START = 3; // Start from step 3 of 12 (25%)
  const SCENARIO_B_TOTAL = 12; // Show as 12 steps total

  // FIXED: Added scenario to dependency array to trigger fade-in on scenario change
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase, scenario]);

  useEffect(() => {
    if (scenario) {
      const currentProgress = calculateProgress();
      Animated.timing(progressAnim, {
        toValue: currentProgress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [step, scenario]);

  const calculateProgress = () => {
    if (scenario === 'A') {
      return (step / TOTAL_STEPS) * 100;
    } else {
      // Scenario B: started at 3/12 (25%), now at (3+step)/12
      return ((SCENARIO_B_START + step) / SCENARIO_B_TOTAL) * 100;
    }
  };

  const startScenario = (scenarioType) => {
    setScenario(scenarioType);
    setStep(0);
    setTapTimes([Date.now()]);
    fadeAnim.setValue(0);
    progressAnim.setValue(scenarioType === 'A' ? 0 : 25);
    setPhase('wizard');
  };

  const handleNext = () => {
    const now = Date.now();
    setTapTimes(prev => [...prev, now]);
    
    const newStep = step + 1;
    setStep(newStep);

    if (newStep >= TOTAL_STEPS) {
      // Wizard complete
      if (scenario === 'A') {
        setScenarioATimes(tapTimes);
        setTimeout(() => {
          fadeAnim.setValue(0);
          setTimeout(() => startScenario('B'), 300);
        }, 500);
      } else {
        setScenarioBTimes(tapTimes);
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('result');
        }, 500);
      }
    }
  };

  const calculateIntervals = (times) => {
    const intervals = [];
    for (let i = 1; i < times.length; i++) {
      intervals.push(times[i] - times[i - 1]);
    }
    return intervals;
  };

  // Calculate speed for early stage (first 30%) vs late stage (last 30%)
  const calculateStageSpeed = (intervals) => {
    if (intervals.length < 3) return { early: 0, late: 0 };
    
    const earlyCount = Math.ceil(intervals.length * 0.3);
    const lateCount = Math.ceil(intervals.length * 0.3);
    
    const earlyStage = intervals.slice(0, earlyCount);
    const lateStage = intervals.slice(-lateCount);
    
    const earlyAvg = earlyStage.reduce((a, b) => a + b, 0) / earlyStage.length;
    const lateAvg = lateStage.reduce((a, b) => a + b, 0) / lateStage.length;
    
    return { early: earlyAvg, late: lateAvg };
  };

  const calculateAcceleration = (intervals) => {
    if (intervals.length < 2) return 0;
    
    const stages = calculateStageSpeed(intervals);
    // Negative means acceleration (faster tapping at the end)
    return stages.late - stages.early;
  };

  const calculateAverage = (arr) => {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🎯 Goal-Gradient Effect
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan menyelesaikan setup wizard 2 kali:{'\n'}
          {'\n'}📋 <Text style={{ fontWeight: '600' }}>Wizard 1: Dimulai dari 0%</Text>
          {'\n'}📋 <Text style={{ fontWeight: '600' }}>Wizard 2: Dimulai dari 25%</Text>
          {'\n'}⏱️ Kecepatan tap Anda akan diukur
          {'\n'}{'\n'}
          Tap "Next" secepat mungkin!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startScenario('A')}
        >
          <Text style={styles.startButtonText}>Mulai Wizard</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Wizard Phase
  if (phase === 'wizard') {
    const currentProgress = calculateProgress();
    const currentStepDisplay = scenario === 'A' 
      ? `${step + 1}/${TOTAL_STEPS}`
      : `${SCENARIO_B_START + step + 1}/${SCENARIO_B_TOTAL}`;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <View style={[styles.scenarioBadge, { 
          backgroundColor: scenario === 'A' ? '#F3F4F6' : '#DCFCE7',
          alignSelf: 'center',
          marginBottom: 12,
        }]}>
          <Text style={[styles.scenarioTitle, { 
            color: scenario === 'A' ? '#4B5563' : '#166534',
            fontWeight: '700',
          }]}>
            {scenario === 'A' ? 'Wizard 1 of 2' : 'Wizard 2 of 2'}
          </Text>
        </View>
        <Text style={[styles.taskText, { 
          color: colors.textPrimary || '#F3F4F6',
          fontWeight: '600',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 20,
        }]}>
          {scenario === 'B' && step === 0 && (
            <Text style={{ color: '#10B981', fontWeight: '700' }}>✓ System Check Complete{'\n'}</Text>
          )}
          Setup Step {currentStepDisplay}
        </Text>

        {/* Wizard Card - FIXED: Force light background with dark text for visibility */}
        <View style={[styles.wizardCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: colors.accent,
        }]}>
          <Ionicons name="settings-outline" size={48} color={colors.accent} />
          <Text style={[styles.wizardTitle, { color: '#1F2937' }]}>
            Configuring System
          </Text>
          <Text style={[styles.wizardDesc, { color: '#6B7280' }]}>
            Step {step + 1}: {['Network', 'Database', 'Cache', 'Security', 'Backup', 'Notifications', 'Analytics', 'API Keys', 'Storage', 'Final Check'][step]}
          </Text>

          {/* Progress Bar */}
          <View style={[styles.wizardProgress, { backgroundColor: '#E5E7EB' }]}>
            <Animated.View
              style={[
                styles.wizardProgressFill,
                {
                  backgroundColor: currentProgress >= 80 ? '#22C55E' : colors.accent,
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={[styles.wizardProgressText, { color: '#6B7280' }]}>
            {Math.round(currentProgress)}% Complete
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.wizardButton, { 
            backgroundColor: colors.accent,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.wizardButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>

        {/* Live Speed Indicator - FIXED: Force visible colors */}
        <View style={[styles.speedIndicator, { 
          backgroundColor: colors.accentSubtle || '#FEF3C7',
          borderWidth: 1,
          borderColor: colors.accent,
        }]}>
          <Text style={[styles.speedText, { color: colors.accent || '#D97706', fontWeight: '700' }]}>
            ⚡ Tap as fast as you can!
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase - Enhanced Analytics
  if (phase === 'result') {
    const intervalsA = calculateIntervals(scenarioATimes);
    const intervalsB = calculateIntervals(scenarioBTimes);
    
    const avgA = calculateAverage(intervalsA);
    const avgB = calculateAverage(intervalsB);
    
    const stagesA = calculateStageSpeed(intervalsA);
    const stagesB = calculateStageSpeed(intervalsB);
    
    const accelA = calculateAcceleration(intervalsA);
    const accelB = calculateAcceleration(intervalsB);
    
    // Calculate percentage improvement
    const percentImprovementA = stagesA.early > 0 ? ((stagesA.early - stagesA.late) / stagesA.early * 100) : 0;
    const percentImprovementB = stagesB.early > 0 ? ((stagesB.early - stagesB.late) / stagesB.early * 100) : 0;
    
    const speedImprovement = avgA - avgB;
    const accelImprovement = accelA - accelB;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Analisis Goal-Gradient
        </Text>
        
        {/* Wizard Comparison Stats */}
        <View style={[styles.statsBoard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <View style={[styles.wizardBadge, { backgroundColor: '#F3F4F6' }]}>
                <Text style={[styles.wizardBadgeText, { color: '#6B7280' }]}>Wizard 1 (0%)</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.textPrimary, marginTop: 12 }]}>
                {avgA.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Avg per Tap
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <View style={[styles.wizardBadge, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.wizardBadgeText, { color: '#166534' }]}>Wizard 2 (25%)</Text>
              </View>
              <Text style={[styles.statValue, { color: '#22C55E', marginTop: 12 }]}>
                {avgB.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Avg per Tap
              </Text>
            </View>
          </View>
        </View>

        {/* Early vs Late Stage Analysis - Wizard 1 */}
        <View style={[styles.stageAnalysisCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.stageTitle, { color: colors.textPrimary }]}>
            📈 Wizard 1: Kecepatan Awal vs Akhir
          </Text>
          
          <View style={styles.stageComparison}>
            <View style={styles.stageItem}>
              <Text style={[styles.stageLabel, { color: colors.textSecondary }]}>Kecepatan Awal</Text>
              <Text style={[styles.stageLabel, { color: colors.textSecondary, fontSize: 11 }]}>(30% pertama)</Text>
              <Text style={[styles.stageValue, { color: '#EF4444' }]}>
                {stagesA.early.toFixed(0)}ms
              </Text>
              <View style={[styles.speedBar, { width: `${Math.min((stagesA.early / 1000) * 100, 100)}%`, backgroundColor: '#EF4444' }]} />
            </View>
            <Ionicons name="arrow-forward" size={24} color={colors.accent} />
            <View style={styles.stageItem}>
              <Text style={[styles.stageLabel, { color: colors.textSecondary }]}>Kecepatan Akhir</Text>
              <Text style={[styles.stageLabel, { color: colors.textSecondary, fontSize: 11 }]}>(30% terakhir)</Text>
              <Text style={[styles.stageValue, { color: accelA < 0 ? '#22C55E' : '#EF4444' }]}>
                {stagesA.late.toFixed(0)}ms
              </Text>
              <View style={[styles.speedBar, { width: `${Math.min((stagesA.late / 1000) * 100, 100)}%`, backgroundColor: accelA < 0 ? '#22C55E' : '#EF4444' }]} />
            </View>
          </View>
          
          {accelA < 0 && (
            <View style={[styles.improvementBadge, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
              <Ionicons name="trending-up" size={20} color="#22C55E" />
              <Text style={[styles.improvementText, { color: '#166534' }]}>
                ✓ Terbukti! Kamu mengetuk {percentImprovementA.toFixed(1)}% lebih cepat saat mendekati target!
              </Text>
            </View>
          )}
        </View>

        {/* Early vs Late Stage Analysis - Wizard 2 */}
        <View style={[styles.stageAnalysisCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.stageTitle, { color: colors.textPrimary }]}>
            📈 Wizard 2: Kecepatan Awal vs Akhir
          </Text>
          
          <View style={styles.stageComparison}>
            <View style={styles.stageItem}>
              <Text style={[styles.stageLabel, { color: colors.textSecondary }]}>Kecepatan Awal</Text>
              <Text style={[styles.stageLabel, { color: colors.textSecondary, fontSize: 11 }]}>(30% pertama)</Text>
              <Text style={[styles.stageValue, { color: '#EF4444' }]}>
                {stagesB.early.toFixed(0)}ms
              </Text>
              <View style={[styles.speedBar, { width: `${Math.min((stagesB.early / 1000) * 100, 100)}%`, backgroundColor: '#EF4444' }]} />
            </View>
            <Ionicons name="arrow-forward" size={24} color={colors.accent} />
            <View style={styles.stageItem}>
              <Text style={[styles.stageLabel, { color: colors.textSecondary }]}>Kecepatan Akhir</Text>
              <Text style={[styles.stageLabel, { color: colors.textSecondary, fontSize: 11 }]}>(30% terakhir)</Text>
              <Text style={[styles.stageValue, { color: accelB < 0 ? '#22C55E' : '#EF4444' }]}>
                {stagesB.late.toFixed(0)}ms
              </Text>
              <View style={[styles.speedBar, { width: `${Math.min((stagesB.late / 1000) * 100, 100)}%`, backgroundColor: accelB < 0 ? '#22C55E' : '#EF4444' }]} />
            </View>
          </View>
          
          {accelB < 0 && (
            <View style={[styles.improvementBadge, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
              <Ionicons name="trending-up" size={20} color="#22C55E" />
              <Text style={[styles.improvementText, { color: '#166534' }]}>
                ✓ Terbukti! Kamu mengetuk {percentImprovementB.toFixed(1)}% lebih cepat saat mendekati target!
              </Text>
            </View>
          )}
        </View>

        {/* Comparison Highlight */}
        {speedImprovement > 0 && (
          <View style={[styles.comparisonHighlight, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
            <Ionicons name="rocket-outline" size={28} color="#D97706" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.comparisonTitle, { color: '#92400E' }]}>
                🎯 Goal-Gradient Effect Confirmed!
              </Text>
              <Text style={[styles.comparisonDesc, { color: '#B45309' }]}>
                Wizard 2 (artificial progress 25%) membuat kamu {Math.abs(speedImprovement).toFixed(0)}ms lebih cepat rata-rata! Artificial progress meningkatkan motivasi karena pengguna merasa lebih dekat dengan tujuan.
              </Text>
            </View>
          </View>
        )}

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎯 Goal-Gradient Effect (Clark Hull, 1932)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Orang cenderung <Text style={{ fontWeight: '700' }}>mempercepat usaha mereka</Text> saat mendekati tujuan! Ini terbukti dari data Anda:{'\n'}
            {accelA < 0 && `\n✓ Wizard 1: ${percentImprovementA.toFixed(1)}% lebih cepat di tahap akhir`}
            {accelB < 0 && `\n✓ Wizard 2: ${percentImprovementB.toFixed(1)}% lebih cepat di tahap akhir`}
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan "artificial progress" (progress bar yang sudah ter-isi sebagian) untuk motivasi user. Contoh: LinkedIn "Profile 40% complete", Starbucks loyalty card dengan stamps awal gratis, onboarding "Step 3 of 10" padahal baru step 1. User termotivasi menyelesaikan karena merasa sudah invest effort!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Doherty Threshold Simulation - Image Gallery (Refactored)
const DohertyThresholdSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [rageTapsA, setRageTapsA] = useState(0);
  const [rageTapsB, setRageTapsB] = useState(0);
  const [ratingA, setRatingA] = useState(0);
  const [ratingB, setRatingB] = useState(0);
  const [isLoadingA, setIsLoadingA] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [showImagesA, setShowImagesA] = useState(false);
  const [showImagesB, setShowImagesB] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingStep, setLoadingStep] = useState(1);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const shimmerAnim = useState(new Animated.Value(0))[0];
  const spinAnim = useState(new Animated.Value(0))[0];

  // Shimmer animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Spinning animation for laggy loader
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const imageUrls = [
    '🌄', '🏖️', '🌅', '🏔️', '🌊',
    '🌺', '🌸', '🌻', '🌹', '🌷',
    '🦋', '🐝', '🐞', '🦗', '🐛',
    '🍎', '🍊', '🍋', '🍌', '🍉',
  ];

  const startScenarioA = () => {
    setRageTapsA(0);
    setShowImagesA(false);
    setSelectedImage(null);
    setLoadingStep(1);
    fadeAnim.setValue(0);
    setPhase('scenarioA');
  };

  const startScenarioB = () => {
    setRageTapsB(0);
    setShowImagesB(false);
    setSelectedImage(null);
    fadeAnim.setValue(0);
    setPhase('scenarioB');
  };

  // Scenario A: Unresponsive (Longer freeze with fake status)
  const loadGalleryA = () => {
    setIsLoadingA(true);
    setShowImagesA(false);
    setLoadingStep(1);
    
    // Step 1: Show "Processing 1 of 2" for 2 seconds
    setTimeout(() => {
      setLoadingStep(2);
      // Step 2: Show "Processing 2 of 2" for another 2 seconds
      setTimeout(() => {
        setShowImagesA(true);
        setIsLoadingA(false);
      }, 2000);
    }, 2000);
  };

  const handleRageTapA = () => {
    if (isLoadingA && !showImagesA) {
      setRageTapsA(prev => prev + 1);
    }
  };

  const handleImageSelectA = (index) => {
    if (index === 4 && showImagesA) { // 5th image (0-indexed)
      setSelectedImage(index);
      setTimeout(() => {
        fadeAnim.setValue(0);
        setPhase('ratingA');
      }, 300);
    }
  };

  // Scenario B: Responsive (Skeleton) - Same duration but with immediate feedback
  const loadGalleryB = () => {
    setIsLoadingB(true);
    setShowImagesB(false);
    // Show skeleton immediately, load after same 4s delay (same as Scenario A!)
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowImagesB(true);
      setIsLoadingB(false);
    }, 4000);
  };

  const handleRageTapB = () => {
    if (isLoadingB && !showImagesB) {
      setRageTapsB(prev => prev + 1);
    }
  };

  const handleImageSelectB = (index) => {
    if (index === 4 && showImagesB) {
      setSelectedImage(index);
      setTimeout(() => {
        fadeAnim.setValue(0);
        setPhase('ratingB');
      }, 300);
    }
  };

  const handleRating = (rating, scenario) => {
    if (scenario === 'ratingA') {
      setRatingA(rating);
      fadeAnim.setValue(0);
      setTimeout(() => startScenarioB(), 300);
    } else {
      setRatingB(rating);
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 300);
    }
  };

  // Intro Phase - FIXED: Neutral, task-focused copy (no bias)
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📸 Upload Gambar ke Galeri
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan menguji 2 sistem upload gambar yang berbeda. Lakukan tugas berikut di setiap sistem:{'\n'}
          {'\n'}📤 <Text style={{ fontWeight: '600' }}>Tugas:</Text>
          {'\n'}1. Tap tombol "Load Gallery" untuk membuka galeri
          {'\n'}2. Tap gambar ke-5 untuk memilihnya
          {'\n'}3. Berikan penilaian pengalaman Anda{'\n'}
          {'\n'}💡 <Text style={{ fontWeight: '600' }}>Tip:</Text> Fokus pada pengalaman Anda saat menggunakan sistem - apakah terasa responsif atau lambat?
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Upload</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A: Unresponsive System (Laggy) - FIXED: Neutral labels
  if (phase === 'scenarioA') {
    const spin = spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <TouchableWithoutFeedback onPress={handleRageTapA}>
        <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
            Upload System A
          </Text>
          <Text style={[styles.taskText, { color: colors.textPrimary }]}>
            📤 Buka galeri dan pilih gambar ke-5
          </Text>

          {/* Load Button */}
          {!isLoadingA && !showImagesA && (
            <TouchableOpacity
              style={[styles.loadButton, { backgroundColor: colors.accent }]}
              onPress={loadGalleryA}
            >
              <Text style={styles.loadButtonText}>Load Gallery</Text>
              <Ionicons name="images" size={20} color="#FFF" />
            </TouchableOpacity>
          )}

          {/* FIXED: Realistic loading with annoying status messages */}
          {isLoadingA && !showImagesA && (
            <View style={styles.laggyLoadingContainer}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Ionicons name="sync-outline" size={48} color="#F59E0B" />
              </Animated.View>
              <Text style={[styles.laggyLoadingText, { color: colors.textPrimary }]}>
                Memuat Galeri...
              </Text>
              <View style={[styles.laggyStatusBox, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
                <Ionicons name="hourglass-outline" size={20} color="#D97706" />
                <Text style={[styles.laggyStatusText, { color: '#92400E' }]}>
                  Memproses data ({loadingStep} dari 2)...
                </Text>
              </View>
              <View style={[styles.laggyHintBox, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
                <Ionicons name="information-circle-outline" size={18} color="#DC2626" />
                <Text style={[styles.laggyHintText, { color: '#991B1B' }]}>
                  Mohon tunggu, proses mungkin memakan waktu
                </Text>
              </View>
            </View>
          )}

          {/* Loaded Images */}
          {showImagesA && (
            <View style={styles.imageGrid}>
              {imageUrls.slice(0, 20).map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageCard,
                    { backgroundColor: colors.surface },
                    selectedImage === index && { borderColor: colors.accent, borderWidth: 3 }
                  ]}
                  onPress={() => handleImageSelectA(index)}
                >
                  <Text style={styles.imageEmoji}>{emoji}</Text>
                  <Text style={[styles.imageNumber, { color: colors.textSecondary }]}>
                    #{index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* REMOVED: Rage Tap Counter (hidden to avoid gamification bias) */}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  // Rating Phase A - Star Rating System - FIXED: Neutral copy
  if (phase === 'ratingA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          ⭐ Nilai Pengalaman Anda
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary, marginBottom: 32 }]}>
          Bagaimana sistem upload terasa saat Anda menggunakannya?
        </Text>
        
        {/* Star Rating */}
        <View style={styles.starRatingContainer}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star, 'ratingA')}
                style={styles.starButton}
              >
                <Ionicons 
                  name="star" 
                  size={52} 
                  color={star <= ratingA ? '#FCD34D' : '#D1D5DB'} 
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Labels - FIXED: Neutral language */}
          <View style={styles.starLabelsRow}>
            <View style={styles.starLabelLeft}>
              <Ionicons name="sad-outline" size={20} color="#EF4444" />
              <Text style={[styles.starLabelText, { color: '#EF4444' }]}>
                Sangat Lambat
              </Text>
            </View>
            <View style={styles.starLabelRight}>
              <Ionicons name="happy-outline" size={20} color="#22C55E" />
              <Text style={[styles.starLabelText, { color: '#22C55E' }]}>
                Sangat Cepat
              </Text>
            </View>
          </View>
        </View>

        {/* Hint - FIXED: Neutral language */}
        <View style={[styles.instructionBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', marginTop: 24 }]}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text style={[styles.instructionText, { color: '#1E40AF' }]}>
            1 ⭐ = Sangat Lambat | 5 ⭐ = Sangat Cepat
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Scenario B: Responsive System with Skeleton (Snappy) - FIXED: Neutral labels
  if (phase === 'scenarioB') {
    const shimmerTranslate = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 100],
    });

    return (
      <TouchableWithoutFeedback onPress={handleRageTapB}>
        <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
            Upload System B
          </Text>
          <Text style={[styles.taskText, { color: colors.textPrimary }]}>
            📤 Buka galeri dan pilih gambar ke-5
          </Text>

          {/* Load Button */}
          {!isLoadingB && !showImagesB && (
            <TouchableOpacity
              style={[styles.loadButton, { backgroundColor: colors.accent }]}
              onPress={loadGalleryB}
            >
              <Text style={styles.loadButtonText}>Load Gallery</Text>
              <Ionicons name="images" size={20} color="#FFF" />
            </TouchableOpacity>
          )}

          {/* Skeleton Loaders - Immediate feedback */}
          {isLoadingB && !showImagesB && (
            <View style={styles.imageGrid}>
              {[...Array(20)].map((_, index) => (
                <View
                  key={index}
                  style={[styles.skeletonCard, { backgroundColor: colors.surface }]}
                >
                  <View style={styles.skeletonInner}>
                    <Animated.View
                      style={[
                        styles.shimmer,
                        {
                          transform: [{ translateX: shimmerTranslate }],
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Loaded Images */}
          {showImagesB && (
            <Animated.View style={[styles.imageGrid, { opacity: fadeAnim }]}>
              {imageUrls.slice(0, 20).map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageCard,
                    { backgroundColor: colors.surface },
                    selectedImage === index && { borderColor: colors.accent, borderWidth: 3 }
                  ]}
                  onPress={() => handleImageSelectB(index)}
                >
                  <Text style={styles.imageEmoji}>{emoji}</Text>
                  <Text style={[styles.imageNumber, { color: colors.textSecondary }]}>
                    #{index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          {/* REMOVED: Rage Tap Counter (hidden to avoid gamification bias) */}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  // Rating Phase B - Star Rating System - FIXED: Neutral copy
  if (phase === 'ratingB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          ⭐ Nilai Pengalaman Anda
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary, marginBottom: 32 }]}>
          Bagaimana sistem upload terasa saat Anda menggunakannya?
        </Text>
        
        {/* Star Rating */}
        <View style={styles.starRatingContainer}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star, 'ratingB')}
                style={styles.starButton}
              >
                <Ionicons 
                  name="star" 
                  size={52} 
                  color={star <= ratingB ? '#FCD34D' : '#D1D5DB'} 
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Labels - FIXED: Neutral language */}
          <View style={styles.starLabelsRow}>
            <View style={styles.starLabelLeft}>
              <Ionicons name="sad-outline" size={20} color="#EF4444" />
              <Text style={[styles.starLabelText, { color: '#EF4444' }]}>
                Sangat Lambat
              </Text>
            </View>
            <View style={styles.starLabelRight}>
              <Ionicons name="happy-outline" size={20} color="#22C55E" />
              <Text style={[styles.starLabelText, { color: '#22C55E' }]}>
                Sangat Cepat
              </Text>
            </View>
          </View>
        </View>

        {/* Hint - FIXED: Neutral language */}
        <View style={[styles.instructionBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', marginTop: 24 }]}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text style={[styles.instructionText, { color: '#1E40AF' }]}>
            1 ⭐ = Sangat Lambat | 5 ⭐ = Sangat Cepat
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const ratingDiff = ratingB - ratingA;
    const rageDiff = rageTapsA - rageTapsB;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi Doherty Threshold
        </Text>
        
        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <View style={[styles.systemBadge, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="hourglass-outline" size={20} color="#DC2626" />
                <Text style={[styles.systemBadgeText, { color: '#991B1B' }]}>Laggy (4s)</Text>
              </View>
              <Text style={[styles.statValue, { color: '#EF4444', fontSize: 32, marginTop: 12 }]}>
                😤 {rageTapsA}
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Rage Taps
              </Text>
              <View style={styles.starDisplay}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i}
                    name="star" 
                    size={20} 
                    color={i < ratingA ? '#FCD34D' : '#D1D5DB'} 
                  />
                ))}
              </View>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary, marginTop: 4 }]}>
                Rating: {ratingA}/5
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <View style={[styles.systemBadge, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="flash-outline" size={20} color="#22C55E" />
                <Text style={[styles.systemBadgeText, { color: '#166534' }]}>Snappy (4s)</Text>
              </View>
              <Text style={[styles.statValue, { color: '#22C55E', fontSize: 32, marginTop: 12 }]}>
                😊 {rageTapsB}
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Rage Taps
              </Text>
              <View style={styles.starDisplay}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i}
                    name="star" 
                    size={20} 
                    color={i < ratingB ? '#FCD34D' : '#D1D5DB'} 
                  />
                ))}
              </View>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary, marginTop: 4 }]}>
                Rating: {ratingB}/5
              </Text>
            </View>
          </View>
          
          {/* Rage Taps Explanation */}
          <View style={[styles.comparisonBox, { backgroundColor: '#F3F4F6', borderColor: '#D1D5DB' }]}>
            <Ionicons name="information-circle" size={20} color="#6B7280" />
            <Text style={[styles.comparisonText, { color: '#374151', fontSize: 12 }]}>
              💡 Rage Taps = Jumlah klik saat loading (direkam otomatis tanpa ditampilkan untuk menghindari bias)
            </Text>
          </View>

          {/* Comparison Highlights */}
          {rageDiff > 0 && (
            <View style={[styles.comparisonBox, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
              <Ionicons name="trending-down" size={24} color="#22C55E" />
              <Text style={[styles.comparisonText, { color: '#166534' }]}>
                ✨ Frustration Reduction: {rageDiff} rage taps lebih sedikit!
              </Text>
            </View>
          )}
          {ratingDiff > 0 && (
            <View style={[styles.comparisonBox, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
              <Ionicons name="speedometer-outline" size={24} color="#D97706" />
              <Text style={[styles.comparisonText, { color: '#92400E' }]}>
                🚀 Perceived Speed: {ratingDiff} ⭐ lebih snappy!
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⚡ Doherty Threshold (400ms Rule)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Walter J. Doherty (IBM, 1982) menemukan bahwa sistem harus merespons dalam <Text style={{ fontWeight: '700' }}>&lt;400ms</Text> untuk menjaga flow dan produktivitas pengguna.
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Key Insight:</Text> Kedua sistem membutuhkan waktu loading <Text style={{ fontWeight: '700' }}>SAMA PERSIS (4 detik)</Text>, tapi sistem dengan skeleton loader terasa <Text style={{ fontWeight: '700' }}>jauh lebih cepat</Text>! Ini karena feedback visual instant memberi kepastian bahwa sistem sedang bekerja. User psychology {'>'} absolute speed.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Jangan biarkan UI freeze. Show skeleton screens, loaders, atau progressive loading immediately ({'\<'}50ms). User lebih toleran terhadap loading yang visible (4s dengan skeleton) daripada freeze yang membingungkan (4s tanpa feedback). <Text style={{ fontWeight: '700' }}>Perceived performance ≠ actual performance!</Text>
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Default Simulation
const DefaultSimulation = ({ colors, lawTitle, onComplete }) => {
  const [understood, setUnderstood] = useState(false);

  return (
    <View style={styles.simContainer}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
        📚 Pelajari {lawTitle}
      </Text>
      <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
        Baca materi di bawah untuk memahami konsep ini, lalu tandai sebagai selesai.
      </Text>

      <TouchableOpacity
        style={[styles.understandButton, { borderColor: colors.accent }]}
        onPress={() => setUnderstood(true)}
      >
        <Ionicons
          name={understood ? 'checkbox' : 'square-outline'}
          size={24}
          color={colors.accent}
        />
        <Text style={[styles.understandText, { color: colors.textPrimary }]}>
          Saya sudah membaca dan memahami materi
        </Text>
      </TouchableOpacity>

      {understood && (
        <TouchableOpacity
          style={[styles.completeBtn, { backgroundColor: '#22C55E', marginTop: 16 }]}
          onPress={onComplete}
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFF" />
          <Text style={styles.completeBtnText}>Tandai Selesai</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Jakob's Law Simulation - E-Commerce Navigation
const JakobsLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [scenario, setScenario] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [tapLocationA, setTapLocationA] = useState(null);
  const [tapLocationB, setTapLocationB] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  // FIXED: Added scenario to dependencies to trigger fade-in when switching A→B
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase, scenario]);

  useEffect(() => {
    // Pulse animation for cart icons
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const startScenario = (scenarioType) => {
    setScenario(scenarioType);
    setStartTime(Date.now());
    fadeAnim.setValue(0);
    setPhase('task');
  };

  const handleScreenTap = (event) => {
    // Prevent accidental taps before scenario starts
    if (!startTime) return;
    
    const tapTime = Date.now() - startTime;
    const tapX = event.nativeEvent.pageX;
    const tapY = event.nativeEvent.pageY;

    if (scenario === 'A') {
      setTimeA(tapTime);
      setTapLocationA({ x: tapX, y: tapY });
      fadeAnim.setValue(0);
      setTimeout(() => startScenario('B'), 500);
    } else {
      setTimeB(tapTime);
      setTapLocationB({ x: tapX, y: tapY });
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 500);
    }
  };

  const calculateZone = (x, y) => {
    const screenWidth = SCREEN_WIDTH;
    const screenHeight = 600; // Approximate e-commerce screen height
    
    if (y < screenHeight / 3) {
      if (x < screenWidth / 3) return 'Top-Left';
      if (x > (screenWidth * 2) / 3) return 'Top-Right';
      return 'Top-Center';
    } else if (y > (screenHeight * 2) / 3) {
      if (x < screenWidth / 3) return 'Bottom-Left';
      if (x > (screenWidth * 2) / 3) return 'Bottom-Right';
      return 'Bottom-Center';
    } else {
      if (x < screenWidth / 3) return 'Middle-Left';
      if (x > (screenWidth * 2) / 3) return 'Middle-Right';
      return 'Middle-Center';
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🛒 Jakob's Law - The Familiarity Test
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 e-commerce layout berbeda dan harus mencari ikon <Text style={{ fontWeight: '700' }}>Shopping Cart</Text> secepat mungkin!{'\n'}
          {'\n'}😕 <Text style={{ fontWeight: '600' }}>Layout 1: Desain Experimental</Text>
          {'\n'}   Keranjang di posisi yang tidak biasa
          {'\n'}
          {'\n'}✅ <Text style={{ fontWeight: '600' }}>Layout 2: Desain Standard</Text>
          {'\n'}   Keranjang di posisi familiar (seperti Amazon/Tokopedia)
          {'\n'}
          {'\n'}⏱️ Waktu pencarian Anda akan diukur untuk membandingkan keduanya
          {'\n'}{'\n'}
          💡 <Text style={{ fontWeight: '700' }}>Hipotesis:</Text> Layout standar akan lebih cepat karena Anda sudah terbiasa dengan konvensi e-commerce!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startScenario('A')}
        >
          <Text style={styles.startButtonText}>Mulai The Familiarity Test</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Task Phase - Scenario A (Experimental) - FIXED: Added proper layout
  if (phase === 'task' && scenario === 'A') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim, flex: 1, minHeight: 600 }]}>
        <View style={[styles.taskHeader, { backgroundColor: '#FEE2E2', padding: 12, borderRadius: 12, marginBottom: 16 }]}>
          <Text style={[styles.scenarioTitle, { color: '#991B1B', fontWeight: '700', textAlign: 'center' }]}>
            😕 Layout 1: Experimental
          </Text>
          <Text style={[styles.taskText, { color: '#DC2626', fontSize: 16, fontWeight: '700', textAlign: 'center', marginTop: 8 }]}>
            🎯 Tap ikon Shopping Cart!
          </Text>
        </View>

        {/* E-Commerce Layout A (Experimental) - FIXED: Explicit white background */}
        <View style={[styles.ecommerceScreen, { 
          backgroundColor: '#FFFFFF',
          minHeight: 500,
          borderWidth: 2,
          borderColor: '#E5E7EB',
        }]}>
          {/* Header */}
          <View style={[styles.ecomHeader, { backgroundColor: '#F9FAFB' }]}>
            <Ionicons name="menu" size={24} color="#1F2937" />
            <Text style={[styles.ecomLogo, { color: '#1F2937' }]}>ShopHub</Text>
            <Ionicons name="search" size={24} color="#1F2937" />
          </View>

          {/* Banner */}
          <View style={[styles.ecomBanner, { backgroundColor: colors.accent }]}>
            <Text style={styles.bannerText}>🔥 Flash Sale! 50% Off</Text>
          </View>

          {/* Product Grid */}
          <View style={styles.productGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={[styles.productCard, { backgroundColor: '#F3F4F6' }]}>
                <View style={styles.productImage}>
                  <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                </View>
                <Text style={styles.productPrice}>$29.99</Text>
              </View>
            ))}
          </View>

          {/* Experimental Cart - Bottom Left with unusual icon - FIXED: High visibility */}
          <TouchableOpacity
            style={[styles.cartButtonExperimental, { 
              backgroundColor: '#F59E0B',
              borderWidth: 3,
              borderColor: '#FFFFFF',
            }]}
            onPress={handleScreenTap}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Ionicons name="bag-add" size={28} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={[styles.hintBox, { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 8, marginTop: 12 }]}>
          <Text style={[styles.hintText, { color: '#92400E', fontWeight: '600', textAlign: 'center' }]}>
            💡 Cari tombol keranjang di lokasi yang tidak biasa!
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Task Phase - Scenario B (Standard) - FIXED: Proper visibility and layout
  if (phase === 'task' && scenario === 'B') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim, flex: 1, minHeight: 600 }]}>
        <View style={[styles.taskHeader, { backgroundColor: '#DCFCE7', padding: 12, borderRadius: 12, marginBottom: 16 }]}>
          <Text style={[styles.scenarioTitle, { color: '#166534', fontWeight: '700', textAlign: 'center' }]}>
            ✅ Layout 2: Standard Design
          </Text>
          <Text style={[styles.taskText, { color: '#15803D', fontSize: 16, fontWeight: '700', textAlign: 'center', marginTop: 8 }]}>
            🎯 Tap ikon Shopping Cart!
          </Text>
        </View>

        {/* E-Commerce Layout B (Standard) - FIXED: Explicit styling for visibility */}
        <View style={[styles.ecommerceScreen, { 
          backgroundColor: '#FFFFFF',
          minHeight: 500,
          borderWidth: 2,
          borderColor: '#10B981',
        }]}>
          {/* Header with Standard Cart - FIXED: High contrast and proper layout */}
          <View style={[styles.ecomHeader, { 
            backgroundColor: '#F9FAFB',
            minHeight: 60,
          }]}>
            <Ionicons name="menu" size={24} color="#1F2937" />
            <Text style={[styles.ecomLogo, { color: '#1F2937' }]}>ShopHub</Text>
            {/* FIXED: Standard Cart in Top-Right with high visibility */}
            <TouchableOpacity 
              onPress={handleScreenTap}
              style={{
                padding: 8,
                backgroundColor: '#FEF3C7',
                borderRadius: 8,
                borderWidth: 2,
                borderColor: '#F59E0B',
              }}
            >
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Ionicons name="cart" size={28} color="#F59E0B" />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View style={[styles.ecomBanner, { backgroundColor: colors.accent }]}>
            <Text style={styles.bannerText}>🔥 Flash Sale! 50% Off</Text>
          </View>

          {/* Product Grid */}
          <View style={styles.productGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={[styles.productCard, { backgroundColor: '#F3F4F6' }]}>
                <View style={styles.productImage}>
                  <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                </View>
                <Text style={styles.productPrice}>$29.99</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.hintBox, { backgroundColor: '#DBEAFE', padding: 10, borderRadius: 8, marginTop: 12 }]}>
          <Text style={[styles.hintText, { color: '#1E40AF', fontWeight: '600', textAlign: 'center' }]}>
            💡 Keranjang di posisi standar (Top-Right) seperti kebanyakan website!
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase - Enhanced display
  if (phase === 'result') {
    const timeDiff = timeA - timeB;
    const percentFaster = timeA > 0 ? ((timeDiff / timeA) * 100) : 0;
    const zoneA = tapLocationA ? calculateZone(tapLocationA.x, tapLocationA.y) : 'Unknown';
    const zoneB = tapLocationB ? calculateZone(tapLocationB.x, tapLocationB.y) : 'Unknown';
    const isStandardFaster = timeDiff > 0;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Jakob's Law Test
        </Text>
        
        {/* Stats Board */}
        <View style={[styles.statsBoard, { 
          backgroundColor: colors.surface,
          borderWidth: 2,
          borderColor: colors.border,
        }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <View style={[styles.statBadge, { backgroundColor: '#FEE2E2' }]}>
                <Text style={[styles.statBadgeText, { color: '#991B1B' }]}>Experimental</Text>
              </View>
              <Text style={[styles.statValue, { color: '#EF4444', marginTop: 12, fontSize: 28 }]}>
                {(timeA / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Time to Locate
              </Text>
              <View style={[styles.zoneTag, { backgroundColor: '#FEE2E2', marginTop: 12 }]}>
                <Ionicons name="location" size={14} color="#DC2626" />
                <Text style={[styles.statZone, { color: '#DC2626', fontWeight: '600' }]}>
                  {zoneA}
                </Text>
              </View>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <View style={[styles.statBadge, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.statBadgeText, { color: '#166534' }]}>Standard</Text>
              </View>
              <Text style={[styles.statValue, { color: '#22C55E', marginTop: 12, fontSize: 28 }]}>
                {(timeB / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Time to Locate
              </Text>
              <View style={[styles.zoneTag, { backgroundColor: '#DCFCE7', marginTop: 12 }]}>
                <Ionicons name="location" size={14} color="#15803D" />
                <Text style={[styles.statZone, { color: '#15803D', fontWeight: '600' }]}>
                  {zoneB}
                </Text>
              </View>
            </View>
          </View>
          
          {isStandardFaster && (
            <View style={[styles.comparisonHighlight, { 
              backgroundColor: '#FEF3C7', 
              borderColor: '#FCD34D',
              marginTop: 20,
            }]}>
              <Ionicons name="flash" size={28} color="#D97706" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.comparisonTitle, { color: '#92400E' }]}>
                  ✅ Jakob's Law Confirmed!
                </Text>
                <Text style={[styles.comparisonDesc, { color: '#B45309' }]}>
                  Layout standar {(Math.abs(timeDiff) / 1000).toFixed(2)}s lebih cepat ({percentFaster.toFixed(0)}% faster)! User secara otomatis mencari keranjang di Top-Right karena itu adalah konvensi standar e-commerce (seperti Amazon, Tokopedia, Shopee).
                </Text>
              </View>
            </View>
          )}
          {!isStandardFaster && (
            <View style={[styles.comparisonBox, { backgroundColor: '#FEE2E2', marginTop: 20 }]}>
              <Text style={[styles.comparisonText, { color: '#DC2626' }]}>
                🤔 Layout experimental lebih cepat? Ini tidak biasa! Mungkin karena tombol experimental lebih besar dan berwarna terang.
              </Text>
            </View>
          )}

          {/* Heatmap Simulation */}
          <View style={styles.heatmapSection}>
            <Text style={[styles.heatmapTitle, { color: colors.textPrimary }]}>
              🎯 First Tap Location
            </Text>
            <View style={styles.heatmapRow}>
              <View style={styles.heatmapItem}>
                <Text style={[styles.heatmapLabel, { color: colors.textSecondary }]}>Layout 1</Text>
                <View style={[styles.heatmapBox, { borderColor: colors.border }]}>
                  {tapLocationA && (
                    <View
                      style={[
                        styles.heatmapDot,
                        {
                          left: (tapLocationA.x / SCREEN_WIDTH) * 100 - 5,
                          top: (tapLocationA.y / 600) * 100 - 5,
                          backgroundColor: '#EF4444',
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
              <View style={styles.heatmapItem}>
                <Text style={[styles.heatmapLabel, { color: colors.textSecondary }]}>Layout 2</Text>
                <View style={[styles.heatmapBox, { borderColor: colors.border }]}>
                  {tapLocationB && (
                    <View
                      style={[
                        styles.heatmapDot,
                        {
                          left: (tapLocationB.x / SCREEN_WIDTH) * 100 - 5,
                          top: (tapLocationB.y / 600) * 100 - 5,
                          backgroundColor: '#22C55E',
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🛒 Jakob's Law (Jakob Nielsen, 2000)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>"Users spend most of their time on OTHER sites."</Text> Artinya: User membawa ekspektasi dari website lain ke website Anda. Mereka sudah terlatih dengan konvensi standar industri.{'\n'}
            {'\n'}📊 <Text style={{ fontWeight: '600' }}>Hasil Anda:</Text>
            {'\n'}• Layout Experimental (Bottom-Left): {(timeA / 1000).toFixed(2)}s (confusing!)
            {'\n'}• Layout Standard (Top-Right): {(timeB / 1000).toFixed(2)}s (familiar!)
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> JANGAN coba-coba kreatif di elemen penting! Ikuti konvensi standar untuk navigation, icons, buttons, forms. Contoh konvensi universal:
            {'\n'}• Shopping Cart = Top-Right corner
            {'\n'}• Logo = Top-Left, clickable ke homepage
            {'\n'}• Search Bar = Header, centered or right
            {'\n'}• Menu = Hamburger icon, top-left
            {'\n'}{'\n'}
            User tidak ingin "belajar" menggunakan website Anda. Mereka ingin langsung pakai. Leverage familiar patterns = reduced cognitive load!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Law of Common Region Simulation - File Manager Grid
const CommonRegionSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, answerA, scenarioB, answerB, result
  const [startTimeA, setStartTimeA] = useState(0);
  const [startTimeB, setStartTimeB] = useState(0);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [answerA, setAnswerA] = useState(null);
  const [answerB, setAnswerB] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // File data - consistent across both scenarios
  const fileData = [
    { id: 1, type: 'doc', name: 'Report.docx', category: 'Documents', icon: 'document-text' },
    { id: 2, type: 'img', name: 'Photo1.jpg', category: 'Images', icon: 'image' },
    { id: 3, type: 'music', name: 'Song.mp3', category: 'Music', icon: 'musical-notes' },
    { id: 4, type: 'doc', name: 'Invoice.pdf', category: 'Documents', icon: 'document-text' },
    { id: 5, type: 'img', name: 'Photo2.png', category: 'Images', icon: 'image' },
    { id: 6, type: 'doc', name: 'Contract.docx', category: 'Documents', icon: 'document-text' },
    { id: 7, type: 'music', name: 'Track.wav', category: 'Music', icon: 'musical-notes' },
    { id: 8, type: 'doc', name: 'Proposal.pdf', category: 'Documents', icon: 'document-text' },
    { id: 9, type: 'img', name: 'Screenshot.png', category: 'Images', icon: 'image' },
    { id: 10, type: 'music', name: 'Audio.mp3', category: 'Music', icon: 'musical-notes' },
    { id: 11, type: 'doc', name: 'Memo.txt', category: 'Documents', icon: 'document-text' },
    { id: 12, type: 'img', name: 'Banner.jpg', category: 'Images', icon: 'image' },
  ];

  // Randomly shuffle files for Scenario A (no grouping)
  const shuffledFiles = [...fileData].sort(() => Math.random() - 0.5);
  
  // Group files by category for Scenario B
  const groupedFiles = {
    Documents: fileData.filter(f => f.type === 'doc'),
    Images: fileData.filter(f => f.type === 'img'),
    Music: fileData.filter(f => f.type === 'music'),
  };

  const correctAnswer = groupedFiles.Documents.length; // 5 documents

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenarioA = () => {
    setStartTimeA(Date.now());
    fadeAnim.setValue(0);
    setPhase('scenarioA');
  };

  const startScenarioB = () => {
    setStartTimeB(Date.now());
    fadeAnim.setValue(0);
    setPhase('scenarioB');
  };

  const submitAnswerA = (answer) => {
    const timeTaken = Date.now() - startTimeA;
    setTimeA(timeTaken);
    setAnswerA(answer);
    fadeAnim.setValue(0);
    setTimeout(() => startScenarioB(), 300);
  };

  const submitAnswerB = (answer) => {
    const timeTaken = Date.now() - startTimeB;
    setTimeB(timeTaken);
    setAnswerB(answer);
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 300);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'doc': return { name: 'document-text', color: '#3B82F6' };
      case 'img': return { name: 'image', color: '#10B981' };
      case 'music': return { name: 'musical-notes', color: '#8B5CF6' };
      default: return { name: 'document', color: '#6B7280' };
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🗂️ Law of Common Region
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 file manager layout yang berbeda. Tugas Anda:{'\n'}
          {'\n'}📁 <Text style={{ fontWeight: '600' }}>Hitung berapa file "Document" yang terlihat</Text>
          {'\n'}⏱️ Kecepatan dan akurasi Anda akan diukur
          {'\n'}{'\n'}File yang sama akan ditampilkan dengan cara berbeda.
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Simulasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - No Region (Scattered Grid)
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Layout 1
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          📊 Hitung berapa file <Text style={{ fontWeight: '700' }}>DOCUMENT</Text> yang ada
        </Text>

        {/* Scattered Files - No Visual Grouping */}
        <View style={styles.fileGridScattered}>
          {shuffledFiles.map((file) => {
            const iconData = getFileIcon(file.type);
            return (
              <View key={file.id} style={[styles.fileItemScattered, { borderColor: colors.border }]}>
                <Ionicons name={iconData.name} size={28} color={iconData.color} />
                <Text style={[styles.fileNameSmall, { color: colors.textSecondary }]} numberOfLines={1}>
                  {file.name}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Answer Options */}
        <View style={styles.answerSection}>
          <Text style={[styles.answerPrompt, { color: colors.textSecondary }]}>
            Berapa jumlah Document?
          </Text>
          <View style={styles.answerGrid}>
            {[3, 4, 5, 6, 7].map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.answerButton, { backgroundColor: colors.accent }]}
                onPress={() => submitAnswerA(num)}
              >
                <Text style={styles.answerButtonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  }

  // Scenario B - Common Region (Grouped in Cards)
  if (phase === 'scenarioB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Layout 2
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          📊 Hitung berapa file <Text style={{ fontWeight: '700' }}>DOCUMENT</Text> yang ada
        </Text>

        {/* Grouped Files - With Visual Regions */}
        <View style={styles.fileGroupsContainer}>
          {Object.keys(groupedFiles).map((category) => {
            const files = groupedFiles[category];
            const firstFile = files[0];
            const iconData = getFileIcon(firstFile.type);
            
            return (
              <View key={category} style={[styles.fileRegionCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                <View style={styles.regionHeader}>
                  <Ionicons name={iconData.name} size={20} color={iconData.color} />
                  <Text style={[styles.regionTitle, { color: colors.textPrimary }]}>
                    {category}
                  </Text>
                  <View style={[styles.countBadge, { backgroundColor: iconData.color }]}>
                    <Text style={styles.countBadgeText}>{files.length}</Text>
                  </View>
                </View>
                <View style={styles.fileGridGrouped}>
                  {files.map((file) => (
                    <View key={file.id} style={styles.fileItemGrouped}>
                      <Ionicons name={iconData.name} size={32} color={iconData.color} />
                      <Text style={[styles.fileNameTiny, { color: colors.textSecondary }]} numberOfLines={1}>
                        {file.name.split('.')[0]}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Answer Options */}
        <View style={styles.answerSection}>
          <Text style={[styles.answerPrompt, { color: colors.textSecondary }]}>
            Berapa jumlah Document?
          </Text>
          <View style={styles.answerGrid}>
            {[3, 4, 5, 6, 7].map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.answerButton, { backgroundColor: '#22C55E' }]}
                onPress={() => submitAnswerB(num)}
              >
                <Text style={styles.answerButtonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const isAccurateA = answerA === correctAnswer;
    const isAccurateB = answerB === correctAnswer;
    const speedImprovement = ((timeA - timeB) / timeA * 100).toFixed(1);
    const isGroupedFaster = timeB < timeA;
    const accuracyImproved = isAccurateB && !isAccurateA;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Common Region Test
        </Text>

        {/* SCENARIO A CARD - Tanpa Pengelompokan */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          {/* Card Header */}
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="grid-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Tanpa Pengelompokan
              </Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            {/* Time Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Waktu
                </Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {(timeA / 1000).toFixed(2)}s
                </Text>
              </View>
            </View>

            {/* Accuracy Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={isAccurateA ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={isAccurateA ? "#22C55E" : "#EF4444"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Akurasi
                </Text>
                <Text style={[styles.metricValue, { color: isAccurateA ? '#22C55E' : '#EF4444' }]}>
                  {answerA} / {correctAnswer}
                </Text>
              </View>
            </View>
          </View>

          {/* Performance Tag */}
          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="search" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              Scanning sulit - File tersebar acak
            </Text>
          </View>
        </View>

        {/* SCENARIO B CARD - Dengan Common Region */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          {/* Card Header */}
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="apps" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Dengan Common Region
              </Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            {/* Time Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Waktu
                </Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {(timeB / 1000).toFixed(2)}s
                </Text>
              </View>
            </View>

            {/* Accuracy Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={isAccurateB ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={isAccurateB ? "#22C55E" : "#EF4444"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Akurasi
                </Text>
                <Text style={[styles.metricValue, { color: isAccurateB ? '#22C55E' : '#EF4444' }]}>
                  {answerB} / {correctAnswer}
                </Text>
              </View>
            </View>
          </View>

          {/* Performance Tag */}
          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="flash" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              Scanning mudah - File terkelompok jelas
            </Text>
          </View>
        </View>

        {/* SUMMARY/INSIGHT CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: isGroupedFaster ? '#FEF3C7' : '#FEE2E2',
          borderColor: isGroupedFaster ? '#FCD34D' : '#FCA5A5',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={isGroupedFaster ? "trophy" : "information-circle"} 
              size={28} 
              color={isGroupedFaster ? "#D97706" : "#DC2626"} 
            />
            <Text style={[styles.summaryTitle, { color: isGroupedFaster ? '#92400E' : '#991B1B' }]}>
              {isGroupedFaster ? '✅ Common Region Works!' : '🤔 Interesting Result'}
            </Text>
          </View>

          {/* Performance Comparison */}
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="speedometer-outline" size={18} color={isGroupedFaster ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: isGroupedFaster ? '#B45309' : '#991B1B' }]}>
                Kecepatan
              </Text>
              <Text style={[styles.comparisonValue, { color: isGroupedFaster ? '#92400E' : '#7F1D1D', fontWeight: '700' }]}>
                {isGroupedFaster ? '+' : ''}{Math.abs(parseFloat(speedImprovement))}%
              </Text>
            </View>

            {accuracyImproved && (
              <View style={styles.comparisonItem}>
                <Ionicons name="checkmark-done-circle" size={18} color="#16A34A" />
                <Text style={[styles.comparisonLabel, { color: '#15803D' }]}>
                  Akurasi
                </Text>
                <Text style={[styles.comparisonValue, { color: '#166534', fontWeight: '700' }]}>
                  Meningkat!
                </Text>
              </View>
            )}
          </View>

          <Text style={[styles.summaryDescription, { color: isGroupedFaster ? '#B45309' : '#991B1B' }]}>
            {isGroupedFaster 
              ? `Pengelompokan visual membuat counting task ${Math.abs(parseFloat(speedImprovement))}% lebih cepat! User dapat langsung melihat kategori "Documents" tanpa harus scan seluruh grid.`
              : `Layout scattered lebih cepat? Ini tidak biasa. Mungkin Anda sudah familiar dengan pattern acak, atau layout grouped memiliki terlalu banyak visual noise.`
            }
          </Text>
        </View>

        {/* EDUCATIONAL INSIGHT */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🗂️ Law of Common Region (Gestalt, 1923)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>Elements yang berada dalam visual boundary yang sama dipersepsikan sebagai satu grup.</Text> Borders, background colors, atau cards menciptakan "common region" yang membantu user memahami struktur informasi.{'\n'}
            {'\n'}📊 <Text style={{ fontWeight: '600' }}>Hasil Anda:</Text>
            {'\n'}• Tanpa Grouping: {(timeA / 1000).toFixed(2)}s, Answer: {answerA}
            {'\n'}• Dengan Common Region: {(timeB / 1000).toFixed(2)}s, Answer: {answerB}
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan cards, borders, atau background colors untuk mengelompokkan related content. Contoh: Dashboard widgets, Product categories, Settings sections, Form field groups. Jangan biarkan semua elemen "flat" di satu plane - buat hierarchy visual dengan grouping!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Law of Proximity Simulation - Settings Form
const ProximitySimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, scenarioB, result
  const [startTimeA, setStartTimeA] = useState(0);
  const [startTimeB, setStartTimeB] = useState(0);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [errorA, setErrorA] = useState(false);
  const [errorB, setErrorB] = useState(false);
  const [attemptsA, setAttemptsA] = useState(0);
  const [attemptsB, setAttemptsB] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Settings data
  const settingsData = [
    { id: 1, label: 'Push Notifications', key: 'push', enabled: true },
    { id: 2, label: 'Email Notifications', key: 'email', enabled: true }, // Target
    { id: 3, label: 'SMS Alerts', key: 'sms', enabled: false },
    { id: 4, label: 'Newsletter', key: 'newsletter', enabled: true },
    { id: 5, label: 'Marketing Updates', key: 'marketing', enabled: false },
  ];

  const [settingsStateA, setSettingsStateA] = useState(settingsData);
  const [settingsStateB, setSettingsStateB] = useState(settingsData);

  const targetKey = 'email'; // Email Notifications

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenarioA = () => {
    setStartTimeA(Date.now());
    setSettingsStateA(settingsData);
    setAttemptsA(0);
    fadeAnim.setValue(0);
    setPhase('scenarioA');
  };

  const startScenarioB = () => {
    setStartTimeB(Date.now());
    setSettingsStateB(settingsData);
    setAttemptsB(0);
    fadeAnim.setValue(0);
    setPhase('scenarioB');
  };

  const handleToggleA = (key) => {
    const newAttempts = attemptsA + 1;
    setAttemptsA(newAttempts);

    const newSettings = settingsStateA.map(s =>
      s.key === key ? { ...s, enabled: !s.enabled } : s
    );
    setSettingsStateA(newSettings);

    // Check if correct toggle (Email) is now OFF
    const emailSetting = newSettings.find(s => s.key === targetKey);
    if (!emailSetting.enabled) {
      // Success - Email is turned OFF
      const timeTaken = Date.now() - startTimeA;
      setTimeA(timeTaken);
      setErrorA(newAttempts > 1); // Error if they toggled wrong ones first
      fadeAnim.setValue(0);
      setTimeout(() => startScenarioB(), 800);
    }
  };

  const handleToggleB = (key) => {
    const newAttempts = attemptsB + 1;
    setAttemptsB(newAttempts);

    const newSettings = settingsStateB.map(s =>
      s.key === key ? { ...s, enabled: !s.enabled } : s
    );
    setSettingsStateB(newSettings);

    // Check if correct toggle (Email) is now OFF
    const emailSetting = newSettings.find(s => s.key === targetKey);
    if (!emailSetting.enabled) {
      // Success - Email is turned OFF
      const timeTaken = Date.now() - startTimeB;
      setTimeB(timeTaken);
      setErrorB(newAttempts > 1); // Error if they toggled wrong ones first
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 800);
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📍 Law of Proximity
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 layout pengaturan yang berbeda. Tugas Anda:{'\n'}
          {'\n'}🔔 <Text style={{ fontWeight: '600' }}>Matikan toggle "Email Notifications"</Text>
          {'\n'}⏱️ Waktu dan kesalahan Anda akan diukur
          {'\n'}{'\n'}Hati-hati! Ada beberapa toggle lain yang mirip.
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Simulasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - Poor Proximity (Labels far left, toggles far right, tight spacing)
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Layout 1
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🎯 Matikan toggle <Text style={{ fontWeight: '700' }}>"Email Notifications"</Text>
        </Text>

        {/* Poor Proximity Layout */}
        <View style={[styles.settingsContainerPoor, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.settingsHeader, { color: colors.textPrimary }]}>
            Pengaturan Notifikasi
          </Text>
          
          {settingsStateA.map((setting, index) => (
            <View 
              key={setting.id} 
              style={[
                styles.settingRowPoor,
                index < settingsStateA.length - 1 && { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }
              ]}
            >
              {/* Label far left */}
              <Text style={[styles.settingLabelPoor, { color: colors.textSecondary }]}>
                {setting.label}
              </Text>
              
              {/* Toggle far right */}
              <TouchableOpacity
                style={[
                  styles.toggleSwitch,
                  { backgroundColor: setting.enabled ? '#22C55E' : '#D1D5DB' }
                ]}
                onPress={() => handleToggleA(setting.key)}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={[
                    styles.toggleThumb,
                    {
                      transform: [{ translateX: setting.enabled ? 20 : 0 }],
                    }
                  ]}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Attempts Counter */}
        {attemptsA > 0 && (
          <Text style={[styles.attemptsText, { color: colors.textSecondary }]}>
            Percobaan: {attemptsA}
          </Text>
        )}
      </Animated.View>
    );
  }

  // Scenario B - Good Proximity (Labels and toggles grouped, clear spacing)
  if (phase === 'scenarioB') {
    // Group settings by category for better organization
    const notificationSettings = settingsStateB.slice(0, 3); // Push, Email, SMS
    const marketingSettings = settingsStateB.slice(3); // Newsletter, Marketing

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Layout 2
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🎯 Matikan toggle <Text style={{ fontWeight: '700' }}>"Email Notifications"</Text>
        </Text>

        {/* Good Proximity Layout */}
        <View style={styles.settingsContainerGood}>
          {/* Notification Settings Group */}
          <View style={[styles.settingsGroup, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Text style={[styles.groupTitle, { color: colors.textPrimary }]}>
              🔔 Notifikasi
            </Text>
            
            {notificationSettings.map((setting) => (
              <View key={setting.id} style={styles.settingRowGood}>
                <View style={styles.settingInfoGroup}>
                  <Text style={[styles.settingLabelGood, { color: colors.textPrimary }]}>
                    {setting.label}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.toggleSwitchGood,
                      { backgroundColor: setting.enabled ? '#22C55E' : '#D1D5DB' }
                    ]}
                    onPress={() => handleToggleB(setting.key)}
                    activeOpacity={0.8}
                  >
                    <Animated.View
                      style={[
                        styles.toggleThumb,
                        {
                          transform: [{ translateX: setting.enabled ? 20 : 0 }],
                        }
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {setting.enabled ? 'Aktif' : 'Nonaktif'}
                </Text>
              </View>
            ))}
          </View>

          {/* Marketing Settings Group */}
          <View style={[styles.settingsGroup, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Text style={[styles.groupTitle, { color: colors.textPrimary }]}>
              📧 Marketing
            </Text>
            
            {marketingSettings.map((setting) => (
              <View key={setting.id} style={styles.settingRowGood}>
                <View style={styles.settingInfoGroup}>
                  <Text style={[styles.settingLabelGood, { color: colors.textPrimary }]}>
                    {setting.label}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.toggleSwitchGood,
                      { backgroundColor: setting.enabled ? '#22C55E' : '#D1D5DB' }
                    ]}
                    onPress={() => handleToggleB(setting.key)}
                    activeOpacity={0.8}
                  >
                    <Animated.View
                      style={[
                        styles.toggleThumb,
                        {
                          transform: [{ translateX: setting.enabled ? 20 : 0 }],
                        }
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {setting.enabled ? 'Aktif' : 'Nonaktif'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Attempts Counter */}
        {attemptsB > 0 && (
          <Text style={[styles.attemptsText, { color: colors.textSecondary }]}>
            Percobaan: {attemptsB}
          </Text>
        )}
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const speedImprovement = ((timeA - timeB) / timeA * 100).toFixed(1);
    const errorImproved = !errorB && errorA;
    const isProximityBetter = timeB < timeA;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Proximity Test
        </Text>

        {/* SCENARIO A CARD - Poor Proximity */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="remove-circle-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Poor Proximity
              </Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Waktu</Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {(timeA / 1000).toFixed(2)}s
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={errorA ? "alert-circle" : "checkmark-circle"} 
                  size={20} 
                  color={errorA ? "#EF4444" : "#22C55E"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Error</Text>
                <Text style={[styles.metricValue, { color: errorA ? '#EF4444' : '#22C55E' }]}>
                  {errorA ? 'Ya' : 'Tidak'}
                </Text>
              </View>
            </View>
          </View>

          {/* Attempts Tag */}
          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="hand-left-outline" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              {attemptsA} klik - Label jauh dari toggle
            </Text>
          </View>
        </View>

        {/* SCENARIO B CARD - Good Proximity */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Good Proximity
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Waktu</Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {(timeB / 1000).toFixed(2)}s
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={errorB ? "alert-circle" : "checkmark-circle"} 
                  size={20} 
                  color={errorB ? "#EF4444" : "#22C55E"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Error</Text>
                <Text style={[styles.metricValue, { color: errorB ? '#EF4444' : '#22C55E' }]}>
                  {errorB ? 'Ya' : 'Tidak'}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="flash" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              {attemptsB} klik - Label & toggle berdekatan
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: isProximityBetter ? '#FEF3C7' : '#FEE2E2',
          borderColor: isProximityBetter ? '#FCD34D' : '#FCA5A5',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={isProximityBetter ? "trophy" : "information-circle"} 
              size={28} 
              color={isProximityBetter ? "#D97706" : "#DC2626"} 
            />
            <Text style={[styles.summaryTitle, { color: isProximityBetter ? '#92400E' : '#991B1B' }]}>
              {isProximityBetter ? '✅ Proximity Works!' : '🤔 Interesting Result'}
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="speedometer-outline" size={18} color={isProximityBetter ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: isProximityBetter ? '#B45309' : '#991B1B' }]}>
                Kecepatan
              </Text>
              <Text style={[styles.comparisonValue, { color: isProximityBetter ? '#92400E' : '#7F1D1D', fontWeight: '700' }]}>
                {isProximityBetter ? '+' : ''}{Math.abs(parseFloat(speedImprovement))}%
              </Text>
            </View>

            {errorImproved && (
              <View style={styles.comparisonItem}>
                <Ionicons name="shield-checkmark" size={18} color="#16A34A" />
                <Text style={[styles.comparisonLabel, { color: '#15803D' }]}>Error</Text>
                <Text style={[styles.comparisonValue, { color: '#166534', fontWeight: '700' }]}>
                  Berkurang!
                </Text>
              </View>
            )}
          </View>

          <Text style={[styles.summaryDescription, { color: isProximityBetter ? '#B45309' : '#991B1B' }]}>
            {isProximityBetter 
              ? `Good proximity membuat task ${Math.abs(parseFloat(speedImprovement))}% lebih cepat! Ketika label dan toggle berdekatan, user tidak perlu visual scanning horizontal yang melelahkan.`
              : `Poor proximity lebih cepat? Ini tidak biasa. Mungkin layout grouped terlalu rapat atau Anda sudah terbiasa dengan scattered layout.`
            }
          </Text>
        </View>

        {/* EDUCATIONAL INSIGHT */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            📍 Law of Proximity (Gestalt, 1923)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>Elements yang berdekatan dipersepsikan sebagai terkait.</Text> Jarak visual menentukan perceived relationship!{'\n'}
            {'\n'}📊 <Text style={{ fontWeight: '600' }}>Hasil Anda:</Text>
            {'\n'}• Poor Proximity: {(timeA / 1000).toFixed(2)}s, {attemptsA} klik, {errorA ? 'Ada error' : 'No error'}
            {'\n'}• Good Proximity: {(timeB / 1000).toFixed(2)}s, {attemptsB} klik, {errorB ? 'Ada error' : 'No error'}
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Letakkan label dekat dengan input field-nya. Group related elements dengan spacing yang lebih kecil, pisahkan unrelated elements dengan spacing yang lebih besar. Contoh: Form field groups, Card layouts, Settings sections. Jangan paksa user untuk scan horizontal panjang!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Law of Prägnanz Simulation - Shape Memory Test
const PragnanzSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, countdownA, showA, recallA, countdownB, showB, recallB, result
  const [countdown, setCountdown] = useState(3);
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0))[0];

  // Shape definitions
  const complexShapeId = 'complex';
  const simpleShapeId = 'simple';

  // Decoy shapes for multiple choice
  const complexOptions = [
    { id: 'complex', label: 'A', isCorrect: true },
    { id: 'complex-alt1', label: 'B', isCorrect: false },
    { id: 'complex-alt2', label: 'C', isCorrect: false },
    { id: 'complex-alt3', label: 'D', isCorrect: false },
  ];

  const simpleOptions = [
    { id: 'simple', label: 'A', isCorrect: true },
    { id: 'simple-alt1', label: 'B', isCorrect: false },
    { id: 'simple-alt2', label: 'C', isCorrect: false },
    { id: 'simple-alt3', label: 'D', isCorrect: false },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [phase]);

  const startCountdownA = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0);
    setCountdown(3);
    setPhase('countdownA');
    
    // Countdown timer
    let count = 3;
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0);
        setPhase('showA');
        // Show shape for 1 second then hide
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('recallA');
        }, 1000);
      }
    }, 1000);
  };

  const startCountdownB = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0);
    setCountdown(3);
    setPhase('countdownB');
    
    // Countdown timer
    let count = 3;
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0);
        setPhase('showB');
        // Show shape for 1 second then hide
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('recallB');
        }, 1000);
      }
    }, 1000);
  };

  const handleRecallA = (shapeId) => {
    setSelectedA(shapeId);
    fadeAnim.setValue(0);
    setTimeout(() => startCountdownB(), 500);
  };

  const handleRecallB = (shapeId) => {
    setSelectedB(shapeId);
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 500);
  };

  // Render complex shape (irregular star-like pattern using Views)
  const renderComplexShape = (size = 120, optionId = 'complex') => {
    // Different variations for options
    const variations = {
      'complex': { rotation: 0, scale: 1, color: '#3B82F6' },
      'complex-alt1': { rotation: 15, scale: 0.95, color: '#3B82F6' },
      'complex-alt2': { rotation: -15, scale: 1.05, color: '#3B82F6' },
      'complex-alt3': { rotation: 30, scale: 0.9, color: '#3B82F6' },
    };

    const config = variations[optionId] || variations['complex'];

    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        {/* Create complex irregular shape using multiple overlapping elements */}
        <View style={{ 
          width: size * 0.8 * config.scale, 
          height: size * 0.8 * config.scale,
          transform: [{ rotate: `${config.rotation}deg` }],
          position: 'relative'
        }}>
          {/* Multiple irregular rectangles to create complex shape */}
          <View style={{
            position: 'absolute',
            width: size * 0.4,
            height: size * 0.5,
            backgroundColor: config.color,
            borderRadius: 8,
            top: 0,
            left: size * 0.15,
            transform: [{ rotate: '15deg' }],
            opacity: 0.9,
          }} />
          <View style={{
            position: 'absolute',
            width: size * 0.35,
            height: size * 0.45,
            backgroundColor: config.color,
            borderRadius: 6,
            top: size * 0.25,
            left: 0,
            transform: [{ rotate: '-20deg' }],
            opacity: 0.85,
          }} />
          <View style={{
            position: 'absolute',
            width: size * 0.3,
            height: size * 0.4,
            backgroundColor: config.color,
            borderRadius: 10,
            bottom: 0,
            right: 0,
            transform: [{ rotate: '25deg' }],
            opacity: 0.8,
          }} />
          <View style={{
            position: 'absolute',
            width: size * 0.25,
            height: size * 0.35,
            backgroundColor: config.color,
            borderRadius: 5,
            top: size * 0.35,
            right: size * 0.05,
            transform: [{ rotate: '-10deg' }],
            opacity: 0.75,
          }} />
        </View>
      </View>
    );
  };

  // Render simple shape (Circle + Triangle symmetrically arranged)
  const renderSimpleShape = (size = 120, optionId = 'simple') => {
    // Different variations for options
    const variations = {
      'simple': { circleTop: size * 0.15, triangleTop: size * 0.55 },
      'simple-alt1': { circleTop: size * 0.55, triangleTop: size * 0.15 },
      'simple-alt2': { circleTop: size * 0.35, triangleTop: size * 0.35 },
      'simple-alt3': { circleTop: size * 0.25, triangleTop: size * 0.45 },
    };

    const config = variations[optionId] || variations['simple'];
    const circleSize = size * 0.33;
    const triangleSize = size * 0.35;

    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        {/* Circle */}
        <View style={{
          position: 'absolute',
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          backgroundColor: '#10B981',
          top: config.circleTop,
          left: (size - circleSize) / 2,
          borderWidth: 2,
          borderColor: '#059669',
        }} />
        
        {/* Triangle using borders trick */}
        <View style={{
          position: 'absolute',
          width: 0,
          height: 0,
          top: config.triangleTop,
          left: (size - triangleSize) / 2,
          borderLeftWidth: triangleSize / 2,
          borderRightWidth: triangleSize / 2,
          borderBottomWidth: triangleSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#F59E0B',
        }} />
      </View>
    );
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🧠 Law of Prägnanz
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Tes memori visual Anda! Anda akan melihat 2 logo berbeda:{'\n'}
          {'\n'}👁️ <Text style={{ fontWeight: '600' }}>Setiap logo akan ditampilkan selama 1 detik</Text>
          {'\n'}🎯 <Text style={{ fontWeight: '600' }}>Kemudian pilih logo yang benar dari 4 pilihan</Text>
          {'\n'}📊 Akurasi Anda akan diukur
          {'\n'}{'\n'}Bersiaplah untuk fokus!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startCountdownA}
        >
          <Text style={styles.startButtonText}>Mulai Tes Memori</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Countdown Phase A
  if (phase === 'countdownA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Logo 1
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Hafalkan logo yang akan muncul...
        </Text>
        
        <View style={styles.countdownContainer}>
          <Animated.Text 
            style={[
              styles.countdownNumber,
              { 
                color: colors.accent,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {countdown}
          </Animated.Text>
        </View>
      </Animated.View>
    );
  }

  // Show Shape A (Complex)
  if (phase === 'showA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Logo 1 - Hafalkan!
        </Text>
        
        <Animated.View 
          style={[
            styles.shapeDisplayContainer,
            { 
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {renderComplexShape(150, 'complex')}
        </Animated.View>
      </Animated.View>
    );
  }

  // Recall Phase A
  if (phase === 'recallA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Logo 1 - Pilih yang Benar
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Mana yang baru saja Anda lihat?
        </Text>

        <View style={styles.optionsGrid}>
          {complexOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              onPress={() => handleRecallA(option.id)}
            >
              <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>
                {option.label}
              </Text>
              {renderComplexShape(80, option.id)}
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Countdown Phase B
  if (phase === 'countdownB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Logo 2
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Hafalkan logo yang akan muncul...
        </Text>
        
        <View style={styles.countdownContainer}>
          <Animated.Text 
            style={[
              styles.countdownNumber,
              { 
                color: '#22C55E',
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {countdown}
          </Animated.Text>
        </View>
      </Animated.View>
    );
  }

  // Show Shape B (Simple)
  if (phase === 'showB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Logo 2 - Hafalkan!
        </Text>
        
        <Animated.View 
          style={[
            styles.shapeDisplayContainer,
            { 
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {renderSimpleShape(150, 'simple')}
        </Animated.View>
      </Animated.View>
    );
  }

  // Recall Phase B
  if (phase === 'recallB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Logo 2 - Pilih yang Benar
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Mana yang baru saja Anda lihat?
        </Text>

        <View style={styles.optionsGrid}>
          {simpleOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              onPress={() => handleRecallB(option.id)}
            >
              <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>
                {option.label}
              </Text>
              {renderSimpleShape(80, option.id)}
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const isCorrectA = selectedA === complexShapeId;
    const isCorrectB = selectedB === simpleShapeId;
    const simpleBetter = isCorrectB && !isCorrectA;
    const bothCorrect = isCorrectA && isCorrectB;
    const bothWrong = !isCorrectA && !isCorrectB;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Memory Test
        </Text>

        {/* LOGO A CARD - Complex Shape */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="shapes" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Logo Kompleks
              </Text>
            </View>
          </View>

          {/* Single Metric Display */}
          <View style={[styles.metricItem, { flex: undefined, alignSelf: 'stretch' }]}>
            <View style={styles.metricIconContainer}>
              <Ionicons 
                name={isCorrectA ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isCorrectA ? "#22C55E" : "#EF4444"} 
              />
            </View>
            <View style={styles.metricContent}>
              <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Recognition</Text>
              <Text style={[styles.metricValue, { color: isCorrectA ? '#22C55E' : '#EF4444', fontSize: 24 }]}>
                {isCorrectA ? 'Benar ✓' : 'Salah ✗'}
              </Text>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="git-network-outline" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              Polygon tidak beraturan - Sulit diingat
            </Text>
          </View>
        </View>

        {/* LOGO B CARD - Simple Shape */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="radio-button-on-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Logo Sederhana
              </Text>
            </View>
          </View>

          <View style={[styles.metricItem, { flex: undefined, alignSelf: 'stretch' }]}>
            <View style={styles.metricIconContainer}>
              <Ionicons 
                name={isCorrectB ? "checkmark-circle" : "close-circle"} 
                size={24} 
                color={isCorrectB ? "#22C55E" : "#EF4444"} 
              />
            </View>
            <View style={styles.metricContent}>
              <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Recognition</Text>
              <Text style={[styles.metricValue, { color: isCorrectB ? '#22C55E' : '#EF4444', fontSize: 24 }]}>
                {isCorrectB ? 'Benar ✓' : 'Salah ✗'}
              </Text>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="sparkles" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              Geometri dasar - Mudah diingat
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: simpleBetter ? '#FEF3C7' : bothCorrect ? '#DBEAFE' : '#FEE2E2',
          borderColor: simpleBetter ? '#FCD34D' : bothCorrect ? '#93C5FD' : '#FCA5A5',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={simpleBetter ? "trophy" : bothCorrect ? "star" : "information-circle"} 
              size={28} 
              color={simpleBetter ? "#D97706" : bothCorrect ? "#3B82F6" : "#DC2626"} 
            />
            <Text style={[styles.summaryTitle, { color: simpleBetter ? '#92400E' : bothCorrect ? '#1E40AF' : '#991B1B' }]}>
              {simpleBetter ? '✅ Prägnanz Confirmed!' : bothCorrect ? '🌟 Perfect Memory!' : bothWrong ? '💭 Memory Challenge' : '🤔 Mixed Results'}
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="shapes" size={18} color="#EF4444" />
              <Text style={[styles.comparisonLabel, { color: '#991B1B' }]}>Kompleks</Text>
              <Text style={[styles.comparisonValue, { color: isCorrectA ? '#22C55E' : '#EF4444', fontWeight: '700', fontSize: 20 }]}>
                {isCorrectA ? '✓' : '✗'}
              </Text>
            </View>

            <View style={styles.comparisonItem}>
              <Ionicons name="radio-button-on-outline" size={18} color="#22C55E" />
              <Text style={[styles.comparisonLabel, { color: '#15803D' }]}>Sederhana</Text>
              <Text style={[styles.comparisonValue, { color: isCorrectB ? '#22C55E' : '#EF4444', fontWeight: '700', fontSize: 20 }]}>
                {isCorrectB ? '✓' : '✗'}
              </Text>
            </View>
          </View>

          <Text style={[styles.summaryDescription, { color: simpleBetter ? '#B45309' : bothCorrect ? '#1E40AF' : '#991B1B' }]}>
            {simpleBetter 
              ? 'Logo sederhana lebih mudah diingat! Bentuk geometris dasar (lingkaran, segitiga) lebih memorable daripada polygon kompleks.'
              : bothCorrect 
              ? 'Amazing! Anda mengingat kedua logo dengan sempurna. Memory yang luar biasa!'
              : bothWrong
              ? 'Kedua logo sulit diingat. Waktu exposure mungkin terlalu singkat atau bentuknya terlalu mirip saat recall.'
              : 'Logo kompleks lebih mudah? Ini jarang terjadi. Mungkin logo kompleks memiliki fitur unik yang memorable.'
            }
          </Text>
        </View>

        {/* EDUCATIONAL INSIGHT */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🧠 Law of Prägnanz / Simplicity (Gestalt, 1923)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>People perceive and remember simple, symmetrical forms more easily than complex ones.</Text> Otak mencari pola paling sederhana!{'\n'}
            {'\n'}📊 <Text style={{ fontWeight: '600' }}>Hasil Anda:</Text>
            {'\n'}• Logo Kompleks (Polygon): {isCorrectA ? 'Benar ✓' : 'Salah ✗'}
            {'\n'}• Logo Sederhana (Circle+Triangle): {isCorrectB ? 'Benar ✓' : 'Salah ✗'}
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan bentuk sederhana, simetris, dan recognizable untuk logo, icons, atau visual elements yang perlu memorable. Hindari unnecessary complexity. Contoh: Nike Swoosh, Apple logo, McDonald's arches. Simplicity = Memorability!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Law of Similarity Simulation - Tag Selection Interface
const SimilaritySimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, scenarioB, result
  const [startTimeA, setStartTimeA] = useState(0);
  const [startTimeB, setStartTimeB] = useState(0);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [selectedTagsA, setSelectedTagsA] = useState([]);
  const [selectedTagsB, setSelectedTagsB] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Tag data - mix of Urgent, Normal, and Low priority tags
  const tags = [
    { id: 1, label: 'Urgent', priority: 'urgent' },
    { id: 2, label: 'Normal', priority: 'normal' },
    { id: 3, label: 'Urgent', priority: 'urgent' },
    { id: 4, label: 'Low', priority: 'low' },
    { id: 5, label: 'Normal', priority: 'normal' },
    { id: 6, label: 'Urgent', priority: 'urgent' },
    { id: 7, label: 'Low', priority: 'low' },
    { id: 8, label: 'Normal', priority: 'normal' },
    { id: 9, label: 'Urgent', priority: 'urgent' },
    { id: 10, label: 'Low', priority: 'low' },
    { id: 11, label: 'Urgent', priority: 'urgent' },
    { id: 12, label: 'Normal', priority: 'normal' },
    { id: 13, label: 'Urgent', priority: 'urgent' },
    { id: 14, label: 'Low', priority: 'low' },
    { id: 15, label: 'Normal', priority: 'normal' },
  ];

  // Shuffle tags to make them appear random
  const shuffledTags = [...tags].sort(() => Math.random() - 0.5);
  
  // Count target tags (Urgent)
  const urgentCount = tags.filter(t => t.priority === 'urgent').length; // 6 urgent tags
  const targetIds = tags.filter(t => t.priority === 'urgent').map(t => t.id);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenarioA = () => {
    setStartTimeA(Date.now());
    setSelectedTagsA([]);
    fadeAnim.setValue(0);
    setPhase('scenarioA');
  };

  const startScenarioB = () => {
    setStartTimeB(Date.now());
    setSelectedTagsB([]);
    fadeAnim.setValue(0);
    setPhase('scenarioB');
  };

  const handleTagSelectA = (tagId) => {
    let newSelected;
    if (selectedTagsA.includes(tagId)) {
      // Deselect
      newSelected = selectedTagsA.filter(id => id !== tagId);
    } else {
      // Select
      newSelected = [...selectedTagsA, tagId];
    }
    setSelectedTagsA(newSelected);

    // Check if all urgent tags are selected
    const allUrgentSelected = targetIds.every(id => newSelected.includes(id));
    const onlyUrgentSelected = newSelected.every(id => targetIds.includes(id));
    
    if (allUrgentSelected && onlyUrgentSelected && newSelected.length === urgentCount) {
      // Success!
      const timeTaken = Date.now() - startTimeA;
      setTimeA(timeTaken);
      fadeAnim.setValue(0);
      setTimeout(() => startScenarioB(), 800);
    }
  };

  const handleTagSelectB = (tagId) => {
    let newSelected;
    if (selectedTagsB.includes(tagId)) {
      // Deselect
      newSelected = selectedTagsB.filter(id => id !== tagId);
    } else {
      // Select
      newSelected = [...selectedTagsB, tagId];
    }
    setSelectedTagsB(newSelected);

    // Check if all urgent tags are selected
    const allUrgentSelected = targetIds.every(id => newSelected.includes(id));
    const onlyUrgentSelected = newSelected.every(id => targetIds.includes(id));
    
    if (allUrgentSelected && onlyUrgentSelected && newSelected.length === urgentCount) {
      // Success!
      const timeTaken = Date.now() - startTimeB;
      setTimeB(timeTaken);
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 800);
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🎨 Law of Similarity
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 interface tag selection yang berbeda. Tugas Anda:{'\n'}
          {'\n'}🏷️ <Text style={{ fontWeight: '600' }}>Pilih SEMUA tag yang berlabel "Urgent"</Text>
          {'\n'}⏱️ Kecepatan dan efisiensi visual Anda akan diukur
          {'\n'}{'\n'}Ada {urgentCount} tag "Urgent" yang harus dipilih. Tap tag untuk select/deselect.
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Simulasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - No Visual Cue (All tags look the same - gray)
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Interface 1 - No Visual Cue
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🏷️ Pilih SEMUA tag <Text style={{ fontWeight: '700' }}>"Urgent"</Text> ({urgentCount} total)
        </Text>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Dipilih: {selectedTagsA.length} / {urgentCount}
          </Text>
        </View>

        {/* Tags Grid - All Gray (No Visual Similarity) */}
        <View style={styles.tagsContainer}>
          {shuffledTags.map((tag) => {
            const isSelected = selectedTagsA.includes(tag.id);
            return (
              <TouchableOpacity
                key={tag.id}
                style={[
                  styles.tagPillGray,
                  isSelected && styles.tagPillSelected,
                  { 
                    backgroundColor: isSelected ? colors.accent : '#9CA3AF',
                    borderColor: isSelected ? colors.accent : '#6B7280',
                  }
                ]}
                onPress={() => handleTagSelectA(tag.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tagText, { color: '#FFFFFF' }]}>
                  {tag.label}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFF" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  }

  // Scenario B - Visual Cue (Urgent tags are red, others gray)
  if (phase === 'scenarioB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Interface 2 - Visual Cue
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🏷️ Pilih SEMUA tag <Text style={{ fontWeight: '700' }}>"Urgent"</Text> ({urgentCount} total)
        </Text>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Dipilih: {selectedTagsB.length} / {urgentCount}
          </Text>
        </View>

        {/* Tags Grid - Color Coded (Visual Similarity) */}
        <View style={styles.tagsContainer}>
          {shuffledTags.map((tag) => {
            const isSelected = selectedTagsB.includes(tag.id);
            const isUrgent = tag.priority === 'urgent';
            
            // Color based on priority
            let bgColor = '#9CA3AF'; // Gray for Normal/Low
            let borderColor = '#6B7280';
            
            if (isUrgent) {
              bgColor = '#EF4444'; // Red for Urgent
              borderColor = '#DC2626';
            }
            
            if (isSelected) {
              bgColor = '#22C55E'; // Green when selected
              borderColor = '#16A34A';
            }

            return (
              <TouchableOpacity
                key={tag.id}
                style={[
                  styles.tagPillColored,
                  { 
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                  }
                ]}
                onPress={() => handleTagSelectB(tag.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tagText, { color: '#FFFFFF' }]}>
                  {tag.label}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={16} color="#FFF" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    // FIXED: Added safety checks to prevent crashes
    const speedImprovement = timeA > 0 ? ((timeA - timeB) / timeA * 100).toFixed(1) : '0.0';
    const isSimilarityFaster = timeB < timeA && timeA > 0;
    // FIXED: allTags was undefined - using urgentCount which is already defined
    const targetCount = urgentCount; // Already calculated at the top of the component

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Similarity Test
        </Text>

        {/* INTERFACE A CARD - No Visual Cue */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="eye-off-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                No Visual Cue
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Waktu</Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {timeA > 0 ? (timeA / 1000).toFixed(2) : '0.00'}s
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="search-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Search</Text>
                <Text style={[styles.metricValue, { color: '#EF4444', fontSize: 16 }]}>
                  Lambat
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="document-text-outline" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              Harus baca semua tag - Tidak ada pattern
            </Text>
          </View>
        </View>

        {/* INTERFACE B CARD - With Visual Cue */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="eye-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                With Visual Cue
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Waktu</Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {timeB > 0 ? (timeB / 1000).toFixed(2) : '0.00'}s
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="flash-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Search</Text>
                <Text style={[styles.metricValue, { color: '#22C55E', fontSize: 16 }]}>
                  Cepat
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="color-palette" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              Red tags instantly visible - Pre-attentive processing
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: isSimilarityFaster ? '#FEF3C7' : '#FEE2E2',
          borderColor: isSimilarityFaster ? '#FCD34D' : '#FCA5A5',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={isSimilarityFaster ? "trophy" : "information-circle"} 
              size={28} 
              color={isSimilarityFaster ? "#D97706" : "#DC2626"} 
            />
            <Text style={[styles.summaryTitle, { color: isSimilarityFaster ? '#92400E' : '#991B1B' }]}>
              {isSimilarityFaster ? '✅ Similarity Works!' : '🤔 Unexpected Result'}
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="speedometer-outline" size={18} color={isSimilarityFaster ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: isSimilarityFaster ? '#B45309' : '#991B1B' }]}>
                Kecepatan
              </Text>
              <Text style={[styles.comparisonValue, { color: isSimilarityFaster ? '#92400E' : '#7F1D1D', fontWeight: '700' }]}>
                {isSimilarityFaster ? '+' : ''}{Math.abs(parseFloat(speedImprovement) || 0).toFixed(1)}%
              </Text>
            </View>

            <View style={styles.comparisonItem}>
              <Ionicons name="eye" size={18} color={isSimilarityFaster ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: isSimilarityFaster ? '#B45309' : '#991B1B' }]}>
                Visual Search
              </Text>
              <Text style={[styles.comparisonValue, { color: isSimilarityFaster ? '#16A34A' : '#EF4444', fontWeight: '700', fontSize: 16 }]}>
                {isSimilarityFaster ? 'Efisien' : 'Lambat'}
              </Text>
            </View>
          </View>

          <Text style={[styles.summaryDescription, { color: isSimilarityFaster ? '#B45309' : '#991B1B' }]}>
            {isSimilarityFaster 
              ? `Visual cue membuat pencarian ${Math.abs(parseFloat(speedImprovement) || 0).toFixed(1)}% lebih cepat! Warna merah memungkinkan "pre-attentive processing" - user langsung spot target tanpa membaca teks.`
              : `No visual cue lebih cepat? Ini tidak biasa. Mungkin jumlah tags terlalu sedikit atau warna merah terlalu banyak sehingga tidak distinctive.`
            }
          </Text>
        </View>

        {/* EDUCATIONAL INSIGHT */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎨 Law of Similarity (Gestalt, 1923)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>Elements with similar visual characteristics are perceived as related or grouped together.</Text> Similarity creates patterns!{'\n'}
            {'\n'}📊 <Text style={{ fontWeight: '600' }}>Hasil Anda:</Text>
            {'\n'}• No Visual Cue: {(timeA / 1000).toFixed(2)}s - Linear search
            {'\n'}• With Visual Cue (Red): {(timeB / 1000).toFixed(2)}s - Instant recognition
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan visual similarity (color, shape, size, texture) untuk mengelompokkan related elements. Ini memungkinkan pre-attentive processing yang sangat cepat (kurang dari 250ms). Contoh: Status badges (green=active, red=error), Priority tags, Category colors, Icon families. Consistency is key!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Law of Uniform Connectedness Simulation - Process Stepper
const UniformConnectednessSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [ratingA, setRatingA] = useState(null);
  const [ratingB, setRatingB] = useState(null);
  const [confidenceA, setConfidenceA] = useState(0);
  const [confidenceB, setConfidenceB] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const lineAnim = useState(new Animated.Value(0))[0];

  const steps = [
    { id: 1, icon: 'person-outline', label: 'Account', color: '#3B82F6' },
    { id: 2, icon: 'card-outline', label: 'Payment', color: '#8B5CF6' },
    { id: 3, icon: 'checkmark-circle-outline', label: 'Complete', color: '#10B981' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [phase]);

  const startScenarioA = () => { fadeAnim.setValue(0); setPhase('scenarioA'); };
  
  const startScenarioB = () => {
    fadeAnim.setValue(0);
    lineAnim.setValue(0);
    setPhase('scenarioB');
    // Animasi garis mengisi dari 0 ke 100%
    Animated.timing(lineAnim, { toValue: 1, duration: 1000, useNativeDriver: false }).start();
  };

  const handleRatingA = (val) => { setRatingA(val); fadeAnim.setValue(0); setPhase('confidenceA'); };
  const handleConfidenceA = (val) => { setConfidenceA(val); fadeAnim.setValue(0); setTimeout(() => startScenarioB(), 300); };
  
  const handleRatingB = (val) => { setRatingB(val); fadeAnim.setValue(0); setPhase('confidenceB'); };
  const handleConfidenceB = (val) => { setConfidenceB(val); fadeAnim.setValue(0); setTimeout(() => setPhase('result'), 300); };

  // --- RENDER HELPERS ---
  const renderIntro = () => (
    <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>🔗 Law of Uniform Connectedness</Text>
      <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
        Tugas: Nilai apakah langkah-langkah berikut terlihat sebagai satu rangkaian proses yang terhubung.
      </Text>
      <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.accent }]} onPress={startScenarioA}>
        <Text style={styles.startButtonText}>Mulai Evaluasi</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );

  // SCENARIO A (Disconnected)
  if (phase === 'intro') return renderIntro();
  
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>Desain 1</Text>
        
        {/* Container Langkah */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 40, paddingHorizontal: 20 }}>
          {steps.map((step) => (
            <View key={step.id} style={{ alignItems: 'center', gap: 8, width: 60 }}>
              <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: step.color, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name={step.icon} size={28} color="#FFF" />
              </View>
              <Text style={{ fontSize: 12, color: colors.textPrimary, textAlign: 'center' }}>{step.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ratingSection}>
          <Text style={[styles.ratingQuestion, { color: colors.textPrimary }]}>Terlihat terhubung?</Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity style={[styles.ratingButton, { backgroundColor: '#EF4444' }]} onPress={() => handleRatingA(false)}><Text style={{color:'#fff'}}>Tidak</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.ratingButton, { backgroundColor: '#22C55E' }]} onPress={() => handleRatingA(true)}><Text style={{color:'#fff'}}>Ya</Text></TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  // SCENARIO B (Connected - THE FIX)
  if (phase === 'scenarioB') {
    // Interpolasi lebar: 0% -> 100% dari wadah garis
    const lineWidth = lineAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#166534', backgroundColor: '#DCFCE7' }]}>Desain 2</Text>

        {/* CONTAINER UTAMA (Relative) */}
        <View style={{ position: 'relative', paddingVertical: 40, paddingHorizontal: 20 }}>
          
          {/* === GARIS FIX PRESISI === */}
          <View style={{
            position: 'absolute',
            top: 65,     // (40 padding atas + 25 setengah tinggi icon) = 65. Pas tengah vertikal.
            left: 20 + 25, // (20 padding kiri container + 25 setengah lebar icon) = 45. Pas tengah icon kiri.
            right: 20 + 25, // (20 padding kanan container + 25 setengah lebar icon) = 45. Pas tengah icon kanan.
            height: 4,
            zIndex: -1,   // Di belakang lingkaran
          }}>
            {/* Track Abu-abu */}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#E5E7EB', position: 'absolute' }} />
            {/* Progress Berwarna */}
            <Animated.View style={{ height: '100%', width: lineWidth, backgroundColor: colors.accent }} />
          </View>

          {/* Steps (Lingkaran) */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {steps.map((step) => (
              <View key={step.id} style={{ alignItems: 'center', gap: 8, width: 60 }}>
                {/* Background Putih di luar lingkaran agar garis tidak terlihat 'menembus' icon jika transparan */}
                <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: step.color, justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
                        <Ionicons name={step.icon} size={28} color="#FFF" />
                    </View>
                </View>
                <Text style={{ fontSize: 12, color: colors.textPrimary, textAlign: 'center' }}>{step.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ratingSection}>
          <Text style={[styles.ratingQuestion, { color: colors.textPrimary }]}>Terlihat terhubung?</Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity style={[styles.ratingButton, { backgroundColor: '#EF4444' }]} onPress={() => handleRatingB(false)}><Text style={{color:'#fff'}}>Tidak</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.ratingButton, { backgroundColor: '#22C55E' }]} onPress={() => handleRatingB(true)}><Text style={{color:'#fff'}}>Ya</Text></TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  // CONFIDENCE & RESULT SCREENS
  if (phase === 'confidenceA' || phase === 'confidenceB') {
    const isA = phase === 'confidenceA';
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>Seberapa yakin Anda?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 20 }}>
          {[1, 2, 3, 4, 5].map((conf) => (
            <TouchableOpacity key={conf} style={{ width: 45, height: 45, borderRadius: 25, backgroundColor: isA ? colors.accent : '#22C55E', justifyContent: 'center', alignItems: 'center' }} 
              onPress={() => isA ? handleConfidenceA(conf) : handleConfidenceB(conf)}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{conf}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  if (phase === 'result') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>📊 Hasil</Text>
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle, padding: 20, borderRadius: 12 }]}>
          <Text style={[styles.resultText, { color: colors.accent, fontWeight: 'bold', marginBottom: 10 }]}>Law of Uniform Connectedness</Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary, lineHeight: 20 }]}>
            Elemen yang terhubung secara visual (garis) dipersepsikan lebih terkait daripada elemen tanpa koneksi.
          </Text>
          <TouchableOpacity style={[styles.completeBtn, { backgroundColor: '#22C55E', marginTop: 20 }]} onPress={onComplete}>
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Miller's Law Simulation - OTP Code Memorization
const MillersLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, countdownA, showA, recallA, countdownB, showB, recallB, result
  const [countdown, setCountdown] = useState(3);
  const [code, setCode] = useState('');
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [accuracyA, setAccuracyA] = useState(0);
  const [accuracyB, setAccuracyB] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0))[0];
  const inputRef = React.useRef(null);

  // Generate random 9-digit code (same for both scenarios)
  useEffect(() => {
    const randomCode = Math.floor(100000000 + Math.random() * 900000000).toString();
    setCode(randomCode);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-focus input when in recall phase
    if ((phase === 'recallA' || phase === 'recallB') && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [phase]);

  const startCountdownA = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0);
    setCountdown(3);
    setInputA('');
    setPhase('countdownA');
    
    let count = 3;
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0);
        setPhase('showA');
        
        // Show code for 3 seconds then move to recall
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('recallA');
        }, 3000);
      }
    }, 1000);
  };

  const startCountdownB = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0);
    setCountdown(3);
    setInputB('');
    setPhase('countdownB');
    
    let count = 3;
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0);
        setPhase('showB');
        
        // Show code for 3 seconds then move to recall
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('recallB');
        }, 3000);
      }
    }, 1000);
  };

  const calculateAccuracy = (input, correct) => {
    if (!input || input.length === 0) return 0;
    
    // Remove any spaces from input
    const cleanInput = input.replace(/\s/g, '');
    const correctDigits = correct.split('');
    const inputDigits = cleanInput.split('');
    
    let correctCount = 0;
    const minLength = Math.min(correctDigits.length, inputDigits.length);
    
    // Compare digit by digit
    for (let i = 0; i < minLength; i++) {
      if (correctDigits[i] === inputDigits[i]) {
        correctCount++;
      }
    }
    
    return Math.round((correctCount / correctDigits.length) * 100);
  };

  const handleSubmitA = () => {
    const accuracy = calculateAccuracy(inputA, code);
    setAccuracyA(accuracy);
    fadeAnim.setValue(0);
    setTimeout(() => startCountdownB(), 500);
  };

  const handleSubmitB = () => {
    const accuracy = calculateAccuracy(inputB, code);
    setAccuracyB(accuracy);
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 500);
  };

  // Format code with chunks
  const formatChunked = (str) => {
    return `${str.slice(0, 3)} ${str.slice(3, 6)} ${str.slice(6, 9)}`;
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🧠 Miller's Law (7±2)
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Tes kapasitas memori kerja Anda! Anda akan:{'\n'}
          {'\n'}👁️ <Text style={{ fontWeight: '600' }}>Melihat kode 9 digit selama 3 detik</Text>
          {'\n'}✍️ <Text style={{ fontWeight: '600' }}>Mengingat dan mengetik kode tersebut</Text>
          {'\n'}📊 <Text style={{ fontWeight: '600' }}>Akurasi recall Anda akan diukur</Text>
          {'\n'}{'\n'}Kode yang sama akan ditampilkan dengan 2 format berbeda. Bersiaplah untuk fokus!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startCountdownA}
        >
          <Text style={styles.startButtonText}>Mulai Tes Memori</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Countdown Phase A
  if (phase === 'countdownA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Format 1 - Unchunked
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Siapkan memori Anda...
        </Text>
        
        <View style={styles.countdownContainer}>
          <Animated.Text 
            style={[
              styles.countdownNumber,
              { 
                color: colors.accent,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {countdown}
          </Animated.Text>
        </View>
      </Animated.View>
    );
  }

  // Show Code A (Unchunked)
  if (phase === 'showA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Format 1 - HAFALKAN KODE INI!
        </Text>
        
        {/* FIXED: Clean OTP display without ugly background box */}
        <Animated.View 
          style={[
            styles.codeDisplayContainerClean,
            { 
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={[styles.codeTextUnchunked, { color: colors.textPrimary }]}>
            {code}
          </Text>
          <View style={[styles.codeUnderline, { backgroundColor: colors.accent }]} />
        </Animated.View>

        <View style={styles.timerHint}>
          <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
          <Text style={[styles.timerText, { color: colors.textSecondary }]}>
            Kode akan hilang dalam 3 detik...
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Recall Phase A
  if (phase === 'recallA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Format 1 - Recall
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Ketik kode yang baru saja Anda lihat
        </Text>

        <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <TextInput
            ref={inputRef}
            style={[styles.codeInput, { color: colors.textPrimary }]}
            value={inputA}
            onChangeText={setInputA}
            keyboardType="number-pad"
            maxLength={9}
            placeholder="Masukkan 9 digit"
            placeholderTextColor={colors.textSecondary}
          />
          <Text style={[styles.digitCounter, { color: colors.textSecondary }]}>
            {inputA.replace(/\s/g, '').length}/9 digit
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { 
              backgroundColor: inputA.replace(/\s/g, '').length >= 9 ? colors.accent : '#D1D5DB',
              opacity: inputA.replace(/\s/g, '').length >= 9 ? 1 : 0.6
            }
          ]}
          onPress={handleSubmitA}
          disabled={inputA.replace(/\s/g, '').length < 9}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Countdown Phase B
  if (phase === 'countdownB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Format 2 - Chunked
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Siapkan memori Anda...
        </Text>
        
        <View style={styles.countdownContainer}>
          <Animated.Text 
            style={[
              styles.countdownNumber,
              { 
                color: '#22C55E',
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {countdown}
          </Animated.Text>
        </View>
      </Animated.View>
    );
  }

  // Show Code B (Chunked)
  if (phase === 'showB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Format 2 - HAFALKAN KODE INI!
        </Text>
        
        {/* FIXED: Clean OTP display without ugly background box */}
        <Animated.View 
          style={[
            styles.codeDisplayContainerClean,
            { 
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={[styles.codeTextChunked, { color: colors.textPrimary }]}>
            {formatChunked(code)}
          </Text>
          <View style={[styles.codeUnderline, { backgroundColor: '#22C55E' }]} />
        </Animated.View>

        <View style={styles.timerHint}>
          <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
          <Text style={[styles.timerText, { color: colors.textSecondary }]}>
            Kode akan hilang dalam 3 detik...
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Recall Phase B
  if (phase === 'recallB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Format 2 - Recall
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Ketik kode yang baru saja Anda lihat
        </Text>

        <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <TextInput
            ref={inputRef}
            style={[styles.codeInput, { color: colors.textPrimary }]}
            value={inputB}
            onChangeText={setInputB}
            keyboardType="number-pad"
            maxLength={9}
            placeholder="Masukkan 9 digit"
            placeholderTextColor={colors.textSecondary}
          />
          <Text style={[styles.digitCounter, { color: colors.textSecondary }]}>
            {inputB.replace(/\s/g, '').length}/9 digit
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            { 
              backgroundColor: inputB.replace(/\s/g, '').length >= 9 ? '#22C55E' : '#D1D5DB',
              opacity: inputB.replace(/\s/g, '').length >= 9 ? 1 : 0.6
            }
          ]}
          onPress={handleSubmitB}
          disabled={inputB.replace(/\s/g, '').length < 9}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const improvement = accuracyB - accuracyA;
    const isChunkingBetter = accuracyB > accuracyA;
    const improvementPercent = Math.abs(improvement);

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Miller's Law Test
        </Text>

        {/* FIXED: Show Correct Code with Clean Typography */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={[styles.correctCodeLabel, { color: colors.textSecondary, fontSize: 12, marginBottom: 8 }]}>
            Kode yang benar:
          </Text>
          <Text style={[styles.codeTextChunked, { color: colors.textPrimary, fontSize: 32, letterSpacing: 8 }]}>
            {formatChunked(code)}
          </Text>
        </View>

        {/* FORMAT 1 CARD - Unchunked */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="remove-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Format 1 (Unchunked)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="text-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Jawaban Anda</Text>
                <Text style={[styles.metricValue, { color: '#EF4444', fontFamily: 'monospace', fontSize: 18 }]}>
                  {inputA.replace(/\s/g, '') || '-'}
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={accuracyA >= 70 ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={accuracyA >= 70 ? "#22C55E" : "#EF4444"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Akurasi</Text>
                <Text style={[styles.metricValue, { color: accuracyA >= 70 ? '#22C55E' : '#EF4444' }]}>
                  {accuracyA}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="alert-circle-outline" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              9 digit terpisah - Overload memori kerja
            </Text>
          </View>
        </View>

        {/* FORMAT 2 CARD - Chunked */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="grid-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Format 2 (Chunked)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="text-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Jawaban Anda</Text>
                <Text style={[styles.metricValue, { color: '#22C55E', fontFamily: 'monospace', fontSize: 18 }]}>
                  {inputB.replace(/\s/g, '') || '-'}
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={accuracyB >= 70 ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={accuracyB >= 70 ? "#22C55E" : "#EF4444"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Akurasi</Text>
                <Text style={[styles.metricValue, { color: accuracyB >= 70 ? '#22C55E' : '#EF4444' }]}>
                  {accuracyB}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="checkmark-done" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              3 chunks @ 3 digit - Sesuai kapasitas memori
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: isChunkingBetter ? '#FEF3C7' : '#FEE2E2',
          borderColor: isChunkingBetter ? '#FCD34D' : '#FCA5A5',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={isChunkingBetter ? "trophy" : "information-circle"} 
              size={28} 
              color={isChunkingBetter ? "#D97706" : "#DC2626"} 
            />
            <Text style={[styles.summaryTitle, { color: isChunkingBetter ? '#92400E' : '#991B1B' }]}>
              {isChunkingBetter ? '🧠 Miller\'s Law Confirmed!' : '🤔 Unexpected Result'}
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="trending-up" size={18} color={isChunkingBetter ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: isChunkingBetter ? '#B45309' : '#991B1B' }]}>
                Peningkatan
              </Text>
              <Text style={[styles.comparisonValue, { color: isChunkingBetter ? '#92400E' : '#7F1D1D', fontWeight: '700' }]}>
                {improvement > 0 ? '+' : ''}{improvement}%
              </Text>
            </View>

            <View style={styles.comparisonItem}>
              <Ionicons name="medal" size={18} color={isChunkingBetter ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: isChunkingBetter ? '#B45309' : '#991B1B' }]}>
                Format Terbaik
              </Text>
              <Text style={[styles.comparisonValue, { color: isChunkingBetter ? '#16A34A' : '#EF4444', fontWeight: '700', fontSize: 14 }]}>
                {isChunkingBetter ? 'Chunked' : 'Unchunked'}
              </Text>
            </View>
          </View>

          <Text style={[styles.summaryDescription, { color: isChunkingBetter ? '#B45309' : '#991B1B' }]}>
            {isChunkingBetter 
              ? `Chunking meningkatkan akurasi ${improvementPercent}%! Format "839 201 574" membagi 9 digit menjadi 3 chunks, membuat informasi lebih mudah diingat sesuai kapasitas memori kerja manusia (7±2 chunks).`
              : `Hasil tidak biasa. Biasanya chunking meningkatkan recall. Mungkin Anda lebih terbiasa dengan angka panjang atau sudah memiliki strategi mnemonic sendiri.`
            }
          </Text>
        </View>

        {/* Educational Content */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🧠 Miller's Law (7±2)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '600' }}>George Miller (1956)</Text> menemukan bahwa memori kerja manusia hanya dapat menyimpan 7±2 "chunks" informasi sekaligus.
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Chunking Strategy:</Text> Mengelompokkan informasi panjang menjadi unit-unit bermakna. Contoh: 0812-3456-7890 lebih mudah diingat daripada 081234567890.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text>
            {'\n'}• Kelompokkan nomor telepon, kartu kredit, OTP code
            {'\n'}• Gunakan 3-4 digit per chunk untuk optimal recall
            {'\n'}• Tambahkan spasi atau separator visual (-, •, /)
            {'\n'}• Menu navigasi: maksimal 7 item utama
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Occam's Razor Simulation - Search Interface
const OccamsRazorSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, scenarioB, result
  const [startTimeA, setStartTimeA] = useState(0);
  const [startTimeB, setStartTimeB] = useState(0);
  const [firstActionTimeA, setFirstActionTimeA] = useState(0);
  const [firstActionTimeB, setFirstActionTimeB] = useState(0);
  const [searchInputA, setSearchInputA] = useState('');
  const [searchInputB, setSearchInputB] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const inputRefA = React.useRef(null);
  const inputRefB = React.useRef(null);

  // Complex scenario states
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('all');
  const [statusPending, setStatusPending] = useState(false);
  const [statusCompleted, setStatusCompleted] = useState(false);
  const [statusCancelled, setStatusCancelled] = useState(false);

  const targetOrderId = '505';

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenarioA = () => {
    fadeAnim.setValue(0);
    setSearchInputA('');
    setDateFrom('');
    setDateTo('');
    setCategory('all');
    setStatusPending(false);
    setStatusCompleted(false);
    setStatusCancelled(false);
    setPhase('scenarioA');
    setStartTimeA(Date.now());
  };

  const startScenarioB = () => {
    fadeAnim.setValue(0);
    setSearchInputB('');
    setPhase('scenarioB');
    setStartTimeB(Date.now());
  };

  const handleFirstActionA = () => {
    if (firstActionTimeA === 0) {
      const hesitationTime = Date.now() - startTimeA;
      setFirstActionTimeA(hesitationTime);
    }
  };

  const handleFirstActionB = () => {
    if (firstActionTimeB === 0) {
      const hesitationTime = Date.now() - startTimeB;
      setFirstActionTimeB(hesitationTime);
    }
  };

  const handleSearchA = () => {
    // Check if they found the order
    if (searchInputA.includes(targetOrderId) || searchInputA === targetOrderId) {
      fadeAnim.setValue(0);
      setTimeout(() => startScenarioB(), 500);
    }
  };

  const handleSearchB = () => {
    // Check if they found the order
    if (searchInputB.includes(targetOrderId) || searchInputB === targetOrderId) {
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 500);
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🪒 Occam's Razor
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan menggunakan 2 interface pencarian yang berbeda. Tugas Anda:{'\n'}
          {'\n'}🔍 <Text style={{ fontWeight: '600' }}>Cari Order ID #505</Text>
          {'\n'}⏱️ <Text style={{ fontWeight: '600' }}>Waktu hesitasi dan kompleksitas akan diukur</Text>
          {'\n'}{'\n'}Perhatikan berapa lama Anda butuh untuk mulai mengetik pada setiap interface.
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Pencarian</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - Complex Search Interface
  if (phase === 'scenarioA') {
    const elementCount = 18; // Many UI elements: labels, inputs, checkboxes, buttons, etc.

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Interface 1 - Advanced Search
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🔍 Cari Order ID <Text style={{ fontWeight: '700' }}>#505</Text>
        </Text>

        {/* Complex Search Interface with Many Filters */}
        <View style={[styles.searchFormComplex, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          {/* Date Range Filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>
              📅 Date Range
            </Text>
            <View style={styles.dateRow}>
              <View style={styles.dateInputWrapper}>
                <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>From</Text>
                <TextInput
                  style={[styles.filterInput, { color: colors.textPrimary, borderColor: colors.border }]}
                  value={dateFrom}
                  onChangeText={(text) => { setDateFrom(text); handleFirstActionA(); }}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={colors.textSecondary}
                  onFocus={handleFirstActionA}
                />
              </View>
              <View style={styles.dateInputWrapper}>
                <Text style={[styles.dateLabel, { color: colors.textSecondary }]}>To</Text>
                <TextInput
                  style={[styles.filterInput, { color: colors.textPrimary, borderColor: colors.border }]}
                  value={dateTo}
                  onChangeText={(text) => { setDateTo(text); handleFirstActionA(); }}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={colors.textSecondary}
                  onFocus={handleFirstActionA}
                />
              </View>
            </View>
          </View>

          {/* Category Dropdown */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>
              📦 Category
            </Text>
            <View style={styles.dropdownButtons}>
              {['all', 'electronics', 'clothing', 'food', 'books'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.dropdownOption,
                    { 
                      backgroundColor: category === cat ? colors.accent : '#F3F4F6',
                      borderColor: category === cat ? colors.accent : '#D1D5DB',
                    }
                  ]}
                  onPress={() => { setCategory(cat); handleFirstActionA(); }}
                >
                  <Text style={[styles.dropdownText, { color: category === cat ? '#FFF' : colors.textSecondary }]}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Status Checkboxes */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>
              📊 Status
            </Text>
            <View style={styles.checkboxGroup}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => { setStatusPending(!statusPending); handleFirstActionA(); }}
              >
                <View style={[styles.checkbox, { borderColor: colors.border }]}>
                  {statusPending && <Ionicons name="checkmark" size={16} color={colors.accent} />}
                </View>
                <Text style={[styles.checkboxLabel, { color: colors.textPrimary }]}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => { setStatusCompleted(!statusCompleted); handleFirstActionA(); }}
              >
                <View style={[styles.checkbox, { borderColor: colors.border }]}>
                  {statusCompleted && <Ionicons name="checkmark" size={16} color={colors.accent} />}
                </View>
                <Text style={[styles.checkboxLabel, { color: colors.textPrimary }]}>Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => { setStatusCancelled(!statusCancelled); handleFirstActionA(); }}
              >
                <View style={[styles.checkbox, { borderColor: colors.border }]}>
                  {statusCancelled && <Ionicons name="checkmark" size={16} color={colors.accent} />}
                </View>
                <Text style={[styles.checkboxLabel, { color: colors.textPrimary }]}>Cancelled</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Input (buried at the bottom) */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>
              🔎 Order ID or Keywords
            </Text>
            <TextInput
              ref={inputRefA}
              style={[styles.searchInputComplex, { color: colors.textPrimary, borderColor: colors.border }]}
              value={searchInputA}
              onChangeText={(text) => { setSearchInputA(text); handleFirstActionA(); }}
              placeholder="Enter order ID..."
              placeholderTextColor={colors.textSecondary}
              onFocus={handleFirstActionA}
            />
          </View>

          {/* Search Button */}
          <TouchableOpacity
            style={[styles.searchButtonComplex, { backgroundColor: colors.accent }]}
            onPress={handleSearchA}
          >
            <Ionicons name="search" size={20} color="#FFF" />
            <Text style={styles.searchButtonText}>Search Orders</Text>
          </TouchableOpacity>

          {/* Element Counter */}
          <View style={styles.complexityBadge}>
            <Text style={[styles.complexityText, { color: colors.textSecondary }]}>
              {elementCount} UI Elements
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  // Scenario B - Simple Search Interface
  if (phase === 'scenarioB') {
    const elementCount = 2; // Just input and button

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Interface 2 - Simple Search
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🔍 Cari Order ID <Text style={{ fontWeight: '700' }}>#505</Text>
        </Text>

        {/* Simple Search Interface */}
        <View style={styles.searchFormSimple}>
          <View style={[styles.simpleSearchCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Ionicons name="search" size={28} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              ref={inputRefB}
              style={[styles.searchInputSimple, { color: colors.textPrimary }]}
              value={searchInputB}
              onChangeText={(text) => { setSearchInputB(text); handleFirstActionB(); }}
              placeholder="Search anything... (Order ID, product, customer)"
              placeholderTextColor={colors.textSecondary}
              onFocus={handleFirstActionB}
              autoFocus={true}
            />
          </View>

          <TouchableOpacity
            style={[styles.searchButtonSimple, { backgroundColor: '#22C55E' }]}
            onPress={handleSearchB}
          >
            <Text style={styles.searchButtonText}>Search</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          {/* Element Counter */}
          <View style={[styles.complexityBadge, { marginTop: 24 }]}>
            <Text style={[styles.complexityText, { color: colors.textSecondary }]}>
              {elementCount} UI Elements
            </Text>
          </View>

          {/* Helpful hint */}
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            💡 Tip: Just type the order ID directly
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const elementReduction = ((18 - 2) / 18 * 100).toFixed(0);
    const hesitationImprovement = firstActionTimeA > 0 && firstActionTimeB > 0 
      ? ((firstActionTimeA - firstActionTimeB) / firstActionTimeA * 100).toFixed(1)
      : 0;
    const fasterInterface = firstActionTimeB < firstActionTimeA ? 'Interface 2 (Simple)' : 'Interface 1 (Complex)';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Analisis
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Hesitasi Interface 1:
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {(firstActionTimeA / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🧠 Elemen UI Interface 1:
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              18 elements (High)
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Hesitasi Interface 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {(firstActionTimeB / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🧠 Elemen UI Interface 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              2 elements (Low)
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📉 Reduksi Kompleksitas:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              -{elementReduction}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🚀 Peningkatan Kecepatan:
            </Text>
            <Text style={[styles.statValue, { color: hesitationImprovement > 0 ? '#22C55E' : colors.textPrimary }]}>
              {hesitationImprovement > 0 ? '+' : ''}{hesitationImprovement}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Interface Tercepat:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {fasterInterface}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🪒 Occam's Razor (Simplicity Principle)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Solusi paling sederhana biasanya yang terbaik! Interface kompleks dengan 18 elemen membuat Anda ragu-ragu ({(firstActionTimeA/1000).toFixed(2)}s hesitasi).
            {'\n'}{'\n'}
            Interface sederhana dengan hanya 2 elemen membuat Anda langsung bertindak ({(firstActionTimeB/1000).toFixed(2)}s hesitasi). Kompleksitas dikurangi {elementReduction}%, cognitive load berkurang drastis!
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Jangan tampilkan semua opsi sekaligus. Mulai dengan interface sederhana, tambahkan kompleksitas hanya jika dibutuhkan (progressive disclosure).
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Parkinson's Law Simulation - Input Field Challenge
const ParkinsonsLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, scenarioB, result
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [timeRemainingA, setTimeRemainingA] = useState(60);
  const [timeRemainingB, setTimeRemainingB] = useState(5);
  const [startTimeA, setStartTimeA] = useState(0);
  const [startTimeB, setStartTimeB] = useState(0);
  const [completionTimeA, setCompletionTimeA] = useState(0);
  const [completionTimeB, setCompletionTimeB] = useState(0);
  const [completedA, setCompletedA] = useState(false);
  const [completedB, setCompletedB] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const inputRefA = React.useRef(null);
  const inputRefB = React.useRef(null);
  const timerRefA = React.useRef(null);
  const timerRefB = React.useRef(null);

  const targetPhrase = "I accept the terms";

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  useEffect(() => {
    // Cleanup timers on unmount
    return () => {
      if (timerRefA.current) clearInterval(timerRefA.current);
      if (timerRefB.current) clearInterval(timerRefB.current);
    };
  }, []);

  const startScenarioA = () => {
    fadeAnim.setValue(0);
    setInputA('');
    setTimeRemainingA(60);
    setCompletedA(false);
    setStartTimeA(Date.now());
    setPhase('scenarioA');

    // Start countdown timer
    timerRefA.current = setInterval(() => {
      setTimeRemainingA((prev) => {
        if (prev <= 1) {
          clearInterval(timerRefA.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-focus input
    setTimeout(() => inputRefA.current?.focus(), 500);
  };

  const startScenarioB = () => {
    fadeAnim.setValue(0);
    setInputB('');
    setTimeRemainingB(5);
    setCompletedB(false);
    setStartTimeB(Date.now());
    setPhase('scenarioB');

    // Start countdown timer
    timerRefB.current = setInterval(() => {
      setTimeRemainingB((prev) => {
        if (prev <= 1) {
          clearInterval(timerRefB.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-focus input
    setTimeout(() => inputRefB.current?.focus(), 500);
  };

  const handleInputChangeA = (text) => {
    setInputA(text);
    
    // Check if completed
    if (text.toLowerCase() === targetPhrase.toLowerCase() && !completedA) {
      const timeTaken = Date.now() - startTimeA;
      setCompletionTimeA(timeTaken);
      setCompletedA(true);
      clearInterval(timerRefA.current);
      
      // Move to next scenario after brief delay
      setTimeout(() => {
        fadeAnim.setValue(0);
        setTimeout(() => startScenarioB(), 300);
      }, 1000);
    }
  };

  const handleInputChangeB = (text) => {
    setInputB(text);
    
    // Check if completed
    if (text.toLowerCase() === targetPhrase.toLowerCase() && !completedB) {
      const timeTaken = Date.now() - startTimeB;
      setCompletionTimeB(timeTaken);
      setCompletedB(true);
      clearInterval(timerRefB.current);
      
      // Move to result after brief delay
      setTimeout(() => {
        fadeAnim.setValue(0);
        setTimeout(() => setPhase('result'), 300);
      }, 1000);
    }
  };

  const calculateTypingSpeed = (completionTime, phraseLength) => {
    if (completionTime === 0) return 0;
    const minutes = completionTime / 60000; // Convert ms to minutes
    return Math.round((phraseLength / minutes));
  };

  // Auto-advance if time runs out
  useEffect(() => {
    if (phase === 'scenarioA' && timeRemainingA === 0 && !completedA) {
      setTimeout(() => {
        fadeAnim.setValue(0);
        setTimeout(() => startScenarioB(), 300);
      }, 1000);
    }
  }, [timeRemainingA, phase, completedA]);

  useEffect(() => {
    if (phase === 'scenarioB' && timeRemainingB === 0 && !completedB) {
      setTimeout(() => {
        fadeAnim.setValue(0);
        setTimeout(() => setPhase('result'), 300);
      }, 1000);
    }
  }, [timeRemainingB, phase, completedB]);

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          ⏰ Parkinson's Law
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          "Pekerjaan mengembang untuk mengisi waktu yang tersedia." Anda akan mengetik frasa yang sama dengan 2 batasan waktu berbeda:{'\n'}
          {'\n'}✍️ <Text style={{ fontWeight: '600' }}>Ketik: "{targetPhrase}"</Text>
          {'\n'}⏱️ <Text style={{ fontWeight: '600' }}>Scenario 1: 60 detik (waktu berlimpah)</Text>
          {'\n'}⚡ <Text style={{ fontWeight: '600' }}>Scenario 2: 5 detik (tekanan waktu)</Text>
          {'\n'}{'\n'}📊 Kecepatan mengetik dan completion rate Anda akan diukur. Hipotesis: Anda akan mengetik lebih cepat dengan waktu terbatas!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Challenge</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - Relaxed (60 seconds)
  if (phase === 'scenarioA') {
    const timerColor = timeRemainingA > 30 ? '#22C55E' : timeRemainingA > 10 ? '#F59E0B' : '#EF4444';
    const progress = (60 - timeRemainingA) / 60;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Scenario 1 - Relaxed
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          ✍️ Ketik frasa: <Text style={{ fontWeight: '700' }}>"{targetPhrase}"</Text>
        </Text>

        {/* Timer Display - Large and Prominent */}
        <View style={[styles.timerContainer, { borderColor: timerColor }]}>
          <Ionicons name="timer-outline" size={32} color={timerColor} />
          <Text style={[styles.timerLarge, { color: timerColor }]}>
            {timeRemainingA}s
          </Text>
          <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>
            {timeRemainingA > 30 ? 'Santai saja...' : timeRemainingA > 10 ? 'Masih banyak waktu' : 'Waktunya hampir habis!'}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBarContainer, { backgroundColor: '#F3F4F6' }]}>
          <Animated.View 
            style={[
              styles.progressBarFill,
              { 
                width: `${progress * 100}%`,
                backgroundColor: timerColor 
              }
            ]} 
          />
        </View>

        {/* Input Field */}
        <View style={[styles.typingContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <TextInput
            ref={inputRefA}
            style={[styles.typingInput, { color: colors.textPrimary }]}
            value={inputA}
            onChangeText={handleInputChangeA}
            placeholder={`Ketik: ${targetPhrase}`}
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
          />
          
          {/* Character Counter */}
          <View style={styles.counterRow}>
            <Text style={[styles.counterText, { color: colors.textSecondary }]}>
              {inputA.length} / {targetPhrase.length} karakter
            </Text>
            {completedA && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                <Text style={styles.completedText}>Selesai!</Text>
              </View>
            )}
          </View>
        </View>

        {/* Target Reference */}
        <View style={[styles.referenceBox, { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }]}>
          <Text style={[styles.referenceLabel, { color: colors.textSecondary }]}>
            Target:
          </Text>
          <Text style={[styles.referenceText, { color: colors.textPrimary }]}>
            {targetPhrase}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Scenario B - Urgent (5 seconds)
  if (phase === 'scenarioB') {
    const timerColor = timeRemainingB > 2 ? '#F59E0B' : '#EF4444';
    const progress = (5 - timeRemainingB) / 5;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#EF4444', backgroundColor: '#FEE2E2' }]}>
          Scenario 2 - Urgent ⚡
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          ✍️ Ketik frasa: <Text style={{ fontWeight: '700' }}>"{targetPhrase}"</Text>
        </Text>

        {/* Timer Display - Urgent Style */}
        <View style={[styles.timerContainer, { borderColor: timerColor, backgroundColor: '#FEF2F2' }]}>
          <Ionicons name="alarm-outline" size={32} color={timerColor} />
          <Text style={[styles.timerLarge, { color: timerColor }]}>
            {timeRemainingB}s
          </Text>
          <Text style={[styles.timerLabel, { color: timerColor, fontWeight: '700' }]}>
            CEPAT! ⚡
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBarContainer, { backgroundColor: '#F3F4F6' }]}>
          <Animated.View 
            style={[
              styles.progressBarFill,
              { 
                width: `${progress * 100}%`,
                backgroundColor: timerColor 
              }
            ]} 
          />
        </View>

        {/* Input Field */}
        <View style={[styles.typingContainer, { backgroundColor: colors.cardBackground, borderColor: timerColor, borderWidth: 2 }]}>
          <TextInput
            ref={inputRefB}
            style={[styles.typingInput, { color: colors.textPrimary }]}
            value={inputB}
            onChangeText={handleInputChangeB}
            placeholder={`Ketik: ${targetPhrase}`}
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
          />
          
          {/* Character Counter */}
          <View style={styles.counterRow}>
            <Text style={[styles.counterText, { color: colors.textSecondary }]}>
              {inputB.length} / {targetPhrase.length} karakter
            </Text>
            {completedB && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                <Text style={styles.completedText}>Selesai!</Text>
              </View>
            )}
          </View>
        </View>

        {/* Target Reference */}
        <View style={[styles.referenceBox, { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }]}>
          <Text style={[styles.referenceLabel, { color: colors.textSecondary }]}>
            Target:
          </Text>
          <Text style={[styles.referenceText, { color: colors.textPrimary }]}>
            {targetPhrase}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const speedA = calculateTypingSpeed(completionTimeA, targetPhrase.length);
    const speedB = calculateTypingSpeed(completionTimeB, targetPhrase.length);
    const speedImprovement = speedB > speedA ? ((speedB - speedA) / speedA * 100).toFixed(1) : 0;
    const fasterScenario = speedB > speedA ? 'Scenario 2 (Urgent)' : speedA > speedB ? 'Scenario 1 (Relaxed)' : 'Keduanya Sama';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Challenge
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Scenario 1 (60s limit):
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {completedA ? `${(completionTimeA / 1000).toFixed(1)}s` : 'Tidak selesai'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⚡ Kecepatan Ketik 1:
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {completedA ? `${speedA} char/min` : '0 char/min'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Completion Rate 1:
            </Text>
            <Text style={[styles.statValue, { color: completedA ? '#22C55E' : '#EF4444' }]}>
              {completedA ? '100%' : '0%'}
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Scenario 2 (5s limit):
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              {completedB ? `${(completionTimeB / 1000).toFixed(1)}s` : 'Tidak selesai'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⚡ Kecepatan Ketik 2:
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              {completedB ? `${speedB} char/min` : '0 char/min'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Completion Rate 2:
            </Text>
            <Text style={[styles.statValue, { color: completedB ? '#22C55E' : '#EF4444' }]}>
              {completedB ? '100%' : '0%'}
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📈 Peningkatan Kecepatan:
            </Text>
            <Text style={[styles.statValue, { color: speedImprovement > 0 ? '#22C55E' : colors.textPrimary }]}>
              {speedImprovement > 0 ? `+${speedImprovement}%` : 'N/A'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Scenario Tercepat:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {fasterScenario}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⏰ Parkinson's Law
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            "Pekerjaan mengembang untuk mengisi waktu yang tersedia untuk penyelesaiannya."
            {'\n'}{'\n'}
            {speedB > speedA 
              ? `Hipotesis terbukti! Anda mengetik ${speedImprovement}% lebih cepat dengan tekanan waktu (5 detik) dibanding waktu berlimpah (60 detik). Deadline yang ketat memaksa kita fokus dan efisien.`
              : completedA && !completedB
              ? `Dengan 60 detik Anda berhasil, tapi dengan 5 detik tidak selesai. Ini menunjukkan batasan waktu terlalu ketat bisa kontraproduktif. Balance is key!`
              : 'Waktu yang terlalu banyak membuat kita santai dan tidak efisien. Deadline yang realistis membantu produktivitas.'
            }
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Berikan deadline yang cukup ketat tapi realistis. Terlalu longgar = procrastination. Terlalu ketat = stress. Gunakan progress indicators dan countdown untuk menciptakan healthy urgency.
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Postel's Law Simulation - Currency Input Form
const PostelsLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, scenarioB, result
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [errorCountA, setErrorCountA] = useState(0);
  const [successA, setSuccessA] = useState(false);
  const [successB, setSuccessB] = useState(false);
  const [showErrorA, setShowErrorA] = useState(false);
  const [formattedValueB, setFormattedValueB] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const shakeAnim = useState(new Animated.Value(0))[0];
  const inputRefA = React.useRef(null);
  const inputRefB = React.useRef(null);

  const targetAmount = '50000';

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenarioA = () => {
    fadeAnim.setValue(0);
    setInputA('');
    setErrorCountA(0);
    setSuccessA(false);
    setShowErrorA(false);
    setPhase('scenarioA');
    setTimeout(() => inputRefA.current?.focus(), 500);
  };

  const startScenarioB = () => {
    fadeAnim.setValue(0);
    setInputB('');
    setSuccessB(false);
    setFormattedValueB('');
    setPhase('scenarioB');
    setTimeout(() => inputRefB.current?.focus(), 500);
  };

  const shakeAnimation = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Strict validation for Scenario A
  const validateStrictA = (value) => {
    // Only accept pure numbers without any formatting
    const cleanValue = value.trim();
    const isValid = /^\d+$/.test(cleanValue) && cleanValue === targetAmount;
    return isValid;
  };

  const handleSubmitA = () => {
    if (validateStrictA(inputA)) {
      setSuccessA(true);
      setShowErrorA(false);
      setTimeout(() => {
        fadeAnim.setValue(0);
        setTimeout(() => startScenarioB(), 300);
      }, 1000);
    } else {
      setErrorCountA(prev => prev + 1);
      setShowErrorA(true);
      shakeAnimation();
      setTimeout(() => setShowErrorA(false), 3000);
    }
  };

  // Liberal parsing for Scenario B
  const parseLiberal = (value) => {
    // Remove common formatting characters and text
    let cleaned = value
      .replace(/Rp/gi, '')
      .replace(/\$/g, '')
      .replace(/,/g, '')
      .replace(/\./g, '')
      .replace(/k/gi, '000')
      .replace(/\s/g, '')
      .trim();
    
    return cleaned;
  };

  const handleInputChangeB = (value) => {
    setInputB(value);
    
    // Auto-format as user types
    const parsed = parseLiberal(value);
    if (parsed && /^\d+$/.test(parsed)) {
      setFormattedValueB(parsed);
      
      // Check if it matches target
      if (parsed === targetAmount) {
        setSuccessB(true);
      } else {
        setSuccessB(false);
      }
    } else {
      setFormattedValueB('');
      setSuccessB(false);
    }
  };

  const handleSubmitB = () => {
    const parsed = parseLiberal(inputB);
    if (parsed === targetAmount) {
      setSuccessB(true);
      setTimeout(() => {
        fadeAnim.setValue(0);
        setTimeout(() => setPhase('result'), 300);
      }, 1000);
    }
  };

  // Intro Phase - FIXED: Removed cognitive bias
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          💸 Transfer Uang
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melakukan transfer uang kepada teman melalui 2 aplikasi banking yang berbeda.{'\n'}
          {'\n'}📱 <Text style={{ fontWeight: '600' }}>Tugas Anda:</Text>
          {'\n'}Masukkan nominal <Text style={{ fontWeight: '700' }}>Lima Puluh Ribu Rupiah</Text> pada kolom yang tersedia, lalu tekan tombol Kirim.
          {'\n'}{'\n'}💡 <Text style={{ fontWeight: '600' }}>Tip:</Text> Ketik dengan cara yang paling natural menurut Anda.
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Transfer</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - Strict Validation
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Aplikasi Banking A
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          💰 Transfer ke: <Text style={{ fontWeight: '700' }}>Budi Santoso</Text>
          {'\n'}📝 Masukkan nominal: <Text style={{ fontWeight: '700' }}>Lima Puluh Ribu Rupiah</Text>
        </Text>

        {/* Form Card */}
        <Animated.View 
          style={[
            styles.formCard,
            { 
              backgroundColor: colors.cardBackground,
              borderColor: showErrorA ? '#EF4444' : colors.border,
              transform: [{ translateX: shakeAnim }]
            }
          ]}
        >
          <View style={styles.formGroup}>
            <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
              Amount <Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>Rp</Text>
              <TextInput
                ref={inputRefA}
                style={[
                  styles.currencyInput,
                  { 
                    color: colors.textPrimary,
                    borderColor: showErrorA ? '#EF4444' : colors.border,
                  }
                ]}
                value={inputA}
                onChangeText={setInputA}
                placeholder="Masukkan nominal"
                placeholderTextColor={colors.textSecondary}
                keyboardType="default"
                onSubmitEditing={handleSubmitA}
              />
            </View>
          </View>

          {/* Error Message - FIXED: Only shows AFTER submission */}
          {showErrorA && (
            <Animated.View 
              style={[styles.errorBox, { opacity: fadeAnim }]}
            >
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <Text style={styles.errorText}>
                ❌ Format tidak valid. Hanya menerima angka tanpa format (contoh: 50000)
              </Text>
            </Animated.View>
          )}

          {/* Success Message */}
          {successA && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              <Text style={styles.successText}>Amount accepted!</Text>
            </View>
          )}

          {/* Frustration Counter */}
          {errorCountA > 0 && (
            <View style={styles.frustrationBadge}>
              <Ionicons name="sad-outline" size={16} color="#EF4444" />
              <Text style={styles.frustrationText}>
                Errors: {errorCountA}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.accent }]}
            onPress={handleSubmitA}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>
    );
  }

  // Scenario B - Liberal Validation
  if (phase === 'scenarioB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Aplikasi Banking B
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          💰 Transfer ke: <Text style={{ fontWeight: '700' }}>Budi Santoso</Text>
          {'\n'}📝 Masukkan nominal: <Text style={{ fontWeight: '700' }}>Lima Puluh Ribu Rupiah</Text>
        </Text>

        {/* Form Card */}
        <View 
          style={[
            styles.formCard,
            { 
              backgroundColor: colors.cardBackground,
              borderColor: successB ? '#22C55E' : colors.border,
            }
          ]}
        >
          <View style={styles.formGroup}>
            <Text style={[styles.formLabel, { color: colors.textPrimary }]}>
              Amount <Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>Rp</Text>
              <TextInput
                ref={inputRefB}
                style={[
                  styles.currencyInput,
                  { 
                    color: colors.textPrimary,
                    borderColor: successB ? '#22C55E' : colors.border,
                  }
                ]}
                value={inputB}
                onChangeText={handleInputChangeB}
                placeholder="Masukkan nominal"
                placeholderTextColor={colors.textSecondary}
                keyboardType="default"
                onSubmitEditing={handleSubmitB}
              />
            </View>
          </View>

          {/* Live Format Preview */}
          {formattedValueB && (
            <View style={styles.formatPreview}>
              <Ionicons name="sync-outline" size={16} color="#3B82F6" />
              <Text style={styles.formatPreviewText}>
                Auto-formatted: <Text style={{ fontWeight: '700' }}>{formattedValueB}</Text>
              </Text>
            </View>
          )}

          {/* Success Message */}
          {successB && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              <Text style={styles.successText}>
                Perfect! Amount accepted and formatted.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: successB ? '#22C55E' : colors.accent }
            ]}
            onPress={handleSubmitB}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Hint */}
        <View style={styles.hintBox}>
          <Ionicons name="bulb-outline" size={16} color="#22C55E" />
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            Type in any format you like - we'll understand! 😊
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const successRateA = successA ? 100 : 0;
    const successRateB = successB ? 100 : 0;
    const isLiberalBetter = errorCountA > 0 || successRateB > successRateA;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Postel's Law Test
        </Text>

        {/* APLIKASI BANKING A CARD - Strict Validation */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: errorCountA > 0 ? '#FEE2E2' : '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="shield-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Aplikasi Banking A (Strict)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={errorCountA > 0 ? "alert-circle-outline" : "checkmark-circle"} 
                  size={20} 
                  color={errorCountA > 0 ? "#EF4444" : "#22C55E"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Error Count</Text>
                <Text style={[styles.metricValue, { color: errorCountA > 0 ? '#EF4444' : '#22C55E' }]}>
                  {errorCountA} {errorCountA === 1 ? 'error' : 'errors'}
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={successA ? "checkmark-done" : "close-circle"} 
                  size={20} 
                  color={successA ? "#22C55E" : "#EF4444"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Success Rate</Text>
                <Text style={[styles.metricValue, { color: successA ? '#22C55E' : '#EF4444' }]}>
                  {successRateA}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: errorCountA > 0 ? '#FEF2F2' : '#F0FDF4' }]}>
            <Ionicons 
              name={errorCountA > 0 ? "sad-outline" : "happy-outline"} 
              size={14} 
              color={errorCountA > 0 ? "#DC2626" : "#16A34A"} 
            />
            <Text style={[styles.performanceText, { color: errorCountA > 0 ? '#DC2626' : '#16A34A' }]}>
              {errorCountA > 0 
                ? `Frustasi: User harus menebak format ${errorCountA}x` 
                : 'Tidak ada masalah - Format tepat'}
            </Text>
          </View>
        </View>

        {/* APLIKASI BANKING B CARD - Liberal Validation */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Aplikasi Banking B (Liberal)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Error Count</Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  0 errors
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={successB ? "checkmark-done" : "close-circle"} 
                  size={20} 
                  color={successB ? "#22C55E" : "#EF4444"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Success Rate</Text>
                <Text style={[styles.metricValue, { color: successB ? '#22C55E' : '#EF4444' }]}>
                  {successRateB}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="happy-outline" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              Flexible parsing - Terima berbagai format input
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: isLiberalBetter ? '#FEF3C7' : '#E0E7FF',
          borderColor: isLiberalBetter ? '#FCD34D' : '#A5B4FC',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={isLiberalBetter ? "trophy" : "information-circle"} 
              size={28} 
              color={isLiberalBetter ? "#D97706" : "#6366F1"} 
            />
            <Text style={[styles.summaryTitle, { color: isLiberalBetter ? '#92400E' : '#4338CA' }]}>
              {isLiberalBetter ? '✅ Liberal Validation Wins!' : '🤔 Both Performed Well'}
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="sad-outline" size={18} color={isLiberalBetter ? '#D97706' : '#6366F1'} />
              <Text style={[styles.comparisonLabel, { color: isLiberalBetter ? '#B45309' : '#4338CA' }]}>
                Frustration
              </Text>
              <Text style={[styles.comparisonValue, { color: errorCountA > 0 ? '#EF4444' : '#22C55E', fontWeight: '700' }]}>
                {errorCountA > 0 ? `${errorCountA} → 0` : '0 → 0'}
              </Text>
            </View>

            <View style={styles.comparisonItem}>
              <Ionicons name="shield-checkmark" size={18} color={isLiberalBetter ? '#D97706' : '#6366F1'} />
              <Text style={[styles.comparisonLabel, { color: isLiberalBetter ? '#B45309' : '#4338CA' }]}>
                Winner
              </Text>
              <Text style={[styles.comparisonValue, { color: '#16A34A', fontWeight: '700', fontSize: 14 }]}>
                {isLiberalBetter ? 'Liberal' : 'Tied'}
              </Text>
            </View>
          </View>

          <Text style={[styles.summaryDescription, { color: isLiberalBetter ? '#B45309' : '#4338CA' }]}>
            {isLiberalBetter 
              ? `Aplikasi B (Liberal) menghilangkan ${errorCountA} error${errorCountA !== 1 ? 's' : ''} dengan menerima format umum seperti "50.000", "50k", "Rp 50000". User tidak perlu menebak format yang benar!`
              : `Tidak ada error di kedua aplikasi. Namun, liberal validation tetap lebih user-friendly karena menerima berbagai format input natural.`
            }
          </Text>
        </View>

        {/* Educational Content */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🔄 Postel's Law (Robustness Principle)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '600' }}>"Be conservative in what you send, be liberal in what you accept."</Text>
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Hasil Experiment:</Text>
            {'\n'}• Aplikasi A (Strict): {errorCountA} error{errorCountA !== 1 ? 's' : ''} - Menolak format umum
            {'\n'}• Aplikasi B (Liberal): 0 errors - Menerima berbagai format
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text>
            {'\n'}• Accept flexible input formats (50.000, 50k, Rp50000)
            {'\n'}• Parse and normalize on backend/client
            {'\n'}• Show real-time format preview
            {'\n'}• Never punish users for natural input patterns
            {'\n'}• Examples: Phone numbers, dates, currency, zip codes
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Serial Position Effect Simulation - Horizontal Carousel Scroll
const SerialPositionSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, study, recall, result
  const [selectedItems, setSelectedItems] = useState([]);
  const [recallOrder, setRecallOrder] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scrollAnim = useState(new Animated.Value(0))[0];

  // 10 fruit items for the carousel (ORIGINAL TARGETS)
  const fruits = [
    { id: 1, name: 'Apple', icon: '🍎', position: 1, category: 'primacy', isTarget: true },
    { id: 2, name: 'Banana', icon: '🍌', position: 2, category: 'primacy', isTarget: true },
    { id: 3, name: 'Cherry', icon: '🍒', position: 3, category: 'primacy', isTarget: true },
    { id: 4, name: 'Dragon Fruit', icon: '🐉', position: 4, category: 'middle', isTarget: true },
    { id: 5, name: 'Eggplant', icon: '🍆', position: 5, category: 'middle', isTarget: true },
    { id: 6, name: 'Fig', icon: '🫐', position: 6, category: 'middle', isTarget: true },
    { id: 7, name: 'Grape', icon: '🍇', position: 7, category: 'middle', isTarget: true },
    { id: 8, name: 'Honeydew', icon: '🍈', position: 8, category: 'recency', isTarget: true },
    { id: 9, name: 'Kiwi', icon: '🥝', position: 9, category: 'recency', isTarget: true },
    { id: 10, name: 'Lemon', icon: '🍋', position: 10, category: 'recency', isTarget: true },
  ];

  // FIXED: Distractor items (NOT shown in the study phase)
  const distractors = [
    { id: 11, name: 'Mango', icon: '🥭', isTarget: false },
    { id: 12, name: 'Orange', icon: '🍊', isTarget: false },
    { id: 13, name: 'Peach', icon: '🍑', isTarget: false },
    { id: 14, name: 'Pear', icon: '🍐', isTarget: false },
    { id: 15, name: 'Pineapple', icon: '🍍', isTarget: false },
    { id: 16, name: 'Strawberry', icon: '🍓', isTarget: false },
    { id: 17, name: 'Watermelon', icon: '🍉', isTarget: false },
    { id: 18, name: 'Avocado', icon: '🥑', isTarget: false },
    { id: 19, name: 'Coconut', icon: '🥥', isTarget: false },
    { id: 20, name: 'Tomato', icon: '🍅', isTarget: false },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startStudy = () => {
    fadeAnim.setValue(0);
    setPhase('study');
    
    // Auto-scroll animation to show user they should scroll
    Animated.sequence([
      Animated.timing(scrollAnim, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scrollAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDoneStudying = () => {
    // FIXED: Combine 10 original targets + 10 distractors = 20 items total
    const mixedItems = [...fruits, ...distractors];
    // Shuffle the combined list to randomize order
    const shuffled = mixedItems.sort(() => Math.random() - 0.5);
    setRecallOrder(shuffled);
    fadeAnim.setValue(0);
    setPhase('recall');
  };

  const toggleSelection = (fruitId) => {
    setSelectedItems(prev => {
      if (prev.includes(fruitId)) {
        return prev.filter(id => id !== fruitId);
      } else {
        return [...prev, fruitId];
      }
    });
  };

  const handleSubmitRecall = () => {
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 300);
  };

  // Calculate recall metrics - FIXED: Distinguish targets from distractors
  const calculateMetrics = () => {
    // Get IDs of target items (original fruits shown in study phase)
    const targetIds = fruits.map(f => f.id);
    const distractorIds = distractors.map(d => d.id);

    // Separate selected items into true positives and false positives
    const truePositives = selectedItems.filter(id => targetIds.includes(id));
    const falsePositives = selectedItems.filter(id => distractorIds.includes(id));

    // Calculate recall by category (primacy, middle, recency)
    const primacyItems = fruits.filter(f => f.category === 'primacy').map(f => f.id);
    const middleItems = fruits.filter(f => f.category === 'middle').map(f => f.id);
    const recencyItems = fruits.filter(f => f.category === 'recency').map(f => f.id);

    const primacyRecall = primacyItems.filter(id => selectedItems.includes(id)).length;
    const middleRecall = middleItems.filter(id => selectedItems.includes(id)).length;
    const recencyRecall = recencyItems.filter(id => selectedItems.includes(id)).length;

    const primacyRate = Math.round((primacyRecall / primacyItems.length) * 100);
    const middleRate = Math.round((middleRecall / middleItems.length) * 100);
    const recencyRate = Math.round((recencyRecall / recencyItems.length) * 100);

    // Check if item #1 and #10 were remembered
    const firstItemRecalled = selectedItems.includes(1);
    const lastItemRecalled = selectedItems.includes(10);
    const middleItemRecalled = selectedItems.includes(5);

    return {
      primacyRecall,
      middleRecall,
      recencyRecall,
      primacyRate,
      middleRate,
      recencyRate,
      totalRecall: truePositives.length,
      totalItems: fruits.length,
      firstItemRecalled,
      lastItemRecalled,
      middleItemRecalled,
      falseMemories: falsePositives.length,
      totalSelected: selectedItems.length,
      accuracy: fruits.length > 0 ? Math.round((truePositives.length / fruits.length) * 100) : 0,
    };
  };

  // Intro Phase - FIXED: Removed cognitive bias (hypothesis removed)
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🧠 Tes Memori Visual
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Seberapa kuat memori visual Anda?{'\n'}
          {'\n'}📋 <Text style={{ fontWeight: '600' }}>Tugas:</Text>
          {'\n'}Sebuah daftar buah-buahan akan ditampilkan secara horizontal. Cobalah untuk mengingat sebanyak mungkin buah yang Anda lihat.
          {'\n'}{'\n'}👁️ <Text style={{ fontWeight: '600' }}>Langkah 1:</Text> Scroll dan lihat semua buah (10 item)
          {'\n'}🧠 <Text style={{ fontWeight: '600' }}>Langkah 2:</Text> Hafalkan buah-buahan tersebut
          {'\n'}✅ <Text style={{ fontWeight: '600' }}>Langkah 3:</Text> Pilih HANYA buah yang benar-benar Anda ingat dari daftar campuran
          {'\n'}{'\n'}⚠️ <Text style={{ fontWeight: '600', color: '#DC2626' }}>Perhatian:</Text> Tidak semua buah di daftar adalah yang Anda lihat!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startStudy}
        >
          <Text style={styles.startButtonText}>Mulai Tes Memori</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Study Phase - Horizontal Carousel
  if (phase === 'study') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Hafalkan Buah-Buahan
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          👆 Scroll untuk melihat semua buah-buahan{'\n'}
          🧠 Cobalah mengingat sebanyak mungkin
        </Text>

        {/* Horizontal Scrollable List */}
        <View style={styles.carouselContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={true}
            style={styles.carousel}
            contentContainerStyle={styles.carouselContent}
          >
            {fruits.map((fruit, index) => (
              <Animated.View
                key={fruit.id}
                style={[
                  styles.fruitCard,
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  }
                ]}
              >
                <Text style={styles.fruitIcon}>{fruit.icon}</Text>
                <Text style={[styles.fruitName, { color: colors.textPrimary }]}>
                  {fruit.name}
                </Text>
                <View style={[styles.positionBadge, { backgroundColor: colors.accentSubtle }]}>
                  <Text style={[styles.positionText, { color: colors.accent }]}>
                    #{fruit.position}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Instructions */}
        <View style={[styles.instructionBox, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
          <Ionicons name="information-circle" size={20} color="#D97706" />
          <Text style={[styles.instructionText, { color: '#92400E' }]}>
            Scroll ke kanan untuk melihat semua 10 buah. Hafalkan sebanyak mungkin!
          </Text>
        </View>

        {/* Done Button */}
        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: colors.accent }]}
          onPress={handleDoneStudying}
        >
          <Text style={styles.doneButtonText}>Selesai Menghafalkan</Text>
          <Ionicons name="checkmark" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Recall Phase - Select remembered items
  if (phase === 'recall') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#8B5CF6', backgroundColor: '#EDE9FE' }]}>
          Pilih Buah yang Anda Ingat
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🧠 Tap HANYA buah yang benar-benar Anda ingat{'\n'}
          ⚠️ Hati-hati: Ada buah tambahan yang TIDAK Anda lihat sebelumnya!
        </Text>

        {/* Selection Grid (Shuffled Order) */}
        <View style={styles.recallGrid}>
          {recallOrder.map((fruit) => {
            const isSelected = selectedItems.includes(fruit.id);
            return (
              <TouchableOpacity
                key={fruit.id}
                style={[
                  styles.recallCard,
                  { 
                    backgroundColor: isSelected ? '#8B5CF6' : colors.cardBackground,
                    borderColor: isSelected ? '#7C3AED' : colors.border,
                  }
                ]}
                onPress={() => toggleSelection(fruit.id)}
              >
                <Text style={[styles.recallIcon, { opacity: isSelected ? 1 : 0.7 }]}>
                  {fruit.icon}
                </Text>
                <Text style={[styles.recallName, { color: isSelected ? '#FFF' : colors.textPrimary }]}>
                  {fruit.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkMark}>
                    <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Counter */}
        <View style={[styles.counterBox, { backgroundColor: '#F3F4F6' }]}>
          <Text style={[styles.counterText, { color: colors.textSecondary }]}>
            Dipilih: {selectedItems.length} item
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { 
              backgroundColor: selectedItems.length > 0 ? '#8B5CF6' : '#D1D5DB',
              opacity: selectedItems.length > 0 ? 1 : 0.6,
            }
          ]}
          onPress={handleSubmitRecall}
          disabled={selectedItems.length === 0}
        >
          <Text style={styles.submitButtonText}>Submit Jawaban</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const metrics = calculateMetrics();
    const serialPositionConfirmed = 
      (metrics.primacyRate > metrics.middleRate) || 
      (metrics.recencyRate > metrics.middleRate);
    
    const isPrimacyStronger = metrics.primacyRate >= metrics.recencyRate;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Memory Test
        </Text>

        {/* PRIMACY EFFECT CARD - First Items (1-3) */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DBEAFE',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="arrow-forward-outline" size={16} color="#2563EB" />
              <Text style={[styles.scenarioBadgeText, { color: '#2563EB' }]}>
                Primacy (Item Awal: 1-3)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="checkmark-done" size={20} color="#3B82F6" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Recall</Text>
                <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                  {metrics.primacyRecall}/3
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="bar-chart-outline" size={20} color="#3B82F6" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Accuracy</Text>
                <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                  {metrics.primacyRate}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="star" size={14} color="#1D4ED8" />
            <Text style={[styles.performanceText, { color: '#1D4ED8' }]}>
              {metrics.firstItemRecalled ? '🍎 Item #1 diingat!' : '🍎 Item #1 terlupakan'}
            </Text>
          </View>
        </View>

        {/* MIDDLE (NO EFFECT) CARD - Middle Items (4-7) */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="ellipse-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Middle (Item Tengah: 4-7)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Recall</Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {metrics.middleRecall}/4
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="bar-chart-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Accuracy</Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {metrics.middleRate}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="close-circle" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              {metrics.middleItemRecalled ? '🍆 Item #5 diingat!' : '🍆 Item #5 terlupakan'}
            </Text>
          </View>
        </View>

        {/* RECENCY EFFECT CARD - Last Items (8-10) */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="arrow-back-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Recency (Item Akhir: 8-10)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="checkmark-done" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Recall</Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {metrics.recencyRecall}/3
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="bar-chart-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Accuracy</Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {metrics.recencyRate}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="star" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              {metrics.lastItemRecalled ? '🍋 Item #10 diingat!' : '🍋 Item #10 terlupakan'}
            </Text>
          </View>
        </View>

        {/* FALSE MEMORIES CARD - FIXED: Show distractor selections */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: metrics.falseMemories > 0 ? '#FED7AA' : '#D1FAE5',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: metrics.falseMemories > 0 ? '#FED7AA' : '#D1FAE5' }]}>
              <Ionicons 
                name={metrics.falseMemories > 0 ? "warning" : "shield-checkmark"} 
                size={16} 
                color={metrics.falseMemories > 0 ? "#EA580C" : "#059669"} 
              />
              <Text style={[styles.scenarioBadgeText, { color: metrics.falseMemories > 0 ? '#EA580C' : '#059669' }]}>
                False Memories (Distractor)
              </Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons 
                  name={metrics.falseMemories > 0 ? "alert-circle" : "checkmark-circle"} 
                  size={20} 
                  color={metrics.falseMemories > 0 ? "#EA580C" : "#059669"} 
                />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>False Picks</Text>
                <Text style={[styles.metricValue, { color: metrics.falseMemories > 0 ? '#EA580C' : '#059669' }]}>
                  {metrics.falseMemories}
                </Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="pie-chart" size={20} color={metrics.falseMemories > 0 ? '#EA580C' : '#059669'} />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>Accuracy</Text>
                <Text style={[styles.metricValue, { color: metrics.falseMemories > 0 ? '#EA580C' : '#059669' }]}>
                  {metrics.accuracy}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.performanceTag, { backgroundColor: metrics.falseMemories > 0 ? '#FFEDD5' : '#ECFDF5' }]}>
            <Ionicons 
              name={metrics.falseMemories > 0 ? "bulb-outline" : "trophy"} 
              size={14} 
              color={metrics.falseMemories > 0 ? "#C2410C" : "#047857"} 
            />
            <Text style={[styles.performanceText, { color: metrics.falseMemories > 0 ? '#C2410C' : '#047857' }]}>
              {metrics.falseMemories > 0 
                ? `Anda memilih ${metrics.falseMemories} buah yang tidak ada di list asli` 
                : '🎯 Perfect! Tidak ada false memory'}
            </Text>
          </View>
        </View>

        {/* SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: serialPositionConfirmed ? '#FEF3C7' : '#FEE2E2',
          borderColor: serialPositionConfirmed ? '#FCD34D' : '#FCA5A5',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name={serialPositionConfirmed ? "trophy" : "information-circle"} 
              size={28} 
              color={serialPositionConfirmed ? "#D97706" : "#DC2626"} 
            />
            <Text style={[styles.summaryTitle, { color: serialPositionConfirmed ? '#92400E' : '#991B1B' }]}>
              {serialPositionConfirmed ? '✅ Serial Position Confirmed!' : '🤔 Pola Tidak Jelas'}
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonItem}>
              <Ionicons name="trophy" size={18} color={serialPositionConfirmed ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: serialPositionConfirmed ? '#B45309' : '#991B1B' }]}>
                Total Recall
              </Text>
              <Text style={[styles.comparisonValue, { color: serialPositionConfirmed ? '#92400E' : '#7F1D1D', fontWeight: '700' }]}>
                {metrics.totalRecall}/10
              </Text>
            </View>

            <View style={styles.comparisonItem}>
              <Ionicons name="pulse" size={18} color={serialPositionConfirmed ? '#D97706' : '#DC2626'} />
              <Text style={[styles.comparisonLabel, { color: serialPositionConfirmed ? '#B45309' : '#991B1B' }]}>
                Strongest
              </Text>
              <Text style={[styles.comparisonValue, { color: isPrimacyStronger ? '#3B82F6' : '#22C55E', fontWeight: '700', fontSize: 13 }]}>
                {isPrimacyStronger ? 'Primacy' : 'Recency'}
              </Text>
            </View>
          </View>

          <Text style={[styles.summaryDescription, { color: serialPositionConfirmed ? '#B45309' : '#991B1B' }]}>
            {serialPositionConfirmed 
              ? `Primacy: ${metrics.primacyRate}%, Middle: ${metrics.middleRate}%, Recency: ${metrics.recencyRate}%. Item di awal dan akhir diingat ${Math.max(metrics.primacyRate, metrics.recencyRate) - metrics.middleRate}% lebih baik daripada item tengah!`
              : `Hasil Anda: Primacy ${metrics.primacyRate}%, Middle ${metrics.middleRate}%, Recency ${metrics.recencyRate}%. Pola tidak sepenuhnya terlihat, tapi Serial Position Effect tetap valid secara statistik untuk mayoritas user.`
            }
          </Text>
        </View>

        {/* Educational Content */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            📊 Serial Position Effect
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '600' }}>Primacy Effect:</Text> Item pertama mudah diingat karena mendapat perhatian penuh dan diulang di memori kerja.
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Recency Effect:</Text> Item terakhir mudah diingat karena masih fresh di memori jangka pendek.
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Middle:</Text> Item tengah paling sering terlupakan karena tidak mendapat keuntungan dari kedua effect di atas.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text>
            {'\n'}• Tempatkan informasi penting di awal atau akhir list
            {'\n'}• Navigation bar: Key actions di kiri/kanan
            {'\n'}• Pricing tables: Best plan di edge positions
            {'\n'}• Menu: Highlight items di posisi 1 atau last
            {'\n'}• Feature lists: Lead & close with strong points
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Tesler's Law Simulation - Shipping Location Config
const TeslersLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, scenarioB, result
  const [startTimeA, setStartTimeA] = useState(0);
  const [startTimeB, setStartTimeB] = useState(0);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [tapCountA, setTapCountA] = useState(0);
  const [tapCountB, setTapCountB] = useState(0);
  
  // Scenario A states
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showProvinces, setShowProvinces] = useState(false);
  const [showCities, setShowCities] = useState(false);
  
  // Scenario B state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocationB, setSelectedLocationB] = useState('');
  
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(0))[0];

  const targetLocation = 'Jakarta, Indonesia';

  // Dropdown data
  const countries = ['Indonesia', 'Malaysia', 'Singapore', 'Thailand'];
  const provinces = {
    'Indonesia': ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'],
  };
  const cities = {
    'DKI Jakarta': ['Jakarta Pusat', 'Jakarta', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Barat'],
  };

  // Smart search suggestions
  const locationSuggestions = [
    'Jakarta, Indonesia',
    'Jakarta Pusat, Indonesia',
    'Jakarta Selatan, Indonesia',
    'Bandung, Indonesia',
    'Surabaya, Indonesia',
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenarioA = () => {
    fadeAnim.setValue(0);
    setSelectedCountry('');
    setSelectedProvince('');
    setSelectedCity('');
    setShowProvinces(false);
    setShowCities(false);
    setTapCountA(0);
    setStartTimeA(Date.now());
    setPhase('scenarioA');
  };

  const startScenarioB = () => {
    fadeAnim.setValue(0);
    setSearchQuery('');
    setShowSuggestions(false);
    setSelectedLocationB('');
    setTapCountB(0);
    setStartTimeB(Date.now());
    setPhase('scenarioB');
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setTapCountA(prev => prev + 1);
    
    if (country === 'Indonesia') {
      setTimeout(() => {
        setShowProvinces(true);
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setTapCountA(prev => prev + 1);
    
    if (province === 'DKI Jakarta') {
      setTimeout(() => {
        setShowCities(true);
        slideAnim.setValue(0);
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setTapCountA(prev => prev + 1);
    
    if (city === 'Jakarta') {
      const timeTaken = Date.now() - startTimeA;
      setTimeA(timeTaken);
      fadeAnim.setValue(0);
      setTimeout(() => startScenarioB(), 1000);
    }
  };

  const handleUseCurrentLocation = () => {
    setTapCountB(1);
    setSelectedLocationB(targetLocation);
    
    // Simulate GPS detection
    setTimeout(() => {
      const timeTaken = Date.now() - startTimeB;
      setTimeB(timeTaken);
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 1000);
    }, 1500);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setTapCountB(prev => prev + 2); // Tap to focus + tap to select
    setSearchQuery(suggestion);
    setSelectedLocationB(suggestion);
    setShowSuggestions(false);
    
    if (suggestion === targetLocation) {
      const timeTaken = Date.now() - startTimeB;
      setTimeB(timeTaken);
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 800);
    }
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          ⚖️ Tesler's Law
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          "Untuk setiap sistem, ada sejumlah kompleksitas yang tidak dapat dikurangi - hanya dipindahkan." Anda akan mengatur lokasi pengiriman dengan 2 cara berbeda:{'\n'}
          {'\n'}📍 <Text style={{ fontWeight: '600' }}>Set lokasi ke: Jakarta, Indonesia</Text>
          {'\n'}😓 <Text style={{ fontWeight: '600' }}>Scenario 1: User menanggung kompleksitas (3 dropdown)</Text>
          {'\n'}😊 <Text style={{ fontWeight: '600' }}>Scenario 2: Sistem menanggung kompleksitas (smart input)</Text>
          {'\n'}{'\n'}📊 Interaction cost (jumlah tap) dan waktu akan diukur.
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Task</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - User Burden (Multiple Dropdowns)
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Scenario 1 - User Burden
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          📍 Set lokasi: <Text style={{ fontWeight: '700' }}>Jakarta, Indonesia</Text>
        </Text>

        {/* Multi-step Dropdowns */}
        <View style={[styles.locationForm, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          {/* Step 1: Country */}
          <View style={styles.dropdownSection}>
            <Text style={[styles.dropdownLabel, { color: colors.textPrimary }]}>
              Step 1: Select Country <Text style={{ color: '#EF4444' }}>*</Text>
            </Text>
            <View style={styles.dropdownOptions}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.dropdownButton,
                    { 
                      backgroundColor: selectedCountry === country ? colors.accent : '#F3F4F6',
                      borderColor: selectedCountry === country ? colors.accent : '#D1D5DB',
                    }
                  ]}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Text style={[styles.dropdownButtonText, { color: selectedCountry === country ? '#FFF' : colors.textSecondary }]}>
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Step 2: Province (after country selected) */}
          {showProvinces && (
            <Animated.View 
              style={[
                styles.dropdownSection,
                { opacity: slideAnim, transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }
              ]}
            >
              <Text style={[styles.dropdownLabel, { color: colors.textPrimary }]}>
                Step 2: Select Province <Text style={{ color: '#EF4444' }}>*</Text>
              </Text>
              <View style={styles.dropdownOptions}>
                {provinces['Indonesia'].map((province) => (
                  <TouchableOpacity
                    key={province}
                    style={[
                      styles.dropdownButton,
                      { 
                        backgroundColor: selectedProvince === province ? colors.accent : '#F3F4F6',
                        borderColor: selectedProvince === province ? colors.accent : '#D1D5DB',
                      }
                    ]}
                    onPress={() => handleProvinceSelect(province)}
                  >
                    <Text style={[styles.dropdownButtonText, { color: selectedProvince === province ? '#FFF' : colors.textSecondary }]}>
                      {province}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Step 3: City (after province selected) */}
          {showCities && (
            <Animated.View 
              style={[
                styles.dropdownSection,
                { opacity: slideAnim, transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }
              ]}
            >
              <Text style={[styles.dropdownLabel, { color: colors.textPrimary }]}>
                Step 3: Select City <Text style={{ color: '#EF4444' }}>*</Text>
              </Text>
              <View style={styles.dropdownOptions}>
                {cities['DKI Jakarta'].map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.dropdownButton,
                      { 
                        backgroundColor: selectedCity === city ? colors.accent : '#F3F4F6',
                        borderColor: selectedCity === city ? colors.accent : '#D1D5DB',
                      }
                    ]}
                    onPress={() => handleCitySelect(city)}
                  >
                    <Text style={[styles.dropdownButtonText, { color: selectedCity === city ? '#FFF' : colors.textSecondary }]}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Tap Counter */}
          <View style={[styles.tapCounter, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="hand-left-outline" size={18} color="#D97706" />
            <Text style={[styles.tapCounterText, { color: '#92400E' }]}>
              Taps: {tapCountA}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  // Scenario B - System Burden (Smart Input)
  if (phase === 'scenarioB') {
    const isGPSMode = selectedLocationB && !searchQuery;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Scenario 2 - System Burden
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          📍 Set lokasi: <Text style={{ fontWeight: '700' }}>Jakarta, Indonesia</Text>
        </Text>

        {/* Smart Location Input */}
        <View style={[styles.smartLocationForm, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          {/* Option 1: Use Current Location - FIXED: Improved contrast */}
          <TouchableOpacity
            style={[styles.gpsButton, { 
              backgroundColor: '#F0FDF4',  // FIXED: Lighter background
              borderColor: '#86EFAC',
              borderWidth: 2,              // FIXED: Thicker border
              opacity: selectedLocationB ? 0.7 : 1,  // FIXED: Visual feedback when disabled
            }]}
            onPress={handleUseCurrentLocation}
            disabled={!!selectedLocationB}
          >
            <Ionicons name="location" size={24} color="#22C55E" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.gpsButtonTitle, { 
                color: '#14532D',          // FIXED: Darker green for high contrast
                opacity: 1,
              }]}>
                Use Current Location
              </Text>
              <Text style={[styles.gpsButtonSubtitle, { 
                color: '#166534',          // FIXED: Improved contrast
                opacity: 1,
              }]}>
                Automatically detect your location
              </Text>
            </View>
            {isGPSMode && <Ionicons name="checkmark-circle" size={24} color="#22C55E" />}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>OR</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Option 2: Smart Search */}
          <View style={styles.searchSection}>
            <Text style={[styles.searchLabel, { color: colors.textPrimary }]}>
              Search Location
            </Text>
            <View style={[styles.searchBox, { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }]}>
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                style={[styles.searchInput, { 
                  color: '#1F2937',  // FIXED: Force dark text for high contrast
                  opacity: 1,        // FIXED: Ensure no opacity reduction
                }]}
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Type city name..."
                placeholderTextColor="#9CA3AF"
                onFocus={() => setTapCountB(prev => prev + 1)}
              />
            </View>

            {/* Smart Suggestions */}
            {showSuggestions && (
              <View style={[styles.suggestionsBox, { backgroundColor: '#FFFFFF', borderColor: colors.border }]}>
                {locationSuggestions
                  .filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((suggestion, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleSuggestionSelect(suggestion)}
                    >
                      <Ionicons name="location-outline" size={18} color={colors.textSecondary} />
                      <Text style={[styles.suggestionText, { color: colors.textPrimary }]}>
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>

          {/* Selected Location Display - FIXED: Improved contrast */}
          {selectedLocationB && (
            <View style={[styles.selectedLocationBox, { 
              backgroundColor: '#F0FDF4',  // FIXED: Lighter background for better contrast
              borderColor: '#86EFAC',
              borderWidth: 2,              // FIXED: Thicker border for visibility
            }]}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              <Text style={[styles.selectedLocationText, { 
                color: '#14532D',          // FIXED: Darker green for high contrast
                opacity: 1,                // FIXED: Ensure no opacity reduction
                fontWeight: '600',
              }]}>
                {selectedLocationB}
              </Text>
            </View>
          )}

          {/* Tap Counter */}
          <View style={[styles.tapCounter, { backgroundColor: '#DCFCE7' }]}>
            <Ionicons name="hand-left-outline" size={18} color="#22C55E" />
            <Text style={[styles.tapCounterText, { color: '#166534' }]}>
              Taps: {tapCountB}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  // Result Phase - REDESIGNED: Professional Card-Based Layout
  if (phase === 'result') {
    const interactionReduction = ((tapCountA - tapCountB) / tapCountA * 100).toFixed(0);
    const timeReduction = ((timeA - timeB) / timeA * 100).toFixed(1);
    const tapsSaved = tapCountA - tapCountB;
    const timeSavedSeconds = ((timeA - timeB) / 1000).toFixed(1);

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Tesler's Law Test
        </Text>

        {/* SCENARIO A CARD - User Burden (Manual Input) */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#FEE2E2',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          {/* Card Header */}
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="person-outline" size={16} color="#DC2626" />
              <Text style={[styles.scenarioBadgeText, { color: '#DC2626' }]}>
                Beban User (Manual Input)
              </Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            {/* Taps Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="hand-left-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Taps
                </Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {tapCountA}
                </Text>
              </View>
            </View>

            {/* Time Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#EF4444" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Waktu
                </Text>
                <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                  {(timeA / 1000).toFixed(1)}s
                </Text>
              </View>
            </View>
          </View>

          {/* Performance Tag */}
          <View style={[styles.performanceTag, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="alert-circle" size={14} color="#DC2626" />
            <Text style={[styles.performanceText, { color: '#DC2626' }]}>
              User harus mengisi 3 dropdown secara manual
            </Text>
          </View>
        </View>

        {/* SCENARIO B CARD - System Burden (Smart Defaults) */}
        <View style={[styles.resultCard, { 
          backgroundColor: '#FFFFFF',
          borderWidth: 2,
          borderColor: '#DCFCE7',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          {/* Card Header */}
          <View style={styles.resultCardHeader}>
            <View style={[styles.scenarioBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="server-outline" size={16} color="#16A34A" />
              <Text style={[styles.scenarioBadgeText, { color: '#16A34A' }]}>
                Beban Sistem (Smart Defaults)
              </Text>
            </View>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            {/* Taps Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="hand-left-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Taps
                </Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {tapCountB}
                </Text>
              </View>
            </View>

            {/* Time Metric */}
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#22C55E" />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#6B7280' }]}>
                  Waktu
                </Text>
                <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                  {(timeB / 1000).toFixed(1)}s
                </Text>
              </View>
            </View>
          </View>

          {/* Performance Tag */}
          <View style={[styles.performanceTag, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="sparkles" size={14} color="#16A34A" />
            <Text style={[styles.performanceText, { color: '#16A34A' }]}>
              GPS + Smart Search otomatis oleh sistem
            </Text>
          </View>
        </View>

        {/* EFFICIENCY SUMMARY CARD */}
        <View style={[styles.summaryCard, { 
          backgroundColor: '#FEF3C7',
          borderColor: '#FCD34D',
          borderWidth: 2,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.summaryHeader}>
            <Ionicons name="trophy" size={28} color="#D97706" />
            <Text style={[styles.summaryTitle, { color: '#92400E' }]}>
              ✅ Efisiensi Tercapai
            </Text>
          </View>

          <View style={styles.comparisonRow}>
            {/* Taps Saved */}
            <View style={styles.comparisonItem}>
              <Ionicons name="hand-left" size={18} color="#D97706" />
              <Text style={[styles.comparisonLabel, { color: '#B45309' }]}>
                Taps Saved
              </Text>
              <Text style={[styles.comparisonValue, { color: '#92400E', fontWeight: '700' }]}>
                -{tapsSaved} (-{interactionReduction}%)
              </Text>
            </View>

            {/* Time Saved */}
            <View style={styles.comparisonItem}>
              <Ionicons name="flash" size={18} color="#D97706" />
              <Text style={[styles.comparisonLabel, { color: '#B45309' }]}>
                Time Saved
              </Text>
              <Text style={[styles.comparisonValue, { color: '#92400E', fontWeight: '700' }]}>
                {timeSavedSeconds}s ({timeReduction}%)
              </Text>
            </View>
          </View>

          <Text style={[styles.summaryDescription, { color: '#B45309' }]}>
            Smart defaults mengurangi {tapsSaved} interaksi dan menghemat {timeReduction}% waktu. Kompleksitas dipindahkan dari user ke sistem!
          </Text>
        </View>

        {/* Educational Content */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⚖️ Tesler's Law (Conservation of Complexity)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '600' }}>"Untuk setiap sistem ada sejumlah kompleksitas yang tidak dapat dihilangkan - hanya dipindahkan."</Text>
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Skenario A (User Burden):</Text> User menanggung kompleksitas - {tapCountA} taps, {(timeA/1000).toFixed(1)}s untuk input manual.
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Skenario B (System Burden):</Text> Sistem menanggung kompleksitas - GPS, smart search, auto-complete. Hasilnya: hanya {tapCountB} tap, {timeReduction}% lebih cepat!
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text>
            {'\n'}• Investasi di backend complexity = Better UX
            {'\n'}• Smart features: GPS, auto-complete, ML suggestions
            {'\n'}• Intelligent defaults mengurangi cognitive load
            {'\n'}• Complexity is inevitable - pilih siapa yang menanggungnya!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Von Restorff Effect Simulation - Card Selection Grid
const VonRestorffSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, countdown, study, recall, result
  const [countdown, setCountdown] = useState(3);
  const [distinctivePosition, setDistinctivePosition] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startStudy = () => {
    // Randomly select position for distinctive card (0-8)
    const randomPos = Math.floor(Math.random() * 9);
    setDistinctivePosition(randomPos);
    setSelectedPosition(null);
    setIsCorrect(false);
    
    fadeAnim.setValue(1); // FIXED: Force Opacity 1 (Biar intro gak kedip)
    setCountdown(3);
    setPhase('countdown');
    
    // Countdown timer
    let count = 3;
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        
        // === CRITICAL FIX IS HERE ===
        fadeAnim.setValue(1); // Force immediate visibility (No Blank Screen!)
        scaleAnim.setValue(0);
        setPhase('study');
        
        // Show cards animation
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }).start();
        
        // Wait 2 seconds then hide
        setTimeout(() => {
          fadeAnim.setValue(0); // Fade out before switching
          setPhase('recall');
        }, 2000);
      }
    }, 1000);
  };

  const handleCardSelect = (position) => {
    setSelectedPosition(position);
    const correct = position === distinctivePosition;
    setIsCorrect(correct);
    
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 500);
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          ⭐ Von Restorff Effect
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          "Item yang berbeda dari sekitarnya lebih mudah diingat." Tes memori visual Anda:{'\n'}
          {'\n'}👁️ <Text style={{ fontWeight: '600' }}>Lihat: Grid 9 kartu selama 2 detik</Text>
          {'\n'}💡 <Text style={{ fontWeight: '600' }}>Perhatikan: Satu kartu akan tampak berbeda</Text>
          {'\n'}🎯 <Text style={{ fontWeight: '600' }}>Pilih: Posisi kartu yang menonjol</Text>
          {'\n'}{'\n'}📊 Recall rate Anda akan diukur. Hipotesis: Kartu yang berbeda (elevated, shadow, border) akan lebih mudah diingat!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startStudy}
        >
          <Text style={styles.startButtonText}>Mulai Visual Test</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Countdown Phase
  if (phase === 'countdown') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Get Ready
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Bersiaplah untuk menghafalkan...
        </Text>
        
        <View style={styles.countdownContainer}>
          <Text style={[styles.countdownNumber, { color: colors.accent, fontSize: 80 }]}>
            {countdown}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Study Phase - Show Grid
  if (phase === 'study') {
    return (
      <Animated.View style={[styles.simContainer, { 
        opacity: fadeAnim, // This is now forced to 1 at start
        flex: 1,
        minHeight: 500,
      }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Study Phase - 2 seconds
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          👁️ Hafalkan kartu yang menonjol!
        </Text>

        {/* Card Grid */}
        <View style={{ 
          flex: 1, 
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}>
          <Animated.View 
            style={[
              styles.cardGrid,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => {
            const isDistinctive = position === distinctivePosition;
            
            return (
              <View
                key={position}
                style={[
                  styles.studyCard,
                  isDistinctive ? styles.studyCardDistinctive : styles.studyCardNormal,
                  { 
                    backgroundColor: isDistinctive ? '#FBBF24' : '#F3F4F6',
                    borderColor: isDistinctive ? '#F59E0B' : '#D1D5DB',
                  }
                ]}
              >
                <Text style={[styles.cardNumber, { color: isDistinctive ? '#92400E' : '#6B7280' }]}>
                  {position + 1}
                </Text>
              </View>
            );
          })}
          </Animated.View>
        </View>

        <View style={[styles.timerHint, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
          <Ionicons name="time-outline" size={20} color="#D97706" />
          <Text style={[styles.timerHintText, { color: '#92400E' }]}>
            Kartu akan hilang dalam 2 detik...
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Recall Phase - Select Position
  if (phase === 'recall') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#8B5CF6', backgroundColor: '#EDE9FE' }]}>
          Recall Phase
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🎯 Posisi mana yang menonjol?
        </Text>

        {/* Selection Grid */}
        <View style={styles.cardGrid}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => {
            return (
              <TouchableOpacity
                key={position}
                style={[
                  styles.recallCard,
                  { 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => handleCardSelect(position)}
              >
                <Text style={[styles.cardNumber, { color: colors.textPrimary }]}>
                  {position + 1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.instructionBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text style={[styles.instructionText, { color: '#1E40AF' }]}>
            Tap pada posisi kartu yang tampak berbeda/menonjol
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const recallRate = isCorrect ? 100 : 0;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Visual Test
        </Text>

        {/* Show what was correct */}
        <View style={[styles.answerBox, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.answerLabel, { color: colors.textSecondary }]}>
            Kartu yang menonjol:
          </Text>
          <View style={styles.answerComparison}>
            <View style={styles.answerItem}>
              <Text style={[styles.answerItemLabel, { color: colors.textSecondary }]}>Posisi Benar:</Text>
              <View style={[styles.answerCard, { backgroundColor: '#FBBF24', borderColor: '#F59E0B' }]}>
                <Text style={[styles.answerCardNumber, { color: '#92400E' }]}>
                  {distinctivePosition + 1}
                </Text>
              </View>
            </View>
            <View style={styles.answerItem}>
              <Text style={[styles.answerItemLabel, { color: colors.textSecondary }]}>Pilihan Anda:</Text>
              <View style={[
                styles.answerCard, 
                { 
                  backgroundColor: isCorrect ? '#DCFCE7' : '#FEE2E2',
                  borderColor: isCorrect ? '#86EFAC' : '#FCA5A5',
                }
              ]}>
                <Text style={[styles.answerCardNumber, { color: isCorrect ? '#166534' : '#DC2626' }]}>
                  {selectedPosition !== null ? selectedPosition + 1 : '-'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎯 Your Answer:
            </Text>
            <Text style={[styles.statValue, { color: isCorrect ? '#22C55E' : '#EF4444', fontWeight: '700' }]}>
              Position {selectedPosition !== null ? selectedPosition + 1 : '-'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Recall Accuracy:
            </Text>
            <Text style={[styles.statValue, { color: isCorrect ? '#22C55E' : '#EF4444', fontWeight: '700' }]}>
              {recallRate}% {isCorrect ? '✓' : '✗'}
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⭐ Distinctive Element:
            </Text>
            <Text style={[styles.statValue, { color: '#FBBF24', fontWeight: '700' }]}>
              Position {distinctivePosition + 1}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Von Restorff Confirmed:
            </Text>
            <Text style={[styles.statValue, { color: isCorrect ? '#22C55E' : colors.textPrimary, fontWeight: '700' }]}>
              {isCorrect ? 'Yes! ✓' : 'Not this time'}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⭐ Von Restorff Effect (Isolation Effect)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            {isCorrect 
              ? `Tepat! Anda mengingat kartu di posisi ${distinctivePosition + 1} karena tampilannya menonjol (elevated, shadow, warna berbeda). Item yang berbeda dari sekitarnya lebih mudah diingat!`
              : `Kartu yang menonjol ada di posisi ${distinctivePosition + 1}. Von Restorff Effect menyatakan bahwa item yang berbeda lebih mudah diingat - tapi kadang perlu lebih dari 2 detik untuk efek maksimal.`
            }
            {'\n'}{'\n'}
            Kartu distinctive (kuning, shadow, border tebal, sedikit lebih besar) secara otomatis menarik perhatian dan lebih mudah di-encode ke memori. Ini karena otak kita sangat sensitif terhadap perbedaan visual.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan visual distinction (warna kontras, ukuran berbeda, elevation, border) untuk highlight elemen penting: CTA buttons, error messages, notifications, premium features, new badges. Tapi jangan overuse - kalau semua menonjol, tidak ada yang menonjol!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Zeigarnik Effect Simulation - Profile Status Widget
const ZeigarnikSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, choice, result
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [clickTime, setClickTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const progressAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startChoice = () => {
    fadeAnim.setValue(0);
    setSelectedWidget(null);
    setStartTime(Date.now());
    setPhase('choice');
    
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: 0.85,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleWidgetSelect = (widget) => {
    const reactionTime = Date.now() - startTime;
    setSelectedWidget(widget);
    setClickTime(reactionTime);
    
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 300);
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🧠 Zeigarnik Effect
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          "Tugas yang belum selesai menciptakan ketegangan mental dan lebih mudah diingat." Anda akan melihat 2 widget dashboard:{'\n'}
          {'\n'}✅ <Text style={{ fontWeight: '600' }}>Widget A: "Profile Complete" (100%)</Text>
          {'\n'}⏳ <Text style={{ fontWeight: '600' }}>Widget B: "Finish Setup" (85% progress)</Text>
          {'\n'}{'\n'}🤔 <Text style={{ fontWeight: '600' }}>Pertanyaan: Widget mana yang lebih ingin Anda tap?</Text>
          {'\n'}{'\n'}📊 Preference Anda akan diukur. Hipotesis: Widget B (incomplete) akan lebih compelling karena menciptakan psychological tension!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startChoice}
        >
          <Text style={styles.startButtonText}>Lihat Dashboard</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Choice Phase - Show Both Widgets
  if (phase === 'choice') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Your Dashboard
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🤔 Widget mana yang lebih compelling?
        </Text>

        {/* Dashboard Widgets */}
        <View style={styles.widgetsContainer}>
          {/* Widget A - Complete */}
          <TouchableOpacity
            style={[styles.dashboardWidget, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={() => handleWidgetSelect('A')}
            activeOpacity={0.7}
          >
            <View style={styles.widgetHeader}>
              <View style={[styles.widgetIconComplete, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="checkmark-circle" size={32} color="#22C55E" />
              </View>
              <View style={styles.widgetInfo}>
                <Text style={[styles.widgetTitle, { color: colors.textPrimary }]}>
                  Profile
                </Text>
                <Text style={[styles.widgetStatus, { color: '#22C55E' }]}>
                  Complete
                </Text>
              </View>
            </View>
            
            <View style={styles.widgetProgress}>
              <View style={[styles.progressBarFull, { backgroundColor: '#22C55E' }]}>
                <View style={styles.progressBarFill} />
              </View>
              <Text style={[styles.progressText, { color: '#22C55E' }]}>
                100%
              </Text>
            </View>
            
            <View style={[styles.widgetBadge, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="shield-checkmark" size={16} color="#22C55E" />
              <Text style={[styles.widgetBadgeText, { color: '#166534' }]}>
                All Done!
              </Text>
            </View>

            <Text style={[styles.widgetLabel, { color: colors.textSecondary }]}>
              Widget A
            </Text>
          </TouchableOpacity>

          {/* Widget B - Incomplete (85%) */}
          <TouchableOpacity
            style={[styles.dashboardWidget, { backgroundColor: colors.cardBackground, borderColor: '#F59E0B' }]}
            onPress={() => handleWidgetSelect('B')}
            activeOpacity={0.7}
          >
            <View style={styles.widgetHeader}>
              <View style={[styles.widgetIconIncomplete, { backgroundColor: '#FEF3C7' }]}>
                <View style={styles.circularProgress}>
                  <Animated.View
                    style={[
                      styles.circularProgressFill,
                      {
                        transform: [{
                          rotate: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '306deg'] // 85% of 360deg
                          })
                        }]
                      }
                    ]}
                  />
                  <View style={styles.circularProgressInner}>
                    <Text style={[styles.circularProgressText, { color: '#D97706' }]}>
                      85%
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.widgetInfo}>
                <Text style={[styles.widgetTitle, { color: colors.textPrimary }]}>
                  Setup
                </Text>
                <Text style={[styles.widgetStatus, { color: '#D97706' }]}>
                  In Progress
                </Text>
              </View>
            </View>
            
            <View style={styles.widgetProgress}>
              <View style={[styles.progressBarContainer, { backgroundColor: '#FEF3C7' }]}>
                <Animated.View 
                  style={[
                    styles.progressBarFillAnimated,
                    { 
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '85%']
                      }),
                      backgroundColor: '#F59E0B'
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: '#D97706' }]}>
                85%
              </Text>
            </View>
            
            <View style={[styles.widgetBadge, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="time-outline" size={16} color="#D97706" />
              <Text style={[styles.widgetBadgeText, { color: '#92400E' }]}>
                Finish Setup
              </Text>
            </View>

            <Text style={[styles.widgetLabel, { color: colors.textSecondary }]}>
              Widget B
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.instructionBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text style={[styles.instructionText, { color: '#1E40AF' }]}>
            Tap pada widget yang membuat Anda lebih ingin mengkliknya
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const selectedComplete = selectedWidget === 'A';
    const selectedIncomplete = selectedWidget === 'B';
    const zeigarnikConfirmed = selectedIncomplete;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Preference
        </Text>

        {/* Choice Visualization */}
        <View style={[styles.choiceBox, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.choiceLabel, { color: colors.textSecondary }]}>
            Pilihan Anda:
          </Text>
          <View style={styles.choiceDisplay}>
            <View style={[
              styles.choiceCard,
              selectedComplete && styles.choiceCardSelected,
              { backgroundColor: selectedComplete ? '#DCFCE7' : '#F9FAFB', borderColor: selectedComplete ? '#22C55E' : '#D1D5DB' }
            ]}>
              <Ionicons name="checkmark-circle" size={24} color={selectedComplete ? '#22C55E' : '#9CA3AF'} />
              <Text style={[styles.choiceCardText, { color: selectedComplete ? '#166534' : '#6B7280' }]}>
                Widget A
              </Text>
              <Text style={[styles.choiceCardSubtext, { color: selectedComplete ? '#15803D' : '#9CA3AF' }]}>
                Complete
              </Text>
            </View>
            <View style={[
              styles.choiceCard,
              selectedIncomplete && styles.choiceCardSelected,
              { backgroundColor: selectedIncomplete ? '#FEF3C7' : '#F9FAFB', borderColor: selectedIncomplete ? '#F59E0B' : '#D1D5DB' }
            ]}>
              <Ionicons name="time-outline" size={24} color={selectedIncomplete ? '#F59E0B' : '#9CA3AF'} />
              <Text style={[styles.choiceCardText, { color: selectedIncomplete ? '#92400E' : '#6B7280' }]}>
                Widget B
              </Text>
              <Text style={[styles.choiceCardSubtext, { color: selectedIncomplete ? '#D97706' : '#9CA3AF' }]}>
                85% Progress
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Reaction Time:
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {(clickTime / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎯 Your Choice:
            </Text>
            <Text style={[styles.statValue, { color: selectedIncomplete ? '#F59E0B' : '#22C55E', fontWeight: '700' }]}>
              Widget {selectedWidget}
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Click-Through Preference:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {selectedComplete ? 'Complete (100%)' : 'Incomplete (85%)'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🧠 Zeigarnik Effect:
            </Text>
            <Text style={[styles.statValue, { color: zeigarnikConfirmed ? '#22C55E' : colors.textPrimary, fontWeight: '700' }]}>
              {zeigarnikConfirmed ? 'Confirmed ✓' : 'Not This Time'}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🧠 Zeigarnik Effect
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            {zeigarnikConfirmed 
              ? `Tepat! Anda memilih Widget B (incomplete) karena tugas yang belum selesai menciptakan "psychological tension" - keinginan kuat untuk menyelesaikannya. Progress bar 85% dengan gap membuat otak Anda berpikir "hanya tinggal sedikit lagi!"`
              : `Anda memilih Widget A (complete). Biasanya mayoritas user lebih tertarik ke incomplete task karena Zeigarnik Effect - tapi setiap orang berbeda! Some people prefer completion over tension.`
            }
            {'\n'}{'\n'}
            Incomplete task (85% progress) lebih memorable dan compelling daripada complete task karena menciptakan "open loop" di otak - kita tidak suka meninggalkan sesuatu unfinished.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan progress bars, incomplete profiles, achievement badges, onboarding steps untuk motivasi user complete tasks. LinkedIn "Profile Strength", Duolingo streaks, form progress - semua leverage Zeigarnik Effect. Tapi jangan overuse - too many incomplete tasks = overwhelming!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Peak-End Rule Simulation - Task Loading/Completion
const PeakEndSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro'); // intro, scenario_select, loading, rating, result
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const [userRating, setUserRating] = useState(0); // Rating sementara saat ini
  const [ratingA, setRatingA] = useState(0);
  const [ratingB, setRatingB] = useState(0);
  
  const [confetti, setConfetti] = useState([]);
  
  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const progressAnim = useState(new Animated.Value(0))[0];
  const confettiAnim = useState(new Animated.Value(0))[0];
  const celebrateScale = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (phase !== 'loading') {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [phase]);

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setProgress(0);
    setIsComplete(false);
    setUserRating(0); 
    
    // Reset nilai animasi
    progressAnim.setValue(0);
    confettiAnim.setValue(0);
    celebrateScale.setValue(0);
    
    fadeAnim.setValue(1); 
    setPhase('loading');
    
    if (scenario === 'A') {
      // Linear
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: 4000,
        useNativeDriver: false,
      }).start(() => {
        finishLoadingSequence(false);
      });
    } else {
      // Peak-End (Tension + Celebration)
      Animated.sequence([
        Animated.timing(progressAnim, { toValue: 80, duration: 2000, useNativeDriver: false }), // Cepat ke 80
        Animated.delay(2000), // Macet (Tension)
        Animated.timing(progressAnim, { toValue: 100, duration: 600, useNativeDriver: false }), // Cepat selesai
      ]).start(() => {
        finishLoadingSequence(true);
      });
    }

    const progressListener = progressAnim.addListener(({ value }) => {
      setProgress(Math.floor(value));
    });
    return () => progressAnim.removeListener(progressListener);
  };

  const finishLoadingSequence = (withCelebration) => {
    setIsComplete(true);
    setProgress(100);

    if (withCelebration) {
      generateConfetti();
      Animated.parallel([
        Animated.spring(celebrateScale, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }),
        Animated.timing(confettiAnim, { toValue: 1, duration: 1500, useNativeDriver: true })
      ]).start();
      
      setTimeout(() => {
        fadeAnim.setValue(0);
        setPhase('rating');
      }, 2500);
    } else {
      setTimeout(() => {
        fadeAnim.setValue(0);
        setPhase('rating');
      }, 1000);
    }
  };

  const generateConfetti = () => {
    const confettiPieces = [];
    const colorsList = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#C7CEEA'];
    for (let i = 0; i < 30; i++) {
      confettiPieces.push({
        id: i,
        color: colorsList[Math.floor(Math.random() * colorsList.length)],
        left: Math.random() * 300, // Asumsi lebar layar aman
        rotation: Math.random() * 360,
      });
    }
    setConfetti(confettiPieces);
  };

  const handleRating = (rating) => {
    setUserRating(rating); 

    if (selectedScenario === 'A') {
      setRatingA(rating);
    } else {
      setRatingB(rating);
    }
    
    fadeAnim.setValue(0); 
    
    setTimeout(() => {
      // kedua skenario udahan?
      const isADone = selectedScenario === 'A' ? true : ratingA > 0;
      const isBDone = selectedScenario === 'B' ? true : ratingB > 0;

      if (isADone && isBDone) { //sudah selesai
        setPhase('result');
      } else {
        // Jika baru satu 
        setPhase('scenario_select');
      }

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 50);

    }, 500); 
  };

  const tryOtherScenario = () => {
    fadeAnim.setValue(0);
    setPhase('scenario_select');
  };

  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🎭 Peak-End Rule
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          "Orang menilai pengalaman berdasarkan puncak (peak) dan akhir (end), bukan rata-rata keseluruhan." Anda akan mengalami 2 skenario loading:{'\n'}
          {'\n'}📊 <Text style={{ fontWeight: '600' }}>Scenario A: Linear progress yang flat</Text>
          {'\n'}🎉 <Text style={{ fontWeight: '600' }}>Scenario B: Tension + Celebration ending</Text>
          {'\n'}{'\n'}Setelah selesai, Anda akan diminta rate satisfaction (1-5 ⭐). Hipotesis: Scenario B dengan "peak moment" dan "celebratory end" akan mendapat rating lebih tinggi, meskipun durasi sama!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => {
            fadeAnim.setValue(0);
            setPhase('scenario_select');
          }}
        >
          <Text style={styles.startButtonText}>Mulai Experience Test</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (phase === 'scenario_select') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Choose Experience
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🎯 Pilih skenario untuk dicoba:
        </Text>

        <View style={styles.scenarioButtons}>
          <TouchableOpacity
            style={[
                styles.scenarioCard, 
                { 
                    backgroundColor: colors.cardBackground, 
                    borderColor: colors.border,
                    opacity: ratingA > 0 ? 0.6 : 1 // Redupkan jika sudah selesai
                }
            ]}
            onPress={() => startScenario('A')}
            disabled={ratingA > 0} // Disable jika sudah selesai
          >
            <View style={[styles.scenarioIcon, { backgroundColor: '#E5E7EB' }]}>
              {ratingA > 0 ? <Ionicons name="checkmark" size={32} color="green" /> : <Ionicons name="remove" size={32} color="#6B7280" />}
            </View>
            <Text style={[styles.scenarioTitle, { color: colors.textPrimary }]}>
              Scenario A {ratingA > 0 && '(Selesai)'}
            </Text>
            <Text style={[styles.scenarioDesc, { color: colors.textSecondary }]}>
              Linear Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
                styles.scenarioCard, 
                { 
                    backgroundColor: colors.cardBackground, 
                    borderColor: colors.border,
                    opacity: ratingB > 0 ? 0.6 : 1 // Redupkan jika sudah selesai
                }
            ]}
            onPress={() => startScenario('B')}
            disabled={ratingB > 0} 
          >
            <View style={[styles.scenarioIcon, { backgroundColor: '#FEF3C7' }]}>
               {ratingB > 0 ? <Ionicons name="checkmark" size={32} color="green" /> : <Ionicons name="sparkles" size={32} color="#F59E0B" />}
            </View>
            <Text style={[styles.scenarioTitle, { color: colors.textPrimary }]}>
              Scenario B {ratingB > 0 && '(Selesai)'}
            </Text>
            <Text style={[styles.scenarioDesc, { color: colors.textSecondary }]}>
              Peak-End Design
            </Text>
          </TouchableOpacity>
        </View>

        {ratingA > 0 && ratingB > 0 && (
            <TouchableOpacity 
                style={[styles.startButton, { marginTop: 20, backgroundColor: '#22C55E' }]} 
                onPress={() => setPhase('result')}
            >
                <Text style={styles.startButtonText}>Lihat Hasil Akhir</Text>
            </TouchableOpacity>
        )}

      </Animated.View>
    );
  }

  if (phase === 'loading') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { 
          color: selectedScenario === 'A' ? '#6B7280' : '#F59E0B',
          backgroundColor: selectedScenario === 'A' ? '#F3F4F6' : '#FEF3C7'
        }]}>
          Scenario {selectedScenario}
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          {isComplete ? '✅ Syncing Complete!' : '⏳ Syncing Data...'}
        </Text>

        {/* Progress Container */}
        <View style={styles.loadingContainer}>
          <View style={[styles.progressBarOuter, { 
            backgroundColor: '#E5E7EB',
            height: 20,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#D1D5DB'
          }]}>
            <Animated.View
              style={[
                styles.progressBarInner,
                {
                  height: '100%',
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  }),
                  backgroundColor: isComplete ? '#22C55E' : (progress === 80 && selectedScenario === 'B' ? '#F59E0B' : '#3B82F6'),
                  borderRadius: 10
                }
              ]}
            />
          </View>
          
          <Text style={[styles.progressPercentage, { color: colors.textPrimary }]}>
            {progress}%
          </Text>

          {/* Stalling message for Scenario B */}
          {selectedScenario === 'B' && progress === 80 && !isComplete && (
            <View style={[styles.stallMessage, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
              <Ionicons name="time-outline" size={20} color="#D97706" />
              <Text style={[styles.stallText, { color: '#92400E' }]}>
                Processing final items...
              </Text>
            </View>
          )}

          {/* Completion for Scenario A */}
          {selectedScenario === 'A' && isComplete && (
            <View style={[styles.completionSimple, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
              <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
              <Text style={[styles.completionText, { color: '#166534' }]}>
                Done
              </Text>
            </View>
          )}

          {/* Celebration for Scenario B */}
          {selectedScenario === 'B' && isComplete && (
            <Animated.View style={[
              styles.completionCelebrate,
              { 
                backgroundColor: '#FEF3C7',
                borderColor: '#FCD34D',
                transform: [{ scale: celebrateScale }]
              }
            ]}>
              <Ionicons name="trophy" size={32} color="#F59E0B" />
              <Text style={[styles.completionTitle, { color: '#92400E' }]}>
                🎉 Success!
              </Text>
              <Text style={[styles.completionSubtext, { color: '#D97706' }]}>
                All data synced perfectly
              </Text>
            </Animated.View>
          )}

          {/* Confetti Animation */}
          {selectedScenario === 'B' && isComplete && confetti.map((piece) => (
            <Animated.View
              key={piece.id}
              style={[
                styles.confettiPiece,
                {
                  backgroundColor: piece.color,
                  left: piece.left,
                  transform: [
                    {
                      translateY: confettiAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 600] // Asumsi tinggi layar
                      })
                    },
                    {
                      rotate: `${piece.rotation}deg`
                    }
                  ],
                  opacity: confettiAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1, 0]
                  })
                }
              ]}
            />
          ))}
        </View>

        <View style={[styles.instructionBox, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
          <Ionicons name="information-circle" size={20} color="#3B82F6" />
          <Text style={[styles.instructionText, { color: '#1E40AF' }]}>
            {isComplete 
              ? 'Proses selesai! Persiapkan untuk rating experience...'
              : 'Tunggu hingga proses syncing selesai...'
            }
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Rating 
  if (phase === 'rating') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#8B5CF6', backgroundColor: '#EDE9FE' }]}>
          Rate Your Experience
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          ⭐ Seberapa puas Anda dengan experience ini?
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={[styles.ratingPrompt, { color: colors.textSecondary }]}>
            Scenario {selectedScenario}: {selectedScenario === 'A' ? 'Linear Progress' : 'Peak-End Design'}
          </Text>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRating(star)}
                style={styles.starButton}
              >
                <Ionicons 
                  name={userRating >= star ? 'star' : 'star-outline'} 
                  size={48} 
                  color={userRating >= star ? '#FCD34D' : '#D1D5DB'} 
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.ratingLabel, { color: colors.textSecondary }]}>
            Tap bintang untuk memberikan rating
          </Text>
        </View>

        <View style={[styles.instructionBox, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}>
          <Ionicons name="bulb-outline" size={20} color="#D97706" />
          <Text style={[styles.instructionText, { color: '#92400E' }]}>
            Nilai berdasarkan keseluruhan experience, dari awal hingga akhir
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const highlightRating = selectedScenario === 'B' ? ratingB : ratingA;

    return (
      <Animated.View style={[styles.simContainer, { 
        opacity: fadeAnim,
        flex: 1,
        minHeight: 500,
        backgroundColor: colors.background || '#FFFFFF',
      }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Experience Test
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎯 Scenario A (Flat):
            </Text>
            <Text style={[styles.statValue, { color: '#3B82F6', fontWeight: '700' }]}>
              {ratingA} Stars
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⭐ Scenario B (Peak-End):
            </Text>
            <Text style={[styles.statValue, { color: '#F59E0B', fontWeight: '700' }]}>
              {ratingB} Stars
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎭 Peak Moment:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {ratingB > ratingA ? 'Works!' : 'User Preference'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎉 End Experience:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              Celebration Effect
            </Text>
          </View>
        </View>

        {/* Comparison (if both tested) */}
        {ratingA > 0 && ratingB > 0 && (
          <View style={[styles.comparisonBox, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
            <Text style={[styles.comparisonTitle, { color: '#166534' }]}>
              📊 Comparison
            </Text>
            <Text style={[styles.comparisonDiff, { color: '#166534' }]}>
              {ratingB > ratingA 
                ? `Peak-End lebih tinggi ${ratingB - ratingA} bintang! ✓`
                : ratingB < ratingA
                  ? `Flat lebih tinggi ${ratingA - ratingB} bintang (preferensi unik!)`
                  : 'Sama! Anda objektif dalam menilai durasi.'
              }
            </Text>
          </View>
        )}

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎭 Peak-End Rule (Kahneman)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Research menunjukkan bahwa orang menilai experience berdasarkan 2 momen kunci: <Text style={{ fontWeight: '600' }}>Peak (momen paling intens)</Text> dan <Text style={{ fontWeight: '600' }}>End (momen terakhir)</Text>, bukan rata-rata keseluruhan!
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Scenario A:</Text> Linear, predictable, tidak ada peak moment atau memorable ending → often rated lower despite being "smooth".
            {'\n'}{'\n'}
            <Text style={{ fontWeight: '600' }}>Scenario B:</Text> Stall at 80% (tension peak) → Quick completion (relief peak) → Confetti celebration (positive end) → Creates memorable experience despite same/longer duration!
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Design memorable peaks dan positive endings. Upload complete? Show confetti!
          </Text>
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: '#22C55E' }]}
            onPress={onComplete}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            <Text style={styles.completeBtnText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return null;
};

// Main Simulation Component
const SimulationComponent = ({ lawId, lawTitle, colors, onComplete }) => {
  const simulationMap = {
    'aesthetic-usability-effect': AestheticUsabilitySimulation,
    'choice-overload': ChoiceOverloadSimulation,
    'hicks-law': HicksLawSimulation,
    'fitts-law': FittsLawSimulation,
    'chunking': ChunkingSimulation,
    'millers-law': MillersLawSimulation,
    'goal-gradient-effect': GoalGradientSimulation,
    'doherty-threshold': DohertyThresholdSimulation,
    'jakobs-law': JakobsLawSimulation,
    'law-of-common-region': CommonRegionSimulation,
    'law-of-proximity': ProximitySimulation,
    'law-of-pragnanz': PragnanzSimulation,
    'law-of-similarity': SimilaritySimulation,
    'law-of-uniform-connectedness': UniformConnectednessSimulation,
    'occams-razor': OccamsRazorSimulation,
    'parkinsons-law': ParkinsonsLawSimulation,
    'postel-law': PostelsLawSimulation,
    'serial-position-effect': SerialPositionSimulation,
    'teslers-law': TeslersLawSimulation,
    'von-restorff-effect': VonRestorffSimulation,
    'zeigarnik-effect': ZeigarnikSimulation,
    'peak-end-rule': PeakEndSimulation,
  };

  const SimComponent = simulationMap[lawId];

  if (SimComponent) {
    return <SimComponent colors={colors} onComplete={onComplete} />;
  }

  return (
    <DefaultSimulation colors={colors} lawTitle={lawTitle} onComplete={onComplete} />
  );
};

const styles = StyleSheet.create({
  simContainer: {
    padding: 16,
  },
  simTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  simDesc: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  simRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  designButton: {
    flex: 1,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  designButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  optionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  choiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  choiceButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  choiceButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  targetContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  targetButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  chunkCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  chunkLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  chunkNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  resultBox: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultSubtext: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  completeBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  progressBar: {
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  progressButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  understandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 12,
  },
  understandText: {
    flex: 1,
    fontSize: 14,
  },
  // Aesthetic Usability Simulation Styles
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
  },
  startButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  scenarioTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  // Low Fidelity Table Styles
  tablePlain: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  tableRowPlain: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableCellPlain: {
    flex: 1,
    padding: 8,
    color: '#000',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  tableHeaderPlain: {
    fontWeight: 'bold',
    backgroundColor: '#E5E7EB',
  },
  // High Fidelity Glass Dashboard Styles
  dashboardGlass: {
    gap: 12,
  },
  glassCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  glassService: {
    fontSize: 16,
    fontWeight: '600',
  },
  glassBody: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  glassErrorCount: {
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  glassErrorLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  glassFooter: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  glassStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Rating Styles
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  ratingButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Stats Board Styles
  statsBoard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  statLabel: {
    fontSize: 11,
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubvalue: {
    fontSize: 12,
  },
  comparisonBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonText: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  comparisonSubtext: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  // Doherty Threshold Simulation Styles
  loadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  loadButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  laggyLoadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 20,
    marginBottom: 16,
  },
  laggyLoadingText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  laggyStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  laggyStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  laggyHintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    maxWidth: '90%',
  },
  laggyHintText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  starRatingContainer: {
    alignItems: 'center',
    gap: 20,
  },
  starRow: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  starLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  starLabelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starLabelRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starLabelText: {
    fontSize: 14,
    fontWeight: '700',
  },
  systemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  systemBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  starDisplay: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    justifyContent: 'center',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  imageCard: {
    width: (SCREEN_WIDTH - 64) / 5, // 5 columns with gaps
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageEmoji: {
    fontSize: 28,
  },
  imageNumber: {
    fontSize: 10,
    marginTop: 2,
  },
  skeletonCard: {
    width: (SCREEN_WIDTH - 64) / 5,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  skeletonInner: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },
  tapCounter: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tapCounterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  // Fitts's Law Simulation Styles
  gameArea: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gameGrid: {
    width: SCREEN_WIDTH - 80,
    height: 400,
    position: 'relative',
  },
  targetBubble: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bubbleTouchArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundInfo: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  roundInfoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  roundSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  fittsMetrics: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  fittsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  fittsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fittsItem: {
    alignItems: 'center',
  },
  fittsLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  fittsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Goal Gradient Simulation Styles
  wizardCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    // NOTE: backgroundColor will be provided via inline style from colors.surface
  },
  wizardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  wizardDesc: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  wizardProgress: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
  },
  wizardProgressFill: {
    height: '100%',
    borderRadius: 6,
  },
  wizardProgressText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  wizardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 8,
  },
  wizardButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  scenarioBadge: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  speedIndicator: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
  },
  accelChart: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  accelTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  accelBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: 12,
  },
  accelBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  accelLabel: {
    fontSize: 11,
    marginBottom: 8,
  },
  accelBar: {
    width: 40,
    borderRadius: 4,
    minHeight: 20,
  },
  accelValue: {
    fontSize: 11,
    marginTop: 8,
    fontWeight: '600',
  },
  accelNote: {
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Enhanced Goal Gradient Analytics Styles
  wizardBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'center',
  },
  wizardBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stageAnalysisCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  stageComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 12,
    marginBottom: 16,
  },
  stageItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  stageLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  stageValue: {
    fontSize: 24,
    fontWeight: '900',
    marginVertical: 8,
  },
  speedBar: {
    height: 8,
    borderRadius: 4,
    minWidth: 20,
    alignSelf: 'stretch',
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  improvementText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  comparisonHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  comparisonDesc: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
  },
  // Hick's Law Simulation Styles - Emoji Hunt
  taskHeader: {
    marginBottom: 16,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  emojiCard: {
    width: (SCREEN_WIDTH - 96) / 5,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emojiLarge: {
    fontSize: 36,
  },
  emojiName: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 12,
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 80) / 2 - 6,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  categoryCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  hintBox: {
    marginTop: 12,
  },
  hintText: {
    fontSize: 13,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectionDisplay: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectionItem: {
    alignItems: 'center',
  },
  selectionEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  selectionName: {
    fontSize: 12,
    fontWeight: '600',
  },
  statBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accuracyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  accuracyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Jakob's Law Simulation Styles - Enhanced
  ecommerceScreen: {
    minHeight: 500,
    height: 500,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  ecomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  ecomLogo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ecomBanner: {
    padding: 20,
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  productCard: {
    width: (SCREEN_WIDTH - 80) / 3 - 8,
    borderRadius: 12,
    padding: 8,
  },
  productImage: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  cartButtonExperimental: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statZone: {
    fontSize: 11,
  },
  zoneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  comparisonHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  comparisonDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  heatmapSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  heatmapTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  heatmapRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  heatmapItem: {
    flex: 1,
    alignItems: 'center',
  },
  heatmapLabel: {
    fontSize: 11,
    marginBottom: 8,
  },
  heatmapBox: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: '#F9FAFB',
  },
  heatmapDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  // Common Region Simulation Styles
  fileGridScattered: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  fileItemScattered: {
    width: (SCREEN_WIDTH - 64) / 3,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  fileNameSmall: {
    fontSize: 9,
    marginTop: 4,
    textAlign: 'center',
  },
  fileGroupsContainer: {
    gap: 16,
    marginVertical: 16,
  },
  fileRegionCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  regionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
    letterSpacing: 0.3,
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  fileGridGrouped: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    paddingTop: 4,
  },
  fileItemGrouped: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fileNameTiny: {
    fontSize: 9,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 12,
  },
  answerSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  answerPrompt: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  answerGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  answerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  answerButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  // Result Card Styles (Redesigned)
  resultCard: {
    // Applied inline in component
  },
  resultCardHeader: {
    marginBottom: 16,
  },
  scenarioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  scenarioBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  performanceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  performanceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    // Applied inline in component
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  comparisonLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  comparisonValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryDescription: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  scenarioLabel: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  taskPrompt: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  // Proximity Simulation Styles
  settingsContainerPoor: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  settingsHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  settingRowPoor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    minHeight: 44,
  },
  settingLabelPoor: {
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  settingsContainerGood: {
    marginTop: 16,
    marginBottom: 12,
    gap: 20,
  },
  settingsGroup: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingRowGood: {
    marginBottom: 16,
  },
  settingInfoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  settingLabelGood: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  settingDescription: {
    fontSize: 11,
    marginLeft: 2,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchGood: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  attemptsText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  // Prägnanz Simulation Styles
  countdownContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
  },
  countdownNumber: {
    fontSize: 80,
    fontWeight: '900',
  },
  shapeDisplayContainer: {
    marginVertical: 32,
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
    justifyContent: 'center',
  },
  optionCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  // Similarity Simulation Styles
  progressContainer: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginVertical: 12,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    justifyContent: 'center',
  },
  tagPillGray: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tagPillColored: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  tagPillSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Uniform Connectedness Simulation Styles
  stepperContainerDisconnected: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  stepDisconnected: {
    alignItems: 'center',
    gap: 12,
  },
  stepperContainerConnected: {
    marginVertical: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    zIndex: 3, // Increased to ensure steps are above line
  },
  stepConnected: {
    alignItems: 'center',
    gap: 12,
    zIndex: 3, // Increased to ensure steps are above line
  },
  stepIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 3, // Ensure circles are above the line
    backgroundColor: '#FFFFFF', // Add background to cover line edges
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  connectingLine: {
    position: 'absolute',
    height: 6,
    top: 29, // Adjusted to center vertically (64/2 - 6/2 + 3 = 29)
    left: '22%', // FIXED: Increased from 15% to prevent line from showing beyond first circle
    right: '22%', // FIXED: Increased from 15% to prevent line from showing beyond last circle
    borderRadius: 3,
    zIndex: -1, // FIXED: Set to -1 to ensure it's definitely behind the circles
  },
  ratingSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  ratingQuestion: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  ratingButton: {
    flex: 1,
    maxWidth: 140,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  confidenceSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
  },
  confidenceButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  confidenceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  confidenceButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Miller's Law Simulation Styles
  codeDisplayContainer: {
    marginVertical: 40,
    padding: 32,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  // FIXED: Clean OTP display without ugly background
  codeDisplayContainerClean: {
    marginVertical: 40,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    backgroundColor: 'transparent', // No background box
  },
  codeUnderline: {
    width: '80%',
    height: 3,
    marginTop: 16,
    borderRadius: 2,
  },
  codeTextUnchunked: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 4,
    fontFamily: 'monospace',
  },
  codeTextChunked: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 8,
    fontFamily: 'monospace',
  },
  timerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  inputContainer: {
    marginVertical: 32,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeInput: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'monospace',
    letterSpacing: 4,
    paddingVertical: 12,
  },
  digitCounter: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  correctCodeBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  correctCodeLabel: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  correctCodeText: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: 6,
  },
  // Occam's Razor Simulation Styles
  searchFormComplex: {
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInputWrapper: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    marginBottom: 6,
  },
  filterInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  dropdownButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '600',
  },
  checkboxGroup: {
    gap: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  searchInputComplex: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  searchButtonComplex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 4,
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  complexityBadge: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    alignItems: 'center',
  },
  complexityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchFormSimple: {
    marginTop: 40,
    alignItems: 'center',
  },
  simpleSearchCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInputSimple: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchButtonSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  hintText: {
    fontSize: 13,
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Parkinson's Law Simulation Styles
  timerContainer: {
    marginVertical: 24,
    padding: 24,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  timerLarge: {
    fontSize: 64,
    fontWeight: '900',
    marginVertical: 8,
  },
  timerLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  typingContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typingInput: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 0,
    minHeight: 50,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  counterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#22C55E',
  },
  referenceBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  referenceLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  referenceText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  // Postel's Law Simulation Styles
  formCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  currencyInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '600',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  successText: {
    flex: 1,
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '600',
  },
  frustrationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    marginBottom: 16,
  },
  frustrationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  formatPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  formatPreviewText: {
    fontSize: 13,
    color: '#1E40AF',
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  // Serial Position Effect Simulation Styles
  carouselContainer: {
    marginVertical: 24,
    height: 200,
  },
  carousel: {
    flex: 1,
  },
  carouselContent: {
    paddingHorizontal: 8,
    gap: 16,
  },
  fruitCard: {
    width: 140,
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  fruitIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  fruitName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  positionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
  },
  instructionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  recallGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
    justifyContent: 'center',
  },
  recallCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  recallIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  recallName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkMark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  counterBox: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Tesler's Law Simulation Styles
  locationForm: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownSection: {
    marginBottom: 24,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  dropdownOptions: {
    gap: 10,
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tapCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  tapCounterText: {
    fontSize: 13,
    fontWeight: '700',
  },
  smartLocationForm: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#F0FDF4',     // FIXED: Light background with good contrast
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gpsButtonTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#14532D',               // FIXED: Dark green for high contrast
    opacity: 1,                     // FIXED: Ensure no opacity reduction
  },
  gpsButtonSubtitle: {
    fontSize: 12,
    color: '#166534',               // FIXED: Improved contrast
    opacity: 1,                     // FIXED: Ensure no opacity reduction
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchSection: {
    marginBottom: 16,
  },
  searchLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,                 // FIXED: Thicker border for clarity
    backgroundColor: '#F9FAFB',     // FIXED: Subtle gray background for distinction
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',               // FIXED: Force dark text color
    opacity: 1,                     // FIXED: Prevent any opacity reduction
  },
  suggestionsBox: {
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionText: {
    fontSize: 14,
  },
  selectedLocationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,                 // FIXED: Thicker border for visibility
    marginTop: 16,
    backgroundColor: '#F0FDF4',     // FIXED: Light background with good contrast
  },
  selectedLocationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14532D',               // FIXED: Dark green for high contrast
    opacity: 1,                     // FIXED: Ensure no opacity reduction
  },
  // Von Restorff Effect Simulation Styles
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 32,
    paddingHorizontal: 20,
    width: '100%',                  // FIXED: Ensure full width
    minHeight: 350,                 // FIXED: Prevent grid collapse
  },
  studyCard: {
    width: (SCREEN_WIDTH - 88) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  studyCardNormal: {
    shadowOpacity: 0.05,
    elevation: 1,
  },
  studyCardDistinctive: {
    transform: [{ scale: 1.1 }],
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
  },
  recallCard: {
    width: (SCREEN_WIDTH - 88) / 3,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: '900',
  },
  timerHintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
  },
  timerHintText: {
    fontSize: 13,
    fontWeight: '600',
  },
  answerBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  answerComparison: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  answerItem: {
    flex: 1,
    alignItems: 'center',
  },
  answerItemLabel: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  answerCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  answerCardNumber: {
    fontSize: 36,
    fontWeight: '900',
  },
  // Zeigarnik Effect Simulation Styles
  widgetsContainer: {
    gap: 20,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  dashboardWidget: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  widgetIconComplete: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetIconIncomplete: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgress: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  circularProgressFill: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: '#F59E0B',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  circularProgressInner: {
    position: 'absolute',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressText: {
    fontSize: 11,
    fontWeight: '700',
  },
  widgetInfo: {
    flex: 1,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  widgetStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
  widgetProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  progressBarFull: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFillAnimated: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 40,
  },
  widgetBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  widgetBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  widgetLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  choiceBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  choiceLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  choiceDisplay: {
    flexDirection: 'row',
    gap: 12,
  },
  choiceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    gap: 8,
  },
  choiceCardSelected: {
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  choiceCardText: {
    fontSize: 15,
    fontWeight: '700',
  },
  choiceCardSubtext: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Peak-End Rule Simulation Styles
  scenarioButtons: {
    gap: 16,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  scenarioCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  scenarioIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  scenarioDesc: {
    fontSize: 14,
    textAlign: 'center',
  },
  scenarioBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  scenarioBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    marginVertical: 32,
    paddingHorizontal: 20,
    position: 'relative',
  },
  progressBarOuter: {
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarInner: {
    height: '100%',
    borderRadius: 10,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 16,
  },
  stallMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stallText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  completionSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 20,
    justifyContent: 'center',
  },
  completionText: {
    fontSize: 18,
    fontWeight: '700',
  },
  completionCelebrate: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 3,
    marginTop: 20,
    gap: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: '900',
  },
  completionSubtext: {
    fontSize: 14,
    fontWeight: '600',
  },
  confettiPiece: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  ratingContainer: {
    marginVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  ratingPrompt: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  ratingResultBox: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ratingResultLabel: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingResultStars: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingResultValue: {
    fontSize: 28,
    fontWeight: '900',
  },
  tryOtherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tryOtherText: {
    fontSize: 15,
    fontWeight: '700',
  },
  comparisonBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  comparisonValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  comparisonDiff: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#86EFAC',
  },
});

export default SimulationComponent;
