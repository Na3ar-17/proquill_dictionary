import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import {
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { Request, Response } from 'express';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthResponse)
  @UsePipes(new ValidationPipe())
  async login(@Args('loginDto') dto: CreateUserInput, @Context() context) {
    const res: Response = context.res;
    const { refreshToken, ...response } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse)
  @UsePipes(new ValidationPipe())
  async register(
    @Args('registerDto') dto: CreateUserInput,
    @Context() context,
  ) {
    const res: Response = context.res;
    const { refreshToken, ...response } = await this.authService.register(dto);
    await this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async getNewTokens(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token to passed');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return true;
  }
}
