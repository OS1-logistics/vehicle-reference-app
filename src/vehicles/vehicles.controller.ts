import {
  Controller,
  Get,
  Post,
  Put,
  Headers,
  Inject,
  Logger,
} from '@nestjs/common';
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

  @Put('/:vehicleId/activate')
  private activateVehicle(@Headers() headers): Promise<void> {
    return;
  }

  @Put('/:vehicleId/deactivate')
  private deactivateVehicle(@Headers() headers): Promise<void> {
    return;
  }

  @Put('/:vehicleId/kill')
  private killVehicle(@Headers() headers): Promise<void> {
    return;
  }
}
