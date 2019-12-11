import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./Profile.css"

class Profile extends Component {

  state={
    team: {},
    players: [],
    media: {},
    matches: []
  }

  componentDidMount() {
    this.getTeamData();
    this.getMedia();
    this.getGames();
  }

  filterTeams = (teams) => {
    return teams.filter(team => {return team.TeamId == this.props.match.params.teamId})
  }

  filterMatches = (matches) => {
    return matches.filter(match => {return match.TeamAId == this.props.match.params.teamId || match.TeamBId == this.props.match.params.teamId})
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
      .catch(err => console.log(err))
  };

  getGames = () => {
    const d = new Date();
    const month = d.getMonth()+1;
    axios.all([
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-1}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-2}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-3}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-4}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-5}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-6}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-7}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-8}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-9}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-10}?key=${process.env.REACT_APP_SPORTS_KEY}`),
      axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/GamesByDate/2018-${month-11}?key=${process.env.REACT_APP_SPORTS_KEY}`),
    ])
    .then((res) => {
      let matchRes = [];
      res.forEach(resObj => {
        matchRes = [...resObj.data, ...matchRes]
      })
      const filteredMatches = this.filterMatches(matchRes)
      this.setState({
        matches: filteredMatches
      }, () => console.log(this.state.matches))
    })
    .catch(err => console.log(err))
  };


  render() {
    const player = this.state.players.map(player => {
      return (
        <div key={player.PlayerId} className="player">
          <h6>{player.PlayerName}</h6>
        </div>
      )
    })
    const matches = this.state.matches.map(match => {
      return (
        <Link key={match.GameId} to={`/match/${match.GameId}`}>
          <div>
            <h5>{match.TeamAName} vs {match.TeamBName}</h5>
          </div>
        </Link>
      )
    })
    return (
      <div>
        <div 
          className="splash" 
          style={{backgroundImage: `url(${this.state.media.splash})`}}>
            <h1 className="team-splash-title">{this.state.team.Name}</h1> 
          </div>
          <div className="team-content">
            <div>
              <h2 className="section-title">Roster</h2>
              <div className="roster">
                {player}
              </div>
            </div>
            <div className="matches">
              <h2 className="section-title">Recent Games</h2>
              {matches}
            </div>
          </div>
      </div>
    )
  }
}

export default withRouter(Profile);