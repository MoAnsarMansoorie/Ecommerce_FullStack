import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Checkbox, Radio} from "antd"
import { Prices } from '../components/Prices'
import { json, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/cart'

function HomePage() {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotalCount()
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      if (data?.success) {
        setProducts(data.products);
      }
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Something went wrong while getting products")
    }
  }

  // getToatoal count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
      
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
  }

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts()
  }, [checked.length, radio.length])

  useEffect(() => {
    if(checked.length || radio.length) filterProducts()
  }, [checked, radio])

  // filtered products
  const filterProducts = async () => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {checked, radio})
      if(data?.success) {
        toast.success("Product filtered!")
        setProducts(data?.products)
      } 
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong while filtering products")
    }
  }

  return (
    <Layout >
        <div className='row mt-4'>
          <div className='col-md-3'>
            <h4 className='text-center'>Filter by category</h4>
            <div className='d-flex flex-column ms-3'>
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ms-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-3">
            <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>
          </div>
          <div className='col-md-9'>
            {/* {JSON.stringify(radio, null, 4)} */}
            <h1 className='text-center'>All Products</h1>
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
                    <button 
                    className='btn btn-secondary ms-1' 
                    onClick={() => {
                      setCart([...cart,prod])
                      localStorage.setItem("cart", JSON.stringify([...cart,prod]))
                      toast.success("Item added to cart")
                    }}
                    >Add To Cart</button> 
                  </div>
                </div>
              
            ))}
            </div>
            <div className='m-2 p-3'>
              {products && products.length < total && (
                <button className='btn btn-warning' onClick={(e) => setPage(page + 1)}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage

