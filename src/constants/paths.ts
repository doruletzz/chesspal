export const API_ROUTE = {
	// Auth
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	// Play
	PLAY_STREAM: '/play/stream',
	PLAY_ALL_MOVES: '/play/all_moves',
	PLAY_MOVE: '/play/move', // needs auth
	// Matchmaking
	MATCHMAKING_MATCH: '/matchmaking/match', // needs auth
	MATCHMAKING_STATUS: '/matchmaking/status', // needs auth
	MATCHMAKING_CANCEL: '/matchmaking/cancel', // needs auth
	// Stats
	POSITION_STATS: '/stats',
	MOVE_STATS: '/move_stats',
};

export const PAGE_ROUTE = {
	LOGIN: '/login',
	REGISTER: '/register',
	PLAY: '/play',
	HOME: '/home',
	ABOUT: '/about',
	MATCHMAKING: '/matchmaking',
	ANALYSIS: '/analysis',
};
