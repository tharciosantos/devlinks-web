export function SkeletonDashboard() {
    return (
        <div className="animate-pulse w-full">
            {/* Link Publico Skeleton */}
            <div
                className="p-4 mb-8"
                style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                }}
            >
                <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                <div className="h-3 w-1/2" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
            </div>

            {/* Perfil Skeleton */}
            <div
                className="p-6 mb-8"
                style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border-default)',
                }}
            >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div
                        className="h-20 w-20"
                        style={{
                            backgroundColor: 'var(--color-border-default)',
                            border: '2px solid var(--color-border-default)',
                        }}
                    ></div>
                </div>

                {/* Info */}
                <div className="text-center mb-6">
                    <div className="h-6 w-1/2 mx-auto mb-2" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                    <div className="h-4 w-1/3 mx-auto" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                </div>

                {/* Form */}
                <div className="space-y-3">
                    <div className="h-3 w-1/4 mb-3" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                    <div className="h-12 w-full" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                    <div className="h-12 w-full" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                    <div className="h-12 w-full" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.3 }}></div>
                </div>
            </div>

            {/* Links Skeleton */}
            <div>
                <div className="h-3 w-1/4 mb-4" style={{ backgroundColor: 'var(--color-border-default)' }}></div>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-14 w-full"
                            style={{
                                backgroundColor: 'var(--color-bg-surface)',
                                border: '1px solid var(--color-border-default)',
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
