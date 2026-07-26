import { useState } from "react";
import type { FormEvent } from "react";
import { registrarCliente } from "../api/api";
import type { Cliente } from "../types/types";
import Swal from "sweetalert2";

interface UserFormProps {
  onRegister: (cliente: Cliente) => void;
}

function UserForm({ onRegister }: UserFormProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [genero, setGenero] = useState("");
  const [mayorEdad, setMayorEdad] = useState(false);
  const [usuarioRegistrado, setUsuarioRegistrado] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loading, setLoading] = useState(false);

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setGenero("");
    setMayorEdad(false);
    setUsuarioRegistrado("");
    setContrasenia("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    if (!nombre || !apellido || !genero || !usuarioRegistrado || !contrasenia) {
       Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor ingresa todos los valores solicitados.",
    });
      return;
    }

    setLoading(true);
    try {
      const nuevoCliente = await registrarCliente({
        nombre,
        apellido,
        genero,
        mayorEdad: mayorEdad ? "Si" : "No",
        usuarioRegistrado,
        contrasenia,
      });

      onRegister(nuevoCliente);
      limpiarFormulario();
      Swal.fire({
      icon: "success",
      title: "Registrado con éxito",
      text: `${nombre} ${apellido} fue agregado correctamente.`,
      timer: 2000,
      showConfirmButton: false,
    });

    } catch (err) {
     Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al registrar el cliente.",
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombres</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellidos</label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="genero">Género</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="mayorEdad">
            <input
              id="mayorEdad"
              type="checkbox"
              checked={mayorEdad}
              onChange={(e) => setMayorEdad(e.target.checked)}
            />{" "}
            Mayor de edad: {mayorEdad ? "Sí" : "No"}
          </label>
        </div>

        <div>
          <label htmlFor="usuarioRegistrado">Usuario</label>
          <input
            id="usuarioRegistrado"
            type="text"
            value={usuarioRegistrado}
            onChange={(e) => setUsuarioRegistrado(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contrasenia">Contraseña</label>
          <input
            id="contrasenia"
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </div>


        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
