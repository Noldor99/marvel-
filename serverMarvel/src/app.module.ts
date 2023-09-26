import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { HeroModule } from './hero/hero.module';
import { ImageModule } from './imageHero/image.module';
import { PowerModule } from './power/power.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    HeroModule,
    FilesModule,
    ImageModule,
    PowerModule,
    BrandModule,
    UserModule,
    AuthModule,
    RolesModule,
  ],
})
export class AppModule {}
