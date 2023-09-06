import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  100% {
    transform: translateX(100%);
  }
`

const Box = styled.div`
  position: relative;
  background-color: #EFEFF0;
  overflow: hidden;
  height: 462px;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  width: 330px;

  &::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, #DFDFE1 40%, transparent);
    animation: ${loading} .75s infinite;
  }
`

interface Props {
  className?: string;
}

function LoadingBox({className}: Props) {
  return <Box className={className} />
}

export default LoadingBox
