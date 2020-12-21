import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import InfoUnit from './InfoUnit'


class CompanyInfo extends React.Component {
    render() {
        return (
            <div className="mt-3">
                <Tabs>
                    <TabList>
                        <Tab><i class='fas fa-info-circle'></i> Info</Tab>
                        <Tab><i class='fas fa-map-marker-alt'></i> Adresse</Tab>
                    </TabList>

                    <TabPanel>
                        <ul class="list-group">
                            <InfoUnit name="Nature" fa="fas fa-clipboard-list" value={this.props.currentCompany['juridicInfos-nature']?this.props.currentCompany['juridicInfos-nature']:"not available"} />
                            <InfoUnit name="Date de création" fa="fas fa-info-circle" value={this.props.currentCompany['juridicInfos-creationYear']?this.props.currentCompany['juridicInfos-creationYear']:"not available"} />
                            <InfoUnit name="Statut juridique" fa="fas fa-newspaper" value={this.props.currentCompany['juridicInfos-juridicForm']?this.props.currentCompany['juridicInfos-juridicForm']:"not available"} />
                            <InfoUnit name="Activités" fa="fas fa-poll" value={this.props.currentCompany['juridicInfos-activity']?this.props.currentCompany['juridicInfos-activity']:"not available"} />
                            <InfoUnit fa="fas fa-funnel-dollar" name="Capital" value={this.props.currentCompany['juridicInfos-capital']?this.props.currentCompany['juridicInfos-capital']:"not available"} />
                            <InfoUnit fa="fas fa-user-friends" name="Effectif" value={this.props.currentCompany['juridicInfos-effectif']?this.props.currentCompany['juridicInfos-effectif']:"not available"} />
                        </ul>
                    </TabPanel>

                    <TabPanel>
                        <ul class="list-group mt1">
                            <InfoUnit name="Adresse" fa="fas fa-search-location" value={this.props.currentCompany['address-full']?this.props.currentCompany['address-full']:"not available"} />
                            <InfoUnit name="Pays" fa="fas fa-search-location" value={this.props.currentCompany['address-country']?this.props.currentCompany['address-country']:"not available"} />
                            <InfoUnit name="Ville" fa="fas fa-search-location" value={this.props.currentCompany['address-city']?this.props.currentCompany['address-city']:"not available"} />
                        </ul>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default CompanyInfo