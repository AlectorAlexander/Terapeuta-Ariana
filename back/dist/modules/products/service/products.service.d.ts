import { IService } from 'src/modules/interfaces/IService';
import { IProduct } from '../dtos/products.dtos';
declare class ProductService implements IService<IProduct> {
    private _product;
    constructor();
    private sortByDateCreation;
    private validateDataAndCreate;
    create(data: IProduct): Promise<IProduct>;
    delete(id: string): Promise<IProduct>;
    read(): Promise<IProduct[]>;
    readOne(id: string): Promise<IProduct>;
    update(id: string, data: IProduct): Promise<IProduct>;
}
export default ProductService;
