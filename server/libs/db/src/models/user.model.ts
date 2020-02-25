import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class User {
    @ApiProperty({ description: 'openid', example: 'test_openid' })
    @prop({ unique: true })
    openid: string;

    @ApiProperty({ description: '姓名', example: 'Geek' })
    @prop()
    name: string;

    @ApiProperty({ description: '性别', example: '男' })
    @prop()
    gender: string;

    @ApiProperty({ description: '手机号', example: '13323451234' })
    @prop()
    phone: string;

    @ApiProperty({ description: '工号', example: 'SG1233' })
    @prop()
    jobNum: string;
}