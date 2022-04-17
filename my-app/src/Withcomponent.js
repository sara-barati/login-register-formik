import React, { useContext } from 'react';
import {valueContext} from './ContextUser';
// import LogOut from './LogOut';



const Withcomponent = (Component) => {
  return function Withcomponents () {
    const {LoggedInUsers,isSignin,setIsSignin,setLoggedInUsers} = useContext(valueContext);
    function logOut() {
        isSignin(false)
        setLoggedInUsers(null)
    }
    console.log(LoggedInUsers);
    return <>{isSignin ? <Component logOut={logOut}/>:<Component/> }</>;
  };

}

export default Withcomponent;