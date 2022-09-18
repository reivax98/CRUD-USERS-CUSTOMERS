import { useState, useEffect } from 'react';

function Customers() {

  const [clientes, setClientes] = useState([]);
  const [nuevo, setNuevo] = useState({});
  const [borrar, setBorrar] = useState('');
  const [idEdit, setIdEdit] = useState('');
  const [crud, setCrud] = useState(false);
  const [add, setAdd] = useState(true);

  useEffect(() => {
    const url = 'http://localhost:3030/customers';
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) }
    })
      .then(res => res.json())
      .then(data => {
        setClientes(data.data)
      })
      .catch(error => console.error(error))
  }, [clientes])

  const getCustomer = (cli) => {
    setCrud(true)
    setAdd(false)
    setTimeout(() => {
      setNuevo({
        customers_id: cli.customers_id,
        customers_nombre: cli.customers_nombre,
        customers_apellido: cli.customers_apellido,
        customers_correo: cli.customers_correo,
        customers_telefono: cli.customers_telefono,
        customers_direccion: cli.customers_direccion
      })
      setIdEdit(cli.customers_id)

      const el2 = document.querySelector('#customers_nombre');
      el2.value = cli.customers_nombre;

      const el3 = document.querySelector('#customers_apellido');
      el3.value = cli.customers_apellido;

      const el4 = document.querySelector('#customers_correo');
      el4.value = cli.customers_correo;

      const el5 = document.querySelector('#customers_telefono');
      el5.value = cli.customers_telefono;

      const el6 = document.querySelector('#customers_direccion');
      el6.value = cli.customers_direccion;
    }, 100);

  }

  const postPutEvent = (id) => {
    setAdd(true)
    const url = id ? `http://localhost:3030/customers/${id}` : "http://localhost:3030/customers";
    fetch(url, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
      },
      body: JSON.stringify(nuevo)
    })
      .then(res => { console.log('response', res) })
      .catch(error => console.error(error))
  }

  const deleteEvent = (id) => {
    const url = `http://localhost:3030/customers/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('token'))
      }
    })
      .then(res => { console.log('response', res) })
      .catch(error => console.error(error))
  }

  const handleSubmit = (e) => {
    alert('Acción ejecutada correctamente');
  }

  return <section className="content">
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-10">
          {crud ? (
            <div className="card mb-3">
              <div className="card-header">
                <div className="float-start">
                  <h3>{add ? 'Agregar cliente' : 'Editar cliente'}</h3>
                </div>
                <div className="float-end p-0">
                  <button title="Cerrar" type="button" className="btn-close mt-2" onClick={() => setCrud(false)}></button>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" name="customers_nombre" id="customers_nombre" placeholder="Nombre" onChange={(e) => setNuevo(nuevo => ({ ...nuevo, customers_nombre: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" className="form-control" name="customers_apellido" id="customers_apellido" placeholder="Apellido" onChange={(e) => setNuevo(nuevo => ({ ...nuevo, customers_apellido: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="correo">Correo</label>
                    <input type="text" className="form-control" name="customers_correo" id="customers_correo" placeholder="Correo" onChange={(e) => setNuevo(nuevo => ({ ...nuevo, customers_correo: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" className="form-control" name="customers_telefono" id="customers_telefono" placeholder="Teléfono" onChange={(e) => setNuevo(nuevo => ({ ...nuevo, customers_telefono: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" className="form-control" name="customers_direccion" id="customers_direccion" placeholder="Dirección" onChange={(e) => setNuevo(nuevo => ({ ...nuevo, customers_direccion: e.target.value }))} />
                  </div>
                  {add ?
                    (<button type="submit" className="btn btn-primary" onClick={() => postPutEvent('')}>
                      <i className="fas fa-plus"></i> Agregar cliente
                    </button>)
                    : (<button type="submit" className="btn btn-primary" onClick={() => postPutEvent(idEdit)}>
                      <i className="fas fa-file-pen"></i> Editar cliente
                    </button>)}
                </form>
              </div>
            </div>
          ) : ''}
          <div className="card mb-3">
            <div className="card-header">
              <div className="float-start">
                <h3>Tabla de Clientes</h3>
              </div>
              <div className="float-end">
                <button type="button" className="btn" title="Agregar"><i className="fas fa-plus" onClick={() => setCrud(true) || setAdd(true)}></i></button>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente, i) => {
                    return (
                      <tr key={i}>
                        <td>{cliente.customers_id}</td>
                        <td>{cliente.customers_nombre}</td>
                        <td>{cliente.customers_apellido}</td>
                        <td>{cliente.customers_correo}</td>
                        <td>{cliente.customers_telefono}</td>
                        <td>{cliente.customers_direccion}</td>
                        <td>
                          <button type="button" title="Editar" className="btn btn-xs bg-warning mx-2" onClick={() => getCustomer(cliente)}> <i className="fas fa-edit"></i></button>
                          <button type="button" title="Eliminar" className="btn btn-xs bg-danger mx-2" data-bs-toggle="modal" data-bs-target="#modal-sm"
                            onClick={() => setBorrar([cliente.customers_id])}>
                            <i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div className="modal fade" id="modal-sm">
      <div className="modal-dialog">
        <div className="modal-content bg-danger">
          <div className="modal-header">
            <h4 className="modal-title">Borrar cliente</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <p>¿Está seguro de borrar al cliente?</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-outline-light"
              data-bs-dismiss="modal" onClick={() => deleteEvent(borrar)}>Borrar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Customers