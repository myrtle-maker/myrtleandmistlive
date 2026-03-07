import { Theme } from '../types';

export const initializeChat = (_theme: Theme) => {
  // Chat is now handled server-side via /api/chat
};

export const sendMessageToGemini = async (message: string, theme: Theme): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, theme }),
    });

    if (!response.ok) {
      return 'System offline. Please check connection.';
    }

    const data = await response.json();
    return data.text || 'I am having trouble connecting right now.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Connection interrupted. Please try again.';
  }
};
