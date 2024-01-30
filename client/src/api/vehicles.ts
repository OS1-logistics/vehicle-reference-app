import { OS1HttpClient } from '@foxtrotplatform/console-ui-react'
import { v4 as uuidv4 } from 'uuid';

import { getUxDateDisplay } from '../utils/dates';
import { VEHICLE_NAME_PLURAL } from '../utils/constants';
import { subscribe } from 'diagnostics_channel';

export const subscribeTopic = async(client: any)=>{
  const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
  await axiosClient.subscribeBroadCastTopic([ "Test12", "Test13"])
}

export const unSubscribeTopic = async(client: any)=>{
  const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
  await axiosClient.unsubscribeBroadCastTopic([ "Test12"])
}

export const getVehicles = async (client: any) => {
  if (client) {
    const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
    //await axiosClient.subscribeBroadCastTopic([ "Test12"])
    const resp = await axiosClient.get('/os1-vehicle-reference-app/api/v1/vehicles', 'getVehicles');
    const vehicleData = <VehicleParticipant[]>(resp.data);

    return vehicleData.map((vehicle) => getDisplayFromParticipant(vehicle));
  }
};


export const getToken = async (client: any) => {
  if (client) {
    const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
    const resp = await axiosClient.get('/os1-vehicle-reference-app/api/v1/vehicles/token', 'getToken');
    const token = <any>(resp.data);

    return token;
  }
};
export const fetchVehicle = async (id: string, client: any) => {
  const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);

  try {
    const resp = await axiosClient.get(`/os1-vehicle-reference-app/api/v1/vehicles/${id}`,'fetchVehicles-id');
    return getDisplayFromParticipant(resp);
  } catch (error) {
    console.error('error', error);
  }
};


export const createVehicle = async (
  data: VehicleParticipantForm,
  client: any
): Promise<void> => {
  const dto = getDtoFromDisplay(data);
  dto['callback'] = {
    "url": "{{SSE_BROADCAST(Test12)}}",
    "meta": {}
  }
  console.log("api call requested :-", new Date(), "having unix timestamp:- ", Date.now())
  const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
  try {
    await axiosClient.post(
      `/os1-vehicle-reference-app/api/v1/vehicles`,
      dto,
      'createVehicles',
      {withAuth: false},
      );
    console.log("api call recieved :-", new Date(), "having unix timestamp:- ", Date.now())  
    return;
  } catch (error) {
    console.error('error', error);
  }
};

export const editVehicle = async (
  id: string,
  data: VehicleParticipantProperties,
  client: any
): Promise<void> => {
  const properties = { properties: getParticipantProperties(data) };

  const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}/vehicles/${id}`);

  try {
    const requestTime = Date.now()
    console.log("Request for callback Url", new Date())
    const sseClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
    const callbackUrl = await sseClient.getEventBrokerUrl()
    console.log("callback Url Revieved and api call is made after ms:- ", Date.now() - requestTime, "current Time is :-", new Date() )
    properties.properties['callback'] = {
      "url": callbackUrl.callback,
      "meta": {id}
    }

    await axiosClient.put('/',properties,'editehicles-1');
    await sseClient.broadCastEvents([ "Test12"], properties.properties )
    return;
  } catch (error) {
    console.error('error', error);
  }
};

export const transitionStates = async (
  newState: string,
  vehicleIds: string[],
  client: any
) => {
  const calls = vehicleIds.map((id) => {
    const axiosClient = new OS1HttpClient(client.authInitializer, `https://${window.location.hostname}`);
    try {
      return axiosClient.put(`/api/vehicles/${id}/transition`, { state: newState }, 'transitionStates');
    } catch (error) {
      console.error('error', error);
    }
  });

  await Promise.all(calls);

  return;
};

export const getDisplayFromParticipant = (
  participant: any
): VehicleDisplay => {
  return {
    id: participant.id,
    state: participant.state,
    uniqueCode: participant?.uniqueCode,
    owner: participant?.owner,
    category: participant?.category || '',
    name: participant.name,
    properties: participant.properties,
    createdAt: getDateStructure(participant.createdAt),
    createdBy: participant?.createdBy?.name,
    updatedAt: getDateStructure(participant?.updatedAt),
    updatedBy: participant?.updatedBy?.name,
  };
};

export const getDateStructure = (epoch: number): DateInfo => {
  return {
    epoch,
    display: getUxDateDisplay(epoch),
  };
};

const getDtoFromDisplay = (data: VehicleDisplay): AddVehicleRequestDTO => {
  const dto: AddVehicleRequestDTO = {
    uniqueCode: data.uniqueCode,
    name: data.name,
    owner: data.owner,
    category: data.category,
    properties: getParticipantProperties(data.properties),
  };

  if (dto.properties && typeof dto.properties?.registrationYear === 'string') {
    dto.properties.registrationYear = parseInt(dto.properties.registrationYear);
  }

  return dto;
};

const getParticipantProperties = (
  initial: VehicleParticipantProperties
): VehicleParticipantProperties => {
  const props: VehicleParticipantProperties = {};

  if (
    typeof initial.registrationYear === 'string' &&
    initial.registrationYear !== ''
  ) {
    initial.registrationYear = parseInt(initial.registrationYear);
  }

  for (const [key, val] of Object.entries(initial)) {
    const isValidValue = val !== null && val !== '';
    if (initial.hasOwnProperty(key) && isValidValue) {
      props[key] = val;
    }
  }

  return props;
};
