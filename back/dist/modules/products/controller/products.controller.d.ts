import { IProduct } from '../dtos/products.dtos';
import ProductService from '../service/products.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: any, data: IProduct): Promise<IProduct>;
    read(): Promise<IProduct[]>;
    readOne(id: string): Promise<IProduct>;
    updateWithoutToken(req: any, id: string, { data, secret }: {
        data: IProduct;
        secret: string;
    }): Promise<IProduct>;
    update(req: any, id: string, { data, secret }: {
        data: IProduct;
        secret: string;
    }): Promise<IProduct>;
    delete(req: any, id: string): Promise<IProduct>;
}
