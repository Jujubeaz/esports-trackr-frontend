import React, { Component } from "react";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './League.css'

class League extends Component {
  state = {
    teams: [],
    filter: [],
    media: []
  }

  componentDidMount() {
    this.findData();
    this.getMedia();
  }

  setSplash = (img) => {
    const splashImg = document.querySelector("div.hero")
    splashImg.style.backgroundImage = `url("${img}")`
  }

  findData = () => {
    if(this.props.match.params.leagueId == 1){
      this.setSplash("https://es.me/wp-content/uploads/2017/12/NA-LCS-format-1-1.jpg")
      this.setState({
        filter: [203, 4]
      }, this.getTeams())
    } else if (this.props.match.params.leagueId == 2){
      this.setSplash("https://l2pbomb.com/wp-content/uploads/2018/09/League-Of-Legends-LCK-LOL-Park-1366x768.jpeg")
      this.setState({
        filter: [107]
      }, this.getTeams())
    } else if (this.props.match.params.leagueId == 3){
      this.setSplash("https://esportsobserver.com/wp-content/uploads/2018/12/20181201014016.jpg")
      this.setState({
        filter: [49]
      }, this.getTeams())
    } else if (this.props.match.params.leagueId == 4){
      this.setSplash("https://dotesports-media.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2019/02/13002920/12.jpg")
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

  getMedia = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/media/all`)
      .then((res) => {
        this.setState({
          media: res.data.data
        }, () => console.log(this.state.media))
      })
  }

  render() {
    const teams = this.state.teams.map(team => {
      let teamMedia = {};
      this.state.media.forEach(media => {
        if (team.TeamId == media.teamId) {
          teamMedia = media
        }
      })
      return (
        <Link key={team.TeamId} to={`/team/${team.TeamId}`} className="team-link">
          <div style={{backgroundImage: `url(${teamMedia.logo})`}} className="team"></div>
          <h5 className="name">{team.Name}</h5>
        </Link>
      )
    })
    return (
      <div>
        <div className="hero"></div>
        <div className="team-container">
          {teams}
        </div>
      </div>
    );
  };
};

export default withRouter(League);