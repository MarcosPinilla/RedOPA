import React, { Component } from 'react'
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, DialogContent, InputLabel, FormControl, FormLabel, Slider, Button, CircularProgress, Typography } from '@material-ui/core/';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { useMutation } from '@apollo/react-hooks';

export const UPDATE_UMBRAL = gql`
  mutation updateUmbralRiesgo($valor: Int!, $institucion_id: ID) {
    updateUmbralRiesgo(valor: $valor, institucion_id: $institucion_id)
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root2: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const marks = [
  {
    value: 2,
    label: '2',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 20,
    label: '20',
  }
]

export default function EditUmbralRiesgo(props) {
  const { institutionId } = props;
  const classes = useStyles();

  const { cerrar } = props;
  const [umbral, setUmbral] = React.useState(props.actual);

  const [updateUmbralRiesgo, {data, loading, error}] = useMutation(
    UPDATE_UMBRAL,
    {
      onCompleted({ updateUmbralRiesgo }) {
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

  const handleSliderChange = (event, newValue) => {
    setUmbral(newValue);
  };

  return (
    <div>
      <DialogContent>
        <Grid container direction="row" justify="center" style={{marginBottom:25}}>
          <Typography variant="h3" style={{margin: 10, textAlign: "center"}} color="primary">{umbral}</Typography>
        </Grid>
        <Grid container direction="column">
          <FormControl>
            <Grid container spacing={2} direction="row">
              <Grid item flex="2">
                <Typography variant="body1">Más alertas</Typography>
              </Grid>
              <Grid item flex="8">
                <Slider
                  defaultValue={8}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks={marks}
                  min={2}
                  max={20}
                  style={{width:200}}
                  value={umbral}
                  onChange={handleSliderChange}
                />
              </Grid>
              <Grid item flex="2">
                <Typography variant="body1">Menos alertas</Typography>
              </Grid>
            </Grid>
            <Button variant="contained"
              color="primary"
              style={{margin: 10}}
              onClick={() => { updateUmbralRiesgo({ variables: { valor: umbral, institucion_id: institutionId } }) }}
            >
              <EditOutlined/> Confirmar
            </Button>
          </FormControl>
        </Grid>
      </DialogContent>
    </div>
  )
}
