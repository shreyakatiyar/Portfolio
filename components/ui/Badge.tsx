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
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium',
        {
          'bg-slate-700/50 text-slate-200 border border-slate-600/30': variant === 'default',
          'bg-blue-500/10 text-blue-400 border border-blue-500/25': variant === 'indigo',
          'bg-slate-600/30 text-slate-300 border border-slate-600/30': variant === 'violet',
          'bg-slate-700/40 text-slate-300 border border-slate-600/25': variant === 'cyan',
          'bg-transparent text-slate-400 border border-slate-600/30 hover:border-slate-500/50 transition-colors': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
