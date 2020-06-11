import React, { Component } from 'react';
import NestedCategoryDropdown from '../components/NestedCategoryDropdown';
import axios from 'axios';

class Home extends Component {
  state = {
    images: []
  }

  onSelectedSubcategoryIdChange = async id => {
    if (id == 0) {
      return;
    }
    const { data } = await axios.get(`/api/images/getbysubcategory?subcategoryid=${id}`);
    this.setState({ images: data });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3 well">
            <NestedCategoryDropdown onSubcategoryChange={this.onSelectedSubcategoryIdChange} />
            <br />
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.images.map(i => <tr key={i.id}>
                  <td><img style={{width:200}} src={`/viewimages/getimage?filename=${i.fileName}`} /></td>
                  <td>{i.description}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
