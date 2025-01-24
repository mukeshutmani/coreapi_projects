import React from 'react'

function Input({
    label,
    type,
    placeholder,
    className,
    ...props


}) {
  return (
    <div className="w-full ">
        <label htmlFor={label} className='flex ml-1 '>
            {label}
        </label>

        <input 
        type={type}
        placeholder={placeholder}
        className={className}
        {...props}
         />
        
    </div>
  )
}

export default Input