import { DateTime } from 'luxon'

const parseDate = (fecha) => {
    const date = new Date(Number(fecha));
    const fechaParseada = DateTime.fromJSDate(date).toLocaleString( {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'});
    return fechaParseada;
}

export default parseDate;