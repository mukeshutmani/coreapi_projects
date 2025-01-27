import React, { forwardRef } from 'react'

function Input({
    label,
    type,
    placeholder,
    className,
    ...props
   

},ref) {
  return (
    <div className="w-full ">
        <label htmlFor={label} className='flex ml-1 '>
            {label}
        </label>

        <input 
        type={type}
        placeholder={placeholder}
        className={className}
        { ...props}
        ref={ref}
         />
        
    </div>
  )
}

export default forwardRef(Input)