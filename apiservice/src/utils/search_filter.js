const searchFilter = (data, textSearch) => {
    textSearch = textSearch ?? ''; 

    var result = data.filter(item => {
        var name = textSearch.trim().toLowerCase();
        var searchParams = name.split(" ");
        if (searchParams.length > 1) {
            var result = false;

            for (let text of searchParams) {
                if ((item.cuenta.nombres.toLowerCase().includes(text) || item.cuenta.apellidos.toLowerCase().includes(text))) {
                    result = true;
                } else {
                    result = false;
                    break;
                }
            }
            return result;
        } else {
            return (item.cuenta.nombres.toLowerCase().includes(name) || item.cuenta.apellidos.toLowerCase().includes(name));
        }
    });

    return result;
}
  
export default searchFilter;