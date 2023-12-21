/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";


const Label = (props) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y}
      dx={"5%"}
      dy={"-1%"}
      fontSize="15"
      fontWeight="bold"
      fill={"#181818"}
      textAnchor="middle"
    >
      {value}h
    </text>
  );
};
const Barchart = ({ data }) => {
  const dataWithHours = data.map((entry) => ({
    ...entry,
    total_duration: (entry.total_duration / 3600).toFixed(1), // Convert seconds to hours
  }));

  return (
    <div>
      <BarChart width={730} height={250} data={dataWithHours}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          tick={{ fontSize: 15 }}
          dataKey="day"
          type="category"
          domain={data.map((entry) => entry.day)}
          ticks={data.map((entry) => entry.day)}
        />
        <YAxis
          ticks={[0, 5, 10, 15, 20]}
          domain={[0, 20]}
        />
        <Bar dataKey="total_duration" label={<Label />} fill="#8884d8" />
      </BarChart>
    </div>
  );
};


export default Barchart;