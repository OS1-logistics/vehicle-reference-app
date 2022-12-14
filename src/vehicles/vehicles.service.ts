import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class VehiclesService {
  logger = new Logger(this.constructor.name);

  @Inject(HttpService)
  private readonly httpService: HttpService;

  @Inject(ParticipantService)
  private readonly participantService: ParticipantService;

  private getVehiclesUrl(): string {
    return `${this.participantService.getParticipantServiceBaseUrl}/vehicles`;
  }

  async getAllVehicles(): Promise<AxiosResponse<any>> {
    return await this.httpService.axiosRef.get(this.getVehiclesUrl(), {
      headers: await this.participantService.buildHeaders(),
    });
  }

  async getVehicle(vehicleId: string): Promise<AxiosResponse<any>> {
    return await this.httpService.axiosRef.get(
      this.getVehiclesUrl + `/${vehicleId}`,
      {
        headers: await this.participantService.buildHeaders(),
      },
    );
  }
}
