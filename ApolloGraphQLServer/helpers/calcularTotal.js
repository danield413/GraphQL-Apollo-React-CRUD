

const calcularTotal = (productosOrden) => {

    const total = productosOrden.reduce((acc, act) => (acc + (act.precio * act.cantidad)), 0);

    return total;
}

module.exports = calcularTotal;