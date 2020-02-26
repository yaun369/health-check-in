import { Module, HttpModule } from '@nestjs/common';
import { OpenidController } from './openid.controller';

@Module({
  imports: [HttpModule],
  controllers: [OpenidController]
})
export class OpenidModule {}
