import { Chart } from "react-google-charts";

export const data = [
 ["Task", "Hours per Day"],
 ["Published Articles", 8],
 ["In-Review", 2],
 ["Articles in draft", 9],
];
export const options = {
 title: "Article Insights",
 is3D: true, // Optional: Set to true for a 3D pie chart
};
const PieChart = () => {
 return (
   <Chart
     chartType="PieChart"
     data={data}
     options={options}
     width={"100%"}
     height={"400px"}
   />
 );
};
export default PieChart;