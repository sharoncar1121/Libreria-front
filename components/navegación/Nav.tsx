import Link from "next/link";
import React from "react";
import Buscador from "../buscador/Search";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          LIBRERÍA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link active" href="/">
              Salir
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" href="/libros-disp">
              Libros disponibles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/libros-todos">
              Ver Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/info">
              Cuenta
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}