export const getTokenFromLocalStorage = () => {
	return localStorage.getItem('sessionId');
};

export const setTokenToLocalStorage = (token: number) => {
	localStorage.setItem('sessionId', token.toString());
};

export const deleteTokenFromLocalStorage = () => {
	localStorage.removeItem('sessionId');
};
