export class Product {
  constructor(
    public product_id: any = null,
    public product_name: string = '',
    public product_price: number = 0,
    public product_description: string = '',
    public product_image: string[] = ['', '', '', ''],
    public product_size: string[] = ['M', 'L', 'XL', 'XXL'],
    public product_color: string[]= ['Black', 'White', 'Red', 'Blue'],
    public product_category: string = '',
    public product_inventory: number = 0,
    public product_rating: number = 0,
  ) { }
}
