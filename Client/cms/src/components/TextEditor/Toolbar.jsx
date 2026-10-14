import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { IconButton, Tooltip } from "@mui/material";


const Toolbar = ({applyFormat}) => {
     
 const toolTipProps = [
    {title: "Bold", icon: <FormatBoldIcon />, command: "bold"},
    {title: "Italic", icon: <FormatItalicIcon />, command: "italic"},
    {title: "Underline", icon: <FormatUnderlinedIcon />, command: "underline"},
    {title: "Bulleted list", icon: <FormatListBulletedIcon />, command: "insertUnorderedList"},
    {title: "Numbered list", icon: <FormatListNumberedIcon />, command: "insertOrderedList"}
 ]
    
    return (
    <>
      {toolTipProps.map((item, index) => (
        <Tooltip key={index} title={item.title}>
          <IconButton sx={{color:'brand.light', border:'1px solid', borderRadius:'8px'}} size="small" onClick={() => applyFormat(item.command)}>
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </>
    )
}


export default Toolbar;