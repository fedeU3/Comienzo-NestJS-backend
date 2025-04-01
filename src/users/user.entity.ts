import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'}) /*Nombre de la tabla en la base de datos*/ 
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  userID: string;

  @Column('text')
  password: string;

  @Column('text')
  nombre: string;

  @Column('text')
  apellido: string;

  @Column('text')
  direccion: string;

  @Column('bool')
  isActive: boolean;

}