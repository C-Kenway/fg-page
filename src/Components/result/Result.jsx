import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// CSS
import '../Styles/results.css'
// Rutas de imágenes
import back from '../../assets/MainMenu/back.png'

const Result = () => {
    // Utiliza el hook `useLocation` para obtener el estado con la imagen base64
    const location = useLocation();
    const { imageBase64, result } = location.state || {};

    //Variable para cambiar la infomracion de la pantalla
    const [CambiandoInfo, setCambiantoInfo] = useState(false)

    return (
        <div className='container_res'>
            <div className="header_res">
                <Link to={"/"}><img src={back} alt="" className='back-img' /></Link>
                <div className='head-text_res'>{result.fruitName}</div>
                <div className='header_nav'>
                    <button className='CambiarInfo' onClick={() => setCambiantoInfo(!CambiandoInfo)}>
                        {CambiandoInfo ? "Mostrar Predicción" : "Mostrar Informacion del fruto"}
                    </button>
                </div>
            </div>
            <div className='imagen_muestra'>
                {/* Muestra la imagen base64 */}
                {imageBase64 && <img src={imageBase64} className="img_muestra" />}
            </div>
            <div className="data_res">
                {result && (<div className="info_daños">
                    <div className="text_res">{CambiandoInfo ? "Nombre Cientifico" : "Predicción"}</div>
                    <h6>{CambiandoInfo ? result.sciName : result.prediction}</h6>
                </div>)}
                {result && (<div className="info_recomendaciones">
                    <div className="text_res">{CambiandoInfo ? "Descripción:" : "Extra:"}</div>
                    <p>{CambiandoInfo ? result.description : result.additional_text}</p>
                    <h6>{CambiandoInfo ? "" : "Categoria del defecto"}</h6>
                    <p>{CambiandoInfo ? "" : result.categoria}</p>
                </div>)}
            </div>
        </div>
    );
};

export default Result;