import classNames from 'classnames';
import { useToaster } from 'react-hot-toast'

function Toast() {

	const { toasts, handlers: { startPause, endPause, updateHeight } } = useToaster()

	return (
		<div 
			className="toast toast-bottom toast-end"
			onMouseEnter={startPause}
      		onMouseLeave={endPause}
		>
			{toasts.map(toast => {
				const ref = (el) => {
					if (el && !toast.height) {
						const height = el.getBoundingClientRect().height;
						updateHeight(toast.id, height);
					}
        		};

				return <div 
					role="alert"
					aria-label="notification"
					key={toast.id}
					ref={ref}
					className={classNames('alert', {
						'alert-info': toast.type === 'info',
						'alert-success': toast.type === 'success',
						'alert-warning': toast.type === 'warning',
						'alert-error': toast.type === 'error',
					})}
				>
					<span>{ toast.message }</span>
				</div>
			})}
		</div>
	)
}

export default Toast;
