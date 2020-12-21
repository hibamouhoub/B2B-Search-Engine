import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import InfoUnit from './InfoUnit'
import ProductUnit from './productUnit'


class CompanyInfo2 extends React.Component {
    render() {
        return (
            <div className="mt-3">

                <Tabs>
                    <TabList>
                        <Tab><i className="fas fa-list" /> Produits et services</Tab>
                        <Tab><i className="fas fa-user-friends" /> Dirigeants</Tab>
                    </TabList>

                    <TabPanel>
                        <div class="progress mt2">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", backgroundColor: '#AC3B61' }}></div>
                        </div>
                        {this.props.currentCompany['products-0'] ?
                            <ul class="list-group">
                                <ProductUnit value={this.props.currentCompany['products-0']} />
                                <ProductUnit value={this.props.currentCompany['products-1']} />
                                <ProductUnit value={this.props.currentCompany['products-2']} />
                                <ProductUnit value={this.props.currentCompany['products-3']} />
                            </ul> :
                            <ProductUnit value="not available" />}
                    </TabPanel>
                    <TabPanel>
                        <div class="progress mt5">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", backgroundColor: '#AC3B61' }} ></div>
                        </div>
                        <ul class="list-group">
                            {this.props.currentCompany['dirigeants-0-name'] ?
                                <InfoUnit fa="fas fa-user" name={this.props.currentCompany['dirigeants-0-funtion']} value={this.props.currentCompany['dirigeants-0-name']} /> : 
                                <InfoUnit fa="fas fa-user" name="Not available" value="" />}
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", backgroundColor: '#AC3B61' }} ></div>
                            </div>
                            {this.props.currentCompany['dirigeants-1-name'] ?
                            <InfoUnit fa="fas fa-user" name={this.props.currentCompany['dirigeants-1-funtion']} value={this.props.currentCompany['dirigeants-1-name']} />:
                            <InfoUnit fa="fas fa-user" name="Not available" value="" />}
                        </ul>
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", backgroundColor: '#AC3B61' }} ></div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default CompanyInfo2