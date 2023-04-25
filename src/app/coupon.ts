export class CouponQuantity {
  constructor(
    public all: number = 0,
    public used: number = 0,
  ) { }
}

export class Coupon {

  //  _id: string;
  // coupon_code: string;
  // title: string;
  // description: string;
  // is_percentage: boolean;
  // value: number;
  // is_active: boolean ;
  // created_at : new Date();
  // valid_from: Date;
  // valid_to: Date;
  // quantity: CouponQuantity;
  // min_order: number ;
  // max_discount: number

  constructor( 
    public _id: any = null,
    public coupon_code: string = '',
    public title: string = '',
    public description: string = '',
    public is_percentage: boolean = false,
    public value: number = 0,
    public is_active: boolean = true,
    public created_at = new Date(),
    public valid_from = new Date(),
    public valid_to= new  Date(),
    public membership: number = 0,
    public quantity: CouponQuantity = new CouponQuantity(),
    public min_order: number = 0,
    public max_discount: number = 0,
  ){ }
}