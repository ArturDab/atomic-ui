/**
 * Repo Storage – zapisuje konfigurację jako plik JSON w repozytorium atomic-ui.
 * Używa GitHub Contents API. Token wbudowany (jest już w promptcie startowym).
 * Dane żyją w git – nigdy nie znikają.
 */

const OWNER = 'ArturDab'
const REPO  = 'atomic-ui'
const TOKEN = (import.meta as any).env?.VITE_GITHUB_TOKEN || ''
const PATH  = 'config/docs-config.json'
const API   = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`

const HEADERS = {
  Authorization: `token ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'Content-Type': 'application/json',
}

let cachedSha = ''

export async function repoLoad(): Promise<Record<string, string> | null> {
  try {
    const res = await fetch(API, { headers: HEADERS })
    if (!res.ok) return null
    const data = await res.json()
    cachedSha = data.sha
    const content = atob(data.content.replace(/\n/g, ''))
    return JSON.parse(content)
  } catch { return null }
}

export async function repoSave(data: Record<string, string>): Promise<boolean> {
  try {
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))
    const body: Record<string, string> = {
      message: 'docs: aktualizacja konfiguracji projektów',
      content,
    }
    if (cachedSha) body.sha = cachedSha
    const res = await fetch(API, { method: 'PUT', headers: HEADERS, body: JSON.stringify(body) })
    if (!res.ok) return false
    const d = await res.json()
    cachedSha = d.content?.sha || cachedSha
    return true
  } catch { return false }
}
