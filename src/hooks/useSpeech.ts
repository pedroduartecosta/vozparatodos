"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useStore } from "@/lib/store";

export interface VoiceInfo {
  name: string;
  lang: string;
  voiceURI: string;
}

export function useSpeech() {
  const [voices, setVoices] = useState<VoiceInfo[]>([]);
  const settings = useStore((state) => state.settings);
  const speaking = useStore((state) => state.speaking);
  const setSpeaking = useStore((state) => state.setSpeaking);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Load available voices
  useEffect(() => {
    function loadVoices() {
      if (!synthRef.current) return;

      const voiceList = synthRef.current.getVoices();
      const availableVoices = voiceList
        .filter((voice) => voice.lang === "pt-PT") // Only European Portuguese voices
        .map((voice) => ({
          name: voice.name,
          lang: voice.lang,
          voiceURI: voice.voiceURI,
        }));
      setVoices(availableVoices);

      // If no voice is selected and we have Portuguese voices available,
      // select the first one
      if (!settings.speech.voice && availableVoices.length > 0) {
        useStore.getState().updateSettings({
          speech: {
            ...settings.speech,
            voice: availableVoices[0].voiceURI,
          },
        });
      }
    }

    if (synthRef.current) {
      loadVoices();
      synthRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = null;
      }
    };
  }, [settings.speech, synthRef.current]);

  const speak = useCallback(
    (text: string) => {
      if (!text || speaking || !synthRef.current) return;

      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voiceList = synthRef.current.getVoices();
      const selectedVoice = voiceList.find(
        (voice) => voice.voiceURI === settings.speech.voice
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        // If no voice is selected, try to use any available pt-PT voice
        const ptPTVoice = voiceList.find((voice) => voice.lang === "pt-PT");
        if (ptPTVoice) {
          utterance.voice = ptPTVoice;
        }
      }

      utterance.pitch = settings.speech.pitch;
      utterance.rate = settings.speech.rate;
      utterance.volume = settings.speech.volume;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => {
        console.error("Speech synthesis error");
        setSpeaking(false);
      };

      synthRef.current.speak(utterance);
    },
    [settings.speech, speaking, setSpeaking]
  );

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setSpeaking(false);
    }
  }, [setSpeaking]);

  // Clean up any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  return {
    voices,
    speaking,
    speak,
    stop,
  };
}
