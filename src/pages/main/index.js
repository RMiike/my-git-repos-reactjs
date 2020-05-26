import React from 'react';
import styled from 'styled-components'
import { FaGithub } from 'react-icons/fa'

const Main = () => {
  return (
    <Container>
      <h1> <FaGithub size={25}/> Meus Repositórios</h1>
    </Container>
  );
}; 
 
export default Main;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  h1{
    
  }
`