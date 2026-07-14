interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean
  className?: string
}

const sizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
}

const dotSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-4 h-4',
}

export function Logo({ size = 'md', dark = false, className = '' }: LogoProps) {
  return (
    <span
      className={`font-montserrat font-extrabold tracking-tight inline-flex items-baseline ${dark ? 'text-white' : 'text-carbon'} ${sizes[size]} ${className}`}
    >
      enplan
      <span
        className={`${dotSizes[size]} bg-lima rounded-full inline-block ml-0.5 mb-[0.15em] shrink-0`}
      />
    </span>
  )
}
