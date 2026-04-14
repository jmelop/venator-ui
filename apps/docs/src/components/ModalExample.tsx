'use client';

import { useState } from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from '@venator-ui/ui';

export function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Confirm action" onClose={() => setOpen(false)} />
        <ModalContent>
          <p className="text-sm text-neutral-600">
            Are you sure you want to proceed? This action cannot be undone.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
