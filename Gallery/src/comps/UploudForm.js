import React, {useState} from 'react';
import ProgressBar from './ProgressBar';

const UploudForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg', 'image/jpg']

    const changeHandler = (e) =>  {
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError('')
        }else {
            setFile(null);
            setError('Please select an image file (png/jpeg/jpg) or write you user name')
        }
    }
    
    return (
        <form>
            <label>
              <input className='fileInput' type="file" onChange={changeHandler}/>
              <span className='plus'><i className="fas fa-plus-circle"></i> Add Img</span>
            </label>
            <div className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        </form>
    )
}

export default UploudForm;