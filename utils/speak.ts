let selectedVoice: SpeechSynthesisVoice | null = null;

function getVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();

  if (!voices.length) {
    // Trigger voices loading
    speechSynthesis.onvoiceschanged = () => {
      selectedVoice = chooseVoice();
    };
    return null;
  }

  return chooseVoice();
}

function chooseVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();

  // Try for a natural English voice
  return (
    voices.find(v => v.name.includes('Google') && v.lang.includes('en')) ||
    voices.find(v => v.lang === 'en-US') ||
    voices[0] || null
  );
}

export function speak(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!text) return;

  // Cancel any current speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';

  // Lazy load voice
  if (!selectedVoice) {
    selectedVoice = getVoice();
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Lip sync hooks
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  speechSynthesis.speak(utterance);
}
