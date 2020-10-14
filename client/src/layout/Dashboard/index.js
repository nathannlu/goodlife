import React from 'react';
import axios from 'axios';

export default function () {
	const loadClubOccupancy = () => {
		const club = 243;
		const day = '2020-10-21';
		const studio = 'Gym Floor';
		axios.get(`https://www.goodlifefitness.com/club-occupancy/club-workout-schedule?club=${club}&day=${day}&studio=${studio}`).then(res => {
			console.log(res);
		})
	};

	const book = () => {
		const url = 'https://www.goodlifefitness.com/club-occupancy/book';	
	};

	const cancel = () => {
		const url = 'https://www.goodlifefitness.com/club-occupancy/cancel?clubId=243&bookingId=735880';
	};

	const fetchSessionCookies = () => {
		const url = 'https://www.goodlifefitness.com/memberauth/authenticate';	
		const config = {
			headers: {
				origin: 'https://www.goodlifefitness.com'
			}
		}

		axios.post(url, {Login: 'nathanlu_@hotmail.com', Password: 'CanFISHfly1'}, config).then(res => {
			console.log(res);
		})
	};

	return (
		<div>
			dashboard
			<button onClick={fetchSessionCookies}>
				Authenticate
			</button>
		</div>
	);
};
