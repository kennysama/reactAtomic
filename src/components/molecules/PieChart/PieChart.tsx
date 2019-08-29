import React, { Component } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

import Label from '../../atoms/Label/Label';
import { IndexedObject } from '../../../types';

interface IProps {
  displayPieLabels?: boolean;
  chartLabel?: string;
  dataKey: string;
  data: IndexedObject[];
  colors?: string[];
}

class PieCharts extends Component<IProps> {
  render() {
    const { displayPieLabels, chartLabel, dataKey, data, colors } = this.props;
    const COLORS = checkColorAvaliability(colors, data);

    return (
      <React.Fragment>
        <div>
          <Label text={chartLabel} />
        </div>
        <ResponsiveContainer width="70%" height="130%" debounce={15}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="20%"
              cy="5%"
              dataKey={dataKey}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              label={displayPieLabels}
              legendType="rect"
            >
              {data.map((entry, index) => (
                <Cell key="" fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="top"
              height={20}
              layout="vertical"
              align="center"
              wrapperStyle={{
                paddingright: '10px',
                paddingtop: '-10px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
    function checkColorAvaliability(colorlist: string[] | undefined, pieData: IndexedObject[]): string[] {
      return colorlist === undefined ? getColorArray(pieData) : colorlist;
    }

    function getColorArray(pieData: IndexedObject[]): string[] {
      const result: string[] = [];
      pieData.map(() => {
        const letters = '123456789ABCD'.split('');
        const newColor = letters
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
          .join('');

        return result.push('#' + newColor);
      });

      return result;
    }
  }
}
export default PieCharts;
