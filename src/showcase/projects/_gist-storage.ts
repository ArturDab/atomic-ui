/**
 * Gist Storage – trwałe przechowywanie konfiguracji w prywatnym GitHub Gist.
 * Token GitHub jest jedyną rzeczą trzymaną w localStorage.
 * Wszystkie wartości konfiguracyjne są zapisywane/odczytywane z prywatnego Gist.
 *
 * Klucze localStorage:
 *   atomic-ui-gist-token  – GitHub token (wspólny dla wszystkich projektów)
 *   atomic-ui-gist-id     – ID Gista (tworzy się automatycznie przy pierwszym zapisie)
 */

const GIST_FILENAME = 'atomic-ui-config.json'
const LS_TOKEN = 'atomic-ui-gist-token'
const LS_GIST_ID = 'atomic-ui-gist-id'

export function getStoredToken(): string {
  return localStorage.getItem(LS_TOKEN) || ''
}

export function setStoredToken(token: string) {
  localStorage.setItem(LS_TOKEN, token)
}

export function getStoredGistId(): string {
  return localStorage.getItem(LS_GIST_ID) || ''
}

export async function loadConfig(token: string, gistId: string): Promise<Record<string, string> | null> {
  if (!token || !gistId) return null
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) return null
    const data = await res.json()
    const content = data.files?.[GIST_FILENAME]?.content
    return content ? JSON.parse(content) : null
  } catch {
    return null
  }
}

export async function saveConfig(
  token: string,
  values: Record<string, string>,
  gistId?: string
): Promise<string | null> {
  if (!token) return null
  try {
    const body = {
      description: 'Atomic UI – konfiguracja projektów (nie usuwaj)',
      public: false,
      files: { [GIST_FILENAME]: { content: JSON.stringify(values, null, 2) } },
    }
    const url = gistId
      ? `https://api.github.com/gists/${gistId}`
      : 'https://api.github.com/gists'
    const res = await fetch(url, {
      method: gistId ? 'PATCH' : 'POST',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) return null
    const data = await res.json()
    const newId = data.id as string
    localStorage.setItem(LS_GIST_ID, newId)
    return newId
  } catch {
    return null
  }
}
