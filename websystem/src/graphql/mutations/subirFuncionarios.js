import React, { Component } from 'react';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import FileBase64 from 'react-file-base64';
import { Grid } from '@material-ui/core';

const SUBIR_FUNCIONARIOS = gql`
  mutation subirFuncionarios($excel: String!){
    subirFuncionarios(excel: $excel)
  }
`;

const SubirFuncionarios = (props) => {

  const { user, goTo } = props
  const [subirFuncionarios, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    SUBIR_FUNCIONARIOS,
    {
      onCompleted({ subirFuncionarios }) {
       console.log('error')
      }
    }
  );

  if(mutationError){
    console.log('error')
  }
  
  return (
   <Grid style={{border: '2px solid #57457F', borderRadius:25, height:40,margin: 25}} direction="row">
     <div style={{margin:6}} >
       <FileBase64
        multiple={ false }
        onDone={ (file) => subirFuncionarios({variables: {excel:file.base64}})}/>  
     </div>
   </Grid>
    
  );
}

export default SubirFuncionarios