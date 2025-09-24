import { PartialType } from '@nestjs/mapped-types';
import { SupplierSignupDto } from './supplier.dto';

export class UpdateSupplierDto extends PartialType(SupplierSignupDto) { }
