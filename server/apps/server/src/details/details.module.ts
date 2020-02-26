import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';

@Module({
  controllers: [DetailsController]
})
export class DetailsModule {}
