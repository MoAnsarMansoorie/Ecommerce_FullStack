import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner({path = "login"}) {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        },1000)

        count===0 && navigate( `/${path}`, {
            state: location.pathname
        })

        return () => clearInterval(interval)
    }, [count, navigate, location, path])
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:"100vh"}}>
      <h1>redirecting to you login page in {count} seconds...</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
