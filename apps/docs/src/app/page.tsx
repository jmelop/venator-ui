import { Button } from '@venator/ui';
import { colors, spacing } from '@venator/tokens';

export default function Home() {
    return (
        <main className="min-h-screen p-8 md:p-24">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Venator - React UI Infrastructure</h1>
                    <p className="text-xl text-gray-600">
                        A React + TypeScript UI infrastructure for building modern web interfaces,
                        data-driven tools and AI-assisted applications.
                    </p>
                </div>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Components</h2>

                    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                        <h3 className="text-xl font-semibold mb-4">Button</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>

                            <div className="flex gap-4 flex-wrap items-center">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>

                            <div>
                                <Button fullWidth>Full Width Button</Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-xl font-semibold mb-4">Design Tokens</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Colors</h4>
                                <div className="flex gap-2">
                                    {Object.entries(colors.primary).slice(3, 7).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="w-16 h-16 rounded"
                                            style={{ backgroundColor: value as string }}
                                            title={`primary.${key}: ${value}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Spacing Scale</h4>
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    {JSON.stringify(spacing, null, 2)}
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                            <code>{`# Install dependencies
                                    npm install

                                    # Start development server
                                    npm run dev

                                    # Build all packages
                                    npm run build`}
                            </code>
                        </pre>
                    </div>
                </section>
            </div>
        </main>
    );
}
