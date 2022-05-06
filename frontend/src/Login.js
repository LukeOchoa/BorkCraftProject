import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"



const Login = () => {
  const [ username, setUsername ] = useState('username')
  const [ password, setPassword ] = useState('password')
  
  let navigate = useNavigate()

  const GetRequest = (e, postRequest) => {
    fetch(
      "http://localhost:8080/login", {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      }
    ).then((response) => {
      if (response.status === 303) {
        alert("You are already logged in mygy! All I see are flames muh dude, keep up the drip!")
      } else {
        postRequest()
      }
    })
  }

  const PostRequest = async () => {
      const form_data = { "username": username, "password": password }
      fetch(
        "http://localhost:8080/login",
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form_data)
        }
      ).then((response) => {
        if (response.status === 200 || response.status === 303) {
          navigate("/")
        } else {
          console.log(response.status, "RESPONSE code!")
        }

      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    GetRequest(e, PostRequest)
  }

    return (
      <div className="submitty">
        <h2>Breaker</h2>
        <form onSubmit={handleSubmit}>
          <label>Login</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button>Submit</button>
        </form>
      </div>
    )
}

export default Login


