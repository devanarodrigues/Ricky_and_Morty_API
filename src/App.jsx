import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './App.css'
import { Container, styled } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Fade, Slide } from 'react-awesome-reveal';

function App() {
  const style = { display: 'flex', width: '330px', justifyContent: 'space-between' }

  const [prev, setPrev] = useState('https://rickandmortyapi.com/api/character?page=1')
  const [atual, setAtual] = useState({ atual: 'https://rickandmortyapi.com/api/character?page=1' })
  const [next, setNext] = useState('https://rickandmortyapi.com/api/character?page=1')
  const [page, setPage] = useState(1)
  const [charactersRes, setCharactersRes] = useState({ data: '', url: '', })
  const [characters, setCharacters] = useState({ data: [], })

  async function runAPI() {
    const result = await axios.get(atual.atual)
    charactersRes.url = await result.data
    charactersRes.data = await charactersRes.url.results
    setNext(charactersRes.url.info.next)
    setPrev(charactersRes.url.info.prev ? charactersRes.url.info.prev : 'não possui')
    characters.data = charactersRes.data
  }

  useEffect(() => {
    try {
      runAPI()
    } catch {
      console.log('err')
    }
  }, [])
  function nextPage() {
    setPage(page + 1)
    setNext(charactersRes.url.info.next)
    atual.atual = next
    runAPI()
  }
  function prevPage() {
    setPage(page === 1 ? '' : page - 1)
    setPrev(charactersRes.url.info.prev ? charactersRes.url.info.prev : 'não possui')
    atual.atual = prev
    runAPI()
  }


  const CardStyled = styled(Card)`
  background-color: #f0e14a;
  `
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'scroll',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          width: '49vw',
          height: '60vh',
          padding: '1rem',
          backgroundColor: '#e4a788',
          borderRadius: '.5rem'
        }}
      >

        {
          characters.data.map((character) => {
            return (
              <Slide cascade triggerOnce={true} damping={0.1} key={character.id}>
              <CardStyled  sx={style}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {character.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {character.species}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {character.location.name}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={character.image}
                  alt="alt"
                />
              </CardStyled>
              </Slide>
            )
          })
        }
      </Container>
      <Pagination size='md' style={{ width: '49vw', display: 'flex', justifyContent: 'space-between', marginTop: '.5rem' }}>
        <Pagination.Prev size='lg' onClick={prevPage} />
        <Pagination.Next size='lg' onClick={nextPage} />
      </Pagination>

    </>
  )
}

export default App
