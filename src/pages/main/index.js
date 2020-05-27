import React from 'react';
import styled from 'styled-components'
import { FaGithub, FaPlus } from 'react-icons/fa'

const Main = () => {
  return (
    <Container>
      <h1> <FaGithub size={25}/> Meus Repositórios</h1>
      <form onSubmit={()=>{}}>
        <input type="text" placeholder='Adicionar Repositórios'/>
        <button type='submit'>
          <FaPlus color='#fff' size={14}/>
        </button>
      </form>
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
      flex:1;
      border: 1px solid #ddd;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 17px;
    }
    button{
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
    }
  }
  
`