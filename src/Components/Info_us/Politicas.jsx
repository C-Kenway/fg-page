import '../Styles/info_us.css'
import main_logo from '../../assets/freshguard-logo.jpeg'
import info from '../../assets/MainMenu/info.png'
import back from '../../assets/MainMenu/back.png'
import { Link } from 'react-router-dom';

export const Politicas = () => {
    return (
        <div className='container'>
            <div className="header">
                <Link to={"/"}><img src={back} alt="" className='exit-img' /></Link>
                <div className="mainlogo">
                    <img src={main_logo} alt="" />
                </div>
            </div>
            <div className="data">
                <div className="info_count-container">
                    <h2>¡Bienvenido a Freshguard!</h2>
                    <div className="text">Términos y Condiciones de Uso</div>
                    <p>Por favor, lee detenidamente estos términos y condiciones antes de utilizar nuestro servicio.</p>
                    <ol>
                        <li>Aceptación de los Términos:</li><p>Al utilizar nuestro servicio, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, por favor, no utilices nuestro servicio.</p>
                        <li>Descripción del Servicio:</li><p> Freshguard ofrece un servicio que permite a los usuarios cargar imágenes de jitomates y chiles serranos para determinar si están enfermos o sanos. Nuestro servicio se basa en la normativa mexicana para clasificar las enfermedades y estados de los productos.</p>
                        <li>Uso Aceptable</li><p>Los usuarios deben utilizar nuestro servicio de manera responsable y legal. No se permite el uso del servicio para actividades ilegales o fraudulentas.</p>
                        <li>Precisión de los Resultados: </li><p>Hacemos todo lo posible para proporcionar resultados precisos, pero no podemos garantizar la precisión al 100%. Los resultados son proporcionados con fines informativos y educativos únicamente, y no deben sustituir el asesoramiento profesional o médico.</p>
                        <li>Cumplimiento Normativo:</li><p>Nos comprometemos a cumplir con todas las leyes y regulaciones pertinentes, especialmente aquellas relacionadas con la clasificación de enfermedades y estados de los productos alimenticios según la normativa mexicana.</p>
                        <li>Modificaciones:</li><p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Se notificará a los usuarios sobre cualquier cambio realizado.</p>
                    </ol>

                </div>
                <div className="submit-container">
                    <div className="politics">
                        <Link to={"/Nosotros"}><img src={info} alt="" className='submit' /></Link>
                        <p>Sobre Nosotros</p>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Politicas;
