import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';

@Module({
  controllers: [GroupsController]
})
export class GroupsModule {}
