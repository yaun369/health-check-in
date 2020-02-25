import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Group } from '@libs/db/models/group.model';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: Group
})

@ApiTags("打卡小组")
@Controller('groups')
export class GroupsController {
    constructor(@InjectModel(Group) private readonly model) { }
}