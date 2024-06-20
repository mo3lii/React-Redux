import { Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAction,
  getAllProductsAction,
} from "../store/ProductSlice";
export default function Products() {
  // const [products, setproducts] = useState([]);
  const { products, isLoading } = useSelector((state) => state.ProductSlice);
  console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, []);
  function deleteHandler(id) {
    dispatch(deleteProductAction(id));
  }
  return (
    <>
      {isLoading ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          <h1 className="my-2 text-center">Our Products</h1>

          <Link
            to={"/products/0/edit"}
            className="nav-link w-100 d-flex justify-content-center"
          >
            <i className=" my-2 fs-2 bi bi-plus-circle-fill"></i>
          </Link>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price} </td>
                    <td>
                      <Link to={`/products/${product.id}`}>
                        <i className="bi me-1 text-warning bi-eye-fill"></i>
                      </Link>
                      <Link to={`/products/${product.id}/edit`}>
                        <i className="bi me-1 text-info bi-pencil-square"></i>
                      </Link>

                      <i
                        onClick={() => deleteHandler(product.id)}
                        className="bi me-1 text-danger bi-trash3-fill"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
