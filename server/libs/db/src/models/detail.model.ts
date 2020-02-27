import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { User } from './user.model'

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class Detail {

    @ApiProperty({ description: '日期', example: "2020/02/26" })
    @prop()
    time: string

    @ApiProperty({ description: '用户openid', example: "o7tAC0T8jgEzjC-i5L6WUzrCcmkg" })
    @prop()
    openid: string

    @ApiProperty({ description: '地区', example: ["河北省", "石家庄市", "新华区"] })
    @prop()
    region: string[]

    @ApiProperty({ description: '体温', example: "26.3" })
    @prop()
    bodyTemp: string

    @ApiProperty({ description: '状态', example: "集中隔离" })
    @prop()
    status: string

    @ApiProperty({ description: '症状', example: ["发热37.3℃以下", "乏力"] })
    @prop()
    symptom: string[]

    @ApiProperty({ description: '其他症状', example: "头疼" })
    @prop()
    other: string

    @ApiProperty({ description: '家属健康情况', example: "正常" })
    @prop()
    family: string

    @ApiProperty({ description: '社区情况', example: "正常" })
    @prop()
    community: string

    @ApiProperty({ description: '其他情况', example: '正常' })
    @prop()
    otherInfo: string
}