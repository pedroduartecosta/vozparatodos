"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useStore } from "@/lib/store";

export interface VoiceInfo {
  name: string;
  lang: string;
  voiceURI: string;
}
interface SpeechError {
  type: "NO_SYNTHESIS" | "NO_VOICES" | "SPEAK_ERROR" | "NOT_SUPPORTED";
  message: string;
}

export function useSpeech() {
  const [voices, setVoices] = useState<VoiceInfo[]>([]);
  const [error, setError] = useState<SpeechError | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const settings = useStore((state) => state.settings);
  const speaking = useStore((state) => state.speaking);
  const setSpeaking = useStore((state) => state.setSpeaking);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setIsSupported(false);
      setError({
        type: "NOT_SUPPORTED",
        message: "Text-to-speech não é suportado neste navegador.",
      });
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

      if (availableVoices.length === 0) {
        setError({
          type: "NO_VOICES",
          message:
            "Nenhuma voz em português encontrada. Por favor, verifique as configurações de idioma do seu dispositivo.",
        });
      } else {
        setError(null);
      }

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
  }, [settings.speech]);

  const speak = useCallback(
    (text: string) => {
      if (!text || speaking) return;
      if (!synthRef.current) {
        setError({
          type: "NO_SYNTHESIS",
          message: "Serviço de voz não disponível.",
        });
        return;
      }

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

      utterance.onstart = () => {
        setError(null);
        setSpeaking(true);
      };

      utterance.onend = () => setSpeaking(false);

      utterance.onerror = (event) => {
        setSpeaking(false);
        setError({
          type: "SPEAK_ERROR",
          message: "Erro ao reproduzir o texto. Por favor, tente novamente.",
        });
        console.error("Speech synthesis error:", event);
      };

      try {
        synthRef.current.speak(utterance);
      } catch (err) {
        console.error("Speech synthesis error:", err);
        setError({
          type: "SPEAK_ERROR",
          message: "Erro ao iniciar a reprodução de voz.",
        });
      }
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
    error,
    isSupported,
  };
}
