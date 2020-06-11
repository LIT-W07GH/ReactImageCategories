import React from 'react';
import axios from 'axios';
import NestedCategoryDropdown from '../components/NestedCategoryDropdown';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class UploadImage extends React.Component {

    fileInputRef = React.createRef();

    state = {
        selectedSubcategoryId: 0,
        description: ''
    }

    onSelectedSubcategoryIdChange = id => {
        this.setState({ selectedSubcategoryId: id });
    }

    onUploadClick = async () => {
        const file = this.fileInputRef.current.files[0];
        const fileName = file.name;
        const base64File = await toBase64(file);
        const { description, selectedSubcategoryId } = this.state;
        await axios.post('/api/images/upload', { description, base64File, fileName, subcategoryId: selectedSubcategoryId });
        this.setState({ description: '' });
        this.fileInputRef.current.value = '';
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 well">
                        <h1>Upload Image</h1>
                        <NestedCategoryDropdown onSubcategoryChange={this.onSelectedSubcategoryIdChange} />
                        <h4>Image</h4>
                        <input type="file" className="form-control" ref={this.fileInputRef} />
                        <br />
                        <input type="text" 
                                value={this.state.description} 
                                className="form-control" 
                                onChange={e => this.setState({ description: e.target.value })} 
                                placeholder="Description..." />
                        <br />
                        <button
                            onClick={this.onUploadClick}
                            disabled={this.state.selectedSubcategoryId == 0}
                            className="btn btn-primary btn-lg btn-block">Upload</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UploadImage;