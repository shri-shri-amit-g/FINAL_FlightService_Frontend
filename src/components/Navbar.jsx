import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();

const logout = () => {

  localStorage.removeItem(
    "adminLoggedIn"
  );

  navigate("/");
};

const isLoggedIn =
  localStorage.getItem(
    "adminLoggedIn"
  ) === "true";

  {
  isLoggedIn && (
    <>
      <Link
        className="nav-link"
        to="/admin/flights"
      >
        Flights
      </Link>

      <Link
        className="nav-link"
        to="/admin/schedules"
      >
        Schedules
      </Link>

      <Link
        className="nav-link"
        to="/admin/seats"
      >
        Seats
      </Link>
    </>
  )
}

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container-fluid">

        <Link
          className="navbar-brand"
          to="/"
        >
          Flight Booking
        </Link>

        <div className="navbar-nav">

          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/register">
            Register
          </Link>

          <Link className="nav-link" to="/flights">
            Flights
          </Link>

          <Link className="nav-link" to="/search">
            Search Flights
          </Link>

          <Link className="nav-link" to="/book">
            Book Flight
          </Link>

          <Link className="nav-link" to="/mybookings">
            My Bookings
          </Link>

          <Link className="nav-link" to="/booking">
            Booking Details
          </Link>

          {/* <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link> */}

          <Link className="nav-link" to="/admin/flights">
            Manage Flights
          </Link>
          
           <Link
  className="nav-link"
  to="/admin/schedules"
>
  Manage Schedules
</Link>



<Link
  className="nav-link"
  to="/admin/seats"
>
  Manage Seats
</Link>

        </div>

<button
  className="btn btn-danger ms-2"
  onClick={logout}
>
  Logout
</button>
      </div>

    </nav>

  );
}

export default Navbar;