export interface VehicleDTO {
  name: string;
  code: string;
  category: string;
  subcategory: string;
  mode: string;
  fuelType: string;
  operatorId: string;
  payloadCapacity: string;
  registrationNumber: string;
  registrationYear: number;
  availability: boolean;
}

export interface VehicleProperties {
  mode?: string;
  fuelType?: string;
  operatorId?: string;
  payloadCapacity?: string;
  registrationNumber?: string;
  registrationYear?: number;
  availability?: boolean;
}

export interface GetAllVehiclesResponse {
  data: VehicleDTO[];
}
