function cerrarSesion(){
  sessionStorage.clear()
}

function Header() {
  return <div className="row mb-3">
    <div className="col-md-12">
      <div className="page-header py-2 ps-2">
        <h1 className="text-info">
          <i className="fas fa-file-lines"></i> CRUD - Feathers.js - React
        </h1>
      </div>
      {(sessionStorage.getItem('token')) ? (<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#barra"
            aria-controls="barra" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="barra">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="btn btn-light mx-0 mx-lg-1 my-1 my-lg-0" href="/" onClick={cerrarSesion}>Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>) : ''}
    </div>
  </div>
}

export default Header