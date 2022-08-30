import { AuthService } from './../auth/auth.service';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './proto/order';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/ecommerce-nest-grpc-proto/proto/order.proto',
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
