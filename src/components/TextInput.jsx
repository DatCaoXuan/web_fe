import classNames from "classnames";
import { forwardRef } from "react";

const TextInput = forwardRef(({ type, label, placeholder, errorMessage, isRequired, isTextArea, className, ...props }, ref) => {
	
	const inputType = type ?? 'text'
	
	return (
		<div className={classNames('form-control', className)}>
			{ label && <label className="label">
				<h4 className="label-text font-semibold">{ label } { isRequired && '*' }</h4>
			</label> }
			{ isTextArea 
				? <textarea
					className="textarea textarea-bordered h-64 w-full resize-none focus:outline-none" 
					placeholder={placeholder}
					ref={ref}
					{ ...props } 
				></textarea>
				: <input
					type={inputType} 
					placeholder={placeholder}
					ref={ref}
					{ ...props } 
					className={classNames("w-full max-w-xs focus:outline-none", {
						'input input-bordered': inputType !== 'file',
						'file-input file-input-bordered': inputType === 'file',
						'border-error': errorMessage != null,
					})}
			/> }
			{ errorMessage && <label className="label">
				<span className="label-text-alt text-error">{ errorMessage }</span>
			</label>}
		</div>
	)
});

export default TextInput