import React, { Component } from 'react';
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { onError } from "apollo-link-error";
import Button from '@material-ui/core/Button';
import FileBase64 from 'react-file-base64';
import { Grid } from '@material-ui/core';

const SUBIR_ALUMNOS = gql`
  mutation subirAlumnos($excel: String!){
    subirAlumnos(excel: $excel)
  }
`;

const SubirAlumnos = (props) => {

  const { user, goTo } = props
  const [subirAlumnos, { data, loading: mutationLoading, error: mutationError }] = useMutation(
    SUBIR_ALUMNOS,
    {
      onCompleted({ subirAlumnos }) {
       console.log('error')
      }
    }
  );

  if(mutationError){
    console.log('error')
  }
  
  return (
    /*
    <Button variant="contained" color="primary" size="large" onClick={() => subirAlumnos({variables: {excel:"hola"}})}>
      Subir
    </Button>
    */
   <Grid style={{border: '2px solid #57457F', borderRadius:25, height:40,margin: 25}} direction="row">
     <div style={{margin:6}} >
       <FileBase64
        multiple={ false }
        onDone={ (file) => subirAlumnos({variables: {excel:file.base64}})}/>  
     </div>
   </Grid>
    
  );
}

export default SubirAlumnos