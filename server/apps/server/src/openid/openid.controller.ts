import { Controller, HttpService, Injectable, Post, Body } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';

export class openidDto {
    @ApiProperty({ description: '登录时获取的 code' })
    code: string
}

@Controller('openid')
@ApiTags("获取openid")
@Injectable()
export class OpenidController {
    constructor(private readonly httpService: HttpService, @InjectModel(User) private readonly model) { }

    @Post()
    @ApiOperation({ summary: '登录凭证校验' })
    async code2openid(@Body() dto: openidDto) {
        let APPID = `wx72c58ac53c5646b3`;
        let SECRET = `e8fa03adf44d8b01feb8e43786fbd58e`;
        let JSCODE = dto.code;
        let uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
        let data = {};
        try {
            let res = await this.httpService.get(uri).toPromise();
            let user = await this.model.findOne({ openid: res.data.openid });
            if (!user) {
                user = await this.model.create({ openid: res.data.openid });
            }
            data = {
                success: true, code: 0, user
            }
        } catch (e) {
            console.log(e);
            data = {
                success: false, code: 500, msg: '存取数据出现错误'
            }
        }
        return data;
    }
}
