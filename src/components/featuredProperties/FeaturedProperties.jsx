import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { hotels } from "../../data";

var data2;

var setFeaturedProperties = () => {
  data2 = [];
  var HotelList = hotels;
  try {
    for (let i = 0; i <= HotelList.length; i++) {
      if (HotelList[i].featured == true) {
        data2.push(HotelList[i]);
      }
    }
  } catch (Exception) {}
};

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch();

  // console.log(data2);
  setFeaturedProperties();
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data2.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {/* <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/469186139.jpg?k=f3ccf392bb0a6bddba3f21cb2b3a9209187df87a97475a725330a8cefa9258b9&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">The Westin Koregaon Park</span>
        <span className="fpCity">Pune</span>
        <span className="fpPrice">Starting from $100</span>
        <div className="fpRating">
          <button>9.0</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mumbai_Aug_2018_%2843397784544%29.jpg/1200px-Mumbai_Aug_2018_%2843397784544%29.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Taj Mahal Palace Hotel</span>
        <span className="fpCity">Mumbai</span>
        <span className="fpPrice">Starting from $500</span>
        <div className="fpRating">
          <button>9.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://imkarchitects.com/images/projects/business-hotel/taj-palace-hotel/2.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Taj Palace Hotel</span>
        <span className="fpCity">Delhi</span>
        <span className="fpPrice">Starting from $700</span>
        <div className="fpRating">
          <button>9.5</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://www.tajhotels.com/content/dam/luxury/rambagh-palace/16x7/Welcome-4-crop.JPG/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Rambagh Palace</span>
        <span className="fpCity">Jaipur</span>
        <span className="fpPrice">Starting from $900</span>
        <div className="fpRating">
          <button>9.9</button>
          <span>Excellent</span>
        </div>
      </div> */}
    </div>
    // <div className="fp">
    //   {loading ? (
    //     "Loading"
    //   ) : (
    //     <>
    //       {data.map((item) => (
    //         <div className="fpItem" key={item._id}>
    //           <img
    //             src={item.photos[0]}
    //             alt=""
    //             className="fpImg"
    //           />
    //           <span className="fpName">{item.name}</span>
    //           <span className="fpCity">{item.city}</span>
    //           <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
    //           {item.rating && <div className="fpRating">
    //             <button>{item.rating}</button>
    //             <span>Excellent</span>
    //           </div>}
    //         </div>
    //       ))}
    //     </>
    //   )}
    // </div>
  );
};

export default FeaturedProperties;
