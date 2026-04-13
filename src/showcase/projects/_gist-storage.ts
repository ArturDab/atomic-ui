/**
 * Gist Storage
 * Przechowuje gotowe teksty (prompty, CLAUDE.md) w prywatnym GitHub Gist.
 * Token GitHub jest jedyną rzeczą w localStorage (bootstrap).
 */

const GIST_FILENAME = 'atomic-ui-prompts.json'
export const LS_TOKEN  = 'atomic-ui-gist-token'
export const LS_GIST   = 'atomic-ui-gist-id'

export const getStoredToken  = () => localStorage.getItem(LS_TOKEN)  || ''
export const setStoredToken  = (t: string) => localStorage.setItem(LS_TOKEN, t)
export const getStoredGistId = () => localStorage.getItem(LS_GIST)   || ''

export async function loadConfig(token: string, gistId: string): Promise<Record<string, string> | null> {
  if (!token || !gistId) return null
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    const content = data.files?.[GIST_FILENAME]?.content
    return content ? JSON.parse(content) : null
  } catch { return null }
}

export async function saveConfig(
  token: string,
  data: Record<string, string>,
  gistId?: string,
): Promise<string | null> {
  if (!token) return null
  try {
    const body = {
      description: 'Atomic UI – prompty projektów',
      public: false,
      files: { [GIST_FILENAME]: { content: JSON.stringify(data, null, 2) } },
    }
    const res = await fetch(
      gistId ? `https://api.github.com/gists/${gistId}` : 'https://api.github.com/gists',
      {
        method: gistId ? 'PATCH' : 'POST',
        headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    )
    if (!res.ok) return null
    const d = await res.json()
    localStorage.setItem(LS_GIST, d.id)
    return d.id as string
  } catch { return null }
}
