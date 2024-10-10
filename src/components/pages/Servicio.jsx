import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RxMagnifyingGlass } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import './Servicio.css';
import ServicioCalendario from './ServicioCalendario';

const categories = ['Todos', 'Cabello', 'Masaje', 'Facial', 'Manicure', 'Pedicure'];

const servicios = [
  {
    id: 1,
    name: 'Corte de Cabello',
    category: 'Cabello',
    price: 500,
    description: 'Corte de cabello profesional para todas las edades.',
    image: './assets/hairstyling_4424446.png'
  },
  {
    id: 2,
    name: 'Masaje Relajante',
    category: 'Masaje',
    price: 1200,
    description: 'Masaje relajante de una hora con aceites esenciales.',
    image: './assets/massage_1.png'
  },
  // Agrega más servicios aquí...
];

const Servicio = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile && userProfile.profileImage) {
      setProfilePic(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${userProfile.profileImage}`);
    }
  }, []);

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

  const filteredServicios = servicios.filter(servicio =>
    servicio.name.toLowerCase().includes(filter.toLowerCase()) &&
    (selectedCategory === 'Todos' || servicio.category === selectedCategory)
  );

  const handleSaveAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
    Swal.fire('Cita guardada con éxito!')
      .then(() => {
        navigate('/Turno'); // Navegar a Turno después de guardar la cita
      });
  };

  return (
    <div className="App">
      <div className="logo">
        <h1>Servicios de Belleza</h1>
      </div>
      <div className="search-profile">
        <div className="search-container">
          <RxMagnifyingGlass className='search-icon' />
          <input 
            type="text" 
            placeholder="Buscar servicios..." 
            className="search-bar"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
        <div className="categories">
          {categories.map(category => (
            <button 
              key={category} 
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="servicio-list">
          {filteredServicios.map(servicio => (
            <div key={servicio.id} className="servicio-item">
              <img src={servicio.image} alt={servicio.name} className="servicio-image" />
              <h3>{servicio.name}</h3>
              <p>{servicio.description}</p>
              <p>${servicio.price}</p>
              <button className="reservar-button" onClick={() => setSelectedServicio(servicio)}>Reservar</button>
            </div>
          ))}
        </div>
        {selectedServicio && 
          <ServicioCalendario 
            Servicio={selectedServicio} 
            onClose={() => setSelectedServicio(null)} 
            onSave={handleSaveAppointment}
          />
        }
      </div>
    </div>
  );
};

export default Servicio;
