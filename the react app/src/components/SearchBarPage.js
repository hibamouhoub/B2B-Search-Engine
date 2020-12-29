import React from 'react'
import axios from 'axios'
import { CompaniesData, renderCompanyName } from './listOfAllCompanies';
import Autocomplete from 'react-autocomplete';


//this is the search bar page. We check how many companies we have in the ElasticSearch index
//When the user types the name of the company he's looking for, we move to the searchEngine.js
class SearchBar extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "",
            count:null
        }
    }
    componentDidMount() {
        const api = axios.create({
            baseURL: 'http://localhost:9200/c/_count'
          })
        api.get('')
      .then(async (res) => {
          let count = res.data.count
          this.setState({
            count
          })
      })
    }
    render() {
        return (
            <div>
                <h1 id="titre" className="text-center mr-5 ml-5">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <strong> Search Engine </strong>
                    <p id="underTitle"> Près de {this.state.count} entreprises disponibles sur notre plateforme</p>
                </h1>
                <div className="cover">


                    <form method="get" action="">
                        <div className="tb">
                            <div className="td">
                                <Autocomplete
                                    value={this.state.name}
                                    items={CompaniesData()}
                                    getItemValue={item => item.name}
                                    shouldItemRender={renderCompanyName}
                                    renderMenu={item => (
                                        <div className="dropdown">
                                            {item}
                                        </div>
                                    )}
                                    renderItem={(item, isHighlighted) =>
                                        <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                            {item.name}
                                        </div>
                                    }
                                    onChange={(event, name) => {
                                        this.setState({ name })
                                        this.props.handleChange(name)
                                    }}
                                    onSelect={name => {
                                        this.setState({ name })
                                        this.props.handleChange(name)
                                    }}
                                />
                                </div>
                            <div className="td" id="s-cover">
                                <button type="submit" onClick={this.props.handleClick}>
                                    <div id="s-circle"></div>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </form>



                </div>
                <div className="backImage"></div>
                <div className="backImage2"></div>
                <p id="copyrights" className="text-center">&copy; 2020 Search Engine</p>
            </div>
        )
    }

}


export default SearchBar