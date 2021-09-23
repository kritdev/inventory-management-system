import { ISetting } from "./setting.model";

export interface ICategory extends ISetting {
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public description?: string | null) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
