import { Request, Response } from 'express';
import { getVisitorsFromDB } from './db';

export interface TResponse<TResult> {
  results: TResult[] | null;
  success: boolean;
  error: null | {
    message: string;
    code: number;
  };
}

export interface Visitors {
  isNewInPeriod: boolean;
  currentVisits: number;
  previousVisits: number;
  daysActive: number;
  fullName: string;
  userName: string;
  userId: string;
  requiredLicenseType: 'CONSUMER' | 'AUTHOR';
  effectiveLicenseType: 'CONSUMER' | 'AUTHOR';
  workflowParticipationFlag: boolean;
  firstActive: string;
  lastActive: string;
  isDeletedUser: boolean;
  isDisabledUser: boolean;
}

const getVisitors = (_req: Request, res: Response) => {
  return res
    .status(200)
    .json({ results: getVisitorsFromDB(), success: true, error: null });
};

export default { getVisitors };
