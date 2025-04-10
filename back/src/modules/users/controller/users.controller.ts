/* eslint-disable indent */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IUser } from '../dtos/users.dtos';
import UsersService from '../service/users.service';
import { JwtAuthGuard } from '../service/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Body() userData: IUser): Promise<string> {
    try {
      const createdUserId = await this.usersService.create(userData);
      return createdUserId;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException({ message: error.message });
    }
  }

  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string },
  ): Promise<string> {
    try {
      const { email, password } = loginData;
      const user = await this.usersService.readOne(email, password);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({ message: error.message });
    }
  }

  @Get()
  async read(): Promise<IUser[]> {
    try {
      const users = await this.usersService.read();
      return users;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req: any,
    @Body() userUpdates: IUser | object,
  ): Promise<IUser> {
    try {
      const userId = req.user.id;
      const updatedUser = await this.usersService.update(userId, userUpdates);
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  @Put('byEmail')
  async updateByEmail(
    @Request() req: any,
    @Body() userUpdates: IUser | any,
  ): Promise<string> {
    try {
      const { email, ...restOfUserUpdates } = userUpdates;
      const updatedUser = await this.usersService.updateByEmail(
        email || 'pamonha',
        restOfUserUpdates,
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IUser> {
    try {
      const deletedUser = await this.usersService.delete(id);
      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  @Post('google-login')
  async googleLogin(
    @Body()
    googleData: {
      google_id: string;
      email: string;
      name: string;
      profile_photo?: string;
      phone: string;
    },
  ): Promise<string> {
    try {
      console.log('-------------------');
      console.log('[BACK] ROTA: /users/google-login');
      console.log('[BACK] Payload recebido:', googleData); // << loga tudo que chega do front

      if (!googleData.email || !googleData.google_id || !googleData.name) {
        console.warn('[BACK] Dados incompletos para login com Google.');
      }

      const token = await this.usersService.googleLogin(googleData);

      if (!token || typeof token !== 'string') {
        console.error('[BACK] Token não gerado ou inválido:', token); // << caso seja null ou malformado
      } else {
        const tokenPreview = token.slice(0, 20) + '...' + token.slice(-10);
        console.log('[BACK] Token JWT gerado:', tokenPreview); // << exibe pedaço do token pra debug
      }

      console.log('[BACK] Retornando token ao frontend.');
      console.log('-------------------');

      return token;
    } catch (error) {
      console.error('[BACK] Erro no login com Google:', error.message || error);
      throw new BadRequestException({ message: error.message });
    }
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string): Promise<unknown> {
    try {
      console.log('[BACK] Token recebido para validação:', token); // << LOG

      const isValid = await this.usersService.validate(token);

      console.log('[BACK] Resultado da validação:', isValid); // << LOG

      return isValid;
    } catch (error) {
      console.error('[BACK] Erro na validação de token:', error); // << LOG
      throw new BadRequestException('Invalid token');
    }
  }

  @Post('validate-number')
  async validateNumber(
    @Body()
    data: {
      google_id: string;
      email: string;
    },
  ): Promise<boolean> {
    try {
      console.log('[BACK] Verificando número com dados:', data); // << LOG
      const isValid =
        await this.usersService.doesUserHavePhoneNumberINTERROGATION(data);
      return isValid;
    } catch (error) {
      console.error('[BACK] Erro ao validar número:', error); // << LOG
      throw new BadRequestException('Invalid something');
    }
  }
}
