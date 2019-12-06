import React, { Component } from "react";
import { withRouter } from 'react-router';
import axios from 'axios';

class League extends Component {
  state = {
    teams: [],
    filter: []
  }

  componentDidMount() {
    this.findFilter();
  }

  // ${this.props.match.params.postId}
  findFilter = () => {
    if(this.props.match.params.leagueId == 1){
      this.setState({
        filter: [203, 4]
      }, this.getTeams())
    } else if (this.props.match.params.leagueId == 2){
      this.setState({
        filter: [107]
      }, this.getTeams())
    } else if (this.props.match.params.leagueId == 3){
      this.setState({
        filter: [49]
      }, this.getTeams())
    } else if (this.props.match.params.leagueId == 4){
      this.setState({
        filter: [184, 176, 272, 61, 80, 76, 7]
      }, this.getTeams())
    }
  }

  filterTeams = (teams, filters) => {
    const foundTeams = [];
    filters.forEach(filter => {
      teams.filter(team => {
        if (team.AreaId === filter) {
          foundTeams.push(team)
        }
      })
    })
    return foundTeams;
  }

  getTeams = () => {
    axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/Teams?key=${process.env.REACT_APP_SPORTS_KEY}`)
      .then((res) => {
        const filteredTeams = this.filterTeams(res.data, this.state.filter);
        this.setState({
          teams: filteredTeams
        })
      })
      .catch(err => console.log(err));
  };

  render() {
    const teams = this.state.teams.map(team => {
      return (
        <div>
          <div key={team.TeamId}>{team.Name}</div>
        </div>
      )
    })
    return (
      <div>{teams}</div>
    );
  };
};

export default withRouter(League);