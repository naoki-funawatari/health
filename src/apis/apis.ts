interface IConditions {
  id: number;
  name: string;
}

const fetchConditions = async (): Promise<IConditions[]> => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/conditions`;
  const res = await fetch(url);
  return res.json();
};

interface IEmployee {
  id: number;
  bu: string;
  ka: string;
  no: string;
  rank: string;
  name: string;
}

const fetchEmployees = async (): Promise<IEmployee[]> => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/employees`;
  const res = await fetch(url);
  return res.json();
};

interface IReport {
  employee_id: number;
  condition_id: number;
  date: string;
  reason: string;
}

const fetchReports = async (year: string, month: string): Promise<IReport[]> => {
  const params = new URLSearchParams();
  params.append("year", year);
  params.append("month", month);

  const url = `${process.env.REACT_APP_API_ENDPOINT}/reports?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
};

const updateReport = async (props: IReport): Promise<void> => {
  const { employee_id, condition_id, date, reason } = props;

  const params = new URLSearchParams();
  params.append("employee_id", employee_id.toString());
  params.append("condition_id", condition_id.toString());
  params.append("date", date);
  params.append("reason", reason);

  const url = `${process.env.REACT_APP_API_ENDPOINT}/report?${params.toString()}`;
  const options: RequestInit = { method: "POST" };
  await fetch(url, options);
};

export { fetchConditions, fetchEmployees, fetchReports, updateReport };
export type { IConditions, IEmployee, IReport };
