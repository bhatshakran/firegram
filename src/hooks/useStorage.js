import { useState, useEffect } from 'react';
import {
	projectStorage,
	projectFirestore,
	timestamp,
} from '../firebase/config';
import { useAuth } from '../context/AuthProvider';

const useStorage = file => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);
	const { currentUser } = useAuth();
	console.log(currentUser);
	const { displayName } = currentUser;
	useEffect(() => {
		// referances
		const storageRef = projectStorage.ref(file.name);
		const collectionRef = projectFirestore.collection('images');
		storageRef.put(file).on(
			'state_changed',
			snap => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			err => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				const createdAt = timestamp();

				const uploadedBy = displayName;

				collectionRef.add({ url, createdAt, uploadedBy });
				setUrl(url);
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);
	return { progress, url, error };
};

export default useStorage;
