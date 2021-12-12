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
  date: string;
  condition_id: number;
  reason: string;
  isChanged: boolean | undefined;
}

const fetchReports = async (year: string, month: string): Promise<IReport[]> => {
  const params = new URLSearchParams();
  params.append("year", year);
  params.append("month", month);

  const url = `${process.env.REACT_APP_API_ENDPOINT}/reports?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
};

const updateReports = async (props: IReport[]): Promise<IReport[]> => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/reports`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(props),
  };
  const res = await fetch(url, options);
  return res.json();
};

export { fetchConditions, fetchEmployees, fetchReports, updateReports };
export type { IConditions, IEmployee, IReport };
