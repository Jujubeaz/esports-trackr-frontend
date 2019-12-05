import React, { Component } from "react";
import axios from 'axios';

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
    const teams = this.state.teams.map(team => {
      if (team.AreaId === 203 || team.AreaId === 4){
        return (
          <div key={team.TeamId}>{team.Name}</div>
        )
      }
    })
    return (
      <div>
        <div className="hero">Twitch stream here</div>
        <img src="https://liquipedia.net/commons/images/thumb/1/1c/LCS_2019.png/600px-LCS_2019.png" alt=""/>
        {teams}
      </div>
    )
  };
};

export default Home;