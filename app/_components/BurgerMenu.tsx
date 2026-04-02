'use client'

interface BurgerMenuProps {
  isOpen: boolean
  onClick: () => void
}

export default function BurgerMenu({ isOpen, onClick }: BurgerMenuProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className="relative w-10 h-8 bg-transparent cursor-pointer z-[60] flex-shrink-0"
    >
      {/* Span 1 */}
      <span
        className="block absolute h-[2px] w-full rounded-full left-0 transition-all duration-300 ease-in-out"
        style={{
          background: 'var(--primary-color)',
          top: isOpen ? '50%' : '0px',
          transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
        }}
      />
      {/* Span 2 */}
      <span
        className="block absolute h-[2px] rounded-full left-0 transition-all duration-300 ease-in-out"
        style={{
          background: 'var(--primary-color)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: isOpen ? '0%' : '100%',
          opacity: isOpen ? 0 : 1,
        }}
      />
      {/* Span 3 */}
      <span
        className="block absolute h-[2px] w-full rounded-full left-0 transition-all duration-300 ease-in-out"
        style={{
          background: 'var(--primary-color)',
          top: isOpen ? '50%' : '100%',
          transform: isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-100%)',
        }}
      />
    </button>
  )
}
