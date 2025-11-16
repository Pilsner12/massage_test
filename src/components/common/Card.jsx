import { clsx } from 'clsx'

const Card = ({ children, hover = false, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'bg-surface rounded-xl shadow-md p-6 transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
