'use client';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)' }} className="px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/venator-logo-icon.png" className="w-7 h-7 rounded-lg" />
              <span className="font-semibold text-[15px]" style={{ color: 'var(--fg)' }}>Venator UI</span>
            </div>
            <p className="text-[13.5px] max-w-[280px] leading-relaxed mb-5" style={{ color: 'var(--fg-3)' }}>
              A React + TypeScript UI system. From primitives to patterns to full application architectures — shipped via CLI.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'GitHub', href: 'https://github.com/jmelop/venator-ui', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg> },
                { label: 'Docs', href: '/docs/getting-started/introduction', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg> },
                { label: 'CLI', href: '/docs/getting-started/introduction', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-6-6-6M12 19h8"/></svg> },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
                  style={{ border: '1px solid var(--line)', color: 'var(--fg-4)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Packages</h5>
            <ul className="flex flex-col gap-2.5">
              {[
                { pkg: '@venator-ui/tokens',     href: 'https://www.npmjs.com/package/@venator-ui/tokens' },
                { pkg: '@venator-ui/ui',         href: 'https://www.npmjs.com/package/@venator-ui/ui' },
                { pkg: '@venator-ui/patterns',   href: 'https://www.npmjs.com/package/@venator-ui/patterns' },
                { pkg: '@venator-ui/archetypes', href: 'https://www.npmjs.com/package/@venator-ui/archetypes' },
                { pkg: '@venator-ui/cli',        href: 'https://www.npmjs.com/package/@venator-ui/cli' },
              ].map(({ pkg, href }) => (
                <li key={pkg}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-[13px] font-mono transition-colors hover:opacity-80"
                    style={{ color: 'var(--fg-2)' }}
                  >{pkg}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Resources</h5>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Documentation', href: '/docs/getting-started/introduction' },
                { label: 'Components',    href: '/docs/components/button' },
                { label: 'CLI Reference', href: '/docs/getting-started/introduction' },
                { label: 'Changelog',     href: 'https://github.com/jmelop/venator-ui/releases', external: true },
              ].map(({ label, href, external }) => (
                <li key={label}>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-[13.5px] transition-colors hover:opacity-80" style={{ color: 'var(--fg-2)' }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider mb-4" style={{ color: 'var(--fg-4)' }}>Community</h5>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'GitHub',     href: 'https://github.com/jmelop/venator-ui' },
                { label: 'Contribute', href: 'https://github.com/jmelop/venator-ui/pulls' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="text-[13.5px] transition-colors hover:opacity-80"
                    style={{ color: 'var(--fg-2)' }}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
          <span className="font-mono text-[12px]" style={{ color: 'var(--fg-4)' }}>MIT © 2026 Venator contributors</span>
          <span className="flex items-center gap-2 font-mono text-[12px]" style={{ color: 'var(--fg-4)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
