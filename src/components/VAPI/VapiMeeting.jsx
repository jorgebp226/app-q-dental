import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

// Inicialización simple de VAPI
const vapi = new Vapi("706ab1f0-466e-4acb-91d6-96f1bb69fa2c");

const VapiMeeting = ({ 
  isActive, 
  onEnd,
  onTranscriptUpdate,
  onError 
}) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    // Configurar los event listeners de VAPI
    vapi.on("call-start", () => {
      console.log("✓ Llamada iniciada");
      setConnecting(false);
      setConnected(true);
    });

    vapi.on("call-end", () => {
      console.log("✓ Llamada finalizada");
      setConnecting(false);
      setConnected(false);
      onEnd?.();
    });

    vapi.on("speech-start", () => {
      console.log("El asistente está hablando");
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      console.log("El asistente terminó de hablar");
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    // Manejar transcripciones
    vapi.on("message", (message) => {
      if (message.type === 'transcript') {
        onTranscriptUpdate?.(message.content);
      }
    });

    vapi.on("error", (error) => {
      console.error("Error en VAPI:", error);
      setConnecting(false);
      onError?.(error);
    });

    // Limpiar listeners cuando el componente se desmonte
    return () => {
      vapi.removeAllListeners();
    };
  }, [onEnd, onTranscriptUpdate, onError]);

  // Efecto para manejar el inicio/fin de la llamada
  useEffect(() => {
    const startCall = async () => {
      try {
        setConnecting(true);
        await vapi.start("15dc1880-1010-4637-96df-c9dc8ee8075d", {
          mode: "voice-call",
          transcriber: {
            provider: "deepgram",
            model: "nova-2",
            language: "es"
          }
        });
      } catch (error) {
        console.error("Error al iniciar la llamada:", error);
        setConnecting(false);
        onError?.(error);
      }
    };

    const stopCall = async () => {
      try {
        if (connected) {
          await vapi.stop();
        }
      } catch (error) {
        console.error("Error al detener la llamada:", error);
        onError?.(error);
      }
    };

    if (isActive && !connected && !connecting) {
      startCall();
    } else if (!isActive && connected) {
      stopCall();
    }

    return () => {
      if (connected) {
        stopCall();
      }
    };
  }, [isActive, connected, connecting, onError]);

  // El componente no necesita renderizar nada visualmente
  return null;
};

export default VapiMeeting;