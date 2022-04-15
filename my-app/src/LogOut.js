import React, { useContext } from 'react';
import {valueContext } from './ContextUser';
import Withcomponent from './Withcomponent';

function LogOut({logOut}) {
    const{LoggedInUsers}=useContext(valueContext)
  return (
    <div>
        
       <h1>hi {LoggedInUsers.firstName}</h1>
        <button type='button' onClick={logOut}>Log Out</button>
         
    </div>
  )
}
export default Withcomponent(LogOut)


