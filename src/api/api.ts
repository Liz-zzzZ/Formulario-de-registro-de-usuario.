import axios from "axios";
import type { LoginCredentials, LoginResponse, Cliente } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

//---LOGIN---
export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", credentials);
  return response.data;
};

//---CLIENTE---
//Obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>("/cliente");
  return response.data;
};

//Registrar cliente
export const registrarCliente = async (
  cliente: Omit<Cliente, "id">,
): Promise<Cliente> => {
  const response = await api.post<Cliente>("/cliente", cliente);
  return response.data;
};

//Eliminar a un cliente
export const eliminarCliente = async (id: string): Promise<void> => {
  await api.delete(`/cliente/${id}`);
};
export default api;
