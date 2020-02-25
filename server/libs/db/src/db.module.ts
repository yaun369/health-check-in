import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Detail } from './models/detail.model';
import { Group } from './models/group.model';

const models = TypegooseModule.forFeature([User, Detail, Group]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/checkin-miniapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
