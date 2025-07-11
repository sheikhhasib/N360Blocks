/**
 * WordPress dependencies
 */

import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

export default function save(attributes) {
  const blockProps = useBlockProps.save();

  return (
    <section {...blockProps} />
  );
}
