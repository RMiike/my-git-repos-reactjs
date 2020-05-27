import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import styled from 'styled-components'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Repositorio = ({ match }) => {

  const [repositorio, setRepositorio] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

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

  useEffect(()=>{
    async function handleLoadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repositorio)
      const resp = await api.get(`/repos/${nomeRepo}/issues`,{
        params:{
          state: 'open',
          page,
          per_page:5
        }
      })
      setIssues(resp.data)
    }
    handleLoadIssue()
  },[page])

  function handlePage(action){
    setPage(action === 'back' ? page- 1 : page +1)
  }
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
        <FaArrowLeft color='#a251ff' size={30} onClick={() => { }} />
      </BackButton>
      <div>
        <img src={repositorio.owner.avatar_url} alt="img owner repositorio" />
        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </div>
      <ul>
        {
          issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt="user avatar url" />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {
                    issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))
                  }
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))
        }
      </ul>
      <PaginationStyle>
        <button disabled={page < 2} onClick={()=>{handlePage('back')}} >Voltar</button>
        <button  onClick={()=>{handlePage('next')}} >Próxima</button>
      </PaginationStyle>
    </Container>
  );
};

export default Repositorio;

const Container = styled.div`
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
  ul{
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;
    li{
      display: flex;
      padding: 15px 10px;

      & + li {
        margin-top: 12px;
      }
      img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid rgba(0,0,0,.1);
      }
      div{
        flex:1;
        margin-left: 12px;
        strong{
          font-size: 15px;
          a{
            text-decoration: none;
            color: rgb(162, 81, 255, .8);
            transition: all 0.5s;
            &:hover{
              filter: brightness(50%);
            }
          }
          span{
            background: #999;
            color: rgb(162, 81, 255, .8);
            border-radius: 4px;
            padding: 2px 7px;
            margin-left: 10px;
          }
        }
        p{
          margin-top: 10px;
          font-size: 12px;
          color: rgb(162, 81, 255, .8);
        }
      }
    }
  }
`
const BackButton = styled(Link)`
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
const PaginationStyle = styled.div`
  width: 300px;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  button{
    margin: 10px;
    outline:0;
    border: 0;
    background: #222;
    color:#a251ff;
    padding: 5px 10px;
    border-radius: 4px;
    &:disabled{
      cursor: not-allowed;
      opacity: .5;
    }
  }
`