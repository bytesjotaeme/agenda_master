import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2';

class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactos: [
                { id: 1, nombre: "Juan", apellido: "Pérez", telefono: "123456789" },
                { id: 2, nombre: "María", apellido: "González", telefono: "987654321" }
            ]
        };
    }

    agregarContacto = () => {
        swal.fire({
            title: "Agregar nuevo contacto",
            html:
                `<input id="nombre" class="swal2-input" placeholder="Nombre">
                <input id="apellido" class="swal2-input" placeholder="Apellido">
                <input id="telefono" class="swal2-input" placeholder="Teléfono">`,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = swal.getPopup().querySelector('#nombre').value;
                const apellido = swal.getPopup().querySelector('#apellido').value;
                const telefono = swal.getPopup().querySelector('#telefono').value;
                if (!nombre || !apellido || !telefono) {
                    swal.showValidationMessage('Por favor complete todos los campos');
                }
                return { nombre: nombre, apellido: apellido, telefono: telefono };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const contacto = {
                    id: Math.random(),
                    nombre: result.value.nombre,
                    apellido: result.value.apellido,
                    telefono: result.value.telefono
                };
                this.setState(prevState => ({
                    contactos: [...prevState.contactos, contacto]
                }));
            }
        });
    };

    eliminarContacto = (id) => {
        this.setState(prevState => ({
            contactos: prevState.contactos.filter(contacto => contacto.id !== id)
        }));
    };

    render() {
        return (
            <div className="container mt-3">
                <h2 className="mb-4">Agenda de Contactos</h2>
                <button className="btn btn-primary mb-3" onClick={this.agregarContacto}>Agregar Contacto</button>
                <div className="row">
                    {this.state.contactos.map(contacto => (
                        <div key={contacto.id} className="col-md-4 mb-3">
                            <div className="card border-secondary">
                                <div className="card-body">
                                    <h5 className="card-title">{contacto.nombre} {contacto.apellido}</h5>
                                    <p className="card-text">Teléfono: {contacto.telefono}</p>
                                    <button className="btn btn-danger" onClick={() => this.eliminarContacto(contacto.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Formulario;
