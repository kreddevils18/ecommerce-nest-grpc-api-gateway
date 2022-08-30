import { AuthService } from './../auth/auth.service';
import { PRODUCT_SERVICE_NAME, PRODUCT_PACKAGE_NAME } from './proto/product';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: PRODUCT_PACKAGE_NAME,
          protoPath:
            'node_modules/ecommerce-nest-grpc-proto/proto/product.proto',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
