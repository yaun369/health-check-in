import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { User } from './user.model'

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class Group {
    @ApiProperty({ description: '管理员' })
    @prop({ ref: 'User' })
    admin: Ref<User>

    @ApiProperty({ description: '小组名称', example: '一润一达' })
    @prop()
    name: string

    @ApiProperty({ description: '小组成员' })
    @arrayProp({ itemsRef: 'User' })
    member: Ref<User>[]
}