import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'indigo' | 'violet' | 'cyan' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-mono tracking-[0.1em]',
        {
          'text-white/55 border border-white/[0.08]': variant === 'default',
          'text-white/55 border border-white/[0.08]': variant === 'indigo',
          'text-white/50 border border-white/[0.07]': variant === 'violet',
          'text-white/50 border border-white/[0.07]': variant === 'cyan',
          'text-white/40 border border-white/[0.06] hover:border-white/[0.12] transition-colors': variant === 'outline',
        },
        className
      )}
      style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }}
    >
      {children}
    </span>
  )
}
