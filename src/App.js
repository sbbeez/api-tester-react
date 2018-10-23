import React, { Component } from 'react';
import  Home  from "./screens/Home";
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";


const store = createStore(reducers,{},applyMiddleware(ReduxThunk));



class App extends Component {
  render() {
    return (
    	<Provider store={store}>
    		<Home/>
    	</Provider>
    );
  }
}

export default App;
