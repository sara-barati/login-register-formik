import React, { useContext } from 'react';
import {valueContext} from './ContextUser';
import LogOut from './LogOut';

// import SayHello from './SayHello'

const Withcomponent = (Component) => {
  return function Withcomponents () {
    const {loggedInUsers,isSignin,setIsSignin,setUserlogin} = useContext(valueContext);
    function logOut() {
        setIsSignin(false)
        setUserlogin(null)
    }
    console.log(loggedInUsers);
    return <>{isSignin ? <LogOut logOut={logOut}/> :<Component/> }</>;
  };

}
   


export default Withcomponent;