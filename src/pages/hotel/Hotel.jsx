import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { hotels } from "../../data";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  var data2;
  var dates2 = [];

  var setState = () => {
    try {
      const STATE = JSON.parse(localStorage.getItem("state"));
      // console.log(STATE);
      dates2 = STATE.dates;
      // console.log(dates2);
    } catch (Exception) {}
  };

  var setHotel = () => {
    var HotelList = hotels;

    try {
      for (let i = 0; i <= hotels.length; i++) {
        if (HotelList[i]._id == id) {
          data2 = HotelList[i];
        }
      }
    } catch (Exception) {
      // console.log(Exception);
    }
  };

  const { data, loading, error } = useFetch();

  setHotel();
  setState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    // console.log(diffDays);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  console.log(days);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    // if (user) {
    setOpenModal(true);
    // } else {
    //   navigate("/login");
    // }
  };

  // const photos = [
  //   {
  //     src: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7214845498108/QS1042/QS1042-Q1/1577621888634.jpeg",
  //   },
  //   {
  //     src: "https://www.nevistas.com/ul/4/2015/02/02/09.jpg",
  //   },
  //   {
  //     src: "https://htl-img-res-new.s3.ap-south-1.amazonaws.com/2920/20221022/1.jpg",
  //   },
  //   {
  //     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9o22Dn608ISpTxHq1m1HGhqToQLdjngnW2Q&usqp=CAU",
  //   },
  //   {
  //     src: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2015/05/07/1206/Hyatt-Place-Pune-Hinjewadi-P010-Exterior-by-Morning-Landscape.jpg/Hyatt-Place-Pune-Hinjewadi-P010-Exterior-by-Morning-Landscape.16x9.jpg",
  //   },
  //   {
  //     src: "https://www.bookpunehotel.com/data/Photos/OriginalPhoto/12480/1248084/1248084010/pune-ibis-hinjewadi-photo-3.JPEG",
  //   },
  // ];
  // console.log(data2);
  // console.log(location.state);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data2.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data2.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />

              <span>{data2.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data2.distance}m from Airport
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data2.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data2.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data2.title}</h1>
                <p className="hotelDesc">{data2.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of {data2.city}, this property has
                  an excellent location score of {data2.rating}!
                </span>
                <h2>
                  <b>${days * data2.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
    // <div>
    //   <Navbar />
    //   <Header type="list" />
    //   {loading ? (
    //     "loading"
    //   ) : (
    //     <div className="hotelContainer">
    //       {open && (
    //         <div className="slider">
    //           <FontAwesomeIcon
    //             icon={faCircleXmark}
    //             className="close"
    //             onClick={() => setOpen(false)}
    //           />
    //           <FontAwesomeIcon
    //             icon={faCircleArrowLeft}
    //             className="arrow"
    //             onClick={() => handleMove("l")}
    //           />
    //           <div className="sliderWrapper">
    //             <img
    //               src={data.photos[slideNumber]}
    //               alt=""
    //               className="sliderImg"
    //             />
    //           </div>
    //           <FontAwesomeIcon
    //             icon={faCircleArrowRight}
    //             className="arrow"
    //             onClick={() => handleMove("r")}
    //           />
    //         </div>
    //       )}
    //       <div className="hotelWrapper">
    //         <button className="bookNow">Reserve or Book Now!</button>
    //         <h1 className="hotelTitle">{data.name}</h1>
    //         <div className="hotelAddress">
    //           <FontAwesomeIcon icon={faLocationDot} />
    //           <span>{data.address}</span>
    //         </div>
    //         <span className="hotelDistance">
    //           Excellent location – {data.distance}m from center
    //         </span>
    //         <span className="hotelPriceHighlight">
    //           Book a stay over ${data.cheapestPrice} at this property and get a
    //           free airport taxi
    //         </span>
    //         <div className="hotelImages">
    //           {data.photos?.map((photo, i) => (
    //             <div className="hotelImgWrapper" key={i}>
    //               <img
    //                 onClick={() => handleOpen(i)}
    //                 src={photo}
    //                 alt=""
    //                 className="hotelImg"
    //               />
    //             </div>
    //           ))}
    //         </div>
    //         <div className="hotelDetails">
    //           <div className="hotelDetailsTexts">
    //             <h1 className="hotelTitle">{data.title}</h1>
    //             <p className="hotelDesc">{data.desc}</p>
    //           </div>
    //           <div className="hotelDetailsPrice">
    //             <h1>Perfect for a {days}-night stay!</h1>
    //             <span>
    //               Located in the real heart of Krakow, this property has an
    //               excellent location score of 9.8!
    //             </span>
    //             <h2>
    //               <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
    //               nights)
    //             </h2>
    //             <button onClick={handleClick}>Reserve or Book Now!</button>
    //           </div>
    //         </div>
    //       </div>
    //       <MailList />
    //       <Footer />
    //     </div>
    //   )}
    //   {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    // </div>
  );
};

export default Hotel;
