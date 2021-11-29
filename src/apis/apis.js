const fetchConditions = async () => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/conditions`;
  const res = await fetch(url);
  return res.json();
};

const fetchEmployees = async () => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/employees`;
  const res = await fetch(url);
  return res.json();
};

const fetchReports = async () => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}/reports`;
  console.log(url);
  const res = await fetch(url);
  return res.json();
};

export { fetchConditions, fetchEmployees, fetchReports };
