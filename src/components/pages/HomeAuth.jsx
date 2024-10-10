import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './HomeAuth.css';
import logo from '../Assets/turnoexpress.png';
import { RxMagnifyingGlass } from "react-icons/rx";
import apiService from '../../api/apiService';
import { IoIosNotificationsOutline } from "react-icons/io";

import Card from 'react-bootstrap/Card';

const HomeInitialAUTH = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [services, setServices] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile && userProfile.profileImage) {
            setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
        }
        fetchServices();
        fetchEstablishments();
    }, []);

    const fetchServices = () => {
        apiService.getAll('/Services')
            .then(response => {
                if (response.data && response.data.items) {
                    setServices(response.data.items);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch(error => {
                console.error("Error fetching services:", error);
            });
    };

    const fetchEstablishments = () => {
        apiService.getAll('/Establishments')
            .then(response => {
                if (response.data && response.data.items) {
                    setEstablishments(response.data.items);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch(error => {
                console.error("Error fetching establishments:", error);
            });
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const logout = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "¡Cerrado!",
                    text: "Tu sesión ha sido cerrada.",
                    icon: "success"
                }).then(() => {
                    localStorage.clear();
                    navigate('/');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu sesión sigue activa.",
                    icon: "error"
                });
            }
        });
    };

    const navigateToProfile = () => {
        navigate('/Configprofiles');
    };
    const navigateToTurno = () => {
        navigate('/Turno');
    };
    return (
        <div className='home-header'>
            <div className="header-content">
                <div className="logo">
                    <img src={logo} alt="Barbería Corte Perfecto" />
                </div>
                <div className="search-profile">
                    <div className="search-container">
                        <RxMagnifyingGlass className='search-icon' />
                        <input type="text" placeholder="Buscar servicios" />
                    </div>
                    <div className="profile" onClick={toggleProfileMenu}>
                        <img src={profilePic} alt="Profile" className='profile-pic' />
                        <span>Mi Perfil</span>
                        <span className='perfil_espacio'>▼</span>
                    </div>
                    {profileMenuOpen && (
                        <div className="profile-menu">
                            <div className="profile-option" onClick={navigateToProfile}>Configurar Perfil</div>
                            <div className="profile-option">
                                <span>Notificación</span>
                                <IoIosNotificationsOutline className="icon" />
                            </div>
                            <div className="profile-option" onClick={navigateToTurno}>Turno</div>
                            <div className="profile-option" onClick={logout}>Cerrar Sesión</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="services">
                <h1>¿Qué servicio deseas hoy?</h1>
                <div className="buttons">
                    <button>Corte de Cabello</button>
                    <button>Tinte</button>
                    <button>Manicura</button>
                    <button>Pedicura</button>
                    <button>Depilación</button>
                    <button>Masaje</button>
                </div>
            </div>
            <ServiceCarousels services={services} establishments={establishments} />
        </div>
    );
};

const ServiceCarousels = ({ services, establishments }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="featured-services">
            <h3>Servicios Nuevos</h3>
            <Carousel responsive={responsive}>
                {services.slice(0, 5).map(service => (
                    <div key={service.id} className="service-item">
                        <div className="service-image">
                            <img
                                src={`https://localhost:7207/api/v1/Images/%20?folderName=Service&imageName=${service.serviceImage}`}
                                alt={service.serviceName}
                            />
                        </div>
                        <div className="service-details">
                            <h4>{service.serviceName}</h4>
                        </div>
                    </div>
                ))}
            </Carousel>

            <h3>Servicios Impresionantes</h3>
            <Carousel responsive={responsive}>
                {services.slice(5, 10).map(service => (
                    <div key={service.id} className="service-item">
                        <div className="service-image">
                            <img
                                src={`https://localhost:7207/api/v1/Images/%20?folderName=Service&imageName=${service.serviceImage}`}
                                alt={service.serviceName}
                            />
                        </div>
                        <div className="service-details">
                            <h4>{service.serviceName}</h4>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div>
      <h3>Establecimientos</h3>
      <Carousel responsive={responsive}>
        {establishments.map((establishment) => (
          <div key={establishment.id} className="service-item">
            <div className="service-image">
              <Card.Img
                variant="top"
                src={`https://localhost:7207/api/v1/Images/%20?folderName=Establishment&imageName=${establishment.profileImage}`}
                alt={establishment.businessName}
              />
            </div>
            <div className="service-details">
              <h4>{establishment.businessName}</h4>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
        </div>
    );
};

export default HomeInitialAUTH;
