import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className={className} {...props}>
            {appearance === 'dark' ? (
                <span className="flex items-center gap-2" onClick={() => updateAppearance('light')}>
                    <Sun className="size-6 fill-[#7E88C3] text-[#7E88C3]" />
                </span>
            ) : (
                <span className="flex items-center gap-2" onClick={() => updateAppearance('dark')}>
                    <Moon className="size-6 fill-[#7E88C3] text-[#7E88C3]" />
                </span>
            )}
        </div>
    );
}
