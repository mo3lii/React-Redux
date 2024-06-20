import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../API/ProductApi.js";
export default function Details() {
  const { id } = useParams();

  let [product, setProduct] = useState({});
  useEffect(() => {
    getById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div className="card  p-5 text-center fw-bold fs-2">
      {product ? (
        <div>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
