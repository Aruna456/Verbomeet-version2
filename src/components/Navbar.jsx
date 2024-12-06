import {useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom'
const Navbar = () => {
  // const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"))
  const isAdmin=user?.role=="admin"

  //  useEffect(()=>{

  //    if(isAdmin)
  //    {
  //      navigate('/adminprofile');
  //    }
  //  },[isAdmin])
  return (

    <nav className="landingbg text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <h1 className="text-2xl font-bold text-white">VerboMeet</h1>

         
          <div className="flex items-center space-x-6">
            <Link to='/home'>
            <a className="text-white hover:text-purple-300 transition-colors duration-300">
              Home
            </a>
            </Link>
           
            <a
              href="#help"
              className="text-white hover:text-purple-300 transition-colors duration-300"
            >
              Ask Help
            </a>

            {/* Profile Photo */}
            <Link to={isAdmin?"/adminprofile":"/profile"}>
            <a className="flex items-center">
              <img
                src="https://via.placeholder.com/40" // Replace with user profile photo URL
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-white hover:border-purple-300 transition duration-300"
              />
            </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
