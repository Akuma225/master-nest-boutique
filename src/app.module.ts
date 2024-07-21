import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './resources/product/product.module';
import { CategoryModule } from './resources/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
