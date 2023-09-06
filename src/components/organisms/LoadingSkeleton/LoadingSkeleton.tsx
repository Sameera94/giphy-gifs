import styled from 'styled-components';
import LoadingBox from '../../atoms/LoadingBox/LoadingBox'

interface Props {
  noOfTiles: number;
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`

function LoadingSkeleton({ noOfTiles }: Props) {
  return (
    <Root>
      {[...Array(noOfTiles)].map((_, index) => <LoadingBox key={index} />)}
    </Root>
  )
}

export default LoadingSkeleton
