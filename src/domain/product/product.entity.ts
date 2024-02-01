import Category from "../category/category.entity";

export class Product {
  
  private _category: Category

  constructor(
    private _ownerId: string,
    private _title: string,
    private _description: string,
    private _price: number,
  ) {
    this.validate();
  }

  private validate() {
    if (!this._ownerId || this._ownerId === "") {
      throw new Error("Owner Id is required");
    }

    if (!this._title || this._title === "") {
      throw new Error("Title is required");
    }

    if (!this._description || this._description === "") {
      throw new Error("Description is required");
    }

    if (!this._price) {
      throw new Error("Price is required");
    }

    if (this._price < 0) {
      return new Error("Invalid price")
    }
  }

  get category() {
    return this._category;
  }

  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get description() {
    return this._description;
  }

  get ownerId() {
    return this._ownerId;
  }

  changeCategory(newCategory: Category) {
    this._category = newCategory
  }
}
