import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/menu_style.scss';
import CustomButton from './ButtonExit';
import main_logo from '../../assets/freshguard-logo.jpeg';
import camara from '../../assets/MainMenu/camara.png';
import info from '../../assets/MainMenu/info.png';
import doc from '../../assets/MainMenu/doc.png';
import Swal from 'sweetalert2';
import appFirebase from '../../credenciales';
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth(appFirebase);

const MainMenu = ({ correoUsuario }) => {

    const ShowLoaingMessege = (flag) =>{
        if(flag){
            Swal.fire({
                title: 'Analizando imagen...',
                didOpen: () => {
                  Swal.disableButtons();
                  Swal.showLoading();
                }
              });
        }
        else Swal.close()
    }

    
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [result, setResult] = useState(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const uploadImage = async () => {
        ShowLoaingMessege(true)
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch('/predict', { // El proxy redirigirá esta solicitud
                    method: 'POST',
                    body: formData,
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const statusCode = response.status;

                if (statusCode === 200 || statusCode === 201) {
                    setResult(data);
                    navigate('/Resultados', { state: { imageBase64, result: data } });
                    Swal.fire({
                        icon: 'success',
                        title: 'Imagen cargada correctamente',
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo cargar la imagen, intente nuevamente.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que hubo un error por parte del servidor, intentelo nuevamente.',
                });
            }
        }
        ShowLoaingMessege(false)
    };
    
    useEffect(() => {
        if (file && imageBase64) {
            uploadImage();
        }
    }, [file, imageBase64]);

    return (
        <div className='container'>
            <div className="header">
                <CustomButton text="Cerrar Sesión" onClick={() => signOut(auth)} />
                <div className="mainlogo">
                    <img src={main_logo} alt="logo" />
                </div>
            </div>
            <div className="data">
                <div className="info_count-container">
                    <div className="text">¡Hola! Bienvenido</div>
                    <p>Usuario: {correoUsuario}</p>
                    <p>No olvide leer las políticas de la página así como acerca de nosotros si quisiera conocer más sobre Freshguard.</p>
                </div>
                <div className="submit-container">
                    <div className="photo-load">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button onClick={handleButtonClick}>
                            <img src={camara} alt="Cargar foto" className='submit' />
                        </button>
                        <p>Cargar foto</p>
                    </div>
                    <div className="info-us">
                        <div>
                            <Link to={"/Nosotros"}><img src={info} alt="Acerca de nosotros" className='submit' /></Link>
                            <p>Acerca de nosotros</p>
                        </div>
                        <div>
                            <Link to={"/Politicas"}><img src={doc} alt="Políticas" className='submit' /></Link>
                            <p>Términos y condiciones</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;