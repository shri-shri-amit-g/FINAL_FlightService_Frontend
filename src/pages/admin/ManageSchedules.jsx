import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ScheduleService from "../../services/ScheduleService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";

function ManageSchedules() {

  const [schedules, setSchedules] = useState([]);

  const [scheduleId, setScheduleId] = useState(null);

  const [flightId, setFlightId] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [source, setSource] = useState("DELHI");
  const [destination, setDestination] = useState("USA");
  const [price, setPrice] = useState("");
  const [searchTerm, setSearchTerm] =useState("");

  const [isEdit, setIsEdit] = useState(false);

  const locations = [
    "DELHI",
    "MUMBAI",
    "BANGALORE",
    "CHENNAI",
    "DUBAI",
    "QATAR",
    "USA",
    "RUSSIA",
    "CHINA",
    "SINGAPORE",
    "MALDIVES",
    "ANDAMAN_AND_NICOBAR_ISLAND"
  ];

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {

    try {

      const response =
        await ScheduleService.getAllSchedules();

      setSchedules(response.data);

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );

}

  };

  const clearForm = () => {

    setIsEdit(false);

    setScheduleId(null);

    setFlightId("");
    setDepartureDate("");
    setDepartureTime("");
    setArrivalTime("");
    setAvailableSeats("");
    setTotalCapacity("");
    setSource("DELHI");
    setDestination("USA");
    setPrice("");

  };

  const saveSchedule = async () => {

    if (!flightId) {

  toast.error(
    "Flight ID is required"
  );

  return;
}

if (!departureDate) {

  toast.error(
    "Departure Date is required"
  );

  return;
}

if (!departureTime) {

  toast.error(
    "Departure Time is required"
  );

  return;
}

if (!arrivalTime) {

  toast.error(
    "Arrival Time is required"
  );

  return;
}

if (price <= 0) {

  toast.error(
    "Price must be greater than 0"
  );

  return;
}

    try {

      const schedule = {

        flightId: Number(flightId),

        departureDate,

        departureTime,

        arrivalTime,

        availableSeats: Number(
          availableSeats
        ),

        totalCapacity: Number(
          totalCapacity
        ),

        source,

        destination,

        price: Number(price)

      };

      await ScheduleService.addSchedule(
        schedule
      );

      toast.success(
        "Schedule Added Successfully"
      );

      loadSchedules();

      clearForm();

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );

}

  };

  const updateSchedule = async () => {

    try {

      const schedule = {

        scheduleId,

        flightId: Number(flightId),

        departureDate,

        departureTime,

        arrivalTime,

        availableSeats: Number(
          availableSeats
        ),

        totalCapacity: Number(
          totalCapacity
        ),

        source,

        destination,

        price: Number(price)

      };

      await ScheduleService.updateSchedule(
        scheduleId,
        schedule
      );

      toast.success(
        "Schedule Updated Successfully"
      );

      loadSchedules();

      clearForm();

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );

}

  };

  const deleteSchedule = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete Schedule?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await ScheduleService.deleteSchedule(
        id
      );

      toast.success(
        "Schedule Deleted Successfully"
      );

      loadSchedules();

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );

}

  };

  
  const filteredSchedules =
  schedules.filter((schedule) =>
    schedule.flightId
      .toString()
      .includes(searchTerm)
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Manage Schedules
        </h2>

        <div className="card shadow mb-4">

          <div className="card-body">

            <h4 className="mb-3">

              {isEdit
                ? "Update Schedule"
                : "Add Schedule"}

            </h4>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Flight ID"
              value={flightId}
              onChange={(e) =>
                setFlightId(
                  e.target.value
                )
              }
            />

            <input
              type="date"
              className="form-control mb-3"
              value={departureDate}
              onChange={(e) =>
                setDepartureDate(
                  e.target.value
                )
              }
            />

            <input
              type="time"
              className="form-control mb-3"
              value={departureTime}
              onChange={(e) =>
                setDepartureTime(
                  e.target.value
                )
              }
            />

            <input
              type="time"
              className="form-control mb-3"
              value={arrivalTime}
              onChange={(e) =>
                setArrivalTime(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Total Seats"
              value={availableSeats}
              onChange={(e) =>
                setAvailableSeats(
                  e.target.value
                )
              }
            />

           


            

            <input
              type="number"
              step="0.01"
              className="form-control mb-3"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
            />

            {isEdit ? (
              <>
                <button
                  className="btn btn-warning"
                  onClick={updateSchedule}
                >
                  Update Schedule
                </button>

                <button
                  className="btn btn-secondary ms-2"
                  onClick={clearForm}
                >
                  Cancel
       
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={saveSchedule}
              >
                Add Schedule
              </button>
            )}

          </div>

        </div>

<input
  type="text"
  className="form-control mb-3"
  placeholder="Search by Flight ID"
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>
        <h4 className="mb-3">
          All Schedules
        </h4>

        {filteredSchedules.map((schedule) => (
          <div
            key={schedule.scheduleId}
            className="card shadow-sm mb-3"
          >

            <div className="card-body">

              <h5 className="card-title">
                Schedule #{schedule.scheduleId}
              </h5>

              <p>
                <strong>Flight ID:</strong>{" "}
                {schedule.flightId}
              </p>

              <p>
                <strong>Source:</strong>{" "}
                {schedule.source}
              </p>

              <p>
                <strong>Destination:</strong>{" "}
                {schedule.destination}
              </p>

              <p>
                <strong>Departure Date:</strong>{" "}
                {schedule.departureDate}
              </p>

              <p>
                <strong>Departure Time:</strong>{" "}
                {schedule.departureTime}
              </p>

              <p>
                <strong>Arrival Time:</strong>{" "}
                {schedule.arrivalTime}
              </p>

              <p>
                <strong>Available Seats:</strong>{" "}
                {schedule.availableSeats}
              </p>

              <p>
                <strong>Total Capacity:</strong>{" "}
                {schedule.totalCapacity}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₹{schedule.price}
              </p>

              <button
                className="btn btn-warning me-2"
                onClick={() => {

                  setIsEdit(true);

                  setScheduleId(
                    schedule.scheduleId
                  );

                  setFlightId(
                    schedule.flightId
                  );

                  setDepartureDate(
                    schedule.departureDate
                  );

                  setDepartureTime(
                    schedule.departureTime
                  );

                  setArrivalTime(
                    schedule.arrivalTime
                  );

                  setAvailableSeats(
                    schedule.availableSeats
                  );

                  setTotalCapacity(
                    schedule.totalCapacity
                  );

                  setSource(
                    schedule.source
                  );

                  setDestination(
                    schedule.destination
                  );

                  setPrice(
                    schedule.price
                  );

                }}
              >
                Update
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteSchedule(
                    schedule.scheduleId
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export default ManageSchedules;