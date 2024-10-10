import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import apiService from "../../api/apiService";
import loginImage from "../Assets/file2.png";
import "./Configprofiles.css";

function Configprofiles() {
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellido: "",
    NomeUsuario: "",
    email: "",
    phoneNumber: "",
    roles: "",
    ProfileImage: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const [isOwner, setIsOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getUserByUsername('admin').then(response => {
      const data = response.data;
      setUsuario({
        Nombre: data.firstName,
        Apellido: data.lastName,
        NomeUsuario: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        roles: data.roles.join(', '),
        ProfileImage: data.profileImage,
      });
      if (data.profileImage) {
        setImagePreviewUrl(`https://localhost:7207/api/v1/Images/%20?folderName=CustomIdentityUser&imageName=${data.profileImage}`);
      }
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ProfileImage" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviewUrl(event.target.result);
        Swal.fire({
          title: "Imagen agregada correctamente",
          imageUrl: event.target.result,
          imageAlt: "Imagen de perfil",
        });
      };
      reader.readAsDataURL(file);
      setUsuario({
        ...usuario,
        ProfileImage: file,
      });
    } else {
      setUsuario({
        ...usuario,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar cambios!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formData = new FormData();
          formData.append('FirstName', usuario.Nombre);
          formData.append('LastName', usuario.Apellido);
          formData.append('UserName', usuario.NomeUsuario);
          formData.append('Email', usuario.email);
          formData.append('PhoneNumber', usuario.phoneNumber);
          formData.append('Roles', usuario.roles);
          if (usuario.ProfileImage) {
            formData.append('ImageFile', usuario.ProfileImage);
          }
          formData.append('IsOwner', isOwner);
          formData.append('IsEmployee', isEmployee);

          const response = await apiService.update('/Account/userbyusername', formData);

          if (response.success) {
            swalWithBootstrapButtons.fire({
              title: "¡Actualizado!",
              text: "Perfil actualizado con éxito.",
              icon: "success",
            }).then(() => {
              navigate("/"); // Redirige a la ruta deseada
            });
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: response.message || "Error al actualizar el perfil.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error durante la solicitud:", error);
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: error.response?.data.message || 'Error al actualizar el perfil.',
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La actualización ha sido cancelada.",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="User-form">
      <div className="form-container dark-shadow">
        <form onSubmit={onSubmit}>
          <img
            src={imagePreviewUrl}
            alt="Vista previa de perfil"
            className="login-image"
            onClick={() => document.getElementById('ProfileImage').click()}
          />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="Nombre"
              id="Nombre"
              value={usuario.Nombre}
              placeholder="Nombre"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="Apellido"
              id="Apellido"
              value={usuario.Apellido}
              placeholder="Apellido"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="NomeUsuario"
              id="NomeUsuario"
              value={usuario.NomeUsuario}
              placeholder="Nombre de Usuario"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={usuario.email}
              placeholder="Correo electrónico"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              id="phoneNumber"
              value={usuario.phoneNumber}
              placeholder="Número de teléfono"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="roles"
              id="roles"
              value={usuario.roles}
              placeholder="Roles"
              onChange={onChange}
            />
          </div>

          <input
            type="file"
            id="ProfileImage"
            name="ProfileImage"
            style={{ display: 'none' }}
            onChange={onChange}
          />

          <div className="form-group mt-3">
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => navigate("/login")}>Volver al Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Configprofiles;
