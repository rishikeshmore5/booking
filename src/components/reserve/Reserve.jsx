import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { hotels } from "../../data";
import { rooms } from "../../data";
var HotelId;
var data2 = [];
var HotelList = hotels;
var RoomList = rooms;
var TempRooms;

var setRooms2 = () => {
  // console.log(RoomList);
  data2 = [];
  try {
    for (let i = 0; i <= RoomList.length; i++) {
      // console.log(RoomList[i].title);
      if (TempRooms.includes(RoomList[i]._id)) {
        if (data2.includes(RoomList[i])) {
        } else {
          data2.push(RoomList[i]);
        }
      }
    }
  } catch (Exception) {}
};

var setRooms = () => {
  try {
    for (let i = 0; i <= HotelList.length; i++) {
      if (HotelList[i]._id == HotelId) {
        // console.log(HotelList[i].rooms);
        TempRooms = HotelList[i].rooms;
        setRooms2();
        // console.log(TempRooms);
        // for (let i = 0; i <= RoomList.length; i++) {
        //   if (TempRooms.includes(RoomList[i]._id)) {
        //     console.log(RoomList[i].title);
        //     if (data2.includes(RoomList[i])) {
        //     } else {
        //       data2.push(RoomList[i]);
        //     }
        //   }
        // }
      }
    }
  } catch (Exception) {
    // console.log(Exception);
  }
};

const Reserve = ({ setOpen, hotelId }) => {
  HotelId = hotelId;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch();
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // await Promise.all(
      //   selectedRooms.map((roomId) => {
      //     const res = axios.put(`/rooms/availability/${roomId}`, {
      //       dates: alldates,
      //     });
      //     return res.data;
      //   })
      // );
      setOpen(false);
      navigate("/booking");
    } catch (err) {}
  };

  // console.log(data);
  // console.log(data2);
  setRooms();
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data2.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">$ {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
