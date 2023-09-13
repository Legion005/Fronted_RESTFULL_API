import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    await axios.post('http://localhost:8000/api/auth/login', data)
      .then((response) => {
        Swal.fire(
          'Success Login!!',
          'Kamu Berhasil login',
          'success'
        )
        localStorage.setItem('token', response.data.access_token);
        navigate('/home')
      }).catch((error) => {
        Swal.fire(
          'Error MasBro',
          'email atau passwordnya salah bro',
          'error'
        )
        setValidation(error.response.data);
      })
  }
  return (
    <div className="w-100 row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <h1 className="m-3 text-center">
          Login
        </h1>
        <div className="card">
          <div className="card-body p-5">
            <h2 className="text-uppercase text-center mb-5">
              Sign in account
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  name="email" />
                <span className="fs-6 text-danger">
                  {validation ? validation.email : ""}
                </span>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  name="password" />
                <span className="fs-6 text-danger">
                  {validation ? validation.password : ""}
                </span>
              </div>

              <Link to="/" className="btn btn-danger px-4 text-white mx-1">
                back
              </Link>

              <button type="submit" className="btn btn-primary px-4 text-white">
                Login
              </button>

              <p className="text-center text-muted mt-5 mb-0">
                Not Have already an account?
                <a href="/register" className="fw-bold text-body">
                  <u>Registrasi here</u>
                </a>
              </p>

            </form>

          </div>
        </div>
      </div>

    </div>
  )
}