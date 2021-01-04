import React from 'react';
import gql from 'graphql-tag';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined';

export const RECOVER_PASSWORD = gql`
  mutation recoverPassword($rut: String!) {
    recoverPassword(rut: $rut)
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 15,
    width: 280,
  }
}));

const RecoverPassword = (props) => {
  const classes = useStyles();
  const { rut, cerrar } = props;
  const [recoverPassword, {data, loading, error}] = useMutation(
    RECOVER_PASSWORD,
    {
      onCompleted({ eliminarAlumno }) {
        cerrar();
      }
    }
  );

  if (error) {
    console.log(error);
  }

  if (loading) {
    return(<CircularProgress size={23} thickness={4} />)
  }

  return(
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      style={{alignSelf: 'center'}}
      onClick={() => { recoverPassword({ variables: { rut: rut } }) }}
    >
      <VpnKeyOutlined style={{marginRight: 10}} />  Generar Contraseña
    </Button>
  )
}

export default RecoverPassword;