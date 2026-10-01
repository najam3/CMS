import { Chart } from "react-google-charts";

const dataOld = [
  ["Category", "Popularity"],
  ["Science & Technology", 250],
  ["Liberal Arts", 4200],
  ["Music", 2900],
  ["Politics & Public Affairs", 8200],
];

const dataNew = [
  ["Category", "Popularity"],
  ["Science & Technology", 370],
  ["Liberal Arts", 600],
  ["Music", 700],
  ["Politics & Public Affairs", 1500],
];

export const diffdata = {
  old: dataOld,
  new: dataNew,
};

export const options = {
  legend: { position: "top" },
};

export function BarChart() {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
      options={options}
    />
  );
}
