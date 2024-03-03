import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath, Circle } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';

import { minIndex, maxIndex } from '@visx/vendor/d3-array';
import { DataPoint } from '../data/types';



interface LineChartProps {
  data: DataPoint[];
}

const LineChart = ({ data }: LineChartProps) => {
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 50, left: 20 };
  const size = {
    width: width - margin.right - margin.left,
    height: height - margin.top - margin.bottom,
  };

  const dates = data.map((d) => d.date);

  const xScale = scaleTime({
    domain: [dates[0], dates[dates.length - 1]],
    range: [0, size.width],
  });

  const yScale = scaleLinear({
    domain: [0, 20],
    range: [size.height, 0],
  });
  const min = minIndex(data.map((v) => v.value));
  const max = maxIndex(data.map((v) => v.value));
  return (
    <svg width={width} height={height}>
      <AxisLeft scale={yScale} top={margin.top} left={margin.left} />
      <AxisBottom
        scale={xScale}
        top={height - margin.bottom}
        left={margin.left}
        label="Time"
        tickFormat={(value) => value.toString()}
        tickComponent={(p) => {
          console.log(p.formattedValue)
          return (
            <text x={p.x} y={p.y} className='text-white text-sm fill-white'>
              {p.formattedValue}
            </text>
          )
        }}
        hideZero
      />
      <LinePath
        data={data}
        x={(d) => xScale(d.date) + margin.left}
        y={(d) => yScale(d.value) + margin.top}
        stroke="blue"
        strokeWidth={2}
      />
      {min && (
        <Circle
          cx={xScale(data[min].date) + margin.left}
          cy={yScale(data[min].value) + margin.top}
          r={5}
          fill="red"
        />
      )}
      {max && (
        <Circle
          cx={xScale(data[max].date) + margin.left}
          cy={yScale(data[max].value) + margin.top}
          r={5}
          fill="blue"
        />
      )}
      {/* <Tooltip
        top={yScale(data[0].value)}
        left={xScale(data[0].date))}
        offsetLeft={10}
      >
        {`Highest Value: ${data[0].value}`}
      </Tooltip>
      <Tooltip
        top={yScale(data[data.length - 1].value)}
        left={xScale(data[data.length - 1].date))}
        offsetLeft={10}
      >
        {`Lowest Value: ${data[data.length - 1].value}`}
      </Tooltip> */}
    </svg>
  );
};

export default LineChart;
