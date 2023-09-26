import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('roles')
// @ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
