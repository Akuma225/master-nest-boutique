import { Product } from "src/resources/product/entities/product.entity"
import { CategoryVm } from "./category.vm"

export class ProductVm {
    id: number
    name: string
    description: string
    price: number
    category: CategoryVm

    constructor(data: Product) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.price = data.price
        this.category = data.category
    }
}