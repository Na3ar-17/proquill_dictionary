import {
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GqlContext } from 'src/types/context.type';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthResponse } from './dto/auth-response.dto';
@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @UsePipes(new ValidationPipe())
  async login(
    @Args('loginDto') dto: CreateUserInput,
    @Context() context: GqlContext,
  ) {
    const res = context.res;
    const { refreshToken, ...response } = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse)
  @UsePipes(new ValidationPipe())
  async register(
    @Args('registerDto') dto: CreateUserInput,
    @Context() context: GqlContext,
  ) {
    const res = context.res;
    const { refreshToken, ...response } = await this.authService.register(dto);
    await this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Mutation(() => AuthResponse, { name: 'getNewTokens' })
  @UsePipes(new ValidationPipe())
  async getNewTokens(@Context() context) {
    const { res, req }: GqlContext = context;

    const refreshTokenFromCookies =
      await req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!refreshTokenFromCookies) {
      await this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies,
    );

    await this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }

  @Mutation(() => Boolean)
  @UsePipes(new ValidationPipe())
  @Auth()
  async logout(@Context() context) {
    this.authService.removeRefreshTokenFromResponse(context.res);
    return true;
  }
}
