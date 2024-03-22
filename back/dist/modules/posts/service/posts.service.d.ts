import { IService } from 'src/modules/interfaces/IService';
import { IPost } from '../dtos/post.dtos';
declare class PostService implements IService<IPost> {
    private _post;
    constructor();
    private sortByDateCreation;
    getRecentPosts(limit: number): Promise<IPost[]>;
    private validateDataAndCreate;
    create(data: IPost): Promise<IPost>;
    delete(id: string): Promise<IPost>;
    read(): Promise<IPost[]>;
    readOne(id: string): Promise<IPost>;
    update(id: string, data: IPost): Promise<IPost>;
}
export default PostService;
