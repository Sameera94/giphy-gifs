import { styled } from "styled-components";
import filledLikeIcon from './../../../assets/filled-like-icon.svg';
import emptyLikeIcon from './../../../assets/empty-like-icon.svg';

const Root = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background: none;
  border: none;
  padding: 1.5rem;

  &:focus {
    outline: 0;
  }

  > img {
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    > img {
      transform: scale(1.2);
    }
  }

  > * + * {
    margin-left: 0.5rem;
  }
`

interface Props {
  liked: boolean;
  onClick: () => void;
}

function LikeButton(props: Props) {
  const { liked, onClick } = props

  return (
    <Root onClick={onClick}>
      <img src={liked ? filledLikeIcon : emptyLikeIcon} />
      <span>{liked ? "Saved!" : "I love this"}</span>
    </Root>
  )
}

export default LikeButton