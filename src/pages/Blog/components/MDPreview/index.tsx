import React from "react";
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';


const MdPreviewer = (props) => {
    const { id, textValue } = props;

    return (
        <MdPreview
            editorId={id}
            modelValue={textValue}
        />
    )
}

export default MdPreviewer;