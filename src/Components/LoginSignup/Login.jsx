// Login.jsx
import React from 'react';
import '../Styles/login_signup.css';
import password_icon from '../../assets/LoginSignUp/password.png';
import user_icon from '../../assets/LoginSignUp/person.png';
import main_logo from '../../assets/freshguard-logo.jpeg';

import { appFirebase } from '../../credenciales'; // Importando correctamente
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase);
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Login = () => {

    const ShowLoaingMessege = (flag) => {
        if (flag) Swal.showLoading()
        else Swal.close()
    }

    const functAutentication = async (e) => {
        ShowLoaingMessege(true);
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        try {
            await signInWithEmailAndPassword(auth, correo, contraseña);
        } catch (error) {
            alert("El correo o contraseña no son correctos");
        }
        ShowLoaingMessege(false);
    }

    return (
        <div className='container_log'>
            <div className="mainlogo_log">
                <img src={main_logo} alt="" />
            </div>
            <div className="data_log">
                <div className='header_log'>
                    <div className="text">INICIA SESIÓN</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={functAutentication}>
                    <div className="inputs">
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input type="text" className="input-line" placeholder="Correo" id='email' />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" className="input-line" placeholder='Contraseña' id='password' />
                        </div>
                    </div>
                    <div className="submit-container_log">
                        <button className={"submit_log"}>Iniciar Sesión</button>
                    </div>
                </form>
                <div className="link-Signup">¿No tienes cuenta aun? <Link to={"/Signup"}><span>CLICK AQUI</span></Link></div>
            </div>
        </div>
    )
}

export default Login;