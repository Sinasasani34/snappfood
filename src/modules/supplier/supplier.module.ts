import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierOTPEntity } from './entities/otp.entity';
import { s3Service } from '../s3/s3.service';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, SupplierOTPEntity, CategoryEntity])],
  controllers: [SupplierController],
  providers: [SupplierService, s3Service, CategoryService, JwtService],
  exports: [SupplierService, JwtService, s3Service, TypeOrmModule]
})
export class SupplierModule { }
