import { useState } from "react";
import Navbar from "../../components/Navbar";

import BookingService from "../../services/BookingService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";

function MyBookings() {

  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);

  const searchBookings = async () => {

    try {

      const response =
        await BookingService.getBookingsByUser(
          userId
        );

      setBookings(response.data);

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );

}

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow mb-4">

          <div className="card-body">

            <h2 className="mb-4">
              My Bookings
            </h2>

            <div className="row">

              <div className="col-md-8">

                <input
                  id="userId"
                  name="userId"
                  type="number"
                  className="form-control"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) =>
                    setUserId(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4">

                <button
                  className="btn btn-success w-100"
                  onClick={searchBookings}
                >
                  Search
                </button>

              </div>

            </div>

          </div>

        </div>

        <h3 className="mb-3">
          Booking List
        </h3>

        {bookings.length === 0 ? (

          <div className="alert alert-info">
            No bookings found
          </div>

        ) : (

          bookings.map((booking) => (

            <div
              key={booking.bookingId}
              className="card shadow-sm mb-3"
            >

              <div className="card-body">

                <h5 className="card-title">
                  Booking #{booking.bookingId}
                </h5>

                <p>
                  <strong>
                    User Name:
                  </strong>{" "}
                  {booking.userName}
                </p>

                <p>
                  <strong>
                    Schedule ID:
                  </strong>{" "}
                  {booking.scheduleId}
                </p>

                <p>
                  <strong>
                    Seats:
                  </strong>{" "}
                  {booking.seatsBooked}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {booking.bookingStatus}
                </p>

                <p>
                  <strong>
                    Booking Date:
                  </strong>{" "}
                  {booking.bookingDate}
                </p>

                <p>
                  <strong>
                    Total Fare:
                  </strong>{" "}
                  ₹{booking.totalFare}
                </p>

              </div>

            </div>

          ))

        )}

      </div>
    </>
  );
}

export default MyBookings;
