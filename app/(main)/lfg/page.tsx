'use client';

import { useState, useEffect } from 'react';
import { LFGSession, MatchNotification, User } from '@/lib/types/index';
import CreateLFGSession from '@/components/lfg/CreateLFGSession';
import SessionChat from '@/components/lfg/SessionChat';
import ReadyCheck from '@/components/lfg/ReadyCheck';
import SessionVerification from '@/components/lfg/SessionVerification';
import SessionCloseReview from '@/components/lfg/SessionCloseReview';

// Mock current user for demo
const MOCK_CURRENT_USER_ID = 'user-1';

type ViewMode = 'browse' | 'create' | 'my-session' | 'match-found';

export default function LFGPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [currentSession, setCurrentSession] = useState<LFGSession | null>(null);
  const [matchNotifications, setMatchNotifications] = useState<MatchNotification[]>([]);
  const [showReadyCheck, setShowReadyCheck] = useState(false);
  const [showCloseReview, setShowCloseReview] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Load user's current session
  useEffect(() => {
    loadCurrentSession();
    loadMatchNotifications();
  }, []);

  const loadCurrentSession = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/lfg/my-session`);
      const data = await response.json();
      
      if (data.success && data.session) {
        setCurrentSession(data.session);
        setViewMode('my-session');
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const loadMatchNotifications = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/lfg/match-notifications`);
      const data = await response.json();
      
      if (data.success) {
        setMatchNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleSessionCreated = (sessionId: string) => {
    setIsSearching(true);
    // In real implementation, this would start the matching process
    setTimeout(() => {
      loadCurrentSession();
      setIsSearching(false);
    }, 2000);
  };

  const handleMatchAccepted = async (notificationId: string) => {
    try {
      // TODO: Call API to accept match
      await fetch(`/api/lfg/match-notifications/${notificationId}/accept`, {
        method: 'POST',
      });
      
      loadCurrentSession();
      loadMatchNotifications();
    } catch (error) {
      console.error('Error accepting match:', error);
    }
  };

  const handleMatchDeclined = async (notificationId: string) => {
    try {
      // TODO: Call API to decline match
      await fetch(`/api/lfg/match-notifications/${notificationId}/decline`, {
        method: 'POST',
      });
      
      loadMatchNotifications();
    } catch (error) {
      console.error('Error declining match:', error);
    }
  };

  const handleLeaveSession = async () => {
    if (!currentSession) return;
    
    const confirmed = confirm('คุณต้องการออกจาก Session นี้?');
    if (!confirmed) return;

    try {
      // TODO: Call API to leave session
      await fetch(`/api/sessions/${currentSession.id}/leave`, {
        method: 'POST',
      });
      
      setCurrentSession(null);
      setViewMode('browse');
    } catch (error) {
      console.error('Error leaving session:', error);
    }
  };

  const handleReadyCheckComplete = (allReady: boolean) => {
    setShowReadyCheck(false);
    if (allReady) {
      // All players ready - session starts
      loadCurrentSession();
    } else {
      // Someone failed ready check
      alert('มีผู้เล่นที่ไม่พร้อม - Session ถูกยกเลิก');
      setCurrentSession(null);
      setViewMode('browse');
    }
  };

  const handleCloseSession = () => {
    setShowCloseReview(true);
  };

  const handleReviewComplete = () => {
    setShowCloseReview(false);
    setCurrentSession(null);
    setViewMode('browse');
    alert('ขอบคุณสำหรับรีวิว! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎮 LFG - Looking For Group
          </h1>
          <p className="text-slate-400">ค้นหาทีมที่ใช่ สำหรับคุณ</p>
        </div>

        {/* Match Notifications */}
        {matchNotifications.length > 0 && (
          <div className="mb-6 space-y-3">
            {matchNotifications.map((notification) => (
              <MatchNotificationCard
                key={notification.id}
                notification={notification}
                onAccept={() => handleMatchAccepted(notification.id)}
                onDecline={() => handleMatchDeclined(notification.id)}
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        {viewMode === 'browse' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Session Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-white mb-4">เริ่มต้นใหม่</h2>
                <button
                  onClick={() => setViewMode('create')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all mb-4"
                >
                  🚀 สร้าง LFG Session
                </button>
                
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Match Engine อัตโนมัติ</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>✓</span>
                    <span>จับคู่ตาม Rank, Role, Playstyle</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Reputation System</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Discord & Game API Integration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Sessions List */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-bold text-white mb-4">🔥 Active Sessions</h2>
                <p className="text-slate-400 text-center py-12">
                  ไม่มี session ที่กำลังเปิดอยู่<br />
                  สร้าง session ใหม่เพื่อเริ่มต้นการค้นหา!
                </p>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'create' && (
          <div>
            <CreateLFGSession
              onSessionCreated={handleSessionCreated}
              onCancel={() => setViewMode('browse')}
            />
          </div>
        )}

        {isSearching && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8 max-w-md text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">กำลังหาทีม...</h3>
              <p className="text-slate-400">กำลังจับคู่ผู้เล่นที่เหมาะสมที่สุดสำหรับคุณ</p>
              
              <div className="mt-6 space-y-2 text-sm text-slate-500">
                <p>⚡ Match Engine กำลังวิเคราะห์</p>
                <p>🎯 กำลังหาผู้เล่นที่ตรงเงื่อนไข</p>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'my-session' && currentSession && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Session Info & Actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-bold text-white mb-4">📋 Session Info</h2>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400">Game:</span>
                    <span className="text-white ml-2 font-medium">{currentSession.game.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Mode:</span>
                    <span className="text-white ml-2">{currentSession.gameMode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                      currentSession.status === 'active' ? 'bg-green-900/20 text-green-400' :
                      currentSession.status === 'ready-check' ? 'bg-yellow-900/20 text-yellow-400' :
                      'bg-blue-900/20 text-blue-400'
                    }`}>
                      {currentSession.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {currentSession.status === 'active' && (
                    <button
                      onClick={handleCloseSession}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    >
                      ✅ จบ Session
                    </button>
                  )}
                  <button
                    onClick={handleLeaveSession}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    🚪 ออกจาก Session
                  </button>
                </div>
              </div>

              {/* Verification */}
              <SessionVerification session={currentSession} currentUserId={MOCK_CURRENT_USER_ID} />
            </div>

            {/* Chat */}
            <div className="lg:col-span-2 h-[600px]">
              <SessionChat session={currentSession} currentUserId={MOCK_CURRENT_USER_ID} />
            </div>
          </div>
        )}

        {/* Ready Check Modal */}
        {showReadyCheck && currentSession && (
          <ReadyCheck
            session={currentSession}
            currentUserId={MOCK_CURRENT_USER_ID}
            onComplete={handleReadyCheckComplete}
          />
        )}

        {/* Close Review Modal */}
        {showCloseReview && currentSession && (
          <SessionCloseReview
            session={currentSession}
            currentUserId={MOCK_CURRENT_USER_ID}
            onComplete={handleReviewComplete}
            onCancel={() => setShowCloseReview(false)}
          />
        )}
      </div>
    </div>
  );
}

// Match Notification Card Component
function MatchNotificationCard({
  notification,
  onAccept,
  onDecline,
}: {
  notification: MatchNotification;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expiresAt = new Date(notification.expiresAt).getTime();
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimeLeft(secondsLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [notification]);

  return (
    <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-600 rounded-xl p-4 animate-pulse-slow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Match Found!</h3>
            <p className="text-sm text-purple-300">
              Compatibility: {notification.matchScore.totalScore}%
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{timeLeft}s</div>
          <div className="text-xs text-slate-400">เหลือเวลา</div>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {notification.matchScore.reasons.slice(0, 3).map((reason, i) => (
          <span key={i} className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">
            {reason}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onDecline}
          className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
        >
          ❌ ปฏิเสธ
        </button>
        <button
          onClick={onAccept}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all"
        >
          ✅ รับ
        </button>
      </div>
    </div>
  );
}
