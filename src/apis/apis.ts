import axios from "axios";
import { IConditions, IEmployee, IHolidays, IReport } from "@/interfaces/interfaces";

export async function fetchConditions() {
  const { data } = await axios.get<Promise<IConditions[]>>("conditions");
  return data;
}

export async function fetchEmployees() {
  const { data } = await axios.get<Promise<IEmployee[]>>("employees");
  return data;
}

export async function fetchHolidays() {
  const url = `holidays`;
  const { data } = await axios.get<Promise<IHolidays[]>>(url);
  return data;
}

export async function fetchHolidaysByYear(year: string) {
  const url = `holidays/${year}`;
  const { data } = await axios.get<Promise<IHolidays[]>>(url);
  return data;
}

export async function fetchHolidaysByMonth(year: string, month: string) {
  const url = `holidays/${year}/${month}`;
  const { data } = await axios.get<Promise<IHolidays[]>>(url);
  return data;
}

export async function registerHoliday(holiday: IHolidays) {
  const url = `holidays`;
  const { data } = await axios.post<Promise<IHolidays[]>>(url, holiday);
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
