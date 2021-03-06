import axios from "axios";
import { IConditions, IEmployee, IHoliday, IReport } from "@/interfaces/interfaces";

export async function fetchConditions() {
  const { data } = await axios.get<Promise<IConditions[]>>("conditions");
  return data;
}

export async function fetchEmployees() {
  const { data } = await axios.get<Promise<IEmployee[]>>("employees");
  return data;
}

export async function fetchHolidays() {
  const { data } = await axios.get<Promise<IHoliday[]>>("holidays");
  return data;
}

export async function registerHoliday(holiday: IHoliday) {
  const { data } = await axios.post<Promise<IHoliday[]>>("holidays", holiday);
  return data;
}

export async function updateHoliday(id: number, name: string) {
  const { data } = await axios.patch<Promise<IHoliday[]>>(`holidays/${id}`, { data: name });
  return data;
}

export async function deleteHoliday(id: number) {
  const { data } = await axios.delete<Promise<IHoliday[]>>(`holidays/${id}`);
  return data;
}

export async function fetchReports(year: string, month: string) {
  const params = new URLSearchParams();
  params.append("year", year);
  params.append("month", month);

  const url = `reports?${params.toString()}`;
  const { data } = await axios.get<Promise<IReport[]>>(url);
  return data;
}

export async function updateReports(
  year: string,
  month: string,
  reports: IReport[]
): Promise<IReport[]> {
  const params = new URLSearchParams();
  params.append("year", year);
  params.append("month", month);

  const url = `reports?${params.toString()}`;
  const { data } = await axios.post<Promise<IReport[]>>(url, reports);
  return data;
}
