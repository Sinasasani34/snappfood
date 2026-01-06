import { EntityNames } from "src/common/enum/entity-name.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemsStatus } from "../enums/status.enum";
import { MenuEntity } from "src/modules/menu/entities/menu.entity";
import { OrderEntity } from "./order.entity";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";

@Entity(EntityNames.OrderItme)
export class OrderItemEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  foodId: number;

  @Column()
  orderId: number;

  @Column()
  count: number;

  @Column()
  supplierId: number;

  @Column({
    type: "enum",
    enum: OrderItemsStatus,
    default: OrderItemsStatus.Pending,
  })
  status: string;

  @ManyToOne(() => MenuEntity, (menu) => menu.orders, { onDelete: "CASCADE" })
  food: MenuEntity;

  @ManyToOne(() => OrderEntity, (supplier) => supplier.items, {
    onDelete: "CASCADE",
  })
  order: OrderEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.orders, {
    onDelete: "CASCADE",
  })
  supplier: SupplierEntity;
}
