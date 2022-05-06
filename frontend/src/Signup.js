import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [ username,  setUsername   ] = useState('username')
    const [ password,  setPassword   ] = useState('password')
    const [ firstname, setFirstname  ] = useState('firstname')
    const [ lastname,  setLastname   ] = useState('lastname')
    const [ role,      setRole       ] = useState('role')   
  
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()
      const form_data = { 
        "username" :  username,
        "password" :  password,
        "firstname":  firstname,
        "lastname" :  lastname,
        "role"     :  role,
      }
  
      fetch(
        "http://localhost:8080/signup",
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form_data),
        }
      ).then((response) => {
          switch (response.status) {
            case 303:
              alert('Your signup is successful... !')
              navigate('/')
              break;
            case 403:
              alert('This Username or Password is already taken...!')
              break;
            default:
              alert('Something went wrong? response status:', response.status)
          }
        })
    }
  
    return (
      <div className="SignyUpy">
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit}>
          <input  type="email" required value={username}  onChange={(e) => setUsername(e.target.value)}  />
          <input  type="text"  required value={password}  onChange={(e) => setPassword(e.target.value)}  />
          <input  type="text"  required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          <input  type="text"  required value={lastname}  onChange={(e) => setLastname(e.target.value)}  />
          <select name="role"  required value={role}      onChange={(e) => setRole(e.target.value)}       >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        <button>Submit</button>
        </form>
      </div>
    )
  }

  export default Signup