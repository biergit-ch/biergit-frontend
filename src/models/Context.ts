export interface ContextInterface {
  type: string;
  reference?: string;
}

export class ContextDTO implements ContextInterface {
  type = '';
  reference?: string = '';
}
export class Context extends ContextDTO {
  constructor(dto: ContextDTO | undefined) {
    super();
    Object.assign(this, dto);
  }
}
