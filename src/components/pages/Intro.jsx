import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Intro.css';
import Appft1 from '../Assets/ScreenshotMobile.png';
import Appft2 from '../Assets/ScreenshotMobile_1.jpg';
import Webft1 from '../Assets/ScreenshotLogin.png';
import Webft2 from '../Assets/ScreenshotRegistro.png';
import Webft3 from '../Assets/ScreenshotCita.png';
import logo from '../Assets/turnoexpress.png';
import appstore from '../Assets/logo-apple.png';
import googleplay from '../Assets/logo-google.png';
import qrApp from '../Assets/qr-appstore.jpg';
const Intro = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [showQR, setShowQR] = useState(false);
  const [qrImage, setQrImage] = useState('');

  const handleShowQR = (qrImage) => {
    setQrImage(qrImage);
    setShowQR(true);
  };

  const closeQRModal = () => {
    setShowQR(false);
  };

  const [currentIndex1, setCurrentIndex1] = useState(0);

  const [currentIndex2, setCurrentIndex2] = useState(0);

  const carouselImages1 = [Appft1, Appft2];

  const carouselImages2 = [Webft1, Webft2, Webft3];

  const showImage1 = (index) => {
    setCurrentIndex1(index);
  };

  const showImage2 = (index) => {
    setCurrentIndex2(index);
  };

  const nextImage1 = () => {
    const nextIndex = (currentIndex1 + 1) % carouselImages1.length;
    showImage1(nextIndex);
  };

  const prevImage1 = () => {
    const prevIndex = (currentIndex1 - 1 + carouselImages1.length) % carouselImages1.length;
    showImage1(prevIndex);
  };

  const nextImage2 = () => {
    const nextIndex = (currentIndex2 + 1) % carouselImages2.length;
    showImage2(nextIndex);
  };

  const prevImage2 = () => {
    const prevIndex = (currentIndex2 - 1 + carouselImages2.length) % carouselImages2.length;
    showImage2(prevIndex);
  };

  useEffect(() => {
    const interval1 = setInterval(nextImage1, 5000); // Cambia de imagen cada 5 segundos en el primer carrusel
    return () => clearInterval(interval1);
  }, [currentIndex1]);

  useEffect(() => {
    const interval2 = setInterval(nextImage2, 5000); // Cambia de imagen cada 5 segundos en el segundo carrusel
    return () => clearInterval(interval2);
  }, [currentIndex2]);

  return (
    <div className="intro">
      <header className="intro-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="auth-buttons">
            <button className="btn" onClick={() => handleNavigation('/login')}>Iniciar Sesión</button>
            <button className="btn" onClick={() => handleNavigation('/Registro')}>Registrarme</button>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="text-content">
              <h1 className="title">Turno Exprés</h1>
              <p className="subtitle">Nuestra aplicación está aquí para empoderarte en tu búsqueda de servicios, en cualquier momento y lugar.</p>
              <h6 className="download-title">Obtén la app</h6>
              <div className="button-group">
                <button className="btn-app-store" onClick={() => handleShowQR(qrApp)}>
                  <img src={appstore} alt="App Store" />
                  App Store
                </button>
                <button className="btn-google-play" onClick={() => handleShowQR(qrApp)}>
                  <img src={googleplay} alt="Google Play" />
                  Google Play
                </button>
              </div>
            </div>
            <img src={Appft1} alt="App Preview" className="app-preview" />
          </div>
        </div>
      </header>

      {/* Modal para mostrar el QR */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            <img src={qrImage} alt="QR Code" className="qr-image" />
            <button className="btn-close" onClick={closeQRModal}></button>
          </div>
        </div>
      )}

      {/* Resto del contenido */}
      <main className="intro-content">
        {/* Secciones de la página */}
      </main>

      <div className="intro-details">
        <div>
        <h3 className="details-title">Turno Exprés</h3>
<p className="details-text">
  Descarga nuestra aplicación para sumergirte en un vasto catálogo de servicios donde podrás agendar tus citas sin problemas y evitar esas filas molestas. Estos servicios van desde belleza hasta restaurantes y más.
</p>
        </div>
      </div>

      <main className="intro-content">
        <section className="about-section">
          <div className="carousel">
            <div className="carousel-container">
              <div className="carousel-images" style={{ transform: `translateX(-${currentIndex1 * 100}%)` }}>
                {carouselImages1.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    className="carousel-image"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="about-content">
            <div className="about-text-content">
              <h2 className="about-title">Turno Exprés: La Solución Perfecta para la Gestión de Turnos</h2>
              <p className="about-text">En Turno Exprés, hemos creado una aplicación innovadora diseñada para facilitar la gestión de turnos tanto para propietarios de establecimientos como para sus clientes y empleados. Nuestra plataforma ofrece una experiencia intuitiva y eficiente que se adapta a las necesidades de diferentes usuarios.</p>
              <h3 className="key-features-title">Beneficios para los Usuarios:</h3>
              <p className="key-features-text">Clientes: Los usuarios pueden explorar una lista de establecimientos, conocer detalles sobre los servicios ofrecidos y agendar turnos de manera rápida y sencilla. Todo desde la comodidad de su dispositivo móvil.</p>
              <p className="key-features-text">Propietarios: Gestiona tu negocio de manera eficaz con opciones para crear, modificar y eliminar establecimientos. Además, puedes gestionar los servicios y empleados asociados a cada uno, garantizando un control total sobre tu operación.</p>
              <p className="key-features-text">Empleados: Consulta los establecimientos donde trabajas y gestiona los turnos que te han sido asignados, con la posibilidad de actualizar el estado de cada turno en tiempo real.</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="features-title">Características Destacadas</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-wrapper">
                <i className="icon fas fa-calendar-alt"></i>
              </div>
              <h3 className="feature-title">Gestión de Turnos</h3>
              <p className="feature-description">Organiza y gestiona los turnos de manera eficiente, reduciendo tiempos de espera y mejorando la experiencia del cliente.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper">
                <i className="icon fas fa-user-friends"></i>
              </div>
              <h3 className="feature-title">Experiencia Personalizada</h3>
              <p className="feature-description">Ofrece a tus clientes una experiencia personalizada adaptada a sus necesidades y preferencias.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper">
                <i className="icon fas fa-mobile-alt"></i>
              </div>
              <h3 className="feature-title">Accesibilidad Móvil</h3>
              <p className="feature-description">Gestiona tus turnos y reservas desde cualquier lugar con nuestra aplicación móvil.</p>
            </div>
          </div>
        </section>

        <section className="screenshots-section">
          <h2 className="screenshots-title">Capturas de Pantalla</h2>
          <div className="carousels">
            <div className="carousel">
              <div className="carousel-container">
                <button className="carousel-button prev" onClick={prevImage1}>❮</button>
                <div className="carousel-images" style={{ transform: `translateX(-${currentIndex1 * 100}%)` }}>
                  {carouselImages1.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Screenshot ${index + 1}`}
                      className="carousel-image"
                    />
                  ))}
                </div>
                <button className="carousel-button next" onClick={nextImage1}>❯</button>
              </div>
            </div>
            <div className="carousel">
              <div className="carousel-container">
                <button className="carousel-button prev" onClick={prevImage2}>❮</button>
                <div className="carousel-images" style={{ transform: `translateX(-${currentIndex2 * 100}%)` }}>
                  {carouselImages2.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Screenshot ${index + 1}`}
                      className="carousel-image"
                    />
                  ))}
                </div>
                <button className="carousel-button next" onClick={nextImage2}>❯</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="intro-footer">
        <p>&copy; 2024 Turno Exprés. Todos los derechos reservados XD.</p>
        <div className="download-footer">
          <button className="btn-app-store" onClick={() => handleShowQR(qrApp)}>
            <img src={appstore} alt="App Store" />
            App Store
          </button>
          <button className="btn-google-play" onClick={() => handleShowQR(qrApp)}>
            <img src={googleplay} alt="Google Play" />
            Google Play
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Intro;
