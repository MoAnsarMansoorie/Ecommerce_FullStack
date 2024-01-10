import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
        <div className='container mt-3'>
            <h4 className='text-center'>Category - {category?.name}</h4>
            <h6 className='text-center'>{products.length} products found!</h6>
            <div className='d-flex flex-wrap'>
            {products?.map((prod) => (
              
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
                    <button className='btn btn-primary ms-1' onClick={() => navigate(`/product-details/${prod.slug}`)}>More Details</button> 
                    <button className='btn btn-secondary ms-1'>Add To Cart</button> 
                  </div>
                </div>
              
            ))}
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct