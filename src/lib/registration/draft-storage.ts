import type { CompleteRegistrationData } from './validation';

const DRAFT_KEY_PREFIX = 'registration_draft_';

export function saveDraft(seasonId: string, data: Partial<CompleteRegistrationData>) {
  try {
    const key = `${DRAFT_KEY_PREFIX}${seasonId}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
}

export function loadDraft(seasonId: string): Partial<CompleteRegistrationData> | null {
  try {
    const key = `${DRAFT_KEY_PREFIX}${seasonId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}

export function clearDraft(seasonId: string) {
  try {
    const key = `${DRAFT_KEY_PREFIX}${seasonId}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear draft:', error);
  }
}
