import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export function useRedirectIfAuthenticated(redirectTo = '/') {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        if (auth?.user) {
            router.replace({ url: redirectTo });
        }
    }, [auth, redirectTo]);
}
