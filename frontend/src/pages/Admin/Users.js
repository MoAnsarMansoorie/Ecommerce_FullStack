import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AsideMenu/AdminMenu'

function Users() {
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          Users
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Users
