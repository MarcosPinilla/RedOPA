function generatePassword () {
  let pass = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return pass.substring(0, 6);
}

export default generatePassword;