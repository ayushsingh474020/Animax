import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';

const Results = styled(Link)`
background-color: ${({ theme }) => theme.bgLight};
display: flex;
align-items: center;
padding: 8px;
border-radius: 6px;
gap: 20px;
&:hover{
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`
const AnimeImage = styled.img`
height: 80px;
border-radius: 8px;
width: 150px;
object-fit: cover;
@media (max-width: 768px) {
  height: 60px;
  width: 100px;
}
`
const AnimeInfo = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`
const AnimeName = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text_primary};
`
const Creator = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 12px;
@media (max-width: 768px) {
  font-size: 10px;
}

`
const Time = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 12px;
@media (max-width: 768px) {
  font-size: 10px;
}
`
const Desciption = styled.div`
display: flex;
gap: 8px;
`

const MoreResult = ({ anime }) => {
  return (
    <Results to={`/anime/${anime?._id}`} style={{ textDecoration: "none" }}>
      <AnimeImage src={anime?.thumbnail} />
      <AnimeInfo>
        <AnimeName>{anime?.name}</AnimeName>
        <Desciption>
          <Creator style={{marginRight: '12px'}}>{anime?.creator.name}</Creator>
          <Time>
            • {anime?.views} Views
          </Time>
          <Time>
            • {format(anime?.createdAt)}
          </Time>
        </Desciption>
      </AnimeInfo>
    </Results>
  )
}

export default MoreResult