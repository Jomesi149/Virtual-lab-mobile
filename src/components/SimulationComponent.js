import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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

// Hick's Law Simulation - Color Shade Picker
const HicksLawSimulation = ({ colors, onComplete }) => {
  const [phase, setPhase] = useState('intro');
  const [scenario, setScenario] = useState(null);
  const [category, setCategory] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [decisionTimeA, setDecisionTimeA] = useState(0);
  const [decisionTimeB, setDecisionTimeB] = useState(0);
  const [selectedColorA, setSelectedColorA] = useState(null);
  const [selectedColorB, setSelectedColorB] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const TARGET_COLOR = 'Royal Blue';
  const TARGET_COLOR_VALUE = '#4169E1';

  // 40 blue shades for Scenario A
  const allBlueShades = [
    { name: 'Navy', value: '#000080' },
    { name: 'Dark Blue', value: '#00008B' },
    { name: 'Medium Blue', value: '#0000CD' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Royal Blue', value: '#4169E1' },
    { name: 'Steel Blue', value: '#4682B4' },
    { name: 'Dodger Blue', value: '#1E90FF' },
    { name: 'Deep Sky Blue', value: '#00BFFF' },
    { name: 'Cornflower Blue', value: '#6495ED' },
    { name: 'Sky Blue', value: '#87CEEB' },
    { name: 'Light Sky Blue', value: '#87CEFA' },
    { name: 'Light Blue', value: '#ADD8E6' },
    { name: 'Powder Blue', value: '#B0E0E6' },
    { name: 'Pale Blue', value: '#AFEEEE' },
    { name: 'Alice Blue', value: '#F0F8FF' },
    { name: 'Azure', value: '#F0FFFF' },
    { name: 'Midnight Blue', value: '#191970' },
    { name: 'Slate Blue', value: '#6A5ACD' },
    { name: 'Dark Slate Blue', value: '#483D8B' },
    { name: 'Medium Slate Blue', value: '#7B68EE' },
    { name: 'Cadet Blue', value: '#5F9EA0' },
    { name: 'Light Steel Blue', value: '#B0C4DE' },
    { name: 'Periwinkle', value: '#CCCCFF' },
    { name: 'Baby Blue', value: '#89CFF0' },
    { name: 'Cerulean', value: '#007BA7' },
    { name: 'Sapphire', value: '#0F52BA' },
    { name: 'Cobalt', value: '#0047AB' },
    { name: 'Prussian Blue', value: '#003153' },
    { name: 'Teal Blue', value: '#367588' },
    { name: 'Ocean Blue', value: '#4F42B5' },
    { name: 'Denim Blue', value: '#1560BD' },
    { name: 'Peacock Blue', value: '#005F73' },
    { name: 'Egyptian Blue', value: '#1034A6' },
    { name: 'Persian Blue', value: '#1C39BB' },
    { name: 'Ultramarine', value: '#3F00FF' },
    { name: 'Electric Blue', value: '#7DF9FF' },
    { name: 'Cyan Blue', value: '#00FFFF' },
    { name: 'Turquoise Blue', value: '#40E0D0' },
    { name: 'Aquamarine', value: '#7FFFD4' },
    { name: 'Ice Blue', value: '#99FFFF' },
  ];

  // Categorized shades for Scenario B
  const categorizedShades = {
    Dark: [
      { name: 'Navy', value: '#000080' },
      { name: 'Dark Blue', value: '#00008B' },
      { name: 'Midnight Blue', value: '#191970' },
      { name: 'Prussian Blue', value: '#003153' },
      { name: 'Cobalt', value: '#0047AB' },
      { name: 'Royal Blue', value: '#4169E1' },
      { name: 'Sapphire', value: '#0F52BA' },
      { name: 'Egyptian Blue', value: '#1034A6' },
      { name: 'Persian Blue', value: '#1C39BB' },
      { name: 'Peacock Blue', value: '#005F73' },
    ],
    Light: [
      { name: 'Sky Blue', value: '#87CEEB' },
      { name: 'Light Sky Blue', value: '#87CEFA' },
      { name: 'Light Blue', value: '#ADD8E6' },
      { name: 'Powder Blue', value: '#B0E0E6' },
      { name: 'Alice Blue', value: '#F0F8FF' },
      { name: 'Azure', value: '#F0FFFF' },
      { name: 'Light Steel Blue', value: '#B0C4DE' },
      { name: 'Baby Blue', value: '#89CFF0' },
      { name: 'Ice Blue', value: '#99FFFF' },
      { name: 'Pale Blue', value: '#AFEEEE' },
    ],
    Vivid: [
      { name: 'Blue', value: '#0000FF' },
      { name: 'Dodger Blue', value: '#1E90FF' },
      { name: 'Deep Sky Blue', value: '#00BFFF' },
      { name: 'Electric Blue', value: '#7DF9FF' },
      { name: 'Cyan Blue', value: '#00FFFF' },
      { name: 'Ultramarine', value: '#3F00FF' },
      { name: 'Cerulean', value: '#007BA7' },
      { name: 'Denim Blue', value: '#1560BD' },
      { name: 'Turquoise Blue', value: '#40E0D0' },
      { name: 'Aquamarine', value: '#7FFFD4' },
    ],
    Muted: [
      { name: 'Steel Blue', value: '#4682B4' },
      { name: 'Cornflower Blue', value: '#6495ED' },
      { name: 'Slate Blue', value: '#6A5ACD' },
      { name: 'Medium Slate Blue', value: '#7B68EE' },
      { name: 'Cadet Blue', value: '#5F9EA0' },
      { name: 'Periwinkle', value: '#CCCCFF' },
      { name: 'Teal Blue', value: '#367588' },
      { name: 'Ocean Blue', value: '#4F42B5' },
      { name: 'Medium Blue', value: '#0000CD' },
      { name: 'Dark Slate Blue', value: '#483D8B' },
    ],
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenario = (scenarioType) => {
    setScenario(scenarioType);
    setCategory(null);
    setStartTime(Date.now());
    fadeAnim.setValue(0);
    setPhase('task');
  };

  const handleColorSelect = (color) => {
    const decisionTime = Date.now() - startTime;
    const isCorrect = color.name === TARGET_COLOR;

    if (scenario === 'A') {
      setDecisionTimeA(decisionTime);
      setSelectedColorA({ ...color, isCorrect });
      fadeAnim.setValue(0);
      setTimeout(() => startScenario('B'), 500);
    } else {
      setDecisionTimeB(decisionTime);
      setSelectedColorB({ ...color, isCorrect });
      fadeAnim.setValue(0);
      setTimeout(() => setPhase('result'), 500);
    }
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    fadeAnim.setValue(0);
    setTimeout(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🎨 Hick's Law
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan memilih warna 2 kali:{'\n'}
          {'\n'}🎨 <Text style={{ fontWeight: '600' }}>Skenario 1: 40 warna sekaligus</Text>
          {'\n'}🎨 <Text style={{ fontWeight: '600' }}>Skenario 2: Kategori → 10 warna</Text>
          {'\n'}⏱️ Waktu keputusan Anda akan diukur
          {'\n'}{'\n'}
          <Text style={{ fontWeight: '600' }}>Target: Pilih "Royal Blue"</Text>
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startScenario('A')}
        >
          <Text style={styles.startButtonText}>Mulai Simulasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Task Phase - Scenario A (All at once)
  if (phase === 'task' && scenario === 'A') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Skenario 1 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          Pilih: <Text style={{ fontWeight: 'bold' }}>Royal Blue</Text>
        </Text>

        {/* All 40 colors in grid */}
        <View style={styles.colorGrid}>
          {allBlueShades.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorSwatch, { backgroundColor: color.value }]}
              onPress={() => handleColorSelect(color)}
              activeOpacity={0.7}
            />
          ))}
        </View>

        <Text style={[styles.hintText, { color: colors.textSecondary }]}>
          Tap warna yang benar secepat mungkin!
        </Text>
      </Animated.View>
    );
  }

  // Task Phase - Scenario B (Categorized)
  if (phase === 'task' && scenario === 'B') {
    if (!category) {
      // Show categories
      return (
        <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
            Skenario 2 of 2
          </Text>
          <Text style={[styles.taskText, { color: colors.textPrimary }]}>
            Pilih kategori untuk: <Text style={{ fontWeight: 'bold' }}>Royal Blue</Text>
          </Text>

          {/* Category buttons */}
          <View style={styles.categoryGrid}>
            {Object.keys(categorizedShades).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryCard, { backgroundColor: colors.surface }]}
                onPress={() => handleCategorySelect(cat)}
              >
                <Ionicons 
                  name={
                    cat === 'Dark' ? 'moon' :
                    cat === 'Light' ? 'sunny' :
                    cat === 'Vivid' ? 'flash' : 'water'
                  } 
                  size={32} 
                  color={colors.accent} 
                />
                <Text style={[styles.categoryName, { color: colors.textPrimary }]}>
                  {cat}
                </Text>
                <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>
                  10 shades
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            Pilih kategori terlebih dahulu
          </Text>
        </Animated.View>
      );
    } else {
      // Show colors in selected category
      return (
        <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
            Category: {category}
          </Text>
          <Text style={[styles.taskText, { color: colors.textPrimary }]}>
            Pilih: <Text style={{ fontWeight: 'bold' }}>Royal Blue</Text>
          </Text>

          {/* Colors in category */}
          <View style={styles.colorGridLabeled}>
            {categorizedShades[category].map((color, index) => (
              <TouchableOpacity
                key={index}
                style={styles.colorSwatchLabeled}
                onPress={() => handleColorSelect(color)}
                activeOpacity={0.7}
              >
                <View style={[styles.colorBox, { backgroundColor: color.value }]} />
                <Text style={[styles.colorName, { color: colors.textSecondary }]}>
                  {color.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surface }]}
            onPress={() => handleCategorySelect(null)}
          >
            <Ionicons name="arrow-back" size={16} color={colors.textPrimary} />
            <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>
              Back to Categories
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
                  name={selectedColorA?.isCorrect ? 'checkmark-circle' : 'close-circle'} 
                  size={24} 
                  color={selectedColorA?.isCorrect ? '#22C55E' : '#EF4444'} 
                />
                <Text style={[
                  styles.accuracyText,
                  { color: selectedColorA?.isCorrect ? '#22C55E' : '#EF4444' }
                ]}>
                  {selectedColorA?.isCorrect ? 'Correct' : 'Wrong'}
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
                  name={selectedColorB?.isCorrect ? 'checkmark-circle' : 'close-circle'} 
                  size={24} 
                  color={selectedColorB?.isCorrect ? '#22C55E' : '#EF4444'} 
                />
                <Text style={[
                  styles.accuracyText,
                  { color: selectedColorB?.isCorrect ? '#22C55E' : '#EF4444' }
                ]}>
                  {selectedColorB?.isCorrect ? 'Correct' : 'Wrong'}
                </Text>
              </View>
            </View>
          </View>
          
          {timeDiff > 0 && (
            <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
              <Text style={[styles.comparisonText, { color: colors.accent }]}>
                ⚡ {(Math.abs(timeDiff) / 1000).toFixed(2)}s lebih cepat dengan kategorisasi!
              </Text>
              {selectedColorB?.isCorrect && !selectedColorA?.isCorrect && (
                <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
                  Dan lebih akurat!
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎨 Hick's Law
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Waktu keputusan meningkat dengan jumlah pilihan. Mengkategorikan opsi mengurangi cognitive load dan mempercepat keputusan!{'\n'}
            {'\n'}Formula: RT = a + b × log₂(n){'\n'}
            (RT = Reaction Time, n = number of choices)
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

// Goal Gradient Effect Simulation
// Goal Gradient Effect - Setup Wizard
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

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

  const calculateAcceleration = (intervals) => {
    if (intervals.length < 2) return 0;
    
    // Compare first half vs second half
    const mid = Math.floor(intervals.length / 2);
    const firstHalf = intervals.slice(0, mid);
    const secondHalf = intervals.slice(mid);
    
    const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    // Negative means acceleration (faster tapping)
    return avgSecond - avgFirst;
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
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          {scenario === 'A' ? 'Wizard 1 of 2' : 'Wizard 2 of 2'}
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          {scenario === 'B' && step === 0 && (
            <Text style={{ color: '#10B981' }}>✓ System Check Complete{'\n'}</Text>
          )}
          Setup Step {currentStepDisplay}
        </Text>

        {/* Wizard Card */}
        <View style={[styles.wizardCard, { backgroundColor: colors.surface }]}>
          <Ionicons name="settings-outline" size={48} color={colors.accent} />
          <Text style={[styles.wizardTitle, { color: colors.textPrimary }]}>
            Configuring System
          </Text>
          <Text style={[styles.wizardDesc, { color: colors.textSecondary }]}>
            Step {step + 1}: {['Network', 'Database', 'Cache', 'Security', 'Backup', 'Notifications', 'Analytics', 'API Keys', 'Storage', 'Final Check'][step]}
          </Text>

          {/* Progress Bar */}
          <View style={[styles.wizardProgress, { backgroundColor: colors.border }]}>
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
          <Text style={[styles.wizardProgressText, { color: colors.textSecondary }]}>
            {Math.round(currentProgress)}% Complete
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.wizardButton, { backgroundColor: colors.accent }]}
          onPress={handleNext}
        >
          <Text style={styles.wizardButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>

        {/* Live Speed Indicator */}
        <View style={[styles.speedIndicator, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.speedText, { color: colors.accent }]}>
            ⚡ Tap as fast as you can!
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const intervalsA = calculateIntervals(scenarioATimes);
    const intervalsB = calculateIntervals(scenarioBTimes);
    
    const avgA = calculateAverage(intervalsA);
    const avgB = calculateAverage(intervalsB);
    
    const accelA = calculateAcceleration(intervalsA);
    const accelB = calculateAcceleration(intervalsB);
    
    const speedImprovement = avgA - avgB;
    const accelImprovement = accelA - accelB;
    
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
                Wizard 1{'\n'}(Start 0%)
              </Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {avgA.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Avg Interval
              </Text>
              <Text style={[
                styles.statValue, 
                { 
                  color: accelA < 0 ? '#22C55E' : '#EF4444',
                  marginTop: 8,
                  fontSize: 16 
                }
              ]}>
                {accelA > 0 ? '+' : ''}{accelA.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Acceleration
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Wizard 2{'\n'}(Start 25%)
              </Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                {avgB.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Avg Interval
              </Text>
              <Text style={[
                styles.statValue,
                {
                  color: accelB < 0 ? '#22C55E' : '#EF4444',
                  marginTop: 8,
                  fontSize: 16
                }
              ]}>
                {accelB > 0 ? '+' : ''}{accelB.toFixed(0)}ms
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Acceleration
              </Text>
            </View>
          </View>
          
          <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
            {speedImprovement > 0 ? (
              <>
                <Text style={[styles.comparisonText, { color: colors.accent }]}>
                  ⚡ {Math.abs(speedImprovement).toFixed(0)}ms lebih cepat dengan progress awal!
                </Text>
                {accelImprovement < 0 && (
                  <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
                    Dan akselerasi {Math.abs(accelImprovement).toFixed(0)}ms lebih tinggi!
                  </Text>
                )}
              </>
            ) : (
              <Text style={[styles.comparisonText, { color: colors.accent }]}>
                💪 Kecepatan stabil di kedua wizard!
              </Text>
            )}
          </View>

          {/* Acceleration Chart Indicator */}
          <View style={styles.accelChart}>
            <Text style={[styles.accelTitle, { color: colors.textPrimary }]}>
              🚀 Acceleration Pattern
            </Text>
            <View style={styles.accelBars}>
              <View style={styles.accelBarContainer}>
                <Text style={[styles.accelLabel, { color: colors.textSecondary }]}>Wizard 1</Text>
                <View style={[styles.accelBar, { 
                  backgroundColor: accelA < 0 ? '#22C55E' : '#EF4444',
                  height: Math.min(Math.abs(accelA / 2), 60)
                }]} />
                <Text style={[styles.accelValue, { color: colors.textSecondary }]}>
                  {accelA < 0 ? '⬇️' : '⬆️'} {Math.abs(accelA).toFixed(0)}ms
                </Text>
              </View>
              <View style={styles.accelBarContainer}>
                <Text style={[styles.accelLabel, { color: colors.textSecondary }]}>Wizard 2</Text>
                <View style={[styles.accelBar, {
                  backgroundColor: accelB < 0 ? '#22C55E' : '#EF4444',
                  height: Math.min(Math.abs(accelB / 2), 60)
                }]} />
                <Text style={[styles.accelValue, { color: colors.textSecondary }]}>
                  {accelB < 0 ? '⬇️' : '⬆️'} {Math.abs(accelB).toFixed(0)}ms
                </Text>
              </View>
            </View>
            <Text style={[styles.accelNote, { color: colors.textSecondary }]}>
              ⬇️ = Faster (Good)  |  ⬆️ = Slower
            </Text>
          </View>
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎯 Goal-Gradient Effect
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Orang cenderung bergerak lebih cepat saat mendekati tujuan! Menunjukkan progress awal (artificial progress) membuat pengguna merasa lebih dekat dengan penyelesaian dan meningkatkan motivasi.
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

// Doherty Threshold Simulation - Image Gallery
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
  const fadeAnim = useState(new Animated.Value(0))[0];
  const shimmerAnim = useState(new Animated.Value(0))[0];

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

  // Scenario A: Unresponsive (Freezes)
  const loadGalleryA = () => {
    setIsLoadingA(true);
    // Simulate freezing - block main thread
    const start = Date.now();
    while (Date.now() - start < 500) {
      // Intentional freeze
    }
    setShowImagesA(true);
    setIsLoadingA(false);
  };

  const handleRageTapA = () => {
    if (!showImagesA) {
      setRageTapsA(prev => prev + 1);
    }
  };

  const handleImageSelectA = (index) => {
    if (index === 4) { // 5th image (0-indexed)
      setSelectedImage(index);
      setTimeout(() => {
        fadeAnim.setValue(0);
        setPhase('ratingA');
      }, 300);
    }
  };

  // Scenario B: Responsive (Skeleton)
  const loadGalleryB = () => {
    setIsLoadingB(true);
    setShowImagesB(false);
    // Show skeleton immediately, load after delay
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowImagesB(true);
      setIsLoadingB(false);
    }, 500);
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

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          ⚡ Doherty Threshold
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan mengalami 2 sistem berbeda:{'\n'}
          {'\n'}📸 <Text style={{ fontWeight: '600' }}>Tap tombol "Load Gallery"</Text>
          {'\n'}🎯 <Text style={{ fontWeight: '600' }}>Tap gambar ke-5 (baris 1, kolom 5)</Text>
          {'\n'}⏱️ Sistem responsif Anda akan diukur
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

  // Scenario A: Unresponsive System
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Sistem 1 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          Tap "Load Gallery", lalu tap gambar ke-5
        </Text>

        {!showImagesA && (
          <TouchableOpacity
            style={[styles.loadButton, { backgroundColor: colors.accent }]}
            onPress={loadGalleryA}
            onPressIn={handleRageTapA}
          >
            <Text style={styles.loadButtonText}>Load Gallery</Text>
            <Ionicons name="images" size={20} color="#FFF" />
          </TouchableOpacity>
        )}

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

        {/* Rage Tap Counter */}
        <View style={[styles.tapCounter, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.tapCounterText, { color: colors.accent }]}>
            Tap saat loading: {rageTapsA}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Rating Phase A
  if (phase === 'ratingA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          Bagaimana sistem terasa?
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary, marginBottom: 24 }]}>
          Rating responsivitas sistem (1 = Laggy, 5 = Snappy)
        </Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.ratingButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleRating(num, 'ratingA')}
            >
              <Text style={[styles.ratingNumber, { color: colors.textPrimary }]}>{num}</Text>
              <Text style={[styles.ratingLabel, { color: colors.textSecondary }]}>
                {num === 1 ? 'Laggy' : num === 5 ? 'Snappy' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Scenario B: Responsive System with Skeleton
  if (phase === 'scenarioB') {
    const shimmerTranslate = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 100],
    });

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Sistem 2 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary }]}>
          Tap "Load Gallery", lalu tap gambar ke-5
        </Text>

        {!isLoadingB && !showImagesB && (
          <TouchableOpacity
            style={[styles.loadButton, { backgroundColor: colors.accent }]}
            onPress={loadGalleryB}
          >
            <Text style={styles.loadButtonText}>Load Gallery</Text>
            <Ionicons name="images" size={20} color="#FFF" />
          </TouchableOpacity>
        )}

        {/* Skeleton Loaders */}
        {isLoadingB && !showImagesB && (
          <View style={styles.imageGrid}>
            {[...Array(20)].map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.skeletonCard, { backgroundColor: colors.surface }]}
                onPress={handleRageTapB}
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
              </TouchableOpacity>
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

        {/* Rage Tap Counter */}
        <View style={[styles.tapCounter, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.tapCounterText, { color: colors.accent }]}>
            Tap saat loading: {rageTapsB}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Rating Phase B
  if (phase === 'ratingB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          Bagaimana sistem terasa?
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary, marginBottom: 24 }]}>
          Rating responsivitas sistem (1 = Laggy, 5 = Snappy)
        </Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.ratingButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => handleRating(num, 'ratingB')}
            >
              <Text style={[styles.ratingNumber, { color: colors.textPrimary }]}>{num}</Text>
              <Text style={[styles.ratingLabel, { color: colors.textSecondary }]}>
                {num === 1 ? 'Laggy' : num === 5 ? 'Snappy' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const ratingDiff = ratingB - ratingA;
    
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi
        </Text>
        
        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.surface }]}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Sistem 1 (Freeze)</Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                😤 {rageTapsA}
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Rage Taps
              </Text>
              <Text style={[styles.statValue, { color: colors.textPrimary, marginTop: 8 }]}>
                {ratingA}/5
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Feel Rating
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Sistem 2 (Skeleton)</Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                😊 {rageTapsB}
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Rage Taps
              </Text>
              <Text style={[styles.statValue, { color: colors.accent, marginTop: 8 }]}>
                {ratingB}/5
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Feel Rating
              </Text>
            </View>
          </View>
          
          <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
            <Text style={[styles.comparisonText, { color: colors.accent }]}>
              {rageTapsA > rageTapsB 
                ? `✨ ${rageTapsA - rageTapsB} rage taps lebih sedikit dengan feedback!` 
                : 'Sistem responsif mengurangi frustrasi!'}
            </Text>
            {ratingDiff > 0 && (
              <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
                Sistem terasa {Math.abs(ratingDiff)} poin lebih snappy!
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⚡ Doherty Threshold (400ms)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Sistem harus merespons dalam &lt;400ms untuk menjaga flow pengguna. Feedback visual instant (skeleton/loader) membuat sistem terasa lebih cepat meski loading time sama!
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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

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
          🛒 Jakob's Law
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 e-commerce layout:{'\n'}
          {'\n'}🛍️ <Text style={{ fontWeight: '600' }}>Layout 1: Desain eksperimental</Text>
          {'\n'}🛍️ <Text style={{ fontWeight: '600' }}>Layout 2: Desain standar</Text>
          {'\n'}⏱️ Waktu pencarian Anda akan diukur
          {'\n'}{'\n'}
          <Text style={{ fontWeight: '600' }}>Tugas: Tap ikon Shopping Cart secepat mungkin!</Text>
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={() => startScenario('A')}
        >
          <Text style={styles.startButtonText}>Mulai Simulasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Task Phase - Scenario A (Experimental)
  if (phase === 'task' && scenario === 'A') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Layout 1 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary, marginBottom: 16 }]}>
          Tap ikon Shopping Cart!
        </Text>

        {/* E-Commerce Layout A (Experimental) */}
        <View style={[styles.ecommerceScreen, { backgroundColor: colors.surface }]}>
          {/* Header */}
          <View style={styles.ecomHeader}>
            <Ionicons name="menu" size={24} color={colors.textPrimary} />
            <Text style={[styles.ecomLogo, { color: colors.textPrimary }]}>ShopHub</Text>
            <Ionicons name="search" size={24} color={colors.textPrimary} />
          </View>

          {/* Banner */}
          <View style={[styles.ecomBanner, { backgroundColor: colors.accent }]}>
            <Text style={styles.bannerText}>Flash Sale! 50% Off</Text>
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

          {/* Experimental Cart - Bottom Left with unusual icon */}
          <TouchableOpacity
            style={[styles.cartButtonExperimental, { backgroundColor: colors.accent }]}
            onPress={handleScreenTap}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Ionicons name="bag-add" size={28} color="#FFF" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  // Task Phase - Scenario B (Standard)
  if (phase === 'task' && scenario === 'B') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioTitle, { color: colors.textSecondary }]}>
          Layout 2 of 2
        </Text>
        <Text style={[styles.taskText, { color: colors.textPrimary, marginBottom: 16 }]}>
          Tap ikon Shopping Cart!
        </Text>

        {/* E-Commerce Layout B (Standard) */}
        <View style={[styles.ecommerceScreen, { backgroundColor: colors.surface }]}>
          {/* Header with Standard Cart */}
          <View style={styles.ecomHeader}>
            <Ionicons name="menu" size={24} color={colors.textPrimary} />
            <Text style={[styles.ecomLogo, { color: colors.textPrimary }]}>ShopHub</Text>
            <TouchableOpacity onPress={handleScreenTap}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Ionicons name="cart" size={24} color={colors.accent} />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <View style={[styles.ecomBanner, { backgroundColor: colors.accent }]}>
            <Text style={styles.bannerText}>Flash Sale! 50% Off</Text>
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
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const timeDiff = timeA - timeB;
    const zoneA = tapLocationA ? calculateZone(tapLocationA.x, tapLocationA.y) : 'Unknown';
    const zoneB = tapLocationB ? calculateZone(tapLocationB.x, tapLocationB.y) : 'Unknown';
    
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
                Layout 1{'\n'}(Experimental)
              </Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                {(timeA / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Locate Time
              </Text>
              <Text style={[styles.statZone, { color: colors.textSecondary, marginTop: 8 }]}>
                📍 {zoneA}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Layout 2{'\n'}(Standard)
              </Text>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                {(timeB / 1000).toFixed(2)}s
              </Text>
              <Text style={[styles.statSubvalue, { color: colors.textSecondary }]}>
                Locate Time
              </Text>
              <Text style={[styles.statZone, { color: colors.textSecondary, marginTop: 8 }]}>
                📍 {zoneB}
              </Text>
            </View>
          </View>
          
          {timeDiff > 0 && (
            <View style={[styles.comparisonBox, { backgroundColor: colors.accentSubtle }]}>
              <Text style={[styles.comparisonText, { color: colors.accent }]}>
                ⚡ {(Math.abs(timeDiff) / 1000).toFixed(2)}s lebih cepat dengan layout standar!
              </Text>
              <Text style={[styles.comparisonSubtext, { color: colors.textSecondary }]}>
                User langsung mencari di posisi familiar
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
            🛒 Jakob's Law
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            User lebih nyaman dengan pola familiar! Menempatkan elemen di posisi yang tidak konvensional membuat user kebingungan dan memperlambat interaksi. Ikuti konvensi standar industri.
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
                      <Ionicons name={iconData.name} size={24} color={iconData.color} />
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

  // Result Phase
  if (phase === 'result') {
    const isAccurateA = answerA === correctAnswer;
    const isAccurateB = answerB === correctAnswer;
    const speedImprovement = ((timeA - timeB) / timeA * 100).toFixed(1);
    const fasterScenario = timeB < timeA ? 'Layout 2 (Grouped)' : 'Layout 1 (Scattered)';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Layout 1 (No Grouping):
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {(timeA / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Jawaban Layout 1:
            </Text>
            <Text style={[styles.statValue, { color: isAccurateA ? '#22C55E' : '#EF4444' }]}>
              {answerA} {isAccurateA ? '✓' : '✗'} (Benar: {correctAnswer})
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Layout 2 (Grouped):
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {(timeB / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Jawaban Layout 2:
            </Text>
            <Text style={[styles.statValue, { color: isAccurateB ? '#22C55E' : '#EF4444' }]}>
              {answerB} {isAccurateB ? '✓' : '✗'} (Benar: {correctAnswer})
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🚀 Peningkatan Kecepatan:
            </Text>
            <Text style={[styles.statValue, { color: speedImprovement > 0 ? '#22C55E' : '#EF4444' }]}>
              {Math.abs(speedImprovement)}% {speedImprovement > 0 ? 'faster' : 'slower'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Lebih Cepat:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {fasterScenario}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🗂️ Law of Common Region
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Visual grouping dengan borders atau background yang jelas membantu user memahami struktur informasi lebih cepat! 
            Pengelompokan visual mengurangi beban kognitif dan meningkatkan akurasi dalam scanning konten.
            {'\n'}{'\n'}
            Layout dengan "Common Region" (kotak grup) membuat counting task {Math.abs(speedImprovement)}% lebih {speedImprovement > 0 ? 'cepat' : 'lambat'} dibanding layout scattered.
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

  // Result Phase
  if (phase === 'result') {
    const errorRateA = errorA ? 'Ada Kesalahan' : 'Sempurna';
    const errorRateB = errorB ? 'Ada Kesalahan' : 'Sempurna';
    const speedImprovement = ((timeA - timeB) / timeA * 100).toFixed(1);
    const fasterScenario = timeB < timeA ? 'Layout 2 (Grouped)' : 'Layout 1 (Scattered)';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Layout 1 (Poor Proximity):
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {(timeA / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ❌ Error Rate Layout 1:
            </Text>
            <Text style={[styles.statValue, { color: errorA ? '#EF4444' : '#22C55E' }]}>
              {errorRateA} ({attemptsA} klik)
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Layout 2 (Good Proximity):
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {(timeB / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ❌ Error Rate Layout 2:
            </Text>
            <Text style={[styles.statValue, { color: errorB ? '#EF4444' : '#22C55E' }]}>
              {errorRateB} ({attemptsB} klik)
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🚀 Peningkatan Kecepatan:
            </Text>
            <Text style={[styles.statValue, { color: speedImprovement > 0 ? '#22C55E' : '#EF4444' }]}>
              {Math.abs(speedImprovement)}% {speedImprovement > 0 ? 'faster' : 'slower'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Layout Terbaik:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {fasterScenario}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            📍 Law of Proximity
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Elemen yang berdekatan dipersepsikan sebagai terkait! Layout dengan proximity yang baik (label dekat dengan toggle, clear spacing antar grup) membuat task {Math.abs(speedImprovement)}% lebih {speedImprovement > 0 ? 'cepat' : 'lambat'}.
            {'\n'}{'\n'}
            Layout 1 memaksa user untuk "visual scanning" horizontal yang melelahkan. Layout 2 mengelompokkan informasi terkait secara logis, mengurangi beban kognitif dan error rate.
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

  // Result Phase
  if (phase === 'result') {
    const isCorrectA = selectedA === complexShapeId;
    const isCorrectB = selectedB === simpleShapeId;
    const accuracyA = isCorrectA ? '100%' : '0%';
    const accuracyB = isCorrectB ? '100%' : '0%';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Tes Memori
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🔷 Logo 1 (Kompleks):
            </Text>
            <Text style={[styles.statValue, { color: isCorrectA ? '#22C55E' : '#EF4444' }]}>
              {isCorrectA ? '✓ Benar' : '✗ Salah'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Akurasi Logo 1:
            </Text>
            <Text style={[styles.statValue, { color: isCorrectA ? '#22C55E' : '#EF4444' }]}>
              {accuracyA}
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🔶 Logo 2 (Sederhana):
            </Text>
            <Text style={[styles.statValue, { color: isCorrectB ? '#22C55E' : '#EF4444' }]}>
              {isCorrectB ? '✓ Benar' : '✗ Salah'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Akurasi Logo 2:
            </Text>
            <Text style={[styles.statValue, { color: isCorrectB ? '#22C55E' : '#EF4444' }]}>
              {accuracyB}
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Logo Lebih Mudah Diingat:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {isCorrectB && !isCorrectA ? 'Logo 2 (Sederhana)' : 
               isCorrectA && !isCorrectB ? 'Logo 1 (Kompleks)' : 
               isCorrectA && isCorrectB ? 'Keduanya Benar!' : 'Keduanya Salah'}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🧠 Law of Prägnanz (Simplicity)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Otak manusia cenderung mengingat bentuk sederhana dan teratur lebih baik daripada bentuk kompleks dan acak!
            {'\n'}{'\n'}
            Logo 2 (lingkaran + segitiga) lebih mudah diingat karena terdiri dari bentuk geometris dasar yang simetris. Logo 1 (polygon tidak beraturan) sulit diingat karena tidak ada pola yang jelas.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan bentuk sederhana, simetris, dan familiar untuk logo, ikon, atau elemen visual yang perlu diingat user.
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

  // Result Phase
  if (phase === 'result') {
    const speedImprovement = ((timeA - timeB) / timeA * 100).toFixed(1);
    const fasterScenario = timeB < timeA ? 'Interface 2 (Visual Cue)' : 'Interface 1 (No Cue)';
    const searchEfficiency = timeB < timeA ? 'Jauh Lebih Efisien' : 'Kurang Efisien';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Simulasi
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Interface 1 (No Visual Cue):
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {(timeA / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              👁️ Visual Search 1:
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              Lambat (Harus baca semua)
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Interface 2 (Visual Cue):
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {(timeB / 1000).toFixed(2)}s
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              👁️ Visual Search 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {searchEfficiency}
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🚀 Peningkatan Kecepatan:
            </Text>
            <Text style={[styles.statValue, { color: speedImprovement > 0 ? '#22C55E' : '#EF4444' }]}>
              {Math.abs(speedImprovement)}% {speedImprovement > 0 ? 'faster' : 'slower'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Interface Tercepat:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {fasterScenario}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎨 Law of Similarity
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Elemen dengan tampilan visual yang serupa dipersepsikan sebagai kelompok yang terkait!
            {'\n'}{'\n'}
            Interface 2 dengan visual cue (warna merah untuk "Urgent") membuat task {Math.abs(speedImprovement)}% lebih {speedImprovement > 0 ? 'cepat' : 'lambat'}. User dapat langsung mengidentifikasi target dengan "pre-attentive processing" tanpa membaca setiap label.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan similarity visual (warna, bentuk, ukuran) untuk mengelompokkan elemen terkait dan mempercepat visual scanning.
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
  const [phase, setPhase] = useState('intro'); // intro, scenarioA, ratingA, scenarioB, ratingB, result
  const [ratingA, setRatingA] = useState(null); // true = looks like sequence, false = doesn't
  const [ratingB, setRatingB] = useState(null);
  const [confidenceA, setConfidenceA] = useState(0); // 1-5 rating
  const [confidenceB, setConfidenceB] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const lineAnim = useState(new Animated.Value(0))[0];

  // Step data
  const steps = [
    { id: 1, icon: 'person-outline', label: 'Account', color: '#3B82F6' },
    { id: 2, icon: 'card-outline', label: 'Payment', color: '#8B5CF6' },
    { id: 3, icon: 'checkmark-circle-outline', label: 'Complete', color: '#10B981' },
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
    setPhase('scenarioA');
  };

  const startScenarioB = () => {
    fadeAnim.setValue(0);
    lineAnim.setValue(0);
    setPhase('scenarioB');
    
    // Animate the connecting line
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleRatingA = (isSequence) => {
    setRatingA(isSequence);
    fadeAnim.setValue(0);
    setPhase('confidenceA');
  };

  const handleConfidenceA = (confidence) => {
    setConfidenceA(confidence);
    fadeAnim.setValue(0);
    setTimeout(() => startScenarioB(), 300);
  };

  const handleRatingB = (isSequence) => {
    setRatingB(isSequence);
    fadeAnim.setValue(0);
    setPhase('confidenceB');
  };

  const handleConfidenceB = (confidence) => {
    setConfidenceB(confidence);
    fadeAnim.setValue(0);
    setTimeout(() => setPhase('result'), 300);
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🔗 Law of Uniform Connectedness
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Anda akan melihat 2 desain process stepper. Untuk setiap desain:{'\n'}
          {'\n'}👁️ <Text style={{ fontWeight: '600' }}>Amati tampilan visual step</Text>
          {'\n'}🤔 <Text style={{ fontWeight: '600' }}>Nilai apakah terlihat seperti satu rangkaian proses</Text>
          {'\n'}📊 Persepsi Anda akan dianalisis
          {'\n'}{'\n'}Tidak ada jawaban benar/salah - jawablah sesuai persepsi Anda!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Evaluasi</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Scenario A - Disconnected Steps
  if (phase === 'scenarioA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Desain 1
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Amati desain ini dengan seksama
        </Text>

        {/* Disconnected Stepper - Just icons with whitespace */}
        <View style={styles.stepperContainerDisconnected}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepDisconnected}>
              <View style={[styles.stepIconCircle, { backgroundColor: step.color }]}>
                <Ionicons name={step.icon} size={32} color="#FFFFFF" />
              </View>
              <Text style={[styles.stepLabel, { color: colors.textPrimary }]}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Rating Question */}
        <View style={styles.ratingSection}>
          <Text style={[styles.ratingQuestion, { color: colors.textPrimary }]}>
            Apakah ini terlihat seperti satu rangkaian proses yang terhubung?
          </Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity
              style={[styles.ratingButton, { backgroundColor: '#EF4444', borderColor: '#DC2626' }]}
              onPress={() => handleRatingA(false)}
            >
              <Ionicons name="close-circle" size={24} color="#FFF" />
              <Text style={styles.ratingButtonText}>Tidak</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ratingButton, { backgroundColor: '#22C55E', borderColor: '#16A34A' }]}
              onPress={() => handleRatingA(true)}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFF" />
              <Text style={styles.ratingButtonText}>Ya</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  // Confidence Rating A
  if (phase === 'confidenceA') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Desain 1 - Tingkat Keyakinan
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Seberapa yakin Anda dengan jawaban tersebut?
        </Text>

        <View style={styles.confidenceSection}>
          <Text style={[styles.confidenceLabel, { color: colors.textSecondary }]}>
            1 = Sangat Tidak Yakin | 5 = Sangat Yakin
          </Text>
          <View style={styles.confidenceButtons}>
            {[1, 2, 3, 4, 5].map((conf) => (
              <TouchableOpacity
                key={conf}
                style={[styles.confidenceButton, { backgroundColor: colors.accent, borderColor: colors.accent }]}
                onPress={() => handleConfidenceA(conf)}
              >
                <Text style={styles.confidenceButtonText}>{conf}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  }

  // Scenario B - Connected Steps
  if (phase === 'scenarioB') {
    const lineWidth = lineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Desain 2
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Amati desain ini dengan seksama
        </Text>

        {/* Connected Stepper - Icons with connecting line */}
        <View style={styles.stepperContainerConnected}>
          <View style={styles.stepsRow}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.stepConnected}>
                <View style={[styles.stepIconCircle, { backgroundColor: step.color, zIndex: 2 }]}>
                  <Ionicons name={step.icon} size={32} color="#FFFFFF" />
                </View>
                <Text style={[styles.stepLabel, { color: colors.textPrimary }]}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Animated Connecting Line */}
          <Animated.View 
            style={[
              styles.connectingLine, 
              { 
                backgroundColor: colors.accent,
                width: lineWidth,
              }
            ]} 
          />
        </View>

        {/* Rating Question */}
        <View style={styles.ratingSection}>
          <Text style={[styles.ratingQuestion, { color: colors.textPrimary }]}>
            Apakah ini terlihat seperti satu rangkaian proses yang terhubung?
          </Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity
              style={[styles.ratingButton, { backgroundColor: '#EF4444', borderColor: '#DC2626' }]}
              onPress={() => handleRatingB(false)}
            >
              <Ionicons name="close-circle" size={24} color="#FFF" />
              <Text style={styles.ratingButtonText}>Tidak</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ratingButton, { backgroundColor: '#22C55E', borderColor: '#16A34A' }]}
              onPress={() => handleRatingB(true)}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFF" />
              <Text style={styles.ratingButtonText}>Ya</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  // Confidence Rating B
  if (phase === 'confidenceB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Desain 2 - Tingkat Keyakinan
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          Seberapa yakin Anda dengan jawaban tersebut?
        </Text>

        <View style={styles.confidenceSection}>
          <Text style={[styles.confidenceLabel, { color: colors.textSecondary }]}>
            1 = Sangat Tidak Yakin | 5 = Sangat Yakin
          </Text>
          <View style={styles.confidenceButtons}>
            {[1, 2, 3, 4, 5].map((conf) => (
              <TouchableOpacity
                key={conf}
                style={[styles.confidenceButton, { backgroundColor: '#22C55E', borderColor: '#16A34A' }]}
                onPress={() => handleConfidenceB(conf)}
              >
                <Text style={styles.confidenceButtonText}>{conf}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  }

  // Result Phase
  if (phase === 'result') {
    const perceptionA = ratingA ? 'Ya, Terhubung' : 'Tidak Terhubung';
    const perceptionB = ratingB ? 'Ya, Terhubung' : 'Tidak Terhubung';
    const improvedPerception = ratingB && !ratingA;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Evaluasi
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              👁️ Persepsi Desain 1:
            </Text>
            <Text style={[styles.statValue, { color: ratingA ? '#22C55E' : '#EF4444' }]}>
              {perceptionA}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Tingkat Keyakinan 1:
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {confidenceA}/5
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              👁️ Persepsi Desain 2:
            </Text>
            <Text style={[styles.statValue, { color: ratingB ? '#22C55E' : '#EF4444' }]}>
              {perceptionB}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Tingkat Keyakinan 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {confidenceB}/5
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🔗 Visual Connection Impact:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {improvedPerception ? 'Sangat Berpengaruh' : ratingB === ratingA ? 'Konsisten' : 'Bervariasi'}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🔗 Law of Uniform Connectedness
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Elemen yang terhubung secara visual (dengan garis, warna, atau container) dipersepsikan lebih terkait daripada elemen tanpa koneksi visual!
            {'\n'}{'\n'}
            {improvedPerception && 'Anda merasakan perbedaan yang signifikan! '}Desain 2 dengan garis penghubung membuat step terlihat lebih jelas sebagai satu rangkaian proses. Prinsip ini lebih kuat daripada proximity atau similarity saja.
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Gunakan elemen visual penghubung (garis, warna background, borders) untuk menunjukkan relasi antara komponen UI. Ini sangat efektif untuk stepper, timeline, dan navigation flow.
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
        
        <Animated.View 
          style={[
            styles.codeDisplayContainer,
            { 
              backgroundColor: colors.cardBackground,
              borderColor: colors.accent,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={[styles.codeTextUnchunked, { color: colors.textPrimary }]}>
            {code}
          </Text>
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
        
        <Animated.View 
          style={[
            styles.codeDisplayContainer,
            { 
              backgroundColor: colors.cardBackground,
              borderColor: '#22C55E',
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={[styles.codeTextChunked, { color: colors.textPrimary }]}>
            {formatChunked(code)}
          </Text>
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

  // Result Phase
  if (phase === 'result') {
    const improvement = accuracyB - accuracyA;
    const betterFormat = accuracyB > accuracyA ? 'Format 2 (Chunked)' : 
                         accuracyA > accuracyB ? 'Format 1 (Unchunked)' : 
                         'Keduanya Sama';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Tes Memori
        </Text>

        {/* Show Correct Code */}
        <View style={[styles.correctCodeBox, { backgroundColor: '#F3F4F6', borderColor: colors.border }]}>
          <Text style={[styles.correctCodeLabel, { color: colors.textSecondary }]}>
            Kode yang benar:
          </Text>
          <Text style={[styles.correctCodeText, { color: colors.textPrimary }]}>
            {formatChunked(code)}
          </Text>
        </View>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🔢 Format 1 (Unchunked):
            </Text>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {inputA.replace(/\s/g, '') || '-'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Akurasi Format 1:
            </Text>
            <Text style={[styles.statValue, { color: accuracyA >= 70 ? '#22C55E' : '#EF4444', fontWeight: '700' }]}>
              {accuracyA}%
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🔢 Format 2 (Chunked):
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {inputB.replace(/\s/g, '') || '-'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Akurasi Format 2:
            </Text>
            <Text style={[styles.statValue, { color: accuracyB >= 70 ? '#22C55E' : '#EF4444', fontWeight: '700' }]}>
              {accuracyB}%
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📈 Peningkatan Akurasi:
            </Text>
            <Text style={[styles.statValue, { color: improvement > 0 ? '#22C55E' : improvement < 0 ? '#EF4444' : colors.textPrimary }]}>
              {improvement > 0 ? '+' : ''}{improvement}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Format Terbaik:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {betterFormat}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🧠 Miller's Law (7±2)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Memori kerja manusia hanya dapat menyimpan 7±2 "chunks" informasi sekaligus!
            {'\n'}{'\n'}
            Format chunked (839 201 574) membagi 9 digit menjadi 3 chunks, membuat informasi lebih mudah diingat dibanding 9 digit terpisah. Anda mengalami peningkatan {Math.abs(improvement)}% dengan chunking!
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Kelompokkan informasi panjang (nomor telepon, kartu kredit, kode) menjadi chunks 3-4 karakter untuk meningkatkan memorability.
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

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          🔄 Postel's Law
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          "Be liberal in what you accept, be conservative in what you send." Anda akan mengisi form currency dengan 2 pendekatan berbeda:{'\n'}
          {'\n'}💰 <Text style={{ fontWeight: '600' }}>Masukkan jumlah: 50,000</Text>
          {'\n'}⚠️ <Text style={{ fontWeight: '600' }}>Scenario 1: Validasi strict (hanya angka)</Text>
          {'\n'}✅ <Text style={{ fontWeight: '600' }}>Scenario 2: Validasi liberal (terima berbagai format)</Text>
          {'\n'}{'\n'}📊 Frustration dan success rate Anda akan diukur. Coba ketik "50.000" atau "50k"!
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startScenarioA}
        >
          <Text style={styles.startButtonText}>Mulai Form Challenge</Text>
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
          Scenario 1 - Strict Validation
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          💰 Masukkan jumlah: <Text style={{ fontWeight: '700' }}>50,000</Text>
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
                placeholder="Enter amount"
                placeholderTextColor={colors.textSecondary}
                keyboardType="default"
                onSubmitEditing={handleSubmitA}
              />
            </View>
            <Text style={[styles.helperText, { color: colors.textSecondary }]}>
              Format: Numbers only (e.g., 50000)
            </Text>
          </View>

          {/* Error Message */}
          {showErrorA && (
            <Animated.View 
              style={[styles.errorBox, { opacity: fadeAnim }]}
            >
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <Text style={styles.errorText}>
                Invalid format. Numbers only (no dots, commas, or letters).
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

        {/* Hint */}
        <View style={styles.hintBox}>
          <Ionicons name="bulb-outline" size={16} color={colors.textSecondary} />
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            Try typing: "50.000", "50k", or "Rp 50000"
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Scenario B - Liberal Validation
  if (phase === 'scenarioB') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: '#22C55E', backgroundColor: '#DCFCE7' }]}>
          Scenario 2 - Liberal Validation
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          💰 Masukkan jumlah: <Text style={{ fontWeight: '700' }}>50,000</Text>
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
                placeholder="Enter amount (any format)"
                placeholderTextColor={colors.textSecondary}
                keyboardType="default"
                onSubmitEditing={handleSubmitB}
              />
            </View>
            <Text style={[styles.helperText, { color: colors.textSecondary }]}>
              We accept: 50000, 50.000, 50,000, 50k, Rp 50000, etc.
            </Text>
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

  // Result Phase
  if (phase === 'result') {
    const successRateA = successA ? 100 : 0;
    const successRateB = successB ? 100 : 0;
    const betterApproach = successRateB >= successRateA && errorCountA === 0 ? 'Both Equal' : 'Scenario 2 (Liberal)';

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Evaluasi
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              😤 Frustration Scenario 1:
            </Text>
            <Text style={[styles.statValue, { color: errorCountA > 0 ? '#EF4444' : '#22C55E' }]}>
              {errorCountA} errors
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Success Rate Scenario 1:
            </Text>
            <Text style={[styles.statValue, { color: successA ? '#22C55E' : '#EF4444' }]}>
              {successRateA}%
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              😤 Frustration Scenario 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              0 errors
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ✅ Success Rate Scenario 2:
            </Text>
            <Text style={[styles.statValue, { color: successB ? '#22C55E' : '#EF4444' }]}>
              {successRateB}%
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📉 Frustration Reduction:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              {errorCountA > 0 ? `${errorCountA} → 0` : 'No change'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Better Approach:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {betterApproach}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🔄 Postel's Law (Robustness Principle)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            "Be conservative in what you send, be liberal in what you accept."
            {'\n'}{'\n'}
            Scenario 1 (strict) menyebabkan {errorCountA} error{errorCountA !== 1 ? 's' : ''} karena menolak format umum seperti "50.000" atau "50k". User frustasi harus menebak-nebak format yang benar!
            {'\n'}{'\n'}
            Scenario 2 (liberal) menerima berbagai format input dan otomatis memformatnya. Result: 0 errors, happy users! 😊
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Accept flexible input formats (dots, commas, k for thousands, currency symbols). Parse and normalize on the backend. Show helpful real-time formatting. Never punish users for natural input patterns!
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

  // 10 fruit items for the carousel
  const fruits = [
    { id: 1, name: 'Apple', icon: '🍎', position: 1, category: 'primacy' },
    { id: 2, name: 'Banana', icon: '🍌', position: 2, category: 'primacy' },
    { id: 3, name: 'Cherry', icon: '🍒', position: 3, category: 'primacy' },
    { id: 4, name: 'Dragon Fruit', icon: '🐉', position: 4, category: 'middle' },
    { id: 5, name: 'Eggplant', icon: '🍆', position: 5, category: 'middle' },
    { id: 6, name: 'Fig', icon: '🫐', position: 6, category: 'middle' },
    { id: 7, name: 'Grape', icon: '🍇', position: 7, category: 'middle' },
    { id: 8, name: 'Honeydew', icon: '🍈', position: 8, category: 'recency' },
    { id: 9, name: 'Kiwi', icon: '🥝', position: 9, category: 'recency' },
    { id: 10, name: 'Lemon', icon: '🍋', position: 10, category: 'recency' },
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
    // Shuffle fruits for recall phase
    const shuffled = [...fruits].sort(() => Math.random() - 0.5);
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

  // Calculate recall metrics
  const calculateMetrics = () => {
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
      totalRecall: selectedItems.length,
      totalItems: fruits.length,
      firstItemRecalled,
      lastItemRecalled,
      middleItemRecalled,
    };
  };

  // Intro Phase
  if (phase === 'intro') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
          📊 Serial Position Effect
        </Text>
        <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
          Tes memori Anda! Simulasi ini akan mendemonstrasikan bagaimana posisi item dalam list mempengaruhi recall:{'\n'}
          {'\n'}👁️ <Text style={{ fontWeight: '600' }}>Lihat: Scroll horizontal list 10 buah-buahan</Text>
          {'\n'}🧠 <Text style={{ fontWeight: '600' }}>Ingat: Hafalkan buah-buahan yang Anda lihat</Text>
          {'\n'}✅ <Text style={{ fontWeight: '600' }}>Pilih: Tap buah yang Anda ingat</Text>
          {'\n'}{'\n'}📈 Hipotesis: Anda akan mengingat item pertama (#1) dan terakhir (#10) lebih baik daripada item tengah (#5).
        </Text>
        
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: colors.accent }]}
          onPress={startStudy}
        >
          <Text style={styles.startButtonText}>Mulai Memory Test</Text>
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
          Study Phase
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          👆 Scroll untuk melihat semua buah-buahan
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
          Recall Phase
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          🧠 Pilih buah yang Anda ingat dari list
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
            Dipilih: {selectedItems.length} / {fruits.length}
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

  // Result Phase
  if (phase === 'result') {
    const metrics = calculateMetrics();
    const serialPositionConfirmed = 
      (metrics.primacyRate > metrics.middleRate) || 
      (metrics.recencyRate > metrics.middleRate);

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Memory Test
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🥇 Primacy (Item 1-3):
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              {metrics.primacyRecall}/3 ({metrics.primacyRate}%)
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📊 Middle (Item 4-7):
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444', fontWeight: '700' }]}>
              {metrics.middleRecall}/4 ({metrics.middleRate}%)
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🥉 Recency (Item 8-10):
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              {metrics.recencyRecall}/3 ({metrics.recencyRate}%)
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🍎 Item #1 (First):
            </Text>
            <Text style={[styles.statValue, { color: metrics.firstItemRecalled ? '#22C55E' : '#EF4444' }]}>
              {metrics.firstItemRecalled ? '✓ Ingat' : '✗ Lupa'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🍆 Item #5 (Middle):
            </Text>
            <Text style={[styles.statValue, { color: metrics.middleItemRecalled ? '#22C55E' : '#EF4444' }]}>
              {metrics.middleItemRecalled ? '✓ Ingat' : '✗ Lupa'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🍋 Item #10 (Last):
            </Text>
            <Text style={[styles.statValue, { color: metrics.lastItemRecalled ? '#22C55E' : '#EF4444' }]}>
              {metrics.lastItemRecalled ? '✓ Ingat' : '✗ Lupa'}
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📈 Total Recall:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {metrics.totalRecall}/{metrics.totalItems} items
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎯 Hipotesis:
            </Text>
            <Text style={[styles.statValue, { color: serialPositionConfirmed ? '#22C55E' : '#EF4444', fontWeight: '700' }]}>
              {serialPositionConfirmed ? 'Terbukti ✓' : 'Tidak Terbukti'}
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            📊 Serial Position Effect
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            User cenderung mengingat item pertama (Primacy: {metrics.primacyRate}%) dan item terakhir (Recency: {metrics.recencyRate}%) lebih baik daripada item tengah (Middle: {metrics.middleRate}%)!
            {'\n'}{'\n'}
            {serialPositionConfirmed 
              ? `Hasil Anda membuktikan Serial Position Effect! Item di awal dan akhir list lebih mudah diingat.`
              : `Hasil Anda tidak sepenuhnya mengikuti pola, tapi Serial Position Effect tetap valid secara statistik untuk mayoritas user.`
            }
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Tempatkan informasi penting di awal atau akhir list/menu. Item di tengah cenderung dilupakan. Gunakan untuk navigation bar (penting di kiri/kanan), pricing tables (best plan di edge), feature lists, dll.
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
          {/* Option 1: Use Current Location */}
          <TouchableOpacity
            style={[styles.gpsButton, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}
            onPress={handleUseCurrentLocation}
            disabled={!!selectedLocationB}
          >
            <Ionicons name="location" size={24} color="#22C55E" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.gpsButtonTitle, { color: '#166534' }]}>
                Use Current Location
              </Text>
              <Text style={[styles.gpsButtonSubtitle, { color: '#15803D' }]}>
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
            <View style={[styles.searchBox, { borderColor: colors.border }]}>
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.textPrimary }]}
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Type city name..."
                placeholderTextColor={colors.textSecondary}
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

          {/* Selected Location Display */}
          {selectedLocationB && (
            <View style={[styles.selectedLocationBox, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
              <Text style={[styles.selectedLocationText, { color: '#166534' }]}>
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

  // Result Phase
  if (phase === 'result') {
    const interactionReduction = ((tapCountA - tapCountB) / tapCountA * 100).toFixed(0);
    const timeReduction = ((timeA - timeB) / timeA * 100).toFixed(1);

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Analisis
        </Text>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              👆 Taps Scenario 1:
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444', fontWeight: '700' }]}>
              {tapCountA} taps
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Time Scenario 1:
            </Text>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>
              {(timeA / 1000).toFixed(1)}s
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              👆 Taps Scenario 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              {tapCountB} {tapCountB === 1 ? 'tap' : 'taps'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⏱️ Time Scenario 2:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>
              {(timeB / 1000).toFixed(1)}s
            </Text>
          </View>

          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              📉 Interaction Reduction:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              -{interactionReduction}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⚡ Time Saved:
            </Text>
            <Text style={[styles.statValue, { color: '#22C55E', fontWeight: '700' }]}>
              {timeReduction}% faster
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🏆 Better Approach:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              Scenario 2 (System)
            </Text>
          </View>
        </View>

        {/* Insight */}
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            ⚖️ Tesler's Law (Conservation of Complexity)
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            "Untuk setiap sistem ada sejumlah kompleksitas yang tidak dapat dihilangkan - hanya dipindahkan."
            {'\n'}{'\n'}
            Scenario 1 memaksa USER menanggung kompleksitas ({tapCountA} taps, {(timeA/1000).toFixed(1)}s). Scenario 2 memindahkan kompleksitas ke SISTEM (GPS auto-detect, smart search) - hasilnya: hanya {tapCountB} tap, {timeReduction}% lebih cepat!
            {'\n'}{'\n'}
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Jangan takut membuat backend/sistem lebih kompleks jika itu menyederhanakan UX. Investasi di smart features (GPS, auto-complete, intelligent defaults, ML suggestions) membuat user experience jauh lebih baik. Complexity is inevitable - choose who bears it wisely!
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
    
    fadeAnim.setValue(0);
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
        fadeAnim.setValue(0);
        scaleAnim.setValue(0);
        setPhase('study');
        
        // Show cards for 2 seconds then move to recall
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }).start();
        
        setTimeout(() => {
          fadeAnim.setValue(0);
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

  // Study Phase - Show Grid
  if (phase === 'study') {
    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.scenarioLabel, { color: colors.accent, backgroundColor: colors.accentSubtle }]}>
          Study Phase - 2 seconds
        </Text>
        <Text style={[styles.taskPrompt, { color: colors.textPrimary }]}>
          👁️ Hafalkan kartu yang menonjol!
        </Text>

        {/* Card Grid */}
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
  const [userRating, setUserRating] = useState(0);
  const [ratingA, setRatingA] = useState(0);
  const [ratingB, setRatingB] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const progressAnim = useState(new Animated.Value(0))[0];
  const confettiAnim = useState(new Animated.Value(0))[0];
  const celebrateScale = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setProgress(0);
    setIsComplete(false);
    setUserRating(0);
    progressAnim.setValue(0);
    confettiAnim.setValue(0);
    celebrateScale.setValue(0);
    fadeAnim.setValue(0);
    setPhase('loading');
    
    if (scenario === 'A') {
      // Scenario A: Linear, boring progress
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: 4000,
        useNativeDriver: false,
      }).start(() => {
        setIsComplete(true);
        setProgress(100);
        setTimeout(() => {
          fadeAnim.setValue(0);
          setPhase('rating');
        }, 1000);
      });
    } else {
      // Scenario B: Peak-End with tension and celebration
      // Step 1: Progress to 80% (2 seconds)
      Animated.timing(progressAnim, {
        toValue: 80,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        setProgress(80);
        // Step 2: Stall at 80% for 2 seconds (tension/peak negative)
        setTimeout(() => {
          // Step 3: Quick zoom to 100% (relief)
          Animated.timing(progressAnim, {
            toValue: 100,
            duration: 600,
            useNativeDriver: false,
          }).start(() => {
            setProgress(100);
            setIsComplete(true);
            // Step 4: Confetti celebration (peak positive + positive end)
            generateConfetti();
            Animated.parallel([
              Animated.spring(celebrateScale, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
              }),
              Animated.timing(confettiAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
              })
            ]).start();
            
            setTimeout(() => {
              fadeAnim.setValue(0);
              setPhase('rating');
            }, 2500);
          });
        }, 2000);
      });
    }

    // Update progress display
    const progressInterval = setInterval(() => {
      progressAnim.addListener(({ value }) => {
        setProgress(Math.floor(value));
      });
    }, 100);

    setTimeout(() => {
      clearInterval(progressInterval);
      progressAnim.removeAllListeners();
    }, 8000);
  };

  const generateConfetti = () => {
    const confettiPieces = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#C7CEEA'];
    for (let i = 0; i < 30; i++) {
      confettiPieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * SCREEN_WIDTH,
        delay: Math.random() * 200,
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
    setTimeout(() => setPhase('result'), 500);
  };

  const tryOtherScenario = () => {
    fadeAnim.setValue(0);
    setPhase('scenario_select');
  };

  // Intro Phase
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

  // Scenario Selection Phase
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
            style={[styles.scenarioCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={() => startScenario('A')}
          >
            <View style={[styles.scenarioIcon, { backgroundColor: '#E5E7EB' }]}>
              <Ionicons name="remove" size={32} color="#6B7280" />
            </View>
            <Text style={[styles.scenarioTitle, { color: colors.textPrimary }]}>
              Scenario A
            </Text>
            <Text style={[styles.scenarioDesc, { color: colors.textSecondary }]}>
              Linear Progress
            </Text>
            <View style={[styles.scenarioBadge, { backgroundColor: '#F3F4F6' }]}>
              <Text style={[styles.scenarioBadgeText, { color: '#6B7280' }]}>
                Flat Experience
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.scenarioCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
            onPress={() => startScenario('B')}
          >
            <View style={[styles.scenarioIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="sparkles" size={32} color="#F59E0B" />
            </View>
            <Text style={[styles.scenarioTitle, { color: colors.textPrimary }]}>
              Scenario B
            </Text>
            <Text style={[styles.scenarioDesc, { color: colors.textSecondary }]}>
              Peak-End Design
            </Text>
            <View style={[styles.scenarioBadge, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.scenarioBadgeText, { color: '#92400E' }]}>
                Tension + Joy
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  // Loading Phase
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
          <View style={[styles.progressBarOuter, { backgroundColor: '#E5E7EB' }]}>
            <Animated.View
              style={[
                styles.progressBarInner,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  }),
                  backgroundColor: isComplete ? '#22C55E' : (progress === 80 && selectedScenario === 'B' ? '#F59E0B' : '#3B82F6')
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
                        outputRange: [-50, SCREEN_HEIGHT]
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

  // Rating Phase
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
    const avgRating = selectedScenario === 'A' ? ratingA : ratingB;

    return (
      <Animated.View style={[styles.simContainer, { opacity: fadeAnim }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
          📊 Hasil Experience Test
        </Text>

        {/* Rating Display */}
        <View style={[styles.ratingResultBox, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <Text style={[styles.ratingResultLabel, { color: colors.textSecondary }]}>
            Your Satisfaction Rating:
          </Text>
          <View style={styles.ratingResultStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons 
                key={star}
                name={avgRating >= star ? 'star' : 'star-outline'} 
                size={36} 
                color={avgRating >= star ? '#FCD34D' : '#D1D5DB'} 
              />
            ))}
          </View>
          <Text style={[styles.ratingResultValue, { color: colors.accent }]}>
            {avgRating} / 5 Stars
          </Text>
        </View>

        {/* Stats Board */}
        <View style={[styles.statsBoard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎯 Scenario Tested:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {selectedScenario} ({selectedScenario === 'A' ? 'Flat' : 'Peak-End'})
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              ⭐ Satisfaction Rating:
            </Text>
            <Text style={[styles.statValue, { color: '#F59E0B', fontWeight: '700' }]}>
              {avgRating} stars
            </Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎭 Peak Moment:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {selectedScenario === 'A' ? 'None' : '80% Stall + Confetti'}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              🎉 End Experience:
            </Text>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontWeight: '700' }]}>
              {selectedScenario === 'A' ? '"Done"' : 'Celebration 🎊'}
            </Text>
          </View>
        </View>

        {/* Try Other Scenario */}
        {((selectedScenario === 'A' && ratingB === 0) || (selectedScenario === 'B' && ratingA === 0)) && (
          <TouchableOpacity
            style={[styles.tryOtherButton, { backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }]}
            onPress={tryOtherScenario}
          >
            <Ionicons name="refresh" size={20} color="#3B82F6" />
            <Text style={[styles.tryOtherText, { color: '#1E40AF' }]}>
              Coba Scenario {selectedScenario === 'A' ? 'B' : 'A'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Comparison (if both tested) */}
        {ratingA > 0 && ratingB > 0 && (
          <View style={[styles.comparisonBox, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
            <Text style={[styles.comparisonTitle, { color: '#166534' }]}>
              📊 Comparison
            </Text>
            <View style={styles.comparisonRow}>
              <Text style={[styles.comparisonLabel, { color: '#15803D' }]}>
                Scenario A (Flat):
              </Text>
              <Text style={[styles.comparisonValue, { color: '#166534' }]}>
                {ratingA} ⭐
              </Text>
            </View>
            <View style={styles.comparisonRow}>
              <Text style={[styles.comparisonLabel, { color: '#15803D' }]}>
                Scenario B (Peak-End):
              </Text>
              <Text style={[styles.comparisonValue, { color: '#166534' }]}>
                {ratingB} ⭐
              </Text>
            </View>
            <Text style={[styles.comparisonDiff, { color: '#166534' }]}>
              {ratingB > ratingA 
                ? `Peak-End lebih tinggi ${ratingB - ratingA} bintang! ✓`
                : ratingB < ratingA
                  ? `Flat lebih tinggi ${ratingA - ratingB} bintang (unusual!)`
                  : 'Sama! Setiap orang berbeda.'
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
            💡 <Text style={{ fontWeight: '600' }}>Prinsip Desain:</Text> Design memorable peaks (micro-interactions, animations, surprises) dan positive endings (success states, celebrations, rewards). Upload complete? Show confetti! Form submitted? Celebratory message! Task done? Achievement badge! End positively = remembered positively.
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
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  comparisonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
  // Hick's Law Simulation Styles
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 16,
  },
  colorSwatch: {
    width: (SCREEN_WIDTH - 80) / 8 - 4,
    height: (SCREEN_WIDTH - 80) / 8 - 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 80) / 2 - 6,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  categoryCount: {
    fontSize: 12,
    marginTop: 4,
  },
  colorGridLabeled: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  colorSwatchLabeled: {
    width: (SCREEN_WIDTH - 80) / 2 - 4,
    alignItems: 'center',
  },
  colorBox: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorName: {
    fontSize: 11,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hintText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  accuracyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  accuracyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Jakob's Law Simulation Styles
  ecommerceScreen: {
    height: 500,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ecomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
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
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  regionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  fileGridGrouped: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fileItemGrouped: {
    width: (SCREEN_WIDTH - 88) / 4,
    alignItems: 'center',
    padding: 4,
  },
  fileNameTiny: {
    fontSize: 8,
    marginTop: 2,
    textAlign: 'center',
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
    zIndex: 2,
  },
  stepConnected: {
    alignItems: 'center',
    gap: 12,
    zIndex: 2,
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
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  connectingLine: {
    position: 'absolute',
    height: 6,
    top: 28,
    left: '15%',
    right: '15%',
    borderRadius: 3,
    zIndex: 1,
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
  },
  gpsButtonSubtitle: {
    fontSize: 12,
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
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
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
    borderWidth: 1,
    marginTop: 16,
  },
  selectedLocationText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Von Restorff Effect Simulation Styles
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 32,
    paddingHorizontal: 20,
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
