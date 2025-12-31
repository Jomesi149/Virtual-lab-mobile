import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Aesthetic Usability Effect Simulation
const AestheticUsabilitySimulation = ({ colors, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (design) => {
    setSelected(design);
    setShowResult(true);
  };

  return (
    <View style={styles.simContainer}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
        Bandingkan Dua Desain
      </Text>
      <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
        Klik salah satu tombol. Mana yang terasa lebih mudah digunakan?
      </Text>

      <View style={styles.simRow}>
        <TouchableOpacity
          style={[styles.designButton, { backgroundColor: '#9CA3AF' }]}
          onPress={() => handleSelect('plain')}
        >
          <Text style={styles.designButtonText}>Desain Polos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.designButton, { backgroundColor: '#8B5CF6' }]}
          onPress={() => handleSelect('attractive')}
        >
          <Text style={styles.designButtonText}>Desain Menarik</Text>
        </TouchableOpacity>
      </View>

      {showResult && (
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            {selected === 'attractive'
              ? '✨ Benar! Desain yang lebih menarik sering dipersepsikan lebih mudah digunakan.'
              : '🤔 Menarik! Kebanyakan pengguna memilih desain yang lebih menarik karena terlihat lebih mudah digunakan.'}
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

// Fitts's Law Simulation
const FittsLawSimulation = ({ colors, onComplete }) => {
  const [clickCount, setClickCount] = useState(0);
  const [targetSize, setTargetSize] = useState('small');
  const [showResult, setShowResult] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      if (targetSize === 'small') {
        setTargetSize('large');
        setClickCount(0);
      } else {
        setShowResult(true);
      }
    }
  };

  const reset = () => {
    setClickCount(0);
    setTargetSize('small');
    setShowResult(false);
  };

  return (
    <View style={styles.simContainer}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
        Target Kecil vs Besar
      </Text>
      <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
        Klik target {targetSize === 'small' ? 'kecil' : 'besar'} 3 kali
      </Text>

      {!showResult && (
        <View style={styles.targetContainer}>
          <TouchableOpacity
            style={[
              styles.targetButton,
              {
                backgroundColor: colors.accent,
                width: targetSize === 'small' ? 40 : 120,
                height: targetSize === 'small' ? 40 : 120,
                borderRadius: targetSize === 'small' ? 20 : 60,
              },
            ]}
            onPress={handleClick}
          >
            <Text style={styles.targetText}>{clickCount}/3</Text>
          </TouchableOpacity>
        </View>
      )}

      {showResult && (
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎯 Target yang lebih besar lebih mudah diklik!
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Hukum Fitts: Semakin besar target dan semakin dekat jaraknya, semakin cepat pengguna bisa mencapainya.
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
const GoalGradientSimulation = ({ colors, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const animatedWidth = useState(new Animated.Value(0))[0];

  const addProgress = () => {
    const newProgress = Math.min(progress + 20, 100);
    setProgress(newProgress);

    Animated.timing(animatedWidth, {
      toValue: newProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.simContainer}>
      <Text style={[styles.simTitle, { color: colors.textPrimary }]}>
        Rasakan Goal Gradient Effect
      </Text>
      <Text style={[styles.simDesc, { color: colors.textSecondary }]}>
        Tekan tombol untuk menambah progress. Perhatikan motivasi Anda saat mendekati 100%!
      </Text>

      <View style={[styles.progressContainer, { backgroundColor: colors.surface }]}>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: progress >= 80 ? '#22C55E' : colors.accent,
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textPrimary }]}>
          {progress}% Selesai
        </Text>
      </View>

      {progress < 100 && (
        <TouchableOpacity
          style={[styles.progressButton, { backgroundColor: colors.accent }]}
          onPress={addProgress}
        >
          <Text style={styles.progressButtonText}>+20% Progress</Text>
        </TouchableOpacity>
      )}

      {progress >= 100 && (
        <View style={[styles.resultBox, { backgroundColor: colors.accentSubtle }]}>
          <Text style={[styles.resultText, { color: colors.accent }]}>
            🎉 Selamat! Anda merasakannya?
          </Text>
          <Text style={[styles.resultSubtext, { color: colors.textSecondary }]}>
            Goal Gradient Effect: Motivasi meningkat saat mendekati tujuan!
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

// Main Simulation Component
const SimulationComponent = ({ lawId, lawTitle, colors, onComplete }) => {
  const simulationMap = {
    'aesthetic-usability-effect': AestheticUsabilitySimulation,
    'choice-overload': ChoiceOverloadSimulation,
    'hicks-law': ChoiceOverloadSimulation,
    'fitts-law': FittsLawSimulation,
    'chunking': ChunkingSimulation,
    'millers-law': ChunkingSimulation,
    'goal-gradient-effect': GoalGradientSimulation,
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
});

export default SimulationComponent;
