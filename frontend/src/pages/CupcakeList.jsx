import Cupcake from "../components/Cupcake";
import { useEffect, useState } from "react";

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
  const [mesh, setMesh] = useState(0);
  const [meshCupCake, setMeshCupCake] = useState([]);
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
    const fetcheDataAccessories = async () => {
      const accessoriesData = await GetAPI(getAPIRequestAccessories);
      setAccessories(accessoriesData);
    };
    fetcheDataAccessories();
    if (mesh != 0) {
      setMeshCupCake(
        allCupCake.filter((element) => element.accessory_id === mesh)
      );
    } else {
      setMeshCupCake(allCupCake);
    }
  }, [mesh]);
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select" onChange={(e) => setMesh(e.target.value)}>
            <option value="0">---</option>
            {
              /* Step 4: add an option for each accessory */
              accessories.map((element) => (
                <option value={element.id} key={element.id}>
                  {element.name}
                </option>
              ))
            }
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {mesh === 0 /* Step 2: repeat this block for each cupcake */
          ? allCupCake.map((element) => (
              <li className="cupcake-item" key={element.id}>
                <Cupcake data={element} />
              </li>
            ))
          : /* Step 5: filter cupcakes before repeating */
            meshCupCake.map((element) => (
              <li className="cupcake-item" key={element.id}>
                <Cupcake data={element} />
              </li>
            ))}
      </ul>
    </>
  );
}

export default CupcakeList;
