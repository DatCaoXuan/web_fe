import classNames from 'classnames';
import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'
import makeMap from '../utils/makeMap';

function Select({ defaultValue, isMulti, control, name, labelMap, title, className, isRequired, ...props }) {

	const isControlled = control != null

	const optionsMap = makeMap([])
	const options = (labelMap ? Array.from(labelMap.keys()) : []).map(i => {
		const option = { value: i, label: labelMap.get(i) }
		optionsMap.set(i, option)
		return option
	})

	const commonProps = {
		options, 
		defaultValue, 
		classNames:{
			container: (state) => 'w-fit'
		},
		isMulti,
		...props,
	}

    return (
		<div className={classNames('flex flex-col', className ?? '')}>
			{ title && <label className="label">
				<h4 className="label-text font-semibold">{ title } { isRequired && '*' }</h4> 
			</label> }
			{ isControlled
				? <Controller 
					name={name} 
					control={control} 
					render={({ field }) => { 
					return <ReactSelect { ...commonProps }
						unstyled
						classNames={{
							control: () => classNames('bg-base-100 pl-4 pr-0 flex input input-bordered', { 
								'rounded-inherit': className && className.includes('join-item'), 
								'rounded-md': !className?.includes('join-item') 
							}),
							menu: () => 'bg-base-100 shadow-[0_2px_32px_rgba(0,0,0,.2)] py-3 rounded-md translate-y-4',
							option: () => 'hover:text-primary px-4 py-1 hover:cursor-pointer',
							valueContainer: () => 'flex gap-2',
							multiValue: () => 'bg-primary text-base-100 flex gap-[0.2rem] items-center justify-between py-0.5 px-2 rounded-full text-xs font-bold',
							clearIndicator: () => 'hover:text-primary hover:cursor-pointer',
							dropdownIndicator: () => 'hover:text-primary hover:cursor-pointer',
							indicatorsContainer: () => 'flex gap-1 items-center justify-between px-4',
						}}
						value={isMulti 
							? field.value?.map(val => optionsMap.get(val)) ?? []
							: optionsMap.get(field.value)
						}
						onChange={option => {
							if (isMulti)
								field.onChange(option?.map(o => o.value))
							else
								field.onChange(option?.value)
						}}
					/>}}
				/>
				: <ReactSelect  { ...commonProps }/>
			}
		</div>
    );
}

export default Select