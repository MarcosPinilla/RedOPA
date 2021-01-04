export function dateFoto(foto) {
    let is = foto.indexOf("perfil-");
    if (is === -1) return 0;

    is += 7;
    let ie = foto.indexOf(".", is);

    let date = foto.substring(is, ie); 
    return date;
}

  
  