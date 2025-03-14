import axiosInstance from "@/utils/axios";

const apiUrl = process.env.NEXT_PUBLIC_EMAIL_SERVICE_API_URL as string;
const apiKey = process.env.NEXT_PUBLIC_EMAIL_SERVICE_API_KEY as string;

export const sendEmailOperatorLinking = async (email: string, link: string): Promise<void> => {
	return await axiosInstance.post(`${apiUrl}mail/operator`, {
		toEmail: email,
		confirmationLink: link,
		apiKey: apiKey,
	});
};
