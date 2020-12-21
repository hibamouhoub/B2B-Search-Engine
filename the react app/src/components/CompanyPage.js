import React from 'react';
import axios from 'axios'
import { Network, Node, Edge } from 'react-vis-network'
import CompanyInfo from './CompanyInfo'
import CompanyInfo2 from './CompanyInfo2'
import MyNav from './nav'
import names from './names'


class CompanyPage extends React.Component {
  constructor() {
    super()
    this.state = {
      networkComponent: React.createRef(),
      currentCompany: {},
      partners: []
    }
  }
  componentDidMount() {
    this.state.networkComponent.current.network.on("click", event => {
      if (names.includes(event.nodes[0])) {
        this.props.handleNew(event.nodes[0])
      }
    });

    const api = axios.create({
      baseURL: 'http://localhost:9200/c/_search?q=name:"' + this.props.companyName + '"'
    })
    api.get('')
      .then(async (res) => {
        let partners = []
        let currentCompany = res.data.hits.hits[0]._source
        let i = 0
        let noMore = false
        while(!noMore){
          if (currentCompany['Partenaires-'+i+'-nom_partenaire']) {
            partners.push(currentCompany['Partenaires-'+i+'-nom_partenaire'])
            i++
          } else {
            noMore = true
          }
          
        }
        this.setState({
          currentCompany,
          partners
        })
      });
  }

  render() {

    const partnersNode = this.state.partners.map(partner => {
      return <Node
        id={partner}
        label={partner}
        color="#AC3B61"
        shape="box"
        font={{ color: "white", size: 30 }}
      />
    })
    const partnersEdges = this.state.partners.map(partner => {
      return <Edge id={partner + ' edge'} from="100" to={partner} />
    })


    return (
      <div>
        <MyNav handleClick={this.handleClick} />
        <div className="row">
            <div className="col-sm-3 whitebarleft">
              <CompanyInfo currentCompany={this.state.currentCompany} />
            </div>
            <div className="col-sm-6 mt-5">
            <h1 className="text-center mt-2" id="companyTitle">{this.state.currentCompany['name']}</h1>
              <div className="network">
                <Network ref={this.state.networkComponent}>
                  <Node id="Current" label={this.state.currentCompany.name} color="#000000" font={{ color: "white", size: 50 }} />
                  {this.state.partners.length ? <Node id="100" label="Partenaires" color="#AC3B61" size="25" shape="dot" font={{ color: "#AC3B61" }} /> : <Edge id="1100" />}
                  {this.state.partners.length ? <Edge id="100" from="Current" smooth={{ enabled: true }} to="100" /> : <Edge id="100" />}
                  {partnersEdges}
                  {partnersNode}
                </Network>
              </div>
            </div>
            <div className="col-sm-3 whitebarright">
            <CompanyInfo2 currentCompany={this.state.currentCompany} />
          </div>
        </div>
      </div>
    )

  }
}

export default CompanyPage;
