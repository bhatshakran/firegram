import React from 'react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { IoIosAddCircle } from 'react-icons/io';

const UploadForm = () => {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const types = ['image/png', 'image/jpeg'];

	const changeHandler = e => {
		let selected = e.target.files[0];
		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError('');
		} else {
			setFile(null);
			setError('Please select an image file (png or jpeg)');
		}
	};
	return (
		<form className='container'>
			<label class='custom-file-upload'>
				<IoIosAddCircle />
				<input type='file' onChange={changeHandler} />
			</label>
			<div className='output'>
				{error && <h3>{error}</h3>}
				{file && <div>{file.name}</div>}
				{file && <ProgressBar file={file} setFile={setFile} />}
			</div>
		</form>
	);
};
export default UploadForm;
