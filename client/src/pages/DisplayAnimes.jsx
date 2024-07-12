import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getAnimeByCategory, getMostPopularAnime } from '../api/index.js';
import styled from 'styled-components';
import { AnimeCard } from '../components/AnimeCard.jsx';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice.jsx";
import { displayAnimeFailure } from '../redux/userSlice.jsx';
import { CircularProgress } from '@mui/material';

const DisplayMain = styled.div`
display: flex;
padding: 30px 30px;
flex-direction: column;
height: 100%;
overflow-y: scroll;
`
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Animes = styled.div`
display: flex;
flex-wrap: wrap;
height: 100%;
gap: 10px;
padding: 30px 0px;
`
const Container = styled.div`
background-color: ${({ theme }) => theme.bg};
padding: 20px;
border-radius: 6px;
min-height: 400px;
`

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
const DisplayNo = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
color: ${({ theme }) => theme.text_primary};
`




const DisplayAnimes = () => {
    const { type } = useParams();
    const [animes, setAnimes] = useState([]);
    const [string, setString] = useState("");
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);

    const mostPopular = async () => {
        await getMostPopularAnime()
            .then((res) => {
                setAnimes(res.data)
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });
    }
    const getCategory = async () => {
        await getAnimeByCategory(type)
            .then((res) => {
                setAnimes(res.data)
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });

    }

    const getallanimes = async () => {
        if (type === 'mostpopular') {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            arr.splice(4, 0, " ");
            setString(arr.join(""));
            console.log(string);
            await mostPopular();
            setLoading(false);
        }
        else {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            setString(arr);
            await getCategory();
            setLoading(false);
        }
    }

    useEffect(() => {
        getallanimes();

    }, [])
    return (
        <DisplayMain>
            <Container>
                <Topic>{string}</Topic>
                {Loading ? 
                <Loader>
                    <CircularProgress />
                </Loader>
                 :
                    <Animes>
                        {animes.length === 0 && <DisplayNo>No Animes</DisplayNo>}
                        {animes.map((anime) => (
                            <AnimeCard anime={anime} />
                        ))}
                    </Animes>
                }
            </Container>
        </DisplayMain>
    )
}

export default DisplayAnimes