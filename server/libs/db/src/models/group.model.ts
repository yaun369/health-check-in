import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class Group {
    @ApiProperty({ description: '小组名称', example: '一润一达' })
    @prop()
    name: string;

    @ApiProperty({ description: '小组成员', example: '13323451234' })
    @prop()
    member: string;
}