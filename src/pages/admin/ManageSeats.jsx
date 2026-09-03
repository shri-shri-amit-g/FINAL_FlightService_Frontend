import { useState } from "react";
import Navbar from "../../components/Navbar";
import SeatService from "../../services/SeatService";
import { toast } from "react-toastify";

function ManageSeats() {

  const [scheduleId, setScheduleId] =
    useState("");

  const [count, setCount] =
    useState("");

  const [availableSeats,
    setAvailableSeats] =
    useState(null);

  const checkSeats = async () => {

    if (!scheduleId) {

      toast.error(
        "Schedule ID is required"
      );

      return;

    }

    try {

      const response =
        await SeatService.checkSeats(
          scheduleId
        );

      setAvailableSeats(
        response.data
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const addSeats = async () => {

    if (!scheduleId) {

      toast.error(
        "Schedule ID is required"
      );

      return;

    }

    if (count <= 0) {

      toast.error(
        "Seat count must be greater than 0"
      );

      return;

    }

    try {

      await SeatService.addSeats(
        scheduleId,
        count
      );

      toast.success(
        "Seats Added Successfully"
      );

      checkSeats();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const reduceSeats = async () => {

    if (!scheduleId) {

      toast.error(
        "Schedule ID is required"
      );

      return;

    }

    if (count <= 0) {

      toast.error(
        "Seat count must be greater than 0"
      );

      return;

    }

    try {

      await SeatService.reduceSeats(
        scheduleId,
        count
      );

      toast.success(
        "Seats Reduced Successfully"
      );

      checkSeats();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-body">

            <h2 className="mb-4">
              Manage Seats
            </h2>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Schedule ID"
              value={scheduleId}
              onChange={(e) =>
                setScheduleId(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-primary mb-3"
              onClick={checkSeats}
            >
              Check Seats
            </button>

            {availableSeats !== null && (

              <div className="alert alert-info">

                Available Seats:{" "}

                <strong>
                  {availableSeats}
                </strong>

              </div>

            )}

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Seat Count"
              value={count}
              onChange={(e) =>
                setCount(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-success me-2"
              onClick={addSeats}
            >
              Add Seats
            </button>

            <button
              className="btn btn-danger"
              onClick={reduceSeats}
            >
              Reduce Seats
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default ManageSeats;