import React from 'react'

function Button({ text, outline, type, className }) {
  return (
    <button
      type={type || 'button'}
      className={`${
        outline
          ? 'border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-primary-base'
          : 'bg-primary-dark text-primary-base hover:bg-primary-base border-2 border-primary-dark hover:text-primary-dark hover:border-2 hover:border-primary-dark hover:dark:bg-secondary-dark'
      } font-bold py-2 px-4 rounded tracking-wider transition-all ease-in-out ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
