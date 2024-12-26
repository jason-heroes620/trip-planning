import { ComponentProps } from 'react';

interface SelectInputProps extends ComponentProps<'select'> {
    error?: string;
    options: { value: string; label: string }[];
    selected?: string;
}

export default function SelectInput({
    name,
    error,
    className,
    options = [],
    selected,
    ...props
}: SelectInputProps) {
    return (
        <select
            id={name}
            name={name}
            {...props}
            value={selected}
            className={`form-select w-full rounded border-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
                error
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : ''
            }`}
        >
            <option key={0} value="0">
                Choose
            </option>
            {options?.map(({ value, label }, index) => (
                <option key={index} value={value}>
                    {label}
                </option>
            ))}
        </select>
    );
}
