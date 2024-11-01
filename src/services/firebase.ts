import * as devalue from 'devalue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = devalue.parse(import.meta.env.VITE_FIREBASE_CONFIG)

firebase.initializeApp(firebaseConfig)
const DB = firebase.firestore()
const matchesCollection = DB.collection('matches')
const playersCollection = DB.collection('players')
const positionsCollection = DB.collection('positions')
const promotionsCollection = DB.collection('promotions')
const teamsCollection = DB.collection('teams')

export {
  firebase,
  matchesCollection,
  playersCollection,
  positionsCollection,
  promotionsCollection,
  teamsCollection,
}
