import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { addProduct, editProduct, getById } from "../API/ProductApi";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addProductAction, updateProductAction } from "../store/ProductSlice";

export default function ProductForm() {
  let [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id != 0) {
      getById(id).then((response) => {
        setFormData(response.data);
      });
    }
  }, []);
  function inputHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function formSubmitHandler(e) {
    console.log(formData);
    e.preventDefault();
    if (id == 0) {
      // addProduct(formData).then(() => navigate("/products"));
      dispatch(addProductAction(formData)).then(() => navigate("/products"));
    } else {
      dispatch(updateProductAction({ id, product: formData })).then(() =>
        navigate("/products")
      );
    }
  }
  return (
    <div className="d-flex justify-content-center ">
      <Form
        onSubmit={formSubmitHandler}
        className="w-50 border border-2 border-grey p-5 rounded"
      >
        <h1 className="my-3 text-center">Product Management</h1>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            onChange={inputHandler}
            type="text"
            placeholder="Enter Product Name"
            value={formData.name}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Price </Form.Label>
          <Form.Control
            onChange={inputHandler}
            type="number"
            placeholder="Enter Product Price"
            value={formData.price}
            name="price"
          />
        </Form.Group>
        <Button className="btn btn-dark" type="submit">
          {id === "0" ? "Add product" : "Update product"}
        </Button>
      </Form>
    </div>
  );
}
