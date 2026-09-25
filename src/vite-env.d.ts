/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_CONFIG?: string
  /** Set to 'true' to talk to the local Firebase emulators. */
  readonly VITE_FIREBASE_EMULATORS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
