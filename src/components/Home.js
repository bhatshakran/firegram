import React from 'react';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import { useState } from 'react';
import Title from './Title';
import UploadForm from './UploadForm';

const Home = () => {
	const [selectedImg, setSelectedImg] = useState(null);
	return (
		<div>
			<Title />
			<UploadForm />
			<ImageGrid setSelectedImg={setSelectedImg} />
			{selectedImg && (
				<Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
			)}
		</div>
	);
};

export default Home;
