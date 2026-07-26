import "./App.css";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { getClientes } from "./api/api";
import type { Cliente } from "./types/types";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getClientes()
        .then(setClientes)
        .catch((err) => console.error("Error al cargar clientes:", err));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>
      <UserForm
        onRegister={(nuevoCliente) => setClientes([...clientes, nuevoCliente])}
      />
      <UserTable
        clientes={clientes}
        onDelete={(id) => setClientes(clientes.filter((c) => c.id !== id))}
      />
    </div>
  );
}

export default App;
