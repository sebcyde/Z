import axios, { AxiosResponse } from 'axios';

// Function to make API call with a delay
export const DelayedAPICall = (url: string, delay: number): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			axios
				.get(url)
				.then((response: AxiosResponse) => {
					resolve(response.data);
					console.log('response:', response.data);
					return response.data;
				})
				.catch((error: any) => reject(error));
		}, delay);
	});
};
