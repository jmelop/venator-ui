'use client';

import { Label, Select } from '@venator-ui/ui';
import { ChatInput } from '../../components/chat-input';
import { ChatMessage } from '../../components/chat-message';

const mockResponse =
  'Good software architecture is built on a handful of enduring principles. ' +
  'Separation of concerns keeps each module focused on a single responsibility, ' +
  'making the system easier to understand and change. Loose coupling between ' +
  'components means that modifications in one area don\'t cascade unpredictably ' +
  'through the rest of the codebase. High cohesion ensures that related logic ' +
  'lives together, reducing the friction of navigating the system. Favour ' +
  'composition over inheritance to keep hierarchies shallow and behaviour ' +
  'explicit. Finally, design for replaceability — if you can swap a component ' +
  'without touching its neighbours, your boundaries are probably right.';

export default function AiPage() {
  return (
    <div className="flex flex-col h-full gap-4 p-6">
      <div className="flex-1 overflow-y-auto">
        <ChatMessage content={mockResponse} />
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="mode-select">Mode</Label>
        <Select id="mode-select" defaultValue="general" className="w-40">
          <option value="general">General</option>
          <option value="code">Code</option>
          <option value="analysis">Analysis</option>
        </Select>
      </div>

      <ChatInput />
    </div>
  );
}
