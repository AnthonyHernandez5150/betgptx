import Constants from 'expo-constants';

const OPENROUTER_API_KEY = Constants.expoConfig?.extra?.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1'; // Replace with the actual base URL if different

export async function fetchFromOpenRouter(endpoint: string, options: RequestInit = {}) {
  if (!OPENROUTER_API_KEY) throw new Error('OpenRouter API key not set');

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return res.json();
}
