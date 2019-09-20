import { ILocation } from 'app/shared/model/location.model';
import { IReport } from 'app/shared/model/report.model';

export interface IClient {
  id?: number;
  name?: string;
  email?: string;
  location?: ILocation;
  reports?: IReport[];
}

export const defaultValue: Readonly<IClient> = {};
