export type ContactType = 'friend' | 'group' | 'market';
export type MessageStatus = 'sending' | 'sent' | 'read' | 'failed';

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'ingame';
  game?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  type: 'text' | 'image' | 'invite' | 'offer';
  status?: MessageStatus;
  data?: any;
  isMe?: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  time: string;
  unread: number;
  type: ContactType;
  isPinned?: boolean;
}

