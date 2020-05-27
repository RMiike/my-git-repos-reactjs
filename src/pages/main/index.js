import React, { useState, useCallback, useEffect } from 'react'
import api from '../../services/api'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

const Main = () => {
  const [newRepo, setNewRepo] = useState('')
  const [loading, setLoading] = useState(false)
  const [alerta, setAlerta] = useState()
  const [repositorio, setRepositorio] = useState([])


  function handleChange(e) {
    setAlerta(null)
    setNewRepo(e.target.value)
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    async function submit() {
      try {
        setLoading(true)
        setAlerta(null)
        if (newRepo === '') {
          throw new Error('Campo obrigatório.')
        }
        const resp = await api.get(`/repos/${newRepo}`)
        const data = {
          name: resp.data.full_name,
        }
        const hasRepo = repositorio.find(repo => repo.name === newRepo)

        if (hasRepo) {
          throw new Error('Repositório duplicado.')
        }
        setRepositorio([...repositorio, data])
        setNewRepo('')

      } catch (e) {
        setAlerta(true)
        alert(e)
      } finally {
        setLoading(false)
      }
    }
    submit()
  }, [newRepo, repositorio])

  const handleDelete = useCallback((repo) => {
    const find = repositorio.filter(r => r.name !== repo)
    setRepositorio(find)
  }, [repositorio])


  useEffect(() => {
    const repoStorage = localStorage.getItem('repos')
    if (repoStorage) {
      setRepositorio(JSON.parse(repoStorage))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorio))

  }, [repositorio])

  return (
    <Container>
      <h1> <FaGithub size={25} /> Meus Repositórios</h1>
      <form onSubmit={handleSubmit} error={alerta}>
        <input type="text" placeholder='Adicionar Repositórios' value={newRepo} onChange={handleChange} />
        <StyledButton loading={loading ? 1 : 0} >
          {
            loading ? (
              <FaSpinner color='#fff' size={14} />
            ) : (
                <FaPlus color='#fff' size={14} />
              )
          }
        </StyledButton>
      </form>

      <ul>
        {
          repositorio.map(item => (
            <li key={item.name}>
              <div>
                <FaTrash onClick={() => { handleDelete(item.name) }} size={14} color='#d34ee8' />
                <span>{item.name}</span>
              </div>
              <Link to={`/repositorio/${encodeURIComponent(item.name)}`}>
                <FaBars color='#d34ee8' size={20} />
              </Link>
            </li>
          ))
        }
      </ul>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  max-width: 700px;
  background: #fff;
  border: 1px solid rgba(221, 55, 194, .2);
  box-shadow: 0 0 20px rgba(0,0,0,.1);
  padding: 30px;
  margin: 80px auto;
  align-items: center;
  justify-content: center;
  h1{
    color: #d34ee8;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg{
      margin-right: 10px;
    }
  }
  form{

    margin-top: 30px;
    display: flex;
    flex-direction: row;
    width: 100%;
    input{
      border: 1px solid ${props => (props.error ? '#FF0000' : '#eee')};
      flex:1;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 17px;
    }
  }
  ul{
    list-style: none;
    margin-top: 20px;
      width:100%;
    li{
      padding: 15px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      
        & + li {
        border-top: 1px solid #eee;
        }
        a{
        color: #d34ee8;
        text-decoration: none;
        }
        div{
          svg{
          cursor:pointer;
          
          margin-right: 5px;
          }
        }
    }
  }
`

const animated = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform:rotate(360deg)
  }
`
const StyledButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  border: 0;
  border-radius:4px;
  margin-left: 10px;
  padding: 0 15px;
  background: #db7fca;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    filter: brightness(80%);
    transition: all 1s ease;
  }
  &[disabled]{
    cursor:not-allowed;
    opacity: 0.5;
  }
  ${props => props.loading &&
    css`
      svg{
        animation:${animated} 2s linear infinite;
      }
    `
  }
`
