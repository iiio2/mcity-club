export type WithId<T> = T & { id: string }

export type MatchResult = 'W' | 'D' | 'L' | 'n/a'

export interface Match {
  date: string
  local: string
  localThmb?: string
  resultLocal: number | string
  away: string
  awayThmb?: string
  resultAway: number | string
  referee: string
  stadium: string
  result: MatchResult | ''
  /** 'yes' once the match has been played. Older records may be capitalised. */
  final: string
}

export type PlayerPosition = 'Keeper' | 'Defence' | 'Midfield' | 'Striker'

export interface Player {
  name: string
  lastname: string
  number: number | string
  position: PlayerPosition | ''
  /** File name inside the `players/` storage folder. */
  image: string
}

export interface Team {
  shortName: string
  thmb: string
}

export interface Position {
  team: string
  w: number
  d: number
  l: number
  pts: number
}

export interface Promotion {
  email: string
}

/** A document at `admins/{uid}` grants that user access to the admin area. */
export type Admin = Record<string, unknown>

export function isPlayed(match: Pick<Match, 'final'>) {
  return String(match.final).toLowerCase() === 'yes'
}
