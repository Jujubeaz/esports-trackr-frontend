import React, { Component } from "react";
import axios from 'axios';

class League extends Component {
  state = {
    teams: []
  }

  componentDidMount() {
    this.getTeams()
  }

  filterTeams  = (teams, filters) => {
    filteredTeams = [];
    teams.filter(team => {
      filters.forEach(filter => {
        if (team.AreaId === filter){
          filteredTeams.push(team)
        }
      })
    })
    return filteredTeams;
  }

  getTeams = () => {
    axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/Teams?key=${process.env.REACT_APP_SPORTS_KEY}`)
    .then((res) => {
      this.filterTeams(res, this.props.filters)
    })
    .catch(err => console.log(err));
  };

  render() {

    return(

    )
  }
}