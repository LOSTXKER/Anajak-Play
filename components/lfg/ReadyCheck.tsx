'use client';

import { useState, useEffect } from 'react';
import { LFGSession, ReadyCheckState, SessionPlayer } from '@/lib/types/index';

interface ReadyCheckProps {
  session: LFGSession;
  currentUserId: string;
  onComplete?: (allReady: boolean) => void;
}

export default function ReadyCheck({ session, currentUserId, onComplete }: ReadyCheckProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasResponded, setHasResponded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const readyCheck = session.readyCheck;

  useEffect(() => {
    if (!readyCheck || readyCheck.isCompleted) return;

    // Calculate time left
    const expiresAt = new Date(readyCheck.expiresAt).getTime();
    const now = Date.now();
    const secondsLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
    
    setTimeLeft(secondsLeft);

    // Countdown timer
    const interval = setInterval(() => {
      const expiresAt = new Date(readyCheck.expiresAt).getTime();
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
      
      setTimeLeft(secondsLeft);

      if (secondsLeft <= 0) {
        clearInterval(interval);
        // Time's up - notify parent
        onComplete?.(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [readyCheck, onComplete]);

  // Check if current user has responded
  useEffect(() => {
    if (!readyCheck) return;
    
    const response = readyCheck.responses.find(r => r.userId === currentUserId);
    if (response) {
      setHasResponded(true);
      setIsReady(response.ready);
    }
  }, [readyCheck, currentUserId]);

  const handleResponse = async (ready: boolean) => {
    if (hasResponded) return;

    setHasResponded(true);
    setIsReady(ready);

    try {
      // TODO: Call API to submit response
      await fetch(`/api/sessions/${session.id}/ready-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ready, userId: currentUserId }),
      });

      // Check if all players are ready
      const updatedResponses = [...(readyCheck?.responses || []), { userId: currentUserId, ready, respondedAt: new Date() }];
      const allResponded = updatedResponses.length === session.currentPlayers.length;
      const allReady = updatedResponses.every(r => r.ready);

      if (allResponded && allReady) {
        onComplete?.(true);
      } else if (allResponded && !allReady) {
        onComplete?.(false);
      }
    } catch (error) {
      console.error('Error submitting ready check:', error);
      setHasResponded(false);
    }
  };

  if (!readyCheck || readyCheck.isCompleted) {
    return null;
  }

  const totalPlayers = session.currentPlayers.length;
  const readyCount = readyCheck.responses.filter(r => r.ready).length;
  const respondedCount = readyCheck.responses.length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-lg w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-4xl">⏱️</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Ready Check!</h2>
          <p className="text-slate-400">ยืนยันว่าคุณพร้อมเล่นหรือไม่?</p>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto">
            {/* Circular progress */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - timeLeft / 60)}`}
                className={`transition-all ${timeLeft > 20 ? 'text-green-500' : timeLeft > 10 ? 'text-yellow-500' : 'text-red-500'}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{timeLeft}</div>
                <div className="text-xs text-slate-400">วินาที</div>
              </div>
            </div>
          </div>
        </div>

        {/* Players Status */}
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-400">ผู้เล่นพร้อม</span>
            <span className="text-lg font-bold text-white">
              {readyCount} / {totalPlayers}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {session.currentPlayers.map((player: SessionPlayer) => {
              const response = readyCheck.responses.find(r => r.userId === player.userId);
              const playerReady = response?.ready;
              const playerResponded = !!response;

              return (
                <div
                  key={player.userId}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    playerReady
                      ? 'bg-green-900/20 border-green-700'
                      : playerResponded
                      ? 'bg-red-900/20 border-red-700'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                    {player.user.displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-white flex-1 truncate">
                    {player.user.displayName}
                  </span>
                  {playerReady ? (
                    <span className="text-green-400">✓</span>
                  ) : playerResponded ? (
                    <span className="text-red-400">✕</span>
                  ) : (
                    <span className="text-slate-500">⋯</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Response Buttons */}
        {!hasResponded ? (
          <div className="flex gap-3">
            <button
              onClick={() => handleResponse(false)}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              ❌ ไม่พร้อม
            </button>
            <button
              onClick={() => handleResponse(true)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all"
            >
              ✅ พร้อม!
            </button>
          </div>
        ) : (
          <div className={`text-center p-4 rounded-lg ${isReady ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
            <p className="font-medium">
              {isReady ? '✓ คุณพร้อมแล้ว - รอผู้เล่นคนอื่น...' : '✕ คุณไม่พร้อม'}
            </p>
          </div>
        )}

        {/* Warning */}
        {timeLeft <= 10 && !hasResponded && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-sm text-red-400 text-center">
              ⚠️ เหลือเวลาไม่มาก! ถ้าไม่ตอบจะถือว่าเทนัด
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
