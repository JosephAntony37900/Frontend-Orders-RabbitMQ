export interface AuthResponse {
    token: string;
    user: {
      Id: number;
      Email: string;
      Nombre: string;
      Contraseña?: string;
    };
  }