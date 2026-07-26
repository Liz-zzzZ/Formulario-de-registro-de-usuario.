export interface LoginCredentials {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  usuario: string;
}

export interface Cliente{
    id: string;
    nombre: string;
    apellido: string;
    genero: string;
    mayorEdad: string;
    usuarioRegistrado: string;
    contrasenia: string;
}

export interface ClienteFormData{
    nombre: string;
    apellido: string;
    genero: string;
    mayorEdad: boolean;
    usuarioRegistrado: string;
    contrasenia: string;
}

export interface AuthContextType{
    isAuthenticated: boolean;
    usuario: string | null;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => void;
}