import { UserRole } from "../data/user-role.enum";

export interface UserDto {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}