import { useCallback, useState } from "react";
import { styled } from "styled-components";
import LikeButton from "../LikeButton/LikeButton";
import LoadingBox from "../../atoms/LoadingBox/LoadingBox";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease-in-out;
  width: 330px;
`

const Header = styled.h4`
  padding: 0 1rem;
  height: 3rem;
  display: flex;
  align-items: center;
`

const Image = styled.img<ImageProps>`
  width: 300px;
  height: 300px;
  display: ${props => props.visible ? 'block' : 'none'};
`

const Loading = styled(LoadingBox)<ImageProps>`
  width: 300px;
  height: 300px;
  box-shadow: none;
  border-radius: 0;
  display: ${props => props.visible ? 'block' : 'none'};
`

interface ImageProps {
  visible: boolean;
}

interface Props {
  giphy: App.Giphy;
  liked: boolean;
  toggleLike: (giphyId: string) => void;
}

function GiphyTile(props: Props) {
  const { giphy, liked, toggleLike } = props
  const [gifLoaded, setGifLoaded] = useState(false)

  const handleLike = useCallback(() => {
    toggleLike(giphy.id)
  }, [giphy, toggleLike])

  const handleImageLoad = useCallback(() => {
    setGifLoaded(true)
  }, [setGifLoaded])

  return (
    <Root>
      <Header>{giphy.title}</Header>
      <Image visible={gifLoaded} src={giphy.url} onLoad={handleImageLoad} />
      <Loading visible={!gifLoaded} />
      <LikeButton liked={liked} onClick={handleLike} />
    </Root>
  )
}

export default GiphyTile