// src/hooks/useSpeech.ts
import { useState, useEffect, useCallback } from "react";
import { useStore } from "@/lib/store";

export interface VoiceInfo {
  name: string;
  lang: string;
  voiceURI: string;
}

export function useSpeech() {
  const [voices, setVoices] = useState<VoiceInfo[]>([]);
  const [speaking, setSpeaking] = useStore((state) => [
    state.speaking,
    state.setSpeaking,
  ]);
  const settings = useStore((state) => state.settings);

  // Carrega as vozes disponíveis
  useEffect(() => {
    function loadVoices() {
      const voiceList = window.speechSynthesis.getVoices();
      const voices = voiceList
        .filter((voice) => voice.lang.startsWith("pt"))
        .map((voice) => ({
          name: voice.name,
          lang: voice.lang,
          voiceURI: voice.voiceURI,
        }));
      setVoices(voices);
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!text || speaking) return;

      const utterance = new SpeechSynthesisUtterance(text);
      const voiceList = window.speechSynthesis.getVoices();
      const selectedVoice = voiceList.find(
        (voice) => voice.voiceURI === settings.speech.voice
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.pitch = settings.speech.pitch;
      utterance.rate = settings.speech.rate;
      utterance.volume = settings.speech.volume;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [settings.speech, speaking, setSpeaking]
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [setSpeaking]);

  return {
    voices,
    speaking,
    speak,
    stop,
  };
}
