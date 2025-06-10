import React from 'react'

function Button({ text, outline = false, type = 'button', className = '' }) {
  const baseStyles =
    'font-semibold text-sm sm:text-base px-5 py-2.5 rounded-xl tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'

  const filledStyles =
    'bg-primary-dark text-primary-base border-2 border-primary-dark hover:bg-primary-base hover:text-primary-dark hover:border-primary-dark dark:hover:bg-transparent dark:hover:text-primary-base '

  const outlineStyles =
    'bg-transparent border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-primary-base'

  return (
    <button
      type={type}
      className={`${baseStyles} ${
        outline ? outlineStyles : filledStyles
      } ${className}`}
    >
      {text}
    </button>
  )
}

export default Button
