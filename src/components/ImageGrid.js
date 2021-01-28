import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthProvider';

export default function ImageGrid({ setSelectedImg }) {
	const { docs } = useFirestore('images');
	const { currentUser } = useAuth();
	// console.log(currentUser);

	return (
		<>
			<div className='container'>
				<div className='img-grid '>
					{docs &&
						docs.map(doc => {
							console.log(doc);
							return (
								<motion.div
									className='img-wrap'
									key={doc.id}
									layout
									whileHover={{ opacity: 1 }}
									onClick={() => setSelectedImg(doc.url)}>
									<motion.img
										src={doc.url}
										alt='pic uploaded'
										initial={{ opacity: 0.6 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1 }}
									/>
									<div style={{ background: 'black', color: '#fff' }}>
										{doc.uploadedBy}
									</div>
								</motion.div>
							);
						})}
				</div>
			</div>
		</>
	);
}
