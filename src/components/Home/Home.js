import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends Component {

  state = {
    teams: []
  }

  componentDidMount() {
    this.apiTest();
  };

  apiTest = () => {
    axios.get(`${process.env.REACT_APP_SPORTS_API}/lol/scores/json/Teams?key=${process.env.REACT_APP_SPORTS_KEY}`)
    .then((res) => {
      console.log(res.data)
      this.setState({
        teams: res.data
      })
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="hero">Twitch stream here</div>
        <div className="leagues-list">
          <Link to={`/league/1`}>
            <div className="logo-container">
              <img className="league-logo" src="https://www.esportspedia.com/lol/thumb.php?f=2018NALCSLogo.png&width=1200" alt="NA LCS"/>
            </div>
          </Link>
          <Link to={`/league/2`}>
            <div className="logo-container">
              <img className="league-logo" src="https://eu.lolesports.com/darkroom/900/507/611a4a772d0700e0014dd1e07a7adf2e:b6d08836d9db6669a63ef2d52f327a0d" alt="LCK"/>
            </div>
          </Link>
          <Link to={`/league/3`}>
            <div className="logo-container">
              <img className="league-logo" src="https://gamepedia.cursecdn.com/lolesports_gamepedia_en/9/96/LPL_2017_logo.png" alt="LPL"/>
            </div>
          </Link>
          <Link to={`/league/4`}>
            <div className="logo-container">
              <img className="league-logo" src="https://www.esportspedia.com/lol/images/3/38/LEC_logo.png" alt="LEC"/>
            </div>
          </Link>
          </div>
      </div>
    )
  };
};

export default withRouter(Home);