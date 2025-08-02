import Cap from "@cap.js/server";

// Simple in-memory storage for development
// In production, you'd want to use a database like SQLite or Redis
const challengesStore = new Map();
const tokensStore = new Map();

const cap = new Cap({
  storage: {
    challenges: {
      store: async (token: string, challengeData: any) => {
        challengesStore.set(token, {
          data: challengeData,
          expires: challengeData.expires
        });
      },
      read: async (token: string) => {
        const stored = challengesStore.get(token);
        if (!stored || stored.expires < Date.now()) {
          challengesStore.delete(token);
          return null;
        }
        return {
          challenge: stored.data,
          expires: stored.expires
        };
      },
      delete: async (token: string) => {
        challengesStore.delete(token);
      },
      listExpired: async () => {
        const expired = [];
        for (const [token, data] of challengesStore.entries()) {
          if (data.expires <= Date.now()) {
            expired.push(token);
          }
        }
        return expired;
      },
    },
    tokens: {
      store: async (tokenKey: string, expires: number) => {
        tokensStore.set(tokenKey, expires);
      },
      get: async (tokenKey: string) => {
        const expires = tokensStore.get(tokenKey);
        if (!expires || expires < Date.now()) {
          tokensStore.delete(tokenKey);
          return null;
        }
        return expires;
      },
      delete: async (tokenKey: string) => {
        tokensStore.delete(tokenKey);
      },
      listExpired: async () => {
        const expired = [];
        for (const [token, expires] of tokensStore.entries()) {
          if (expires <= Date.now()) {
            expired.push(token);
          }
        }
        return expired;
      },
    },
  },
});

export default cap;
