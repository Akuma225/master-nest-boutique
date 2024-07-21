import { IsNumber, IsString, Length, Min } from "class-validator"

export class CreateProductDto {
    @IsString()
    @Length(3, 60)
    name: string

    @IsNumber()
    @Min(100)
    price: number

    @IsNumber()
    @Min(0)
    quantity: number

    @IsString()
    description: string

    @IsNumber()
    category_id: number
}
