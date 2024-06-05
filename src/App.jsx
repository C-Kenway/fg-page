import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//importando los modulos de firebase
import appFirebase from './credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(appFirebase)

//Importando componentes
import Login from './Components/LoginSignup/Login';
import Signup from './Components/LoginSignup/Signup';
import MainMenu from './Components/MainMenu/MainMenu';
import Info_us from './Components/Info_us/Nosotros';
import Politicas from './Components/Info_us/Politicas';
import Result from './Components/result/Result';


function App() {

  const [usuario, setUsuario] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase)
    }
    else {
      setUsuario(null)
    }
  })

  return (
    <div>
      <Router>
            <Routes>
                {/* Ruta para el menú principal */}
                <Route path="/" element={usuario ? <MainMenu correoUsuario={usuario.email} /> : <Login />} />
                <Route path="/freshguard" element={usuario ? <MainMenu correoUsuario={usuario.email} /> : <Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Resultados" element={usuario ? <Result /> : <Login/> } />
                <Route path='/Nosotros' element={<Info_us/>} />
                <Route path='/Politicas' element={<Politicas/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App

