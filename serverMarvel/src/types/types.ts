import { Role } from 'src/roles/roles.entity';

export interface IUser {
  id: string;
  email: string;
  roles?: Role[];
}
