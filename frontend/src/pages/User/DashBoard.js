import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/AsideMenu/UserMenu'
import { useAuth } from '../../contexts/auth'

function DashBoard() {
  const [auth] = useAuth()
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3 '>
                <h1>User Name: {auth?.user?.name} </h1>
                <h1>User Add: {auth?.user?.address} </h1>
                <h1>User Phone: {auth?.user?.phone} </h1>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default DashBoard
