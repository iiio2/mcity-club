import type { CollectionReference, QueryDocumentSnapshot } from 'firebase/firestore'
import type { WithId } from '../types'
import { getDocs, limit, query, startAfter } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { withIds } from '../services/firebase'
import { showErrorToast } from './toasts'

async function fetchPage<T>(
  collectionRef: CollectionReference<T>,
  pageSize: number,
  cursor: QueryDocumentSnapshot<T> | null,
) {
  const snapshot = await getDocs(cursor
    ? query(collectionRef, startAfter(cursor), limit(pageSize))
    : query(collectionRef, limit(pageSize)))

  return {
    items: withIds(snapshot),
    last: snapshot.docs[snapshot.docs.length - 1] ?? cursor,
    hasMore: snapshot.docs.length === pageSize,
  }
}

/** Loads a collection `pageSize` documents at a time. */
export function usePaginatedCollection<T>(collectionRef: CollectionReference<T>, pageSize: number) {
  const [items, setItems] = useState<WithId<T>[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const lastVisibleRef = useRef<QueryDocumentSnapshot<T> | null>(null)

  useEffect(() => {
    fetchPage(collectionRef, pageSize, null)
      .then((page) => {
        lastVisibleRef.current = page.last
        setHasMore(page.hasMore)
        setItems(page.items)
      })
      .catch(showErrorToast)
      .finally(() => setLoading(false))
  }, [collectionRef, pageSize])

  const loadMore = () => {
    setLoading(true)
    fetchPage(collectionRef, pageSize, lastVisibleRef.current)
      .then((page) => {
        lastVisibleRef.current = page.last
        setHasMore(page.hasMore)
        setItems(prev => [...(prev ?? []), ...page.items])
      })
      .catch(showErrorToast)
      .finally(() => setLoading(false))
  }

  return { items, loading, hasMore, loadMore }
}
