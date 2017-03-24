
export const SHOW_ROUTES_TIMESERIES_MODAL = "@modals/SHOW_ROUTES_TIMESERIES_MODAL";
export const HIDE_ROUTES_TIMESERIES_MODAL = "@modals/HIDE_ROUTES_TIMESERIES_MODAL";


export function showRoutesTimeseriesModal(
	routeserverId, asn, neighbourAddress, title
) {
	return {
		type: SHOW_ROUTES_TIMESERIES_MODAL,
		payload: {
			routeserverId: routeserverId,
			asn:  asn,
		  neighbourAddress: neighbourAddress,
			title: title
		}
	}
}


export function hideRoutesTimeseriesModal() {
	return {
		type: HIDE_ROUTES_TIMESERIES_MODAL
	}
}




