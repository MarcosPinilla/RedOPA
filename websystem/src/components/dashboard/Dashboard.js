import React, { Component } from 'react';
import Sidebar from './sidebar/Sidebar';

import { connect } from 'react-redux';
import * as actions from '../../rdx/actions';

class Dashboard extends Component {
  
  render() {
    return (
      <Sidebar
        setInstitutionId={this.props.setInstitutionId}
        institutionId={this.props.institutionId}
      /> 
    );
  }
 }

 const mapStateToProps = state => {
   return { institutionId: state.institutionId };
 }

 
 export default connect(mapStateToProps, actions) (Dashboard);