import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPhonePortrait } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Swal from "sweetalert2";
import apiService from "../../api/apiService";
import loginImage from "../Assets/file2.png";
import "./Registro.css";

function Registro() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(loginImage);
  const navigate = useNavigate();

  const {
    firstName, lastName, userName, phoneNumber, email, password, confirmPassword, profileImage
  } = userData;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files.length > 0) {
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
      setUserData({
        ...userData,
        profileImage: file,
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const validatePassword = (password) => {
    // Validación simple para asegurar que la contraseña tenga al menos 8 caracteres.
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        title: "Error",
        text: "La contraseña debe tener al menos 8 caracteres.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

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
      confirmButtonText: "Sí, registrar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const formData = new FormData();
          formData.append('FirstName', firstName);
          formData.append('LastName', lastName);
          formData.append('UserName', userName);
          formData.append('PhoneNumber', phoneNumber);
          formData.append('Email', email);
          formData.append('Password', password);
          if (profileImage) {
            formData.append('ImageFile', profileImage);
          }

          const response = await apiService.create('/Account/register', formData);

          if (response.success) {
            swalWithBootstrapButtons.fire({
              title: "Registrado!",
              text: "Usuario registrado con éxito.",
              icon: "success",
            }).then(() => {
              navigate("/"); // Redirige a la ruta donde está el componente Login
            });
          } else {
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: response.message || "Error al registrar el usuario.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error durante la solicitud:", error);
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Error al registrar el usuario.",
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El registro ha sido cancelado.",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="User-form">
      <div className="form-container dark-shadow">
        <form onSubmit={handleSubmit}>
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
              name="firstName"
              id="firstName"
              value={firstName}
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lastName"
              value={lastName}
              placeholder="Apellido"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="userName"
              id="userName"
              value={userName}
              placeholder="Nombre de Usuario"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <IoMdPhonePortrait className="iconRegistro" />
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              placeholder="Teléfono"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <FaRegUser className="iconRegistro" />
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              placeholder="Correo electrónico"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <RiLockPasswordFill className="iconRegistro" />
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <RiLockPasswordFill className="iconRegistro" />
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Repita la contraseña"
              onChange={handleChange}
            />
          </div>

          <input
            type="file"
            id="ProfileImage"
            name="profileImage"
            style={{ display: 'none' }}
            onChange={handleChange}
          />

          <div className="form-group mt-3">
            <button type="submit">Registrate</button>
          </div>
          <div className="register-link">
            <button type="button" onClick={() => navigate("/login")}>Volver al Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;
