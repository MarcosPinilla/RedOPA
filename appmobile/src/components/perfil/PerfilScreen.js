import React from 'react'
import PerfilQuery from './PerfilQuery';

const PerfilScreen = (props) => {

  const { goTo, profile, setProfile } = props;

  return (
    <PerfilQuery
      goTo={goTo}
      profile={profile}
      setProfile={setProfile}
    />
  )
}

export default PerfilScreen;