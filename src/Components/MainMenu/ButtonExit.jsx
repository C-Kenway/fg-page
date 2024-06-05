import React from 'react';
import '../Styles/ButtonExit.scss'; // Asegúrate de importar el archivo de estilos CSS/SCSS

const CustomButton = ({ text, onClick }) => {
    return (
        <button className="custom-button" onClick={onClick}>
            <section class="portfolio-experiment">
                <a>
                    <span class="text">{text}</span>
                    <span class="line -right"></span>
                    <span class="line -top"></span>
                    <span class="line -left"></span>
                    <span class="line -bottom"></span>
                </a>
            </section>
        </button>
    );
};

export default CustomButton;