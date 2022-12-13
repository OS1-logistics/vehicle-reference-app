import { Controller, Get, Post, Headers, Inject, Logger } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  private logger = new Logger(this.constructor.name);

  @Inject(VehiclesService)
  private readonly vehicleService: VehiclesService;

  @Get('/')
  private getAllVehicles(@Headers() headers): Promise<void> {
    return;
  }

  @Get('/:vehicleId')
  private getVehicle(@Headers() headers): Promise<void> {
    return;
  }

  @Post('/')
  private createVehicle(@Headers() headers): Promise<void> {
    return;
  }
}
