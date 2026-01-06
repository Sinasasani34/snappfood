import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserBasketEntity } from "../basket/entities/basket.entity";
import { DscountEntity } from "../discount/entities/discount.entity";
import { MenuEntity } from "../menu/entities/menu.entity";
import { TypeEntity } from "../menu/entities/type.entity";
import { OrderEntity } from "../order/entities/order.entity";
import { UserAddressEntity } from "../user/entity/address.entity";
import { PaymentEntity } from "./entities/payment.entity";
import { BasketService } from "../basket/basket.service";
import { MenuService } from "../menu/service/menu.service";
import { DiscountService } from "../discount/discount.service";
import { MenuTypeService } from "../menu/service/type.service";
import { OrderService } from "../order/order.service";
import { s3Service } from "../s3/s3.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserBasketEntity,
      DscountEntity,
      MenuEntity,
      TypeEntity,
      OrderEntity,
      UserAddressEntity,
      PaymentEntity,
    ]),
  ],
  providers: [
    PaymentService,
    BasketService,
    MenuService,
    DiscountService,
    MenuTypeService,
    OrderService,
    s3Service,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
