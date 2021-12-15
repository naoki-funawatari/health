const endpoint = process.env.REACT_APP_API_ENDPOINT;

export async function get<T>(url: string): Promise<T> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  const res = await fetch(url, options);
  return res.json();
}

export async function post<T>(url: string, data: BodyInit): Promise<T> {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: data,
  };
  const res = await fetch(url, options);
  return res.json();
}

export interface IConditions {
  id: number;
  name: string;
}

export async function fetchConditions(): Promise<IConditions[]> {
  return get(`${endpoint}/conditions`);
}

export interface IEmployee {
  id: number;
  bu: string;
  ka: string;
  no: string;
  rank: string;
  name: string;
}

export async function fetchEmployees(): Promise<IEmployee[]> {
  return get(`${endpoint}/employees`);
}

export interface IReport {
  id: number;
  employee_id: number;
  date: string;
  condition_id: number;
  reason: string;
  isChanged: boolean | undefined;
}

export async function fetchReports(year: string, month: string): Promise<IReport[]> {
  const params = new URLSearchParams();
  params.append("year", year);
  params.append("month", month);

  return get(`${endpoint}/reports?${params.toString()}`);
}

export async function updateReports(
  year: string,
  month: string,
  props: IReport[]
): Promise<IReport[]> {
  const params = new URLSearchParams();
  params.append("year", year);
  params.append("month", month);

  const data: BodyInit = JSON.stringify(props);
  return post(`${endpoint}/reports?${params.toString()}`, data);
}
