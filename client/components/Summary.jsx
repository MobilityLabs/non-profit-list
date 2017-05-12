// @flow
import numeral from 'numeral';
import React, {Component} from 'react';

import './Summary.scss';

export default class Summary extends Component {
  props: {
    summaryData: SummaryData,
    classes: String;
  }

  render() {
    const commas = (number: ?number) => {return number ? numeral(number).format('0,0') : "Not Available";};
    const amountValidator = (number: ?number) => {return number ? numeral(number).format('$0,0.00') : "Not Available";};
    const {summaryData, classes} = this.props;
    return (
      <div className={"row " + classes}>
        <div className="col-sm-12">
          <div className="summary">
            <div className="summary-header">
              <dl>
                <dt className="font_micro">Complied Data across:</dt>
                <dd className="h4">
                  {commas(summaryData.count)} search results
                  <small className="font_micro">{commas(summaryData.count)} search results of 1.6m Non-profits</small>
                </dd>
              </dl>
            </div>
            <div className="summary-meta">
              <div className="summary-income">
                <h4 className="label-heading h6">Income</h4>
                <dl>
                  <dt className="font_micro">Average</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.income_avg)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Largest</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.income_max)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Median</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.income_med)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Smallest</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.income_min)}
                  </dd>
                </dl>
              </div>
              <div className="summary-revenue">
                <h4 className="label-heading h6">Revenue</h4>
                <dl>
                  <dt className="font_micro">Average</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.revenue_avg)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Largest</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.revenue_max)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Median</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.revenue_med)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Smallest</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.revenue_min)}
                  </dd>
                </dl>
              </div>
              <div className="summary-assets">
                <h4 className="label-heading h6">Assets</h4>
                <dl>
                  <dt className="font_micro">Average</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.asset_avg)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Largest</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.asset_max)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Median</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.asset_med)}
                  </dd>
                </dl>
                <dl>
                  <dt className="font_micro">Smallest</dt>
                  <dd className="font_micro">
                    {amountValidator(summaryData.asset_min)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
