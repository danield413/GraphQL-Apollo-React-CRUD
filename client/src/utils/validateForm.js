import toast from "react-hot-toast";

export const validateProduct = ( values ) => {
    let { nombre, precio, disponible } = values;
    disponible = disponible.toLowerCase() === 'true';

    let errors = 0
    if(nombre.length < 5) {
        toast('El nombre debe llevar minimo 5 letras', { icon: '❗' })
        errors++;
    }
    if(precio.length < 4) {
        toast('El precio debe llevar minimo 4 cifras', { icon: '❗' })
        errors++;
    }
    if(disponible !== true && disponible !== false) {
        toast('Debes elegir si está disponible', { icon: '❗' })
        errors++;
    }

    if(errors <= 0) { return true } else { return false }
}

export const validateOrder = ( values ) => {
    let { mesa, nombreUsuario, order } = values;
    
    let errors = 0
    if(mesa === 0) {
        toast('Selecciona una mesa diferente a la 0', { icon: '❗' })
        errors++;
    }
    if(nombreUsuario.length < 5) {
        toast('El nombre del usuario debe llevar minimo 5 letras', { icon: '❗' })
        errors++;
    }
    if(order.length === 0){
        toast('La orden debe tener almenos 1 producto', { icon: '❗' })
        errors++;
    }

    if(errors <= 0) { return true } else { return false }
}