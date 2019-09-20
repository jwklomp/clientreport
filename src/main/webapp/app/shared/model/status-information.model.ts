import { Moment } from 'moment';
import { IReport } from 'app/shared/model/report.model';

export interface IStatusInformation {
  id?: number;
  dateCreated?: Moment;
  message?: string;
  report?: IReport;
}

export const defaultValue: Readonly<IStatusInformation> = {};
