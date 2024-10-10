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
import Button from 'react-bootstrap/Button';

const Turno = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile && userProfile.profileImage) {
            setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
        }
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        apiService.getAll('/Reservations')
            .then(response => {
                if (response.data && response.data.items) {
                    setReservations(response.data.items);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            })
            .catch(error => {
                console.error("Error fetching reservations:", error);
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

    const cancelReservation = (reservationId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService.cancelReservation(reservationId)
                    .then(() => {
                        fetchReservations(); // Volver a cargar las reservaciones después de cancelar
                        Swal.fire(
                            'Cancelada!',
                            'La reservación ha sido cancelada.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error("Error cancelando la reservación:", error);
                    });
            }
        });
    };

    return (
        <div className="App">
            <div className="logo">
                <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <div className="search-profile">
                <div className="search-container">
                    <RxMagnifyingGlass className='search-icon' />
                    <input 
                        type="text" 
                        placeholder="Buscar servicios..." 
                        className="search-bar"
                    />
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
                        <div className="profile-option" onClick={logout}>Cerrar Sesión</div>
                    </div>
                )}
            </div>

            <div className="App-content">
                <h2>Mis Reservaciones</h2>
                <div className="reservations-list">
                    {reservations.length > 0 ? (
                        reservations.map(reservation => (
                            <Card key={reservation.id} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={reservation.servicioImage} />
                                <Card.Body>
                                    <Card.Title>{reservation.servicioName}</Card.Title>
                                    <Card.Text>
                                        {reservation.date} a las {reservation.time}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => cancelReservation(reservation.id)}>Cancelar</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No tienes reservaciones en este momento.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Turno;
