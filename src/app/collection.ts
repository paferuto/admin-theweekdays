import { Product } from "./product";

export class Collection {
  constructor(
    public _id: any = null,
    public name: string = "",
    public description: string = " ",
    public videoId: string = "RJyMJlU2PL0",
    public image: string = "",
    public createdDate: Date = new Date(),
    public modifiedDate: Date = new Date(),
    public lookbook: Array<Lookbook> = [
      {
        "image": "",
        "products": []
      }
    ],
  ) { }
}

export class Lookbook {
  constructor(
    public image: string = "",
    public products: Array<string> = []
  ) { }
}
