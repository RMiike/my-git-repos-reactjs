import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import styled from 'styled-components'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Repositorio = ({ match }) => {

  const [repositorio, setRepositorio] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  console.log(repositorio)
  useEffect(() => {
    async function handleLoad() {
      const nomeRepo = decodeURIComponent(match.params.repositorio)

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ])
      setRepositorio(repositorioData.data)
      setIssues(issuesData.data)
      setLoading(false)
    }
    handleLoad()
  }, [match.params.repositorio])

  if (loading) {
    return (
      <Loading>
        <h1>Carregando</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to='/'>
        <FaArrowLeft color='#a251ff' size={30} onClick={()=>{}} />
      </BackButton>
      <div>
        <img src={repositorio.owner.avatar_url} alt="img owner repositorio" />
        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </div>
    </Container>
  );
};

export default Repositorio;

const Container = styled.div`
position:relative;
  display: flex;
  flex-direction: column;
  max-width:700px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(221, 55, 194, .2);
  box-shadow: 0 0 20px rgba(0,0,0,.1);
  padding: 30px;
  margin: 80px auto;
  align-items: center;
  justify-content: center;
  svg{
    cursor:pointer;
  }
  div{
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    img{
      width: 150px;
      border-radius:20%;
      margin: 20px 0;
    }
    h1{
      font-size: 30px;
      color:#a251ff;
    }
    p{
      margin-top: 15px;
      font-size: 14px;
      color:#a251ff;
      text-align:center;
      line-height: 1.4;
      max-width:400px;
    }
  }
`
const BackButton = styled(Link)`
  position: absolute;
  left:15px;
  top:15px;
  border:0;
  outline:0;

`
const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1{
    color:#a251ff;
  }
`