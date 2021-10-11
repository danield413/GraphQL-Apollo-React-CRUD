
const filter = ( string, search ) => {
  
        const convertedString = string.toLowerCase();
        const convertedSearch = search.toLowerCase();

        const expression = new RegExp(convertedSearch);

        const index = convertedString.search(expression);

        if(index >= 0) {
            return true;
        } else {
            return false;
        }
}

export default filter
