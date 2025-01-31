import React, { ReactNode, useMemo } from 'react';

import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export type RichTextRenderProps = {
  className?: string;
  richTextDocument: Document;
}

export function RichTextRender({ richTextDocument, className }: RichTextRenderProps): ReactNode {
  const render = useMemo(() => {
    return documentToReactComponents(
      richTextDocument,
      {
        preserveWhitespace: true,
      }
    );
  }, [richTextDocument]);

  return (
    <div className={className} data-is="contentful-rich-text">
      {render}
    </div>
  )
}