import {NavLink, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () =>{
    try {
      let response = await fetch(`http://localhost:8000/auth/logout`, {
        method: 'DELETE',
        credentials: 'include'
      })
      response = await response.json();
      if (response.error) {
        alert(response.error);
      }
      else{
        localStorage.removeItem('id');
        navigate('/');
      }
    } catch (err) {
      alert('An error occured. Please try again.');
    }
  }
  return (
    <nav className="bg-black p-4 mb-10">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className="text-white" activeClassName="font-bold">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/records" className="text-white" activeClassName="font-bold">
              Weekly Records
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            {localStorage.getItem('id') !== null ?
              <button onClick={logout} className="text-white bg-black">Logout</button>
              :
              <NavLink to="/login" className="text-white" activeClassName="font-bold">
                Login
              </NavLink>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;