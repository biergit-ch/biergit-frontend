import { User } from './User';
export interface GroupInterface {
  id: string;
  groupName: string;
  members: User[];
  pictureUrl?: string;
  importedAt?: Date;
  lastTransactionDate?: Date;
  userFromDiff?: number;
}
export class GroupDTO implements GroupInterface {
  id = '';
  groupName = '';
  members: User[] = [];
  pictureUrl?: string = '';
  importedAt?: Date = new Date();
  lastTransactionDate?: Date = new Date(2000, 1);
  userFromDiff?: number = 0;

  createSubTypes(dto: GroupDTO): void {
    this.members = [] as User[];
    if (dto?.lastTransactionDate) {
      this.lastTransactionDate = new Date(dto.lastTransactionDate);
    }
    for (const member of dto.members) {
      this.members.push(new User(member));
    }
  }
}
export class Group extends GroupDTO {
  constructor(dto: GroupDTO) {
    super();
    Object.assign(this, dto);
    this.createSubTypes(dto);
  }
}
