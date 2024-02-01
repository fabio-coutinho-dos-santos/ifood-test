export default class Category {
  constructor(
    private _title: string,
    private _description: string,
    private _ownerId: string
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
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get ownerId() {
    return this._ownerId;
  }
}
