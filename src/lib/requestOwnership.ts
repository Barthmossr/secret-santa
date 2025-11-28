const STORAGE_KEY = 'ownedRequests'

export function addOwnedRequest(id: string): void {
  if (typeof window === 'undefined') return
  
  const owned = getOwnedRequests()
  if (!owned.includes(id)) {
    owned.push(id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(owned))
  }
}

export function isOwnedRequest(id: string): boolean {
  if (typeof window === 'undefined') return false
  
  const owned = getOwnedRequests()
  return owned.includes(id)
}

export function getOwnedRequests(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
