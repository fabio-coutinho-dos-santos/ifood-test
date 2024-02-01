export default class Category {
  constructor(
    private title: string,
    private description: string,
    private ownerId: string
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
  }

  get _title() {
    return this.title;
  }

  get _description() {
    return this.description;
  }

  get _ownerId() {
    return this.ownerId;
  }
}
