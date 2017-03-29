
export const SET_QUERY_VALUE = "@lookup/SET_QUERY_VALUE";



/*
 * Action Creators
 */

export function setQueryValue(q) {
	return {
		type: SET_QUERY_VALUE,
		payload: {
			value: q
		}
	}
}




