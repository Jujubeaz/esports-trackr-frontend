import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import "./Profile.css"

class Profile extends Component {

  state={
    team: {},
    players: [],
    media: {}
  }

  componentDidMount() {
    this.getTeamData();
    this.getMedia();
  }

  filterTeams = (teams) => {
    return teams.filter(team => {return team.TeamId == this.props.match.params.teamId})
  }

  findPlayers = () => {
    axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/MembershipsByTeam/${this.props.match.params.teamId}?key=${process.env.REACT_APP_SPORTS_KEY}`)
      .then((res) => {
        this.setState({
          players: res.data
        }, () => console.log(this.state.players))
      })
  }

  getTeamData = () => {
    axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/Teams?key=${process.env.REACT_APP_SPORTS_KEY}`)
      .then((res) => {
        const team = this.filterTeams(res.data)
        this.setState({
          team: team[0]
        }, this.findPlayers())
      })
      .catch(err => console.log(err));
  }

  getMedia = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/media/${this.props.match.params.teamId}`)
      .then((res) => {
        this.setState({
          media: res.data.data
        }, () => console.log(this.state.media))
      })
  }

  render() {
    const player = this.state.players.map(player => {
      return (
        <div key={player.PlayerId} className="player">
          <h4>{player.PlayerName}</h4>
        </div>
      )
    })
    return (
      <div>
        <div className="splash" style={{backgroundImage: `url(${this.state.media.splash})`}}></div>
        <h1>{this.state.team.Name}</h1> 
        {player}
      </div>
    )
  }
}

export default withRouter(Profile);