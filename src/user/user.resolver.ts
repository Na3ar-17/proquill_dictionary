import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @Auth()
  findOne(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Mutation(() => User, { name: 'update_user' })
  @Auth()
  updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
    @CurrentUser('id') id: string,
  ) {
    return this.userService.update(id, updateUserDto);
  }
}
