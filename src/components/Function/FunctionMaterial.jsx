import { useContext } from "react";
import { Context } from "../pages/home/Home";
import Axios from "axios";

const useFunctionMaterial = () => {
  const { token, setCategory3 } = useContext(Context);

  const fetchCategory3 = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/user/v1/daijai/category_3s/category_3s",
        {
          headers: {
            token: token,
          },
        }
      );
      const Category3 = response.data.data;
      setCategory3(Category3);
    } catch (err) {
      console.log(err);
    }
  };

  return { fetchCategory3 };
};

export default useFunctionMaterial;
