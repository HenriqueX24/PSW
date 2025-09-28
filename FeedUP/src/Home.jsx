    import React from "react";
    import "./CSS/Home/homestyle.css";
    import { useNavigate, Link, NavLink } from "react-router-dom";

    import logo from "./Assets/logo.png";
    export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column p-0 bg-white">
        <div className="flex-grow-1">
            <header className="py-4 text-center bg-white">
            <h1 className="header-title display-5 m-0">Menu</h1>
            </header>

            <hr className="my-0 mb-4" />

        <nav className="navbar navbar-expand-lg bg-white border-bottom w-100">
    <div className="container-fluid px-3">
        <Link className="navbar-brand col-lg-3 me-0 fw-semibold" to="/home">
        FeedUp
        </Link>

        <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsMain"
        aria-controls="navbarsMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsMain">
        <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
            <NavLink className="nav-link" to="/avaliacao/:id">Avaliações</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/metas">Metas</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/ciclo-revisao">Ciclos de Revisão</NavLink>
            </li>
        </ul>
        <div className="d-lg-flex col-lg-3 justify-content-lg-end">{/* ações à direita */}</div>
        </div>
    </div>
    </nav>

            <main className="d-flex flex-column align-items-center gap-4 mt-4">
                <img className="home-logo" src={logo} alt="Logo FeedUp" />
            </main>
        </div>

        <nav className="bottom-nav d-flex justify-content-center align-items-center py-2">
            <button
            className="nav-icon btn-plain mx-3"
            onClick={() => navigate("/auto-avaliacao/:id")}
            aria-label="Autoavaliação"
            >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
                <path d="M12 17l4 4 6-8" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </button>

            <button className="nav-icon btn-plain home mx-3" onClick={() => navigate("/home")} aria-label="Home">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#5cc6ba">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            </button>

            <button className="nav-icon btn-plain mx-3" onClick={() => navigate("/perfil")} aria-label="Perfil">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="#e0e0e0">
                <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
            </button>
        </nav>
        </div>
    );
    }
