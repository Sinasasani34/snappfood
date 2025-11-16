import { Module } from "@nestjs/common";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserBasketEntity } from "./entities/basket.entity";
import { DscountEntity } from "../discount/entities/discount.entity";
import { DiscountService } from "../discount/discount.service";
import { MenuService } from "../menu/service/menu.service";
import { MenuEntity } from "../menu/entities/menu.entity";
import { MenuModule } from "../menu/menu.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserBasketEntity, DscountEntity]),
        AuthModule,
        MenuModule
    ],
    controllers: [BasketController],
    providers: [BasketService, DiscountService],
})
export class BasketModule {

}