import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('2.user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Post('/role')
  @ApiOperation({ summary: 'Видати роль' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Delete('/role/:userId/:roleValue')
  deleteRoleFromUser(
    @Param('userId') userId: number,
    @Param('roleValue') roleValue: string,
  ) {
    return this.userService.deleteRoleFromUser(userId, roleValue);
  }

  @Get()
  @ApiOperation({ summary: 'All user' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
