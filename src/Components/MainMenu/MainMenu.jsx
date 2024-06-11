import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/menu_style.scss';
import CustomButton from './ButtonExit';
import main_logo from '../../assets/freshguard-logo.jpeg';
import upload_icon from '../../assets/MainMenu/cloud-upload-alt.png';
import info_icon from '../../assets/MainMenu/info.png';
import doc_icon from '../../assets/MainMenu/doc.png';
import Swal from 'sweetalert2';
import { appFirebase, db } from '../../credenciales'; // Importando de manera nombrada
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Importar funciones Firestore

const auth = getAuth(appFirebase);

const MainMenu = ({ correoUsuario }) => {
    const [nombreUsuario, setNombreUsuario] = useState(''); // Estado para almacenar el nombre de usuario

    useEffect(() => {
        const fetchUserName = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setNombreUsuario(userDoc.data().name);
                }
            }
        };
        fetchUserName();
    }, []);

    const ShowLoaingMessege = (flag) => {
        if (flag) {
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

    const resetFileState = () => {
        setFile(null);
        setImageBase64(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadImage = async () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Estas seguro?",
            text: "El modelo de entrenamiento esta diseñado para detectar los defectos en jitomate saladette y chile serrano. ¡NO otro tipo de imagenes!, por lo que acabara dando error o bien un resulatdo incoherente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, ¡subelo!",
            cancelButtonText: "No, ¡cancelalo!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Subido!",
                    text: "Tu imagen será procesado",
                    icon: "success"
                });
                enviarInfo();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Has cancelado la operacion :3",
                    icon: "error"
                });
                resetFileState();  // Reset the state when the user cancels the upload
            }
        });
    };

    const enviarInfo = async () => {
        ShowLoaingMessege(true)
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch('/predict', {
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
                    ShowLoaingMessege(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Imagen cargada correctamente',
                        showConfirmButton: false,
                    });
                } else {
                    ShowLoaingMessege(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo cargar la imagen, intente nuevamente.',
                    });
                }
            } catch (error) {
                ShowLoaingMessege(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que hubo un error por parte del servidor, intentelo nuevamente.',
                });
            }
        }
    }

    useEffect(() => {
        if (file && imageBase64) {
            uploadImage();
        }
    }, [file, imageBase64]);

    return (
        <div className='container'>
            <div className="header">
                <div className="mainlogo">
                    <img src={main_logo} alt="logo" />
                </div>
            </div>
            <div className="data">
                <div className="info_count-container">
                    <div className="text">¡Hola, {nombreUsuario || correoUsuario}!</div>
                    <p className='text'>Bienvenido</p>
                    <p>¿Que te gustaria hacer hoy? </p> 
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
                            <img src={upload_icon} alt="Cargar foto" className='submit' />
                        </button>
                        <p>Cargar foto</p>
                    </div>
                    <div className="info-us">
                        <div>
                            <Link to={"/Nosotros"}><img src={info_icon} alt="Acerca de nosotros" className='submit' /></Link>
                            <p>Acerca de nosotros</p>
                        </div>
                        <div>
                            <Link to={"/Politicas"}><img src={doc_icon} alt="Políticas" className='submit' /></Link>
                            <p>Términos y condiciones</p>
                        </div>
                    </div>
                    <div><CustomButton text="Cerrar Sesión" onClick={() => signOut(auth)} /></div>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
