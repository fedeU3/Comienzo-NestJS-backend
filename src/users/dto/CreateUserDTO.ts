export type CreateUserDTO = {
    userID: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    rol: string;
    esAdmin: boolean;
  };