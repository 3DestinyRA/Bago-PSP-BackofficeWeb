"use client";

import { localStorageGetItem, localStorageSetItem } from "@/utils/storage-available";

class AuthService {
	setAccessToken(accessToken: string) {
		return localStorageSetItem("accessTokenSalesforce", accessToken);
	}

	setInstanceUrl(instanceUrl: string) {
		return localStorageSetItem("instanceUrlSalesforce", instanceUrl);
	}

	getAccessToken() {
		return localStorageGetItem("accessTokenSalesforce");
	}

	getInstanceUrl() {
		return localStorageGetItem("instanceUrlSalesforce");
	}
}

export const authService = new AuthService();
