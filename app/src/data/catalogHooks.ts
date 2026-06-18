import { useEffect, useState } from 'react'
import {
  type Category,
  type Item,
  getEmptyCounts,
  loadAllCounts,
  loadItemsByCategory,
} from './dataUtils'

interface CatalogItemsState {
  items: Item[]
  loading: boolean
  error: string | null
}

interface CatalogCountsState {
  counts: Record<Category, number>
  loading: boolean
  error: string | null
}

function messageFromError(error: unknown): string {
  return error instanceof Error ? error.message : 'Catalog loading failed'
}

export function useCatalogItems(category: Category): CatalogItemsState {
  const [state, setState] = useState<CatalogItemsState>({
    items: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    loadItemsByCategory(category)
      .then(items => {
        if (!cancelled) setState({ items, loading: false, error: null })
      })
      .catch(error => {
        if (!cancelled) setState({ items: [], loading: false, error: messageFromError(error) })
      })

    return () => {
      cancelled = true
    }
  }, [category])

  return state
}

export function useCatalogCounts(): CatalogCountsState {
  const [state, setState] = useState<CatalogCountsState>({
    counts: getEmptyCounts(),
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    loadAllCounts()
      .then(counts => {
        if (!cancelled) setState({ counts, loading: false, error: null })
      })
      .catch(error => {
        if (!cancelled) {
          setState({ counts: getEmptyCounts(), loading: false, error: messageFromError(error) })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
