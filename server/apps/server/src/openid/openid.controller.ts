import { Controller, HttpService, Injectable, Post, Body } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';

export class openidDto {
    @ApiProperty({ description: '登录时获取的 code' })
    code: string

    @ApiProperty({ description: '对应小程序平台 wx,tt,ali' })
    client: string

    @ApiProperty({ description: ' tt 平台 login 接口返回的匿名登录凭证' })
    anonymous_code: string
}

@Controller('openid')
@ApiTags("获取openid")
@Injectable()
export class OpenidController {
    constructor(private readonly httpService: HttpService, @InjectModel(User) private readonly model) { }

    @Post()
    @ApiOperation({ summary: '登录凭证校验' })
    async code2openid(@Body() dto: openidDto) {
        let config = {
            wx: `https://api.weixin.qq.com/sns/jscode2session?appid=wx72c58ac53c5646b3&secret=e8fa03adf44d8b01feb8e43786fbd58e&js_code=${dto.code}&grant_type=authorization_code`,
            tt: `https://developer.toutiao.com/api/apps/jscode2session?appid=ttfd938b2e62b9e7d0&secret=c42080e000694d73354da0a371caf34ce85979c1&code=${dto.code}&anonymous_code=${dto.anonymous_code}`
        }

        let data = {};
        try {
            let res = await this.httpService.get(config[dto.client]).toPromise();
            let user = await this.model.findOne({ openid: res.data.openid });
            if (!user) {
                user = await this.model.create({ openid: res.data.openid, client: dto.client });
            }
            data = {
                success: true, code: 0, user
            }
        } catch (e) {
            data = {
                success: false, code: 500, msg: e.message
            }
        }
        return data;
    }
};
