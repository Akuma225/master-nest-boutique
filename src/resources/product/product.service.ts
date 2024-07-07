import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/commons/services/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto
    })
  }

  async findAll() {
    return this.prismaService.product.findMany({
      orderBy: [
        { createdAt: "desc" }
      ]
    })
  }

  async findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // Check if product exists

    const existingProduct = await this.prismaService.product.findUnique({
      where: {
        id
      }
    })

    if (!existingProduct) {
      throw new HttpException("Le produit n'existe pas !", HttpStatus.NOT_FOUND)
    }

    return this.prismaService.product.update({
      data: {
        name: updateProductDto.name || existingProduct.name,
        price: updateProductDto.price || existingProduct.price,
        description: updateProductDto.description || existingProduct.description,
        quantity: updateProductDto.quantity || existingProduct.quantity
      },
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    return this.prismaService.product.delete({
      where: {
        id
      }
    })
  }
}
