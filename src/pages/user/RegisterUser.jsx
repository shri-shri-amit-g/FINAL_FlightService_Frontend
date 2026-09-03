import { useState } from "react";
import Navbar from "../../components/Navbar";
import UserService from "../../services/UserService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";

function RegisterUser() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [houseNo, setHouseNo] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const saveUser = async () => {

    try {

      const user = {

        userName,

        email,

        phoneNumber,

        permanentAddress: {

          houseNo,

          state,

          country,

          pinCode

        }

      };

      await UserService.addUser(user);

      toast.success(
        "User Registered Successfully"
      );

      setUserName("");
      setEmail("");
      setPhoneNumber("");
      setHouseNo("");
      setState("");
      setCountry("");
      setPinCode("");

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
                    id="userName"
                    name="userName"
                    type="text"
                    className="form-control"
                    placeholder="Enter User Name"
                    value={userName}
                    onChange={(e) =>
                      setUserName(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value
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
                    id="houseNo"
                    name="houseNo"
                    type="number"
                    className="form-control"
                    placeholder="Enter House Number"
                    value={houseNo}
                    onChange={(e) =>
                      setHouseNo(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) =>
                      setState(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    className="form-control"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) =>
                      setCountry(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Pin Code
                  </label>

                  <input
                    id="pinCode"
                    name="pinCode"
                    type="number"
                    className="form-control"
                    placeholder="Enter Pin Code"
                    value={pinCode}
                    onChange={(e) =>
                      setPinCode(
                        e.target.value
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