import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DscountEntity } from "./entities/discount.entity";
import { DiscountDto } from "./dto/discount.dto";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(DscountEntity) private discountRepository: Repository<DscountEntity>
    ) { }

    async create(discountDto: DiscountDto) {
        const { amount, code, expires_in, limit, percent } = discountDto;
        await this.checkExistCode(code);
        const discountObject: DeepPartial<DscountEntity> = { code };
        if ((!amount && !percent) || (amount && percent)) {
            throw new BadRequestException(
                'You must enter one of the amount or percent fields'
            )
        }
        if (amount && !isNaN(parseFloat(amount.toString()))) {
            discountObject['amount'] = amount;
        } else if (percent && isNaN(parseFloat(percent.toString()))) {
            discountObject['percent'] = percent;
        }

        if (expires_in && !isNaN(parseInt(expires_in.toString()))) {
            const time = 1000 * 60 * 60 * 24 * expires_in;
            discountObject['expires_in'] = new Date(new Date().getTime() + time);
        }
        if (limit && !isNaN(parseInt(limit.toString()))) {
            discountObject['limit'] = limit;
        }

        const discount = this.discountRepository.create(discountObject);
        await this.discountRepository.save(discount);
        return {
            message: 'تخفیف با موفقیت ایجاد شد'
        }
    }

    async checkExistCode(code: string) {
        const discount = await this.discountRepository.findOneBy({ code });
        if (discount) throw new ConflictException('کد وجود دارد');
    }
}