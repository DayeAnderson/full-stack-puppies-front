import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom'
import PuppyListPage from '../../pages/PuppyListPage/PuppyListPage';
import AddPuppyPage from '../../pages/AddPuppyPage/AddPuppyPage';
import * as puppyAPI from '../../services/puppies-api'

class App extends Component {
  state = { 
    puppies: []
   }

   handleAddPuppy = async newPupData => {
    const newPup = await puppyAPI.create(newPupData);
    this.setState(state => ({
      puppies: [...state.puppies, newPup]
    }), () => this.props.history.push('/'));
  }
  
   async componentDidMount() {
    const puppies = await puppyAPI.getAll();
    this.setState({ puppies });
  }

  render() { 
    return ( 
      <div className="App">
        <header className="App-header">
          React Puppies CRUD
          <nav>
            <NavLink exact to='/'>PUPPIES LIST</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/add'>ADD PUPPY</NavLink>
          </nav>
        </header>
        <main>
        <Route exact path='/' render={({history}) => 
    <PuppyListPage
        puppies={this.state.puppies}
    />
} />
        <Route exact path='/add' render={() => 
  <AddPuppyPage
    handleAddPuppy = {this.handleAddPuppy}
  />
} />
        </main>
      </div>
     );
  }
}

export default App;
