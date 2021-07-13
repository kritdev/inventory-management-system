export interface IUnitOfMeasure {
  id?: number;
  name?: string;
  description?: string | null;
}

export class UnitOfMeasure implements IUnitOfMeasure {
  constructor(public id?: number, public name?: string, public description?: string | null) {}
}

export function getUnitOfMeasureIdentifier(unitOfMeasure: IUnitOfMeasure): number | undefined {
  return unitOfMeasure.id;
}
