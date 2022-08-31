import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.css"

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogin = async e => {
    e.preventDefault()
    try {
        dispatch({ type: 'LOGOUT' })
        navigate('/login')
    } catch (err) {
        dispatch(err)
        
    }
}
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">lamabooking</span>
        {user ?
          <div className="navItems" style={{display:"flex", color:'yellow'}}>
            <p className="">{user.userName}</p>
            <button onClick={handleLogin} className="navButton">
              Logout
            </button>
          </div>:
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>}
      </div>
    </div>
  )
}

export default Navbar