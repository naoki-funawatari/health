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

const fetchReports =
  (year: string | null, month: string | null) => async (): Promise<IReport[]> => {
    const params = new URLSearchParams();
    if (year) {
      params.append("year", year);
    }

    if (month) {
      params.append("month", month);
    }

    const url = `${process.env.REACT_APP_API_ENDPOINT}/reports?${params.toString()}`;
    console.log(url);
    const res = await fetch(url);
    return res.json();
  };

export { fetchConditions, fetchEmployees, fetchReports };
