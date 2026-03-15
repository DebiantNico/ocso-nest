import { privateDecrypt } from "crypto";

export class CreateProductDto {

productId: string;
productName: string;
price: number;
countSeal: number;
provider: string;

}