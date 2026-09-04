import { useState } from "react";
import Navbar from "../../components/Navbar";
import UserService from "../../services/UserService";
import { toast } from "react-toastify";

function RegisterUser() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [houseNo, setHouseNo] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const validateForm = () => {
    if (!userName.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (userName.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneNumber) {
      toast.error("Phone Number is required");
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone Number must contain exactly 10 digits");
      return false;
    }

    if (!houseNo) {
      toast.error("House Number is required");
      return false;
    }

    if (Number(houseNo) <= 0) {
      toast.error("House Number must be greater than 0");
      return false;
    }

    if (!state.trim()) {
      toast.error("State is required");
      return false;
    }

    if (state.trim().length < 2) {
      toast.error("State name is too short");
      return false;
    }

    if (!country.trim()) {
      toast.error("Country is required");
      return false;
    }

    if (country.trim().length < 2) {
      toast.error("Country name is too short");
      return false;
    }

    const pinRegex = /^[0-9]{6}$/;

    if (!pinCode) {
      toast.error("Pin Code is required");
      return false;
    }

    if (!pinRegex.test(pinCode)) {
      toast.error("Pin Code must be exactly 6 digits");
      return false;
    }

    return true;
  };

  const saveUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const user = {
        userName,
        email,
        phoneNumber,
        permanentAddress: {
          houseNo: Number(houseNo),
          state,
          country,
          pinCode,
        },
      };

      await UserService.addUser(user);

      toast.success("User Registered Successfully");

      setUserName("");
      setEmail("");
      setPhoneNumber("");
      setHouseNo("");
      setState("");
      setCountry("");
      setPinCode("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while registering user"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">

                <h2 className="text-center mb-4">
                  Register User
                </h2>

                <div className="mb-3">
                  <label className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter User Name"
                    value={userName}
                    onChange={(e) =>
                      setUserName(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                  />
                </div>

                <hr />

                <h4 className="mb-3">
                  Permanent Address
                </h4>

                <div className="mb-3">
                  <label className="form-label">
                    House Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter House Number"
                    value={houseNo}
                    onChange={(e) =>
                      setHouseNo(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) =>
                      setState(e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) =>
                      setCountry(e.target.value)
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pin Code"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) =>
                      setPinCode(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={saveUser}
                >
                  Register User
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;