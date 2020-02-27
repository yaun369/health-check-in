import { Controller, Post, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Detail } from '@libs/db/models/detail.model';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
    model: Detail,
    routes: {
        findOne: false,
        update: false,
        delete: false
    }
})
@ApiTags("打卡详情")
@Controller('details')
export class DetailsController {
    constructor(@InjectModel(Detail) private readonly model) { }

    formatNumber = (n: string | any[]) => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    formatTime = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }) => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return [year, month, day].map(this.formatNumber).join('/')
    }

    @Post()
    async details(@Body() data: Detail) {
        let todays = this.formatTime(new Date());
        let detail = await this.model.find({ time: data.time, openid: data.openid });
        let res = {};
        if (detail.length) {
            await this.model.updateOne({ _id: detail[0]._id }, data);
            res = {
                todays,
                msg: '今日已打卡，数据更新成功',
                code: 0,
                data: data
            }
        } else {
            detail = await this.model.create(data);
            res = {
                todays,
                msg: '今日打卡成功',
                code: 0,
                data: detail
            }
        }
        return res;
    }
}
