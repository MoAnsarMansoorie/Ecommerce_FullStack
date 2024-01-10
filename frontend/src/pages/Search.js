import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../contexts/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className='d-flex flex-wrap mt-4'>
            {values?.results.map((prod) => (
              
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={prod._id}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${prod._id}`}
                    className="card-img-top"
                    alt={prod.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">{prod.description.substring(0,30)}</p>
                    <p className="card-text">$ {prod.price}</p>
                    <button className='btn btn-primary ms-1'>More Details</button> 
                    <button className='btn btn-secondary ms-1'>Add To Cart</button> 
                  </div>
                </div>
              
            ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
