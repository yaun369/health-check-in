import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { OpenidModule } from './openid/openid.module';
import { DetailsModule } from './details/details.module';

@Module({
  imports: [DbModule, UsersModule, OpenidModule, DetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
