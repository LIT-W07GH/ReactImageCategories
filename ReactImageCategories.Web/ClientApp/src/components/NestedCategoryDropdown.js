import React from 'react';
import axios from 'axios';

class NestedCategoryDropdown extends React.Component {
    state = {
        categories: [],
        selectedCategoryId: 0,
        selectedSubcategoryId: 0
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/categories/getcategories?includesubcategories=true');
        this.setState({ categories: data });
    }

    onCategoryChange = e => {
        this.setState({ selectedCategoryId: e.target.value });
    }

    onSubcategoryChange = e => {
        this.setState({ selectedSubcategoryId: e.target.value });
        const { onSubcategoryChange } = this.props;
        if (onSubcategoryChange) {
            onSubcategoryChange(e.target.value);
        }
    }

    render() {
        let subCategories = [];
        const selectedCategory = this.state.categories.find(c => c.id == this.state.selectedCategoryId);
        if (selectedCategory) {
            subCategories = selectedCategory.subcategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>);
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Categories:</h4>
                        <select value={this.state.selectedCategoryId} className="form-control" onChange={this.onCategoryChange}>
                            <option key={0} value={0}>-- Please Select a Category --</option>
                            {this.state.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                        <h4>Subategories:</h4>
                        <select value={this.state.selectedSubcategoryId} className="form-control" onChange={this.onSubcategoryChange}>
                            <option key={0} value={0}>-- Please Select a Subategory --</option>
                            {subCategories}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default NestedCategoryDropdown;