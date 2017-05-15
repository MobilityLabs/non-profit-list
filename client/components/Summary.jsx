// @flow
import numeral from 'numeral';
import React, {Component} from 'react';

import './Summary.scss';

export default class Summary extends Component {
  props: {
    summaryData: SummaryData,
    classes: string;
  }

  render() {
    const commas = (number: ?number) => {return number ? numeral(number).format('0,0') : "Not Available";};
    const amountValidator = (number: ?number) => {return number ? numeral(number).format('$0,0.00') : "Not Available";};
    const {summaryData, classes} = this.props;
    return (
      <div className={"summary sticky-top " + classes}>
        <table className="table table-sm table-striped mb-0">
          <thead>
            <tr>
              <th className="font_small text-center table-name">
                Summary of <span>{commas(summaryData.count)}</span> Returned Records
              </th>
              <th className="font_small text-right">Average</th>
              <th className="font_small text-right">Largest</th>
              <th className="font_small text-right">Median</th>
              <th className="font_small text-right">Smallest</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="label-heading h6">Income</th>
              <td className="font_micro text-right">{amountValidator(summaryData.income_avg)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.income_max)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.income_med)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.income_min)}</td>
            </tr>
            <tr>
              <th scope="row" className="label-heading h6">Revenue</th>
              <td className="font_micro text-right">{amountValidator(summaryData.revenue_avg)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.revenue_max)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.revenue_med)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.revenue_min)}</td>
            </tr>
            <tr>
              <th scope="row" className="label-heading h6">Assets</th>
              <td className="font_micro text-right">{amountValidator(summaryData.asset_avg)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.asset_max)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.asset_med)}</td>
              <td className="font_micro text-right">{amountValidator(summaryData.asset_min)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
