import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db'
import { UsersModule } from './users/users.module';
import { DetailsModule } from './details/details.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [DbModule, UsersModule, DetailsModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
