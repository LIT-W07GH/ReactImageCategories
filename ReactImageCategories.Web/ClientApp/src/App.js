import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './Pages/Home';
import ManageCategories from './Pages/ManageCategories';
import UploadImage from './Pages/UploadImage';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/manage-categories' component={ManageCategories} />
        <Route exact path='/upload-image' component={UploadImage} />
      </Layout>
    );
  }
}
