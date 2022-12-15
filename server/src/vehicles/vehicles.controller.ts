import {
  Controller,
  Get,
  Post,
  Inject,
  Logger,
  Param,
  Body,
  UsePipes,
} from '@nestjs/common';
import { VehicleDTO } from '../common/dto/vehicle/vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { ApiTags } from '@nestjs/swagger';
import { AddVehicleRequestDTO } from '../common/dto/vehicle/vehicle.request.dto';
import { AddVehicleSchema } from './validation/add-vehicle.schema.validation';
import { SchemaValidationPipe } from '../common/validation/validation.pipe';

@ApiTags('Vehicle')
@Controller('vehicles')
export class VehiclesController {
  private logger = new Logger(this.constructor.name);

  @Inject(VehiclesService)
  private readonly vehicleService: VehiclesService;

  @Get('/')
  private async getAllVehicles(): Promise<VehicleDTO[]> {
    return await this.vehicleService.getAllVehicles();
  }

  @Get('/:vehicleId')
  private async getVehicle(
    @Param('vehicleId') vehicleId: string,
  ): Promise<VehicleDTO> {
    return await this.vehicleService.getVehicle(vehicleId);
  }

  @Post('/')
  @UsePipes(new SchemaValidationPipe(AddVehicleSchema))
  private createVehicle(@Body() request: AddVehicleRequestDTO): Promise<void> {
    return this.vehicleService.addVehicle(request);
  }

  /*
  @Put('/:vehicleId/activate')
  private activateVehicle(@Headers() headers): Promise<void> {
    return this.vehicleService.
  }

  
  @Put('/:vehicleId/deactivate')
  private deactivateVehicle(@Headers() headers): Promise<void> {
    return;
  }

  @Put('/:vehicleId/kill')
  private killVehicle(@Headers() headers): Promise<void> {
    return;
  }
*/
}
