import { Moment } from 'moment';
import { IClient } from 'app/shared/model/client.model';
import { IStatusInformation } from 'app/shared/model/status-information.model';
import { ReportStatus } from 'app/shared/model/enumerations/report-status.model';

export interface IReport {
  id?: number;
  name?: string;
  dateCreated?: Moment;
  dateLastModified?: Moment;
  content?: string;
  status?: ReportStatus;
  client?: IClient;
  statusInformations?: IStatusInformation[];
}

export const defaultValue: Readonly<IReport> = {};
