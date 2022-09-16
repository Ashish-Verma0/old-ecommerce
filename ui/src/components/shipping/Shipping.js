import React, { useContext, useState } from "react";
import { Country, State } from "country-state-city";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import "../shipping/Shipping.css"
import { Store } from "../../useContext_Hook/Data";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  // const [address, setAddress] = useState();
  // const [city, setCity] = useState();
  // const [state, setState] = useState();
  // const [country, setCountry] = useState();
  // const [pinCode, setPinCode] = useState();
  // const [phoneNo, setPhoneNo] = useState();
 const {setShippingDetails}=useContext(Store)
  const[shippingInfo,setShippingInfo]=useState({
    address:"",
    city:"",
    state:"",
    country:"",
    pinCode:"",
    phoneNo:""
  })
  const navigate = useNavigate()

  const handleChange=(e)=>{
const{name,value}=e.target
setShippingInfo({...shippingInfo,[name]:value})
  }

  const shippingSubmit = (e) => {
    e.preventDefault()
    if(shippingInfo.phoneNo.length<10 || shippingInfo.phoneNo.length>10){
      alert("Phonne No should be 10 digit")
      return;
    }
    setShippingDetails(shippingInfo)
    navigate("/process/payment")
  };
  return (
    <>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shiping Details</h2>

          <form onSubmit={shippingSubmit} className="shippingForm">
            <div>
              <HomeIcon />
              <input
                type="text"
                placeHolder="Address"
                required
                name="address"
                value={shippingInfo.address}
                // onChange={(e) => setAddress(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeHolder="City"
                required
                name="city"
                value={shippingInfo.city}
                // onChange={(e) => setCity(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeHolder="Pin Code"
                required
                name="pinCode"
                value={shippingInfo.pinCode}
                // onChange={(e) => setPinCode(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="phone"
                placeHolder="Phone Number"
                required
                name="phoneNo"
                value={shippingInfo.phoneNo}
                // onChange={(e) => setPhoneNo(e.target.value)}
                onChange={handleChange}
              />
            </div>

            <div>
              <PublicIcon />
              <select
                required
                value={shippingInfo.country}
                name="country"
                // onChange={(e) => setCountry(e.target.value)}
                onChange={handleChange}
              >
                <option value=""> Country </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                ))}
              </select>
            </div>

            {shippingInfo.country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={shippingInfo.state}
                  name="state"
                  // onChange={(e) => setState(e.target.value)}
                  onChange={handleChange}
                >
                  <option value=""> State </option>

                  {State &&
                    State.getStatesOfCountry(shippingInfo.country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="Submit"
              value="continue"
              className="shippingBtn"
              disabled={shippingInfo.state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
