import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/commons/services/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    const existingCategory = await this.prismaService.category.findUnique({
      where: {
        id: createProductDto.category_id
      }
    })

    if (!existingCategory) {
      throw new HttpException("La catégorie n'existe pas", HttpStatus.NOT_FOUND)  
    }

    return this.prismaService.product.create({
      data: createProductDto,
      include: {
        category: true
      }
    })
  }

  async findAll() {
    return this.prismaService.product.findMany({
      orderBy: [
        { createdAt: "desc" }
      ],
      include: {
        category: true
      }
    })
  }

  async findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: {
        id
      },
      include: {
        category: true
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

    let category_id = existingProduct.category_id

    if (updateProductDto.category_id) {
      const existingCategory = await this.prismaService.category.findUnique({
        where: {
          id: updateProductDto.category_id
        }
      })
  
      if (!existingCategory) {
        throw new HttpException("La catégorie n'existe pas", HttpStatus.NOT_FOUND)  
      }

      category_id = updateProductDto.category_id
    }

    return this.prismaService.product.update({
      data: {
        name: updateProductDto.name || existingProduct.name,
        price: updateProductDto.price || existingProduct.price,
        description: updateProductDto.description || existingProduct.description,
        quantity: updateProductDto.quantity || existingProduct.quantity,
        category_id: category_id
      },
      where: {
        id
      },
      include: {
        category: true
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
