import { clsx } from 'clsx'

const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
  }

  return (
    <div 
      className={clsx(
        'animate-pulse bg-gray-200',
        variants[variant],
        className
      )}
    />
  )
}

export const SkeletonCard = () => (
  <div className="bg-surface rounded-xl shadow-md p-6 space-y-4">
    <Skeleton className="h-48 w-full" />
    <Skeleton variant="text" className="w-3/4" />
    <Skeleton variant="text" className="w-1/2" />
    <div className="flex gap-2">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
)

export const SkeletonTable = ({ rows = 5, columns = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: columns }).map((_, j) => (
          <Skeleton key={j} className="h-12 flex-1" />
        ))}
      </div>
    ))}
  </div>
)

export default Skeleton
