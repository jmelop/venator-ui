/**
 * Data contract for `venator manifest`.
 *
 * The manifest is a structured snapshot of the Venator library — tokens,
 * components, props, and preset flags — emitted so AI copilots can generate
 * aligned UI without scanning the whole repo. This file is the data core only;
 * markdown rendering and file targets live elsewhere.
 */

export interface VenatorManifest {
  /** Version of the `@venator-ui/ui` package the manifest was built against. */
  version: string;
  tokens: TokenGroup[];
  components: ComponentInfo[];
  presetFlags: PresetFlag[];
}

export interface TokenGroup {
  /** Top-level token export name, e.g. `bg`, `colors`, `typography`. */
  category: string;
  /** Leaf token names (key paths), never raw values — e.g. `primary.500`. */
  values: string[];
}

export interface ComponentInfo {
  name: string;
  props: PropInfo[];
  /** Usage snippet pulled from the component's `@example` JSDoc, if present. */
  example?: string;
}

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface PresetFlag {
  name: string;
  description: string;
}
