import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { HotelInformation } from './hotelInterfaces';

export interface UserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegistrationResponseDto {
  message?: string;
  error?: { message: string };
}

export interface LoginResponseDto {
  userId: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  userStatus: UserStatus;
  token: string;
}

export interface User {
  userId: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
  userStatus: UserStatus;
  hotelCount: number;
}
