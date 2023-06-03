import { DelayedAPICall } from './DelayedAPICall';

interface ApiResponse {
	name: string;
	data: any;
}

// Function to make sequential staggered API calls
export const makeSequentialAPICalls = async (urls: string[]): Promise<void> => {
	try {
		for (let i = 0; i < urls.length; i++) {
			const response = await DelayedAPICall(urls[i], 1000);
			return response.data.data;
		}
	} catch (error) {
		console.error(error);
	}
};

// Function to make sequential staggered named API calls - for related banners
export const makeSequentialNamedAPICalls = async (
	urlsAndNames: { url: string; name: string }[]
): Promise<ApiResponse[]> => {
	try {
		const apiResponses: ApiResponse[] = [];
		for (let i = 0; i < urlsAndNames.length; i++) {
			const { url, name } = urlsAndNames[i];
			const response = await DelayedAPICall(url, 1000);
			apiResponses.push({ name, data: response.data });
		}
		return apiResponses;
	} catch (error) {
		console.error(error);
		return [];
	}
};
