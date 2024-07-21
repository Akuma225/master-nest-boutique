import { IsString, Length } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @Length(3, 60)
    name: string

    @IsString()
    description: string
}
