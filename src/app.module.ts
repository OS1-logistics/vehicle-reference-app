import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicles/vehicle.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParticipantService } from './participant/participant.service';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [VehicleModule, VehiclesModule],
  controllers: [AppController],
  providers: [AppService, ParticipantService],
})
export class AppModule {}
