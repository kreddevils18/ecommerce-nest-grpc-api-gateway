import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  OrderServiceClient,
  ORDER_SERVICE_NAME,
} from './proto/order';
import {
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from 'rxjs';
import { Request } from 'express'

@Controller('orders')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(
    @Req() req: Request,
  ): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;

    body.userId = req['userId']

    return this.svc.createOrder(body);
  }
}
