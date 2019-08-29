import React, { Component } from 'react';

import PieCharts from '../../molecules/PieChart/PieChart';

class TestPie extends Component {
  render() {
    const data = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    return <PieCharts dataKey="value" data={data} displayPieLabels={false} chartLabel="2019/05/14" />;
  }
}

export default TestPie;
