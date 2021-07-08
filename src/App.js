import Signup from './Component/Signup';
import AuthProvider from './Context/AuthProvider';

function App() {
  return (
    <AuthProvider>
    <Signup/>
    </AuthProvider>
  );
}

export default App;
