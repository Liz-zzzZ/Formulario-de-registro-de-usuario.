import { eliminarCliente } from "../api/api";
import type { Cliente } from "../types/types";
import Swal from "sweetalert2";

interface UserTableProps {
  clientes: Cliente[];
  onDelete: (id: string) => void;
}

function UserTable({ clientes, onDelete }: UserTableProps) {
  const handleDelete = async (id: string) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar este registro?",
      text: "Esta acción no se puede deshacer.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      await eliminarCliente(id);
      onDelete(id);
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el cliente.",
      });
    }
  };

  if (clientes.length === 0) {
    return <p>No hay clientes registrados todavía.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Género</th>
          <th>Mayor de edad</th>
          <th>Usuario</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.genero}</td>
            <td>{cliente.mayorEdad}</td>
            <td>{cliente.usuarioRegistrado}</td>
            <td>
              <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
