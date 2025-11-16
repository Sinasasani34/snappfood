import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserBasketEntity } from "./entities/basket.entity";
import { Repository } from "typeorm";
import { BasketDto } from "./dto/basket.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { RequestUser } from "../user/interface/request-user.interface";
import { MenuService } from "../menu/service/menu.service";

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
    constructor(
        @InjectRepository(UserBasketEntity)
        private basketRepository: Repository<UserBasketEntity>,
        private menuService: MenuService,
        @Inject(REQUEST) private req: Request,
    ) { }

    async addToBasket(basketDto: BasketDto) {
        const { id: userId } = this.req.user as RequestUser;
        const { foodId } = basketDto;
        const food = await this.menuService.getOne(foodId);
        let basketItem = await this.basketRepository.findOne({
            where: {
                userId,
                foodId
            }
        });
        if (basketItem) {
            basketItem.count += 1;
        } else {
            basketItem = this.basketRepository.create({
                foodId,
                userId,
                count: 1
            });
        }
        await this.basketRepository.save(basketItem);
        return {
            message: "غذا به سبد خرید اضافه شد"
        }
    }
    async removeFromBasket(basketDto: BasketDto) {
        const { id: userId } = this.req.user as RequestUser;
        const { foodId } = basketDto;
        const food = await this.menuService.getOne(foodId);
        let basketItem = await this.basketRepository.findOne({
            where: {
                userId,
                foodId
            }
        });
        if (basketItem) {
            if (basketItem.count <= 1) {
                await this.basketRepository.delete({ id: basketItem.id });
            } else {
                basketItem.count -= 1;
                await this.basketRepository.save(basketItem);
            }
            return {
                message: "با موفقیت از سبد خرید حذف شد"
            }
        }
        throw new NotFoundException('غذایی در سبد خرید یافته نشده است')
    }
    async getBasket() { }
    async addDiscount() { }
    async removeDiscount() { }
}