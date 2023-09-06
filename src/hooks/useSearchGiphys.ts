import { useInfiniteQuery } from "react-query"
import { getTrendingGiphys, searchGiphys } from "../api/giphy"
import { useMemo } from "react"

function useSearchGiphys(search: string) {
  const {
    status,
    error,
    isError,
    data,
    isSuccess,
    fetchNextPage
  } = useInfiniteQuery(
    ['giphys', search],
    async ({ pageParam = 0 }) => {
      if (search !== '') return searchGiphys(pageParam, search)
      return getTrendingGiphys(pageParam)
    }, {
      getNextPageParam: (lastPage) => lastPage.offset + 1
    }
  )

  // Collect giphys from all pages
  const giphys = useMemo(() => {
    if (isSuccess) return (data?.pages ?? []).flatMap(page => page?.giphys)
    return []
  }, [isSuccess, data])

  const noResults = isSuccess && giphys.length === 0

  const errorMessage = useMemo(() => {
    if (noResults) return 'Sorry, No Results found!'
    if (isError) return (error as Error).message
    return ''
  }, [noResults, isError, error])
  
  const loading = status === 'loading'
  const errorState = isError || noResults

  return [
    loading,
    errorState,
    errorMessage,
    giphys,
    fetchNextPage
  ] as const
}

export default useSearchGiphys
