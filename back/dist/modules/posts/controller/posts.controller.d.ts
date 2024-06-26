import PostService from '../service/posts.service';
import { IPost } from '../dtos/post.dtos';
export declare class PostController {
    private readonly PostService;
    constructor(PostService: PostService);
    create(req: any, data: IPost): Promise<IPost>;
    getRecentPosts(limit: number): Promise<IPost[]>;
    read(): Promise<IPost[]>;
    readOne(id: string): Promise<IPost>;
    updateWithoutToken(req: any, id: string, { data, secret }: {
        data: IPost;
        secret: string;
    }): Promise<IPost>;
    update(req: any, id: string, { data, secret }: {
        data: IPost;
        secret: string;
    }): Promise<IPost>;
    delete(req: any, id: string): Promise<IPost>;
}
