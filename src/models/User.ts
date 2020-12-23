export interface UserInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  pictureUrl?: string;
  importedAt?: Date;
}
export class UserDTO implements UserInterface {
  id = '';
  firstName?: string = '';
  lastName?: string = '';
  fullName?: string = '';
  email?: string = '';
  pictureUrl?: string = '';
  importedAt?: Date = new Date(2000, 1);
}
export class User extends UserDTO {
  constructor(dto: UserDTO) {
    super();
    Object.assign(this, dto);
  }
}
