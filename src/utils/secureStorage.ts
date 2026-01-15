// Simulation of Encryption-At-Rest
// In a production specific environment, this would use Web Crypto API (AES-GCM)
// For this React demo, we use Base64 + Salt obfuscation to demonstrate the "scrambling" concept in LocalStorage

const SALT = 'HIPAA_COMPLIANT_SALT_VO8X9';

export const secureStorage = {
  setItem: (key: string, value: any) => {
    try {
      const stringValue = JSON.stringify(value);
      // "Encrypt" (Obfuscate)
      const encrypted = btoa(encodeURIComponent(stringValue + SALT));
      localStorage.setItem(key, `ENC_${encrypted}`);
      console.log(`[SecureStorage] Encrypted data saved for ${key}`);
    } catch (error) {
      console.error('Encryption failed', error);
    }
  },

  getItem: (key: string) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted || !encrypted.startsWith('ENC_')) return null;

      const raw = encrypted.substring(4);
      // "Decrypt"
      const decoded = decodeURIComponent(atob(raw));
      const jsonString = decoded.replace(SALT, '');
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decryption failed', error);
      return null;
    }
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};
