import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import CommentsContainer from '../../containers/CommentsContainer/CommentsContainer'

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
  };

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
          };
        });
      });
  };

  getComments

  render() {
    return(
      <div>
        <div className="title-card">
          <Link to={`/team/${this.state.teamA}`}>
            <div className="team--big" style={{backgroundImage: `url(${this.state.teamAMedia.logo})`}}></div>
            <h3 className='team-name'>{this.state.match.TeamAName}</h3>
          </Link>
          <h2 className="vs">VS</h2>
          <Link to={`/team/${this.state.teamB}`}>
            <div className="team--big" style={{backgroundImage: `url(${this.state.teamBMedia.logo})`}}></div>
            <h3 className='team-name'>{this.state.match.TeamBName}</h3>
          </Link>
        </div>
        <h2 className="winner">Match Winner: {this.state.match.Winner}</h2>
        <section className="comment-section">
          <CommentsContainer matchId={this.props.match.params.matchId} currentUser={this.props.currentUser}/>
        </section>
      </div>
    )
  }
};

export default withRouter(Match);