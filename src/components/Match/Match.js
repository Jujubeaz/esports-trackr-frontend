import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import './Match.css'

class Match extends Component {
  state = {
    match: {},
    teamA: '',
    teamAMedia: {},
    teamB: '',
    teamBMedia: {}
  }

  componentDidMount(){
    this.getMatch();
  }

  filterMedia = (mediaArr) => {
    return mediaArr.filter(media => {return media.teamId == this.state.teamA || media.teamId == this.state.teamB})
  }

  getMatch = () => {
    axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/stats/json/BoxScore/${this.props.match.params.matchId}?key=${process.env.REACT_APP_SPORTS_KEY}`)
      .then((res) => {
        this.setState({
          match: res.data[0].Game,
          teamA: res.data[0].Game.TeamAId,
          teamB: res.data[0].Game.TeamBId
        }, this.getMedia())
      })
      .catch(err => console.log(err))
  }

  getMedia = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/media/all`)
      .then((res) => {
        const filteredMedia = this.filterMedia(res.data.data)
        filteredMedia.forEach(media => {
          if (media.teamId == this.state.teamA){
            this.setState({
              teamAMedia: media
            })
          } else if (media.teamId == this.state.teamB){
            this.setState({
              teamBMedia: media
            })
          }
        })
      })
  }

  render() {
    return(
      <div>
        <div className="team" style={{backgroundImage: `url(${this.state.teamAMedia.logo})`}}></div>
        <h2>{this.state.match.TeamAName}</h2>
        <h2>VS</h2>
        <div className="team" style={{backgroundImage: `url(${this.state.teamBMedia.logo})`}}></div>
        <h2>{this.state.match.TeamBName}</h2>
      </div>
    )
  }
};

export default withRouter(Match);