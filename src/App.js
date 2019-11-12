import React, {Component} from "react";
import "./App.css";

import {recipes} from "./tempList";
import RecipeList from "./components/RecipeList"
import RecipeDetails from "./components/RecipeDetails"

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=ea9f5111a384baf8a69b07fd46550ccc",
    base_url: "https://www.food2fork.com/api/search?key=ea9f5111a384baf8a69b07fd46550ccc",
    details_id: 35389,
    pageIndex: 1,
    search:'',
    query:'&q=',
    error:''
  };


  // Create a method in this class for getting the rec
  async getRecipes(){
    try{
      const data = await fetch(this.state.url);
      const jsonData  = await data.json();
      console.log(jsonData);

      if(jsonData.recipes.length === 0) {
        this.setState(() => {
          return {error:'sorry, no result from search'}
        })
      }
      else {
        this.setState(() => {
          return {recipes: jsonData.recipes}
        })
      }
      // this.setState({
      //   recipes: jsonData.recipes
      // });
    } catch(error){
      console.log(error);
    }
  }

  // once the App component mounts them we can use the method
  componentDidMount(){
    this.getRecipes();
  }


displayPage = (index) => {
  switch(index){
    default:
      case 1:
        return(
          <RecipeList 
            recipes = {this.state.recipes}
            handleDetails = {this.handleDetails}
            value = {this.state.search}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
            error = {this.state.error}
          />
        );
      case 0:
        return(
          <RecipeDetails 
            id = {this.state.details_id} 
            handleIndex = {this.handleIndex}
          />
        );
  }
};


handleIndex = index => {
  this.setState({
    pageIndex: index,
  });
};

handleDetails = (index, id) => {
  this.setState({
    pageIndex: index,
    details_id: id
  });
};

handleChange = (e) => {
  this.setState(
    {
      search: e.target.value
    }, 
    () =>{
          console.log(this.state.search)
        }
    );
};

handleSubmit = (e) => {
  e.preventDefault();
  // getting the values from the state
  const {
    base_url,
    query,
    search
  } = this.state;

  this.setState(() => {
    return {url:`${base_url}${query}${search}`, search:""};
  }, 
  () => {
      this.getRecipes();
        }
  );
};


  render() {
    // Are we getting the data? Lets see it before the return
    // console.log(this.state.recipes);

    return (
      <React.Fragment>
        {/* <RecipeList recipes = {this.state.recipes}/>
        <RecipeDetails id = {this.state.details_id}/> */}
        {this.displayPage(this.state.pageIndex)};
      </React.Fragment>
    );
  }
}

export default App;
