import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import styled  from 'styled-components'

const Repositorio = ({match}) => {

  const[repositorio,setRepositorio] = useState({})
  const[issues,setIssues] = useState([])
  const[loading,setLoading] = useState(true)

  useEffect(()=>{
    async function handleLoad(){
      const nomeRepo = decodeURIComponent(match.params.repositorio)

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`repos/${nomeRepo}/issues`,{
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ])
      setRepositorio(repositorioData)
      setIssues(issuesData)
      setLoading(false)
    }
    handleLoad()
  },[match.params.repositorio])


  return (
      <Container>
        
      </Container>
  );
};

export default Repositorio;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(221, 55, 194, .2);
  box-shadow: 0 0 20px rgba(0,0,0,.1);
  padding: 30px;
  margin: 80px auto;
  align-items: center;
  justify-content: center;
`