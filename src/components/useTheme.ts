import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const read = (): Theme =>
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
        ? 'light'
        : 'dark';

/** Current site theme, kept in sync with the data-theme attribute ThemeToggle sets. */
export function useTheme(): Theme {
    const [theme, setTheme] = useState<Theme>(read);

    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(read()));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        setTheme(read());
        return () => observer.disconnect();
    }, []);

    return theme;
}
