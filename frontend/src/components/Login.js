import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  credentials.strategy = 'local'
  return fetch('http://localhost:3030/authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .catch(err => console.log('Solicitud fallida', err));
}

export default function Login({ setToken }) {
  const [users_correo, setUserName] = useState();
  const [users_contrasena, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      users_correo,
      users_contrasena
    });
    setToken(token);
  }

  return <div style={{ height: '64vh' }} className="container-fluid">
    <div className="row justify-content-center">
      <div className='col-md-4 mt-4'>
        <div className="card mt-5">
          <div className="card-body">
            <p className=""><strong>Ingrese sus datos</strong></p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" name="us_correo" className="form-control"
                  placeholder="Correo" required onChange={e => setUserName(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="password" name="us_clave" className="form-control"
                  placeholder="Contraseña" required onChange={e => setPassword(e.target.value)} autoComplete="off" />
              </div>
              <div className="text-center mb-3">
                <button type='submit' className="btn btn-primary btn-block">Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}