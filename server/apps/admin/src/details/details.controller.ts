import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Detail } from '@libs/db/models/detail.model';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: Detail
})
@ApiTags("详情")
@Controller('details')
export class DetailsController {
    constructor(@InjectModel(Detail) private readonly model) { }
}