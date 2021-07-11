import Signup from './Component/Signup';
import AuthProvider from './Context/AuthProvider';
import Navbar from './Component/NavBar';

function App() {
  return (
    <AuthProvider>
      {/* <Navbar/> */}
    <Signup/>
  
    </AuthProvider>
    
  );
}

export default App;
