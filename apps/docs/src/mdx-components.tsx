import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mt-6 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
        {children}
      </p>
    ),
    code: ({ children }) => (
      <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200">
        {children}
      </code>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400 mb-4 space-y-1">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    hr: () => <hr className="border-neutral-200 dark:border-neutral-800 my-6" />,
    table: ({ children }) => (
      <div className="w-full overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-neutral-200 dark:border-neutral-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
        {children}
      </td>
    ),
    ...components,
  };
}
