'use client';

import { useState } from 'react';
import { LFGSession, SessionPlayer, SessionReview } from '@/lib/types/index';

interface SessionCloseReviewProps {
  session: LFGSession;
  currentUserId: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

interface PlayerReviewData {
  userId: string;
  behaviorRating: number;
  skillRating: number;
  teamworkRating: number;
  reliabilityRating: number;
  comment: string;
  tags: string[];
  wouldPlayAgain: boolean;
}

const RATING_LABELS = {
  1: { emoji: '😡', label: 'แย่มาก' },
  2: { emoji: '😞', label: 'ไม่ดี' },
  3: { emoji: '😐', label: 'ปานกลาง' },
  4: { emoji: '😊', label: 'ดี' },
  5: { emoji: '😍', label: 'ดีมาก' },
};

const BEHAVIOR_TAGS = [
  { value: 'friendly', label: 'เป็นมิตร', color: 'green' },
  { value: 'toxic', label: 'Toxic', color: 'red' },
  { value: 'helpful', label: 'ช่วยเหลือ', color: 'blue' },
  { value: 'quiet', label: 'เงียบ', color: 'gray' },
  { value: 'talkative', label: 'พูดเยอะ', color: 'purple' },
  { value: 'positive', label: 'มีพลังบวก', color: 'yellow' },
];

const SKILL_TAGS = [
  { value: 'skilled', label: 'เก่งมาก', color: 'green' },
  { value: 'carry', label: 'Carry', color: 'gold' },
  { value: 'support', label: 'Support ดี', color: 'blue' },
  { value: 'learning', label: 'กำลังเรียนรู้', color: 'gray' },
  { value: 'strategic', label: 'มีแผน', color: 'purple' },
];

const TEAMWORK_TAGS = [
  { value: 'team-player', label: 'เล่นเป็นทีม', color: 'green' },
  { value: 'solo', label: 'เล่นเดี่ยว', color: 'gray' },
  { value: 'leader', label: 'เป็นผู้นำ', color: 'gold' },
  { value: 'follower', label: 'ตามทีม', color: 'blue' },
  { value: 'afk', label: 'AFK', color: 'red' },
];

export default function SessionCloseReview({
  session,
  currentUserId,
  onComplete,
  onCancel,
}: SessionCloseReviewProps) {
  const [sessionRating, setSessionRating] = useState(5);
  const [sessionComment, setSessionComment] = useState('');
  const [playerReviews, setPlayerReviews] = useState<Record<string, PlayerReviewData>>(
    Object.fromEntries(
      session.currentPlayers
        .filter((p: SessionPlayer) => p.userId !== currentUserId)
        .map((p: SessionPlayer) => [
          p.userId,
          {
            userId: p.userId,
            behaviorRating: 3,
            skillRating: 3,
            teamworkRating: 3,
            reliabilityRating: 3,
            comment: '',
            tags: [],
            wouldPlayAgain: true,
          },
        ])
    )
  );
  const [hasDispute, setHasDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'overall' | 'players'>('overall');

  const otherPlayers = session.currentPlayers.filter((p: SessionPlayer) => p.userId !== currentUserId);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const reviewData = {
        sessionId: session.id,
        sessionRating,
        sessionComment,
        playerReviews: Object.values(playerReviews),
        hasDispute,
        disputeReason: hasDispute ? disputeReason : undefined,
      };

      // TODO: Call API to submit reviews
      const response = await fetch(`/api/sessions/${session.id}/close`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (data.success) {
        onComplete?.();
      } else {
        alert(data.error || 'เกิดข้อผิดพลาดในการส่งรีวิว');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('เกิดข้อผิดพลาดในการส่งรีวิว');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePlayerReview = (userId: string, updates: Partial<PlayerReviewData>) => {
    setPlayerReviews((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], ...updates },
    }));
  };

  const toggleTag = (userId: string, tag: string) => {
    const current = playerReviews[userId].tags;
    const newTags = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    updatePlayerReview(userId, { tags: newTags });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full p-6 shadow-2xl my-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-3xl">🏁</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Session Complete!</h2>
            <p className="text-slate-400">รีวิวผู้เล่นเพื่อปรับปรุง Reputation</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setCurrentStep('overall')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === 'overall'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span>1</span>
              <span className="text-sm font-medium">Overall</span>
            </button>
            <div className="w-8 h-0.5 bg-slate-700"></div>
            <button
              onClick={() => setCurrentStep('players')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === 'players'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <span>2</span>
              <span className="text-sm font-medium">Players</span>
            </button>
          </div>

          {/* Overall Session Review */}
          {currentStep === 'overall' && (
            <div className="space-y-6">
              {/* Session Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  คุณรู้สึกอย่างไรกับ Session นี้?
                </label>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSessionRating(rating)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        sessionRating === rating
                          ? 'border-purple-500 bg-purple-900/20 scale-110'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-4xl">{RATING_LABELS[rating as keyof typeof RATING_LABELS].emoji}</span>
                      <span className="text-xs text-slate-400">
                        {RATING_LABELS[rating as keyof typeof RATING_LABELS].label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Comment */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ความคิดเห็นเพิ่มเติม (ถ้ามี)
                </label>
                <textarea
                  value={sessionComment}
                  onChange={(e) => setSessionComment(e.target.value)}
                  placeholder="เล่าประสบการณ์ในครั้งนี้..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                />
              </div>

              {/* Dispute */}
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDispute}
                    onChange={(e) => setHasDispute(e.target.checked)}
                    className="mt-1 w-5 h-5 text-red-600 focus:ring-red-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white">🚨 รายงานปัญหา</div>
                    <div className="text-xs text-slate-400 mt-1">
                      มีปัญหาร้ายแรง เช่น toxic, AFK, ทุจริต
                    </div>
                    {hasDispute && (
                      <textarea
                        value={disputeReason}
                        onChange={(e) => setDisputeReason(e.target.value)}
                        placeholder="อธิบายปัญหาที่เกิดขึ้น..."
                        rows={2}
                        className="mt-3 w-full px-3 py-2 bg-slate-900 border border-red-800 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                      />
                    )}
                  </div>
                </label>
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentStep('players')}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all"
              >
                ต่อไป: รีวิวผู้เล่น →
              </button>
            </div>
          )}

          {/* Player Reviews */}
          {currentStep === 'players' && (
            <div className="space-y-6">
              {otherPlayers.map((player: SessionPlayer) => {
                const review = playerReviews[player.userId];

                return (
                  <div key={player.userId} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    {/* Player Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
                        {player.user.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{player.user.displayName}</h4>
                        <p className="text-xs text-slate-400">
                          Rep: {player.user.reputation.overall}/100
                        </p>
                      </div>
                    </div>

                    {/* Ratings */}
                    <div className="space-y-3 mb-4">
                      {/* Behavior */}
                      <RatingBar
                        label="😊 ความเป็นมิตร"
                        value={review.behaviorRating}
                        onChange={(v) => updatePlayerReview(player.userId, { behaviorRating: v })}
                      />
                      {/* Skill */}
                      <RatingBar
                        label="🎮 ทักษะ"
                        value={review.skillRating}
                        onChange={(v) => updatePlayerReview(player.userId, { skillRating: v })}
                      />
                      {/* Teamwork */}
                      <RatingBar
                        label="🤝 ทำงานเป็นทีม"
                        value={review.teamworkRating}
                        onChange={(v) => updatePlayerReview(player.userId, { teamworkRating: v })}
                      />
                      {/* Reliability */}
                      <RatingBar
                        label="⏰ ตรงต่อเวลา"
                        value={review.reliabilityRating}
                        onChange={(v) => updatePlayerReview(player.userId, { reliabilityRating: v })}
                      />
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-400 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {[...BEHAVIOR_TAGS, ...SKILL_TAGS, ...TEAMWORK_TAGS].map((tag) => (
                          <button
                            key={tag.value}
                            onClick={() => toggleTag(player.userId, tag.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              review.tags.includes(tag.value)
                                ? `bg-${tag.color}-600 text-white`
                                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                            }`}
                          >
                            {tag.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Would Play Again */}
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={review.wouldPlayAgain}
                        onChange={(e) =>
                          updatePlayerReview(player.userId, { wouldPlayAgain: e.target.checked })
                        }
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-white">💜 อยากเล่นด้วยกันอีก</span>
                    </label>
                  </div>
                );
              })}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCurrentStep('overall')}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  ← ย้อนกลับ
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'กำลังส่ง...' : '✅ ส่งรีวิว'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Rating Bar Component
function RatingBar({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-bold text-white">{value}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={`flex-1 h-2 rounded-full transition-all ${
              star <= value ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
