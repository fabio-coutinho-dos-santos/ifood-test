import Category from "../category/category.entity";

export class Product {
  
  private category: Category

  constructor(
    private ownerId: string,
    private title: string,
    private description: string,
    private price: number,
  ) {
    this.validate();
  }

  private validate() {
    if (!this.ownerId || this.ownerId === "") {
      throw new Error("Owner Id is required");
    }

    if (!this.title || this.title === "") {
      throw new Error("Title is required");
    }

    if (!this.description || this.description === "") {
      throw new Error("Description is required");
    }

    if (!this.price) {
      throw new Error("Price is required");
    }

    if (this.price < 0) {
      return new Error("Invalid price")
    }
  }

  get _category() {
    return this.category;
  }

  get _title() {
    return this.title;
  }

  get _price() {
    return this.price;
  }

  get _description() {
    return this.description;
  }

  get _ownerId() {
    return this.ownerId;
  }

  changeCategory(newCategory: Category) {
    this.category = newCategory
  }
}
