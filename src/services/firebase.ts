import type { FirebaseOptions } from 'firebase/app'
import type { CollectionReference, QuerySnapshot } from 'firebase/firestore'
import type { Admin, Match, Player, Position, Promotion, Team, WithId } from '../types'
import * as devalue from 'devalue'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { collection, connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

function readFirebaseConfig(): FirebaseOptions {
  const raw = import.meta.env.VITE_FIREBASE_CONFIG
  if (!raw) {
    throw new Error(
      'VITE_FIREBASE_CONFIG is not set. Copy .env.example to .env and paste your Firebase web app config into it.',
    )
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  }
  catch {
    throw new Error('VITE_FIREBASE_CONFIG must be the Firebase web app config as JSON.')
  }

  // Older setups stored the config in devalue's format, which is a JSON array.
  const config = Array.isArray(parsed) ? devalue.unflatten(parsed) : parsed
  if (!config || typeof config !== 'object' || !('projectId' in config)) {
    throw new Error('VITE_FIREBASE_CONFIG does not look like a Firebase web app config.')
  }

  return config as FirebaseOptions
}

const app = initializeApp(readFirebaseConfig())

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Ports match the emulators block in firebase.json.
if (import.meta.env.VITE_FIREBASE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  connectStorageEmulator(storage, '127.0.0.1', 9199)
}

export const adminsCollection = collection(db, 'admins') as CollectionReference<Admin>
export const matchesCollection = collection(db, 'matches') as CollectionReference<Match>
export const playersCollection = collection(db, 'players') as CollectionReference<Player>
export const positionsCollection = collection(db, 'positions') as CollectionReference<Position>
export const promotionsCollection = collection(db, 'promotions') as CollectionReference<Promotion>
export const teamsCollection = collection(db, 'teams') as CollectionReference<Team>

export function withIds<T>(snapshot: QuerySnapshot<T>): WithId<T>[] {
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
