import { Box, Divider, IconButton, MenuItem, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import Toolbar from "./TextEditor/Toolbar";




export default function TextEditor({ setContent, wordCount, setTitle, title, initialDraft, bodyRef }) {

    const applyFormat = (command) => {
        bodyRef.current?.focus();
        document.execCommand(command, false);
        setContent(bodyRef.current?.innerText || "");
    };



    return (
        <Paper elevation={0} sx={{ border: 1, borderColor: "divider", overflow: "hidden", bgcolor: "background.paper" }}>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2, py: 1.5, bgcolor: "brand.main" }}>
                <Toolbar
                    applyFormat={applyFormat}
                />
            </Stack>

            <Divider />

            {/* Article title */}
            <Box sx={{ mx: "auto", px: { xs: 3, md: 8 }, py: { xs: 4, md: 7 } }}>

                <TextField fullWidth 
                    variant="standard" 
                    placeholder="Untitled article" 
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} 
                    InputProps={{ disableUnderline: true }}
                    inputProps={{ "aria-label": "Article title" }}
                    sx={{ 
                    "& input": { fontSize: { xs: 30, md: 40 }, 
                    fontWeight: 700, color: "brand.main", lineHeight: 1.2 }
                 }}
                />

                <Typography variant="body2" color="text.secondary"
                    sx={{ mt: 1, mb: 4 }}>
                    Add a clear, memorable title for your story.
                </Typography>

                {/* Document body */}
                <Box
                    ref={bodyRef}
                    contentEditable
                    suppressContentEditableWarning
                    role="textbox"
                    aria-label="Article body"
                    aria-multiline="true"
                    onInput={(event) => { setContent(event.currentTarget.innerText) }}
                    data-placeholder="Start writing your article.."
                    sx={{
                        minHeight: 420, outline: "none", color: "text.primary", fontSize: 17,
                        lineHeight: 1.9, whiteSpace: "pre-wrap",
                        "&:empty:before": {
                            content: "attr(data-placeholder)",
                            color: "text.disabled"
                        }, "& h2": { fontSize: 28, mt: 3 },
                        "& h3": { fontSize: 22, mt: 2 }
                    }}
                >
                    {initialDraft.content || ""}
                </Box>

            </Box>

            <Divider />

            <Stack 
            direction="row" 
            justifyContent="space-between"
            sx={{ px: 3, py: 1.5, bgcolor: "brand.main" }}>
            <Typography 
                variant="caption" 
                sx={{ color: 'brand.light' }}>Draft is saved in this browser.
            </Typography>
            
            <Typography
                  variant="caption" 
                  sx={{ color: 'brand.light' }}>
                  {wordCount} 
                  words
            </Typography>
            </Stack>
        </Paper>


    )

};



