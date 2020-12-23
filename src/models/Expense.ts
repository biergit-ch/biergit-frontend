import { Context, ContextDTO } from './Context';
export interface ExpenseInterface {
  userFrom: string;
  userTo: string;
  amount?: number;
  context?: Context;
}
export class ExpenseDTO implements ExpenseInterface {
  userFrom = '';
  userTo = '';
  amount?: number = 0;
  context?: Context = new Context({} as ContextDTO);

  createSubTypes(dto: ExpenseDTO): void {
    this.context = new Context(dto.context);
  }
}
export class Expense extends ExpenseDTO {
  constructor(dto: ExpenseDTO) {
    super();
    Object.assign(this, dto);
    this.createSubTypes(dto);
  }
}
