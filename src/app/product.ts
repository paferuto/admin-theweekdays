export class Product {
  constructor(
    public _id: any = null,
    public product_id:string= "",
    public name: string = "",
    public excerpt:string = "",
    public description: string = "",
    public price: number = 0,
    public original_price: number =0,
    public on_sale:boolean = false,
    public rating:number = 0,
    public in_stock:boolean = true,
    public min_qty: number= 0,
    public max_qty: number =0,
    public image: Array<string> = [],
    public category: string = "64429a57f9b439efa26ecaa4",
    public variants: Array<variant> = []
  ) { }
}

export class variant {
  constructor(
    public name: string = "",
    public in_stock: boolean = true,
    public available_quantity: number = 0
  ) { }
}
