import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { hotels } from "../../data";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  // console.log(location);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [dates2, setDates2] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  var SetHotels = () => {
    try {
      data = [];
      var HotelList = hotels;

      for (let i = 0; i <= hotels.length; i++) {
        if (HotelList[i].city == destination) {
          data.push(HotelList[i]);
          // console.log(HotelList[i].city);
        }
      }
    } catch (Exception) {
      // console.log(Exception);
    }
  };

  var { data, loading, error, reFetch } = useFetch();
  const { dispatch } = useContext(SearchContext);
  const handleClick = () => {
    reFetch();
    try {
      data = [];
      var HotelList = hotels;

      for (let i = 0; i <= hotels.length; i++) {
        if (HotelList[i].city == destination) {
          data.push(HotelList[i]);
          // console.log(HotelList[i].city);
        }
      }
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
    } catch (Exception) {
      // console.log(Exception);
    }
  };

  SetHotels();
  // console.log(data);
  // console.log(location.state);
  localStorage.setItem("state", JSON.stringify(location.state));
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <Navbar />
    //   <Header type="li" />
    //   <div className="listContainer">
    //     <div className="listWrapper">
    //       <div className="listSearch">
    //         <h1 className="lsTitle">Search</h1>
    //         <div className="lsItem">
    //           <label>Destination</label>
    //           <input placeholder={destination} type="text" />
    //         </div>
    //         <div className="lsItem">
    //           <label>Check-in Date</label>
    //           <span onClick={() => setOpenDate(!openDate)}>{`${format(
    //             dates[0].startDate,
    //             "MM/dd/yyyy"
    //           )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
    //           {openDate && (
    //             <DateRange
    //               onChange={(item) => setDates([item.selection])}
    //               minDate={new Date()}
    //               ranges={dates}
    //             />
    //           )}
    //         </div>
    //         <div className="lsItem">
    //           <label>Options</label>
    //           <div className="lsOptions">
    //             <div className="lsOptionItem">
    //               <span className="lsOptionText">
    //                 Min price <small>per night</small>
    //               </span>
    //               <input
    //                 type="number"
    //                 onChange={(e) => setMin(e.target.value)}
    //                 className="lsOptionInput"
    //               />
    //             </div>
    //             <div className="lsOptionItem">
    //               <span className="lsOptionText">
    //                 Max price <small>per night</small>
    //               </span>
    //               <input
    //                 type="number"
    //                 onChange={(e) => setMax(e.target.value)}
    //                 className="lsOptionInput"
    //               />
    //             </div>
    //             <div className="lsOptionItem">
    //               <span className="lsOptionText">Adult</span>
    //               <input
    //                 type="number"
    //                 min={1}
    //                 className="lsOptionInput"
    //                 placeholder={options.adult}
    //               />
    //             </div>
    //             <div className="lsOptionItem">
    //               <span className="lsOptionText">Children</span>
    //               <input
    //                 type="number"
    //                 min={0}
    //                 className="lsOptionInput"
    //                 placeholder={options.children}
    //               />
    //             </div>
    //             <div className="lsOptionItem">
    //               <span className="lsOptionText">Room</span>
    //               <input
    //                 type="number"
    //                 min={1}
    //                 className="lsOptionInput"
    //                 placeholder={options.room}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <button onClick={handleClick}>Search</button>
    //       </div>
    //       <div className="listResult">
    //         {loading ? (
    //           "loading"
    //         ) : (
    //           <>
    //             {data.map((item) => (
    //               <SearchItem item={item} key={item._id} />
    //             ))}
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default List;
