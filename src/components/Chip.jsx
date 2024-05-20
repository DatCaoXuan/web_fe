import classNames from "classnames"

function Chip({ children, className }) {
	return (
		<span className={classNames(
			"bg-accent text-base-100 flex gap-[0.2rem] items-center justify-between py-0.5 px-2 rounded-full text-xs font-bold",
			className
		)}>{ children }</span>
	)
}

export default Chip