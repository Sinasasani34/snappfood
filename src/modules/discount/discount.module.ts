import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DscountEntity } from "./entities/discount.entity";
import { DiscountService } from "./discount.service";
import { DiscountController } from "./discount.controller";

@Module({
    imports: [TypeOrmModule.forFeature([DscountEntity])],
    providers: [DiscountService],
    controllers: [DiscountController],
    exports: []
})
export class DiscountModule { }