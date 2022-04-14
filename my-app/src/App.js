
import './App.css';
import Login from './Login';
import Register from "./Register";

function App() {
  return (
<div style={{display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
 <div> <Login/></div>
<div><Register/></div>
</div>


  );
}

export default App;
