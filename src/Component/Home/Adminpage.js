import React from 'react';
import './Admin.css'

function AdminPage() {
  return (
    <>
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Brand</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Logout
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header>
        <h1>
          <img src="employee.jpg" alt="Avatar" className="avatar" /> Employee Details
        </h1>
      </header>
      <div className="container">
        <div className="container-content">
          <div className="row-location">
            <div className="row-card">
              <div className="row-card-title">
                <table>
                  <tr className="table-row">
                    <th>Accolite ID</th>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                  </tr>
                </table>
              </div>
              <div className="row-card-body">
                <div className="table-scroll">
                  <table className="table">
                    <tbody>
                      <tr className="table-row">
                        <td>AC123</td>
                        <td>aman.ranjan@gmail.com</td>
                        <td>Aman</td>
                        <td>Ranjan</td>
                        <td>User</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default AdminPage;
