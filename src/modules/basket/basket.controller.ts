import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { BasketService } from "./basket.service";
import { BasketDto } from "./dto/basket.dto";
import { UserAuth } from "src/common/decorators/auth.decorator";
import { FormType } from "src/common/enum/form-type.enum";

@Controller('basket')
@ApiTags("Basket")
@UserAuth()
export class BasketController {
    constructor(private basketService: BasketService) { }

    @Post()
    @ApiConsumes(FormType.UrlEncoded, FormType.JSON)
    addToBasket(@Body() basketDto: BasketDto) {
        return this.basketService.addToBasket(basketDto)
    }

    @Delete()
    @ApiConsumes(FormType.UrlEncoded, FormType.JSON)
    removeFromBasket(@Body() basketDto: BasketDto) {
        return this.basketService.removeFromBasket(basketDto)
    }

    @Get()
    getBasket() { }
}