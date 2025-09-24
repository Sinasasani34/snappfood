import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIdentityCard, IsMobilePhone, Length } from "class-validator";

export class SupplierSignupDto {
    @ApiProperty()
    categoryId: number;

    @ApiProperty()
    store_name: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    @Length(3, 50)
    manager_name: string;

    @ApiProperty()
    @Length(3, 50)
    manager_family: string;

    @ApiProperty()
    @IsMobilePhone('fa-IR', {}, { message: 'شماره وارد شده معتبر نمیباشد' })
    phone: string;

    @ApiPropertyOptional()
    invite_code: string;
}


export class SupplementaryInformationDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsIdentityCard('IR')
    national_code: string;
}
export class UploadDocsDto {
    @ApiProperty({ format: 'binary' })
    acceptedDoc: string;

    @ApiProperty({ format: 'binary' })
    image: string;
}