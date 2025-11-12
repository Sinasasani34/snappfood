import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { DiscountService } from "./discount.service";
import { FormType } from "src/common/enum/form-type.enum";
import { DiscountDto } from "./dto/discount.dto";

@Controller('discount')
@ApiTags("Discount")
export class DiscountController {
    constructor(
        private discountService: DiscountService
    ) { }

    @Post()
    @ApiConsumes(FormType.UrlEncoded, FormType.JSON)
    create(@Body() discountDto: DiscountDto) {
        return this.discountService.create(discountDto);
    }

    @Get()
    findAll() {
        return this.discountService.findAll();
    }

    @Delete("/:id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.discountService.delete(id);
    }
}