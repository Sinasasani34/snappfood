import { EntityNames } from "src/common/enum/entity-name.enum";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(EntityNames.Payment)
export class PaymentEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ default: false })
  status: boolean;

  @Column()
  amount: number;

  @Column()
  invoice_number: string;

  @Column({ nullable: true })
  authority: string;

  @Column()
  userId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => OrderEntity, (order) => order.payments, {
    onDelete: 'CASCADE'
  })
  order: OrderEntity;

  @CreateDateColumn()
  created_at: Date;
}
