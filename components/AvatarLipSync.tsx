import React, { useRef, useEffect, useState } from "react";
import AvatarCanvas, { AvatarHandle } from "./AvatarCanvas";

export default function AvatarLipSyncWrapper({ ttsAudioUrl }: { ttsAudioUrl: string }) {
  const avatarRef = useRef<AvatarHandle>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!ttsAudioUrl || !avatarRef.current) return;

    const audio = new Audio(ttsAudioUrl);
    audioRef.current = audio;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const avgVolume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      // Convert avgVolume to 0-1 scale for morph target weight
      const mouthWeight = Math.min(Math.max(avgVolume / 100, 0), 1);

      // Here you can expose a method on your avatar to update morph target dynamically
      // For now, just startTalking if mouthWeight > threshold, else stopTalking
      if (mouthWeight > 0.1) {
        avatarRef.current?.startTalking();
      } else {
        avatarRef.current?.stopTalking();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    audio.play();
    animate();

    audio.addEventListener("ended", () => {
      avatarRef.current?.stopTalking();
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      audioContext.close();
    });

    return () => {
      audio.pause();
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      audioContext.close();
    };
  }, [ttsAudioUrl]);

  return <AvatarCanvas ref={avatarRef} />;
}
