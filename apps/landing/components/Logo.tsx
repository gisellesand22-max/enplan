interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-6xl md:text-7xl',
}

const dotSizes = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5 md:w-6 md:h-6',
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  return (
    <span className={`font-montserrat font-extrabold tracking-tight text-carbon inline-flex items-baseline ${sizes[size]} ${className}`}>
      enplan
      <span className={`${dotSizes[size]} bg-lima rounded-full inline-block ml-0.5 mb-[0.15em] shrink-0`} />
    </span>
  )
}
