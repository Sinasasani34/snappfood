import { Controller, Post, Body, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplementaryInformationDto, SupplierSignupDto, UploadDocsDto } from './dto/supplier.dto';
import { CheckOtpDto } from '../auth/dto/otp.dto';
import { SupplierAuth } from 'src/common/decorators/auth.decorator';
import { uploadFileFieldsS3 } from 'src/common/interceptors/upload-file.interceptor';
import { ApiConsumes } from '@nestjs/swagger';
import { FormType } from 'src/common/enum/form-type.enum';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post('/signup')
  @ApiConsumes(FormType.UrlEncoded)
  signup(@Body() supplierDto: SupplierSignupDto) {
    return this.supplierService.signup(supplierDto)
  }

  @Post('/check-otp')
  @ApiConsumes(FormType.UrlEncoded)
  checkOtp(@Body() SendotpDto: CheckOtpDto) {
    return this.supplierService.checkOtp(SendotpDto)
  }

  @Post('/supplementary-information')
  @SupplierAuth()
  supplementaryInformation(@Body() infoDto: SupplementaryInformationDto) {
    return this.supplierService.saveSupplementaryInformation(infoDto)
  }
  @Put('/upload-documents')
  @SupplierAuth()
  @ApiConsumes(FormType.Multipart)
  @UseInterceptors(uploadFileFieldsS3([{ name: 'acceptedDoc', maxCount: 1 }, { name: 'image', maxCount: 1 }]))
  uploadDocuments(@Body() infoDto: UploadDocsDto, @UploadedFiles() files: any) {
    return this.supplierService.uploadDocuments(files)
  }
}
