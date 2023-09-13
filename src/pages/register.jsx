import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [validation, setValidation] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    await axios.post('http://localhost:8000/api/auth/register', data)
      .then(() => {
        Swal.fire(
          'Success Login!!',
          'You clicked the button!',
          'success'
        )
        navigate('/login')
      }).catch((error) => {
        setValidation(error.response.data);
      })
  }
  return (
    <div className="w-100 row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <h1 className="m-3 text-center">
          Registrasi
        </h1>
        <div className="card">
          <div className="card-body p-5">
            <h2 className="text-uppercase text-center mb-5">
              Create an account
            </h2>

            <form onSubmit={handleSubmit} method="POST">

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-lg"
                  name="name" />
                <span className="fs-6 text-danger">
                  {validation ? validation.name : ""}
                </span>
              </div>

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

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="passwordConfirm">
                  Repeat your password
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  className="form-control form-control-lg"
                  name="password_confirmation" />
                <span className="fs-6 text-danger">
                  {validation ? validation.password_confirmation : ""}
                </span>

              </div>


              <Link to="/" className="btn btn-danger px-4 text-white mx-1">
                back
              </Link>

              <button type="submit" className="btn btn-primary px-4 text-white">
                Register
              </button>

              <p className="text-center text-muted mt-5 mb-0">
                Have already an account?
                <a href="/login" className="text-body fw-bold">
                  <u>Login here</u>
                </a>
              </p>

            </form>

          </div>
        </div>
      </div>

    </div>
  )
}