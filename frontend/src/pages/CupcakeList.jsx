import Cupcake from "../components/Cupcake";
import { useEffect, useState } from 'react';

/* ************************************************************************* */
const someCupcakes = [];
someCupcakes.push(
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  }
);

/* you can use someCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const getAPIRequestCupCake = "http://localhost:3310/cupcakes";
  const getAPIRequestAccessories = "http://localhost:3310/accessories";

  const [allCupCake, setAllCupCake] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const GetAPI = async (request) => {
    try {
      const response = await fetch(request);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};
    }
  };
  useEffect(() => {
    const fetchDataCupCake = async () => {
      const cupcakesData = await GetAPI(getAPIRequestCupCake);
      setAllCupCake(cupcakesData);
    };
    fetchDataCupCake();
  }, []);
  // Step 3: get all accessories
  useEffect(() => {
    const fetcheDataAccessories = async () => {
      const accessoriesData = await GetAPI(getAPIRequestAccessories);
      setAccessories(accessoriesData);
    }
    fetcheDataAccessories();
  }, []);
  console.info(accessories);
  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select">
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */
          allCupCake.map((element, index) => (
            <li className="cupcake-item" key={element + index}>
              <Cupcake data={element} />
          </li>
          ))
        }
        {/* Step 5: filter cupcakes before repeating */}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
