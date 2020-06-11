import React from 'react';
import axios from 'axios';

class ManageCategories extends React.Component {

    state = {
        categoryName: '',
        categories: [],
        selectedCategoryId: 0,
        subcategoryName: ''
    }

    componentDidMount = async () => {
        this.loadCategories();
    }

    loadCategories = async () => {
        const { data } = await axios.get('/api/categories/getcategories?includesubcategories=false');
        this.setState({ categories: data });
    }

    onCategoryNameChange = e => {
        this.setState({ categoryName: e.target.value });
    }

    onSubcategoryNameChange = e => {
        this.setState({ subcategoryName: e.target.value });
    }

    onAddCategory = async () => {
        const { categoryName } = this.state;
        await axios.post('/api/categories/addcategory', { name: categoryName });
        this.setState({ categoryName: '' });
        this.loadCategories();
    }

    onCategoryChange = e => {
        this.setState({ selectedCategoryId: e.target.value });
    }

    onAddSubcategory = async () => {
        const { subcategoryName, selectedCategoryId } = this.state;
        await axios.post('/api/categories/addsubcategory', { name: subcategoryName, categoryId: selectedCategoryId });
        this.setState({ subcategoryName: '' });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 well">
                        <h3>Add Category</h3>
                        <div className="row">
                            <div className="col-md-9">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.categoryName}
                                    onChange={this.onCategoryNameChange}
                                    placeholder="Category Name..." />
                            </div>
                            <div className="col-md-2">
                                <button disabled={!this.state.categoryName.trim()} className="btn btn-primary" onClick={this.onAddCategory}>Add Category</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-md-6 col-md-offset-3 well">
                        <h3>Add Subcategory</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <select onChange={this.onCategoryChange} className="form-control" value={this.state.selectedCategoryId}>
                                    <option key={0} value={0}>-- Please Select a Category --</option>
                                    {this.state.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col-md-8" >
                                <input type="text"
                                    className="form-control"
                                    value={this.state.subcategoryName}
                                    onChange={this.onSubcategoryNameChange}
                                    placeholder="Subcategory Name..." />
                            </div>
                            <div className="col-md-2">
                                <button disabled={this.state.selectedCategoryId == 0 || !this.state.subcategoryName} className="btn btn-primary" onClick={this.onAddSubcategory}>Add Subcategory</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManageCategories;