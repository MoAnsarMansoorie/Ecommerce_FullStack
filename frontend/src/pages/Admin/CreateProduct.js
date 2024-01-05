import React from 'react'
import AdminMenu from '../../components/AsideMenu/AdminMenu'
import Layout from '../../components/Layout'

function CreateProduct() {
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          product
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default CreateProduct
