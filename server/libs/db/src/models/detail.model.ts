import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class Detail {
    @ApiProperty({ description: '用户' })
    @prop()
    user: string;

    @ApiProperty({ description: '地区', example: ["河北省", "石家庄市", "新华区"] })
    @prop()
    region: string[];

    @ApiProperty({ description: '体温', example: "26.3" })
    @prop()
    bodyTemp: string;

    @ApiProperty({ description: '状态', example: "集中隔离" })
    @prop()
    status: string;

    @ApiProperty({ description: '症状', example: ["发热37.3℃以下", "乏力"] })
    @prop()
    symptom: string[];

    @ApiProperty({ description: '其他症状', example: "头疼" })
    @prop()
    other: string;

    @ApiProperty({ description: '家属健康情况', example: "正常" })
    @prop()
    family: string;

    @ApiProperty({ description: '社区情况', example: "正常" })
    @prop()
    community: string;

    @ApiProperty({ description: '其他情况', example: '正常' })
    @prop()
    otherInfo: string;
}