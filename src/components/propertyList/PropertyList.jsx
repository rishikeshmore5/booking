import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import { hotels } from "../../data";

const PropertyList = () => {
  var data2 = [
    // { type: "hotels", count: 0 },
    // { type: "apartments", count: 0 },
    // { type: "resorts", count: 0 },
    // { type: "villas", count: 0 },
    // { type: "cabins", count: 0 },
  ];

  var setPropertyList = () => {
    try {
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      var count4 = 0;
      var count5 = 0;
      for (let i = 0; i <= hotels.length; i++) {
        if (hotels[i].type == "hotel") {
          count1++;
          // console.log(hotels[i].name);
          data2[0] = { type: "hotels", count: count1 };
          // console.log(data2);
        } else if (hotels[i].type == "apartment") {
          count2++;
          // console.log(hotels[i].name);
          data2[1] = { type: "apartments", count: count2 };
          // console.log(data2);
        } else if (hotels[i].type == "resort") {
          count3++;
          data2[2] = { type: "resorts", count: count3 };
        } else if (hotels[i].type == "villa") {
          count4++;
          data2[3] = { type: "villas", count: count4 };
        } else if (hotels[i].type == "cabin") {
          count5++;
          data2[4] = { type: "cabins", count: count5 };
        }
      }
    } catch (Exception) {
      // console.log(Exception);
    }
  };

  const { data, loading, error } = useFetch();

  // console.log(data2);
  const images = [
    "https://www.larisarealtech.com/wp-content/uploads/2023/05/night-in-las-vegas-bellagio-luxury-hotel-casino-hd-wallpapers-for-mobile-phones-laptops-and-pc-1920%C3%971080-wallpaper-preview.jpg",
    "https://images.pexels.com/photos/129494/pexels-photo-129494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?cs=srgb&dl=pexels-pixabay-261169.jpg&fm=jpg",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlsbGF8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://milestomemories.com/wp-content/uploads/2019/01/First-Cabin-First-Class.jpg",
  ];
  setPropertyList();
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data2.length &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data2[i]?.type}</h1>

                  <h2>
                    {data2[i]?.count} {data2[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>

    // <div className="pList">
    //   {loading ? (
    //     "loading"
    //   ) : (
    //     <>
    //       {data &&
    //         images.map((img,i) => (
    //           <div className="pListItem" key={i}>
    //             <img
    //               src={img}
    //               alt=""
    //               className="pListImg"
    //             />
    //             <div className="pListTitles">
    //               <h1>{data[i]?.type}</h1>
    //               <h2>{data[i]?.count} {data[i]?.type}</h2>
    //             </div>
    //           </div>
    //         ))}
    //     </>
    //   )}
    // </div>
  );
};

export default PropertyList;
