import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";
import Video from "./components/Video";
import N360BlocksRadioGroup from "../../components/N360BlocksRadioGroup";

import "./editor.scss";
import "./style.scss";

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    video_provider,
    video_url,
    autoplay,
    loop,
    controls,
    ratio,
    block_id,
    lazy_load_video
  } = attributes;
  const blockProps = useBlockProps();

  if (block_id !== clientId) {
    setAttributes({ block_id: clientId });
  }

  const allRatios = {
    "ratio-16-9": "16:9",
    "ratio-4-3": "4:3",
    "ratio-9-16": "9:16",
    "ratio-3-4": "3:4",
    "ratio-1-1": "1:1",
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("N360Blocks Video", "n360")} initialOpen={true}>
          <TextControl
            label={__("Enter Video URL", "n360")}
            value={video_url || ""}
            placeholder={__("Paste video URL", "n360")}
            onChange={(value) => setAttributes({ video_url: value })}
          />
        </PanelBody>
        <PanelBody title={__("Video Settings", "n360")} initialOpen={true}>
          <N360BlocksRadioGroup
            label={__("Aspect Ratio", "n360")}
            options={allRatios}
            selected={ratio}
            name="ratio"
            updateOption={setAttributes}
          />
          <ToggleControl
            label={__("Lazy Load Video", "n360")}
            checked={lazy_load_video}
            onChange={(value) => setAttributes({ lazy_load_video: value })}
          />
          <ToggleControl
            label={__("Controls", "n360")}
            checked={controls}
            onChange={(value) => setAttributes({ controls: value })}
          />
          <ToggleControl
            label={__("Autoplay Video", "n360")}
            checked={autoplay}
            onChange={(value) => setAttributes({ autoplay: value })}
          />
          <ToggleControl
            label={__("Loop Video", "n360")}
            checked={loop}
            onChange={(value) => setAttributes({ loop: value })}
          />
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="w-video-block">
          {<Video data={attributes} setAttributes={setAttributes} />}
        </div>
      </section>
    </>
  );
}
