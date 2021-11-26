import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const useTaegetDate = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

  const tzDate = dayjs().tz();
  const tzStartDate = tzDate.startOf("month");
  const tzEndtDate = tzDate.endOf("month");
  const month = Number(tzStartDate.format("M"));
  const endDay = Number(tzEndtDate.format("D"));
  const days = [...new Array(endDay).keys()].map((_, i) => tzStartDate.add(i, "day").clone());

  return { month, days };
};

export { useTaegetDate };
