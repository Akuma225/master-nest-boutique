import { Category } from "src/resources/category/entities/category.entity"

export class Product {
    id: number
    name: string
    price: number
    quantity: number
    description: string
    createdAt: Date
    updatedAt: Date
    category?: Category
}
