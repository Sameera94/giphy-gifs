import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../../components/organisms/Header/Header"
import LoadingSkeleton from "../../components/organisms/LoadingSkeleton/LoadingSkeleton"
import GiphyTile from "../../components/organisms/GiphyTile/GiphyTile"
import { useInView } from "react-intersection-observer"
import useSavedGiphyState from "../../hooks/useSavedGiphyState"
import useSearchGiphys from "../../hooks/useSearchGiphys"

const Content = styled.div`
  padding-top: 10.5rem;

  > * + * {
    margin-top: 2rem;
  }
`

const GiphiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`

function GiphysPage() {
  const { ref, inView } = useInView()
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [savedGiphys, setSavedGiphys] = useSavedGiphyState([])
  const [loading, isError, error, giphys, fetchNextPage] = useSearchGiphys(search)

  console.log(loading, isError, error, giphys)

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value)
  }, [setSearchInput])

  const handleLike = useCallback((giphyId: string) => {
    if (savedGiphys.includes(giphyId)) {
      setSavedGiphys(savedGiphys.filter(giphy => giphy !== giphyId))
    } else {
      setSavedGiphys([...savedGiphys, giphyId])
    }
  }, [savedGiphys, setSavedGiphys])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(searchInput), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchInput, setSearch])

  return (
    <div>
      <Header
        searchInput={searchInput}
        onChange={handleSearchChange}
      />
      <Content>
        {
          loading ? (
            <LoadingSkeleton noOfTiles={9} />
          ) : isError ? (
            <span>{error}</span>
          ) : (
            <>
              <GiphiesGrid>
                {giphys.map((giphy, index) =>
                  <GiphyTile
                    key={giphy.id + index}
                    giphy={giphy}
                    liked={savedGiphys.includes(giphy.id)}
                    toggleLike={handleLike}
                  />
                )}
              </GiphiesGrid>
              <div ref={ref}>
                <LoadingSkeleton noOfTiles={3} />
              </div>
            </>
          )
        }
      </Content>
    </div>
  )
}

export default GiphysPage