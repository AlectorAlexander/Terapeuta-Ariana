import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import UsersService from './service/users.service';
import { LoggerMiddleware } from './service/jwt-middleware-consume'; // <- ajuste o caminho se necessário

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Pode ser só 'users' se quiser limitar
  }
}
