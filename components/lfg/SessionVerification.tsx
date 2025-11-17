'use client';

import { useState } from 'react';
import { LFGSession, DiscordRoomInfo, GameAPIVerification, SessionPlayer } from '@/lib/types/index';

interface SessionVerificationProps {
  session: LFGSession;
  currentUserId: string;
}

export default function SessionVerification({ session, currentUserId }: SessionVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  if (session.verificationMethod === 'ready-check') {
    return null; // Ready check is handled by ReadyCheck component
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      <h3 className="text-lg font-bold text-white mb-4">🔐 Session Verification</h3>

      {session.verificationMethod === 'discord-bot' && (
        <DiscordVerification session={session} currentUserId={currentUserId} />
      )}

      {session.verificationMethod === 'game-api' && (
        <GameAPIVerificationComponent session={session} currentUserId={currentUserId} />
      )}
    </div>
  );
}

// Discord Bot Verification
function DiscordVerification({ session, currentUserId }: SessionVerificationProps) {
  const discordRoom = session.discordRoom;
  const currentPlayer = session.currentPlayers.find((p: SessionPlayer) => p.userId === currentUserId);

  if (!discordRoom) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">⏳</div>
        <p className="text-slate-400">กำลังสร้างห้อง Discord...</p>
      </div>
    );
  }

  const joinedCount = discordRoom.joinedUsers.length;
  const totalPlayers = session.currentPlayers.length;
  const hasJoined = currentPlayer?.discordJoined;

  return (
    <div className="space-y-4">
      {/* Discord Room Info */}
      <div className="p-4 bg-indigo-900/20 border border-indigo-800 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white">{discordRoom.channelName}</h4>
            <p className="text-xs text-indigo-300">Discord Voice Channel</p>
          </div>
        </div>

        <a
          href={discordRoom.inviteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-center transition-colors"
        >
          🔗 เข้าร่วมห้อง Discord
        </a>
      </div>

      {/* Join Status */}
      <div className="p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">ผู้เล่นที่เข้าร่วม</span>
          <span className="text-lg font-bold text-white">
            {joinedCount} / {totalPlayers}
          </span>
        </div>

        <div className="space-y-2">
          {session.currentPlayers.map((player: SessionPlayer) => {
            const joined = discordRoom.joinedUsers.includes(player.userId);

            return (
              <div
                key={player.userId}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
                  joined
                    ? 'bg-green-900/20 border-green-700'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  {player.user.displayName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-white flex-1">
                  {player.user.displayName}
                </span>
                {joined ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <span>✓</span>
                    <span className="text-xs">Joined</span>
                  </span>
                ) : (
                  <span className="text-slate-500 text-xs">Waiting...</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Status */}
      {hasJoined ? (
        <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
          <p className="text-sm text-green-400 text-center">
            ✓ คุณเข้าร่วมห้องแล้ว
          </p>
        </div>
      ) : (
        <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-400 text-center">
            ⚠️ กรุณาเข้าร่วมห้อง Discord เพื่อเริ่ม Session
          </p>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-slate-500 text-center">
        💡 Bot จะติดตามการเข้า/ออกห้องอัตโนมัติ
      </div>
    </div>
  );
}

// Game API Verification
function GameAPIVerificationComponent({ session, currentUserId }: SessionVerificationProps) {
  const gameApiData = session.gameApiData;
  const currentPlayer = session.currentPlayers.find((p: SessionPlayer) => p.userId === currentUserId);

  if (!gameApiData) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">⏳</div>
        <p className="text-slate-400">กำลังเชื่อมต่อ Game API...</p>
      </div>
    );
  }

  const verifiedCount = gameApiData.verifiedPlayers.filter(p => p.verified).length;
  const totalPlayers = session.currentPlayers.length;
  const userVerification = gameApiData.verifiedPlayers.find(p => p.userId === currentUserId);
  const isVerified = userVerification?.verified;

  return (
    <div className="space-y-4">
      {/* Game Info */}
      <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-2xl">🎮</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white">{session.game.toUpperCase()}</h4>
            <p className="text-xs text-purple-300">Game API Verification</p>
          </div>
        </div>

        {gameApiData.lobbyId && (
          <div className="p-2 bg-slate-800 rounded text-center">
            <p className="text-xs text-slate-400">Lobby ID</p>
            <p className="text-sm font-mono text-white">{gameApiData.lobbyId}</p>
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">ผู้เล่นที่ตรวจสอบแล้ว</span>
          <span className="text-lg font-bold text-white">
            {verifiedCount} / {totalPlayers}
          </span>
        </div>

        <div className="space-y-2">
          {gameApiData.verifiedPlayers.map((playerVerif) => {
            const player = session.currentPlayers.find((p: SessionPlayer) => p.userId === playerVerif.userId);
            if (!player) return null;

            return (
              <div
                key={playerVerif.userId}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${
                  playerVerif.verified
                    ? 'bg-green-900/20 border-green-700'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  {player.user.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{player.user.displayName}</p>
                  {playerVerif.gameUsername && (
                    <p className="text-xs text-slate-400">{playerVerif.gameUsername}</p>
                  )}
                </div>
                {playerVerif.verified ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-slate-500">⋯</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Status */}
      {isVerified ? (
        <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
          <p className="text-sm text-green-400 text-center">
            ✓ ตรวจสอบสถานะเกมของคุณแล้ว
          </p>
        </div>
      ) : (
        <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-400 text-center">
            ⚠️ กรุณาเข้าเกมเพื่อยืนยันตัวตน
          </p>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-slate-500 text-center space-y-1">
        <p>💡 ระบบจะตรวจสอบสถานะเกมของคุณอัตโนมัติ</p>
        <p className="text-slate-600">
          Last checked: {new Date(gameApiData.lastChecked).toLocaleTimeString('th-TH')}
        </p>
      </div>
    </div>
  );
}
