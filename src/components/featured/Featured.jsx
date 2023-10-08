import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { hotels } from "../../data";

var data2;
var SetFeatured = () => {
  data2 = [];
  try {
    var count1 = 0,
      count2 = 0,
      count3 = 0;
    var HotelList = hotels;
    // console.log(HotelList);
    for (let i = 0; i <= hotels.length; i++) {
      if (HotelList[i].city == "Pune") {
        count1++;
        data2[0] = count1;
      }
      if (HotelList[i].city == "Mumbai") {
        count2++;
        data2[1] = count2;
      }
      if (HotelList[i].city == "Delhi") {
        count3++;
        data2[2] = count3;
      }
    }
  } catch (Exception) {
    // console.log(Exception);
  }
};

const Featured = () => {
  const { data, loading, error } = useFetch();
  // "/hotels/countByCity?cities=Pune,Mumbai,Delhi"

  // console.log(data2);

  SetFeatured();
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.trawell.in/admin/images/upload/336491271Pune_Shaniwar_Wada.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Pune</h1>
              <h2>{data2[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11bWJhaXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data2[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/id/530741074/photo/red-fort-lal-qila-with-indian-flag-delhi-india.webp?b=1&s=170667a&w=0&k=20&c=2IKt4OKvLfVyFStjaRbTT_ng_l3PdeXbbz-FIVOec6w="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data2[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
    // <div className="featured">
    //   {loading ? (
    //     "Loading please wait"
    //   ) : (
    //     <>
    //       <div className="featuredItem">
    //         <img
    //           src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
    //           alt=""
    //           className="featuredImg"
    //         />
    //         <div className="featuredTitles">
    //           <h1>Berlin</h1>
    //           <h2>{data[0]} properties</h2>
    //         </div>
    //       </div>

    //       <div className="featuredItem">
    //         <img
    //           src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
    //           alt=""
    //           className="featuredImg"
    //         />
    //         <div className="featuredTitles">
    //           <h1>Madrid</h1>
    //           <h2>{data[1]} properties</h2>
    //         </div>
    //       </div>
    //       <div className="featuredItem">
    //         <img
    //           src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    //           alt=""
    //           className="featuredImg"
    //         />
    //         <div className="featuredTitles">
    //           <h1>London</h1>
    //           <h2>{data[2]} properties</h2>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </div>
  );
};

export default Featured;
