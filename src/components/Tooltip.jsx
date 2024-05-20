import classNames from "classnames"

function Tooltip({ isVisible, tip, children, className }) {
	return (
		<div className={classNames(className, {
			tooltip: isVisible
		})} data-tip={tip}>{ children }</div>
	)
}

export default Tooltip