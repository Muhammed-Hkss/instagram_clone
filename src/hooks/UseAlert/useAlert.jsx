import React from 'react';
import Swal from "sweetalert2";

const useAlert = () => {
	const sweetAlert = React.useCallback(alertText => {
		return Swal.fire({
			position: 'top-end',
			showClass: {
				popup: 'swal2-show',
				backdrop: 'swal2-backdrop-hide',
				icon: 'swal2-icon-hide'
			},
			backdrop: false,
			width: 300,
			html: `<h5>${alertText}<h5/>`,
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
		})
	}, [])

	return {
		actions: {
			sweetAlert
		}
	}
};

export default useAlert;
