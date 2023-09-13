import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Home() {

  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }

    fetchData();
    fetchSongs();
  }, [])

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/songs');
      setSongs(response.data.data.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data lagu:', error);
    }
  };
  const fetchData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:8000/api/auth/user-profile");
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/home");
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const logoutHandler = async () => {
    Swal.fire({
      title: "Yakin Mau Keluar Mas?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .post("http://localhost:8000/api/auth/logout")
          .then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
          });
      }
    });
  };

  return (
    <div className="w-100 row">
      <div className="col-12 col-md-9 col-lg-6 col-xl-5">
        <div className="card">
          <div className="card-header pb-0">
            <h1 className="fw-bold fs-4 text-center">
              HOME
            </h1>
          </div>
          <div className="card-body">
            <h5 className="card-title pb-4">
              Belajar membuat auth api dan jwt token dengan Laravel ( Backend ) & ReactJs ( Frontend )
            </h5>
            <span className="d-flex gap-2">
              <p className="fw-bold">
                Username :
              </p>
              <p>{user.name}</p>
            </span>
            <span className="d-flex gap-2">
              <p className="fw-bold">
                Email :
              </p>
              <p>{user.email}</p>
            </span>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, ipsam, quis ad omnis optio similique accusamus voluptates amet expedita, esse nemo enim iusto rerum ea ducimus. Asperiores quis odit error!
            </p>


            <button onClick={logoutHandler} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-9 col-lg-8 col-xl-7">
        <div className="card">
          <div className="card-header pb-0">
            <h1 className="fw-bold fs-4 text-center">
              SONGS
            </h1>
          </div>
          <div className="card-body">
            <h5 className="card-title pb-4">
              Belajar membuat dan memanggil songs api dengan Laravel ( Backend ) & ReactJs ( Frontend )
            </h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Images</th>
                  <th scope="col">Penyanyi</th>
                  <th scope="col">Judul</th>
                </tr>
              </thead>
              <tbody>
                {songs.length > 0 ? (
                  songs.map((song, index) => (
                    <tr key={song.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={`http://localhost:8000/songs-images/${song.image}`}
                          style={{ width: "100px", height: "50px" }}
                          className='rounded' />
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{song.nama}</td>
                      <td style={{ verticalAlign: "middle" }}>{song.judul_lagu}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">Tidak ada lagu yang ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}