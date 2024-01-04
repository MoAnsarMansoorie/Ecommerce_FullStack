import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/auth'

function HomePage() {
  const [auth, setAuth] = useAuth()
  console.log('====================================');
  console.log(auth);
  console.log('====================================');
  return (
    <Layout >
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage
