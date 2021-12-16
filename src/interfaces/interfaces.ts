export interface IConditions {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  bu: string;
  ka: string;
  no: string;
  rank: string;
  name: string;
}

export interface IHolidays {
  id: number;
  date: string;
  name: string;
}

export interface IReport {
  id: number;
  employee_id: number;
  date: string;
  condition_id: number;
  reason: string;
  isChanged: boolean | undefined;
}
