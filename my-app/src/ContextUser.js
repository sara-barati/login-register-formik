import React ,{useState}  from 'react';

export const valueContext = React.createContext("")
export default function ContextUser({children}){
    const [LoggedInUsers, setLoggedInUsers] = useState([]);
    const [isSignin, setIsSignin] = useState(false);
    
    return (
        <valueContext.Provider value={{ LoggedInUsers, setLoggedInUsers ,isSignin,setIsSignin}}>
            {children}
        </valueContext.Provider>
    );
};
  
