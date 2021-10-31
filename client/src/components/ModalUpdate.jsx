import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { UPDATE_PRODUCT } from '../GraphQL/mutations';
import useForm from '../hooks/UseForm'

ReactModal.setAppElement('#main');

const Form = styled.form`
    width: 100%;
    height: 100%;
    padding: 12px;
    h1 {
        margin-bottom: 15px;
    }
    label, input {
        display: block;
    }

    label {
        font-size: 1.4rem;
        margin-bottom: 10px;
    }
    input[type="text"], input[type="number"] {
        width: 100%;
        border: 2px solid transparent;
        background-color: #b3b3b3;
        height: 40px;
        border-radius: 6px;
        padding-left: 5px;
        transition: .3s ease-in-out;
        &:focus {
            border: 2px solid #7000FF;
        }
    }
    input {
        margin-bottom: 10px;
        outline: none;
    }
    input[type="submit"] {
        width: 100%;
        background-color: #7000FF;
        color: white;
        height: 40px;
        border: none;
        cursor: pointer;
        border-radius: 6px;
    }
`

const ModalUpdate = ( {isOpen, setIsOpen,id, nombre, precio} ) => {

    const [ state, handleChange ] = useForm({
        nombre,
        precio
    })
    const [ actualizarProducto ] = useMutation(UPDATE_PRODUCT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await toast.promise( actualizarProducto({
            variables: {
                input: {
                    id,
                    nombre: state.nombre,
                    precio: Number(state.precio)
                }
            }
        }) , {
            success: 'Producto actualizado correctamente',
            error: 'UPS... ocurrió un error inesperado',
            loading: 'Actualizando...'
        });
        setIsOpen(false);
    }

    return (
        <ReactModal 
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName="overlay"
            className="content"
        >
            <Form onSubmit={handleSubmit}>
                <h1 className="no-selectable">Actualizar</h1>
                <label htmlFor="nombre" className="no-selectable">Producto</label>
                <input type="text" id="nombre" name="nombre" onChange={handleChange} value={state.nombre}/>
                <label htmlFor="precio" className="no-selectable">Precio</label>
                <input type="number" id="precio" name="precio" onChange={handleChange} value={state.precio}/>
                <input type="submit" value="Guardar" />
            </Form>
        </ReactModal>
    )
}

export default ModalUpdate
