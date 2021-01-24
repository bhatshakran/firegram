import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';

export default function ImageGrid({ setSelectedImg }) {
	const { docs } = useFirestore('images');

	return (
		<>
			<div className='container'>
				<div className='img-grid '>
					{docs &&
						docs.map(doc => {
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
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1 }}
									/>
								</motion.div>
							);
						})}
				</div>
			</div>
		</>
	);
}
