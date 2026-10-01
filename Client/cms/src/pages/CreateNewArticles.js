import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import createNewArticle from "../api/createNewArticle";
import { toast } from "react-toastify";
import updateDraft from "../api/updateDraft";
import publishDraft from "../api/publishDraft";

const DRAFT_KEY = "bloggy-article-draft";
function readDraft() {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; }
    catch { return {}; }
};



function readDraftId() {
    const storedId = localStorage.getItem("draftId");
    if (!storedId) return null;
    try { return JSON.parse(storedId); }
    catch { return storedId; }
}
const CreateNewArticles = () => {
    const initialDraft = useMemo(readDraft, []);
    const [title, setTitle] = useState(initialDraft.title || "");
    const [content, setContent] = useState(initialDraft.content || "");
    const [savedAt, setSavedAt] = useState(initialDraft.savedAt || null);
    const bodyRef = useRef(null);
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const author_id = JSON.parse(localStorage.getItem("signInSession"))?.id;
    const [draftId, setDraftId] = useState(() => readDraftId());

    useEffect(() => {
        const timer = window.setTimeout(() => {
            if (title || content) {
                const timestamp = new Date().toISOString();
                localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, content, savedAt: timestamp }));
                setSavedAt(timestamp);
            }
        }, 700);
        return () => window.clearTimeout(timer);
    }, [title, content]);

    const applyFormat = (command) => {
        bodyRef.current?.focus();
        document.execCommand(command, false);
        setContent(bodyRef.current?.innerText || "");
    };

    const saveDraft = async () => {
        try {
            if (draftId) {
                const response = await updateDraft({ content, id: draftId });
                toast.success(response?.message || "Draft updated.");
                return response;
            }

            const response = await createNewArticle({ status: "draft", content, author_id });
            const createdId = response?.created_article?.id;
            if (createdId == null) throw new Error(response?.message || "Draft could not be saved.");
            setDraftId(createdId);
            localStorage.setItem("draftId", JSON.stringify(createdId));
            toast.success(response?.message || "Draft saved.");
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Could not save the draft. Please try again.");
        }
    };
    const savedLabel = savedAt
        ? `Saved at ${new Date(savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
        : "Changes save automatically";


    const publishArticle = async () => {
        try {
            let response;
            if (draftId) {
                try {
                    response = await publishDraft({ content, id: draftId });
                } catch (error) {
                    // A saved ID can become stale if that draft was deleted. Publish the current text as a new article.
                    if (error.response?.status !== 404) throw error;
                }
            }

            // A brand-new article has no draft ID, so create it directly as published.
            if (!response?.published_draft) {
                response = await createNewArticle({ status: "published", content, author_id });
                if (!response?.created_article) {
                    throw new Error(response?.message || "Article could not be published.");
                }
            }

            toast.success(response?.message || "Article published successfully.");
            localStorage.removeItem("draftId");
            localStorage.removeItem(DRAFT_KEY);
            setDraftId(null);
            setContent("");
            setTitle("");
            setSavedAt(null);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Could not publish the article. Please try again.");
        }
    };
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: { xs: 2, md: 4 } }}>
            <Stack spacing={3}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }} gap={2}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: "brand.main" }}>Write an article</Typography>
                            <Typography variant="body2" color="text.secondary">A quiet space to shape your next idea.</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography variant="caption" color="text.secondary">{savedLabel}</Typography>
                        <Button variant="outlined" startIcon={<SaveOutlinedIcon />} onClick={saveDraft}>Save draft</Button>
                        <Button onClick={publishArticle} variant="contained" disabled={!content.trim()}>Publish</Button>
                    </Stack>
                </Stack>
                <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, overflow: "hidden", bgcolor: "background.paper" }}>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ px: 2, py: 1, bgcolor: "background.default" }}>
                        <Tooltip title="Bold"><IconButton size="small" onClick={() => applyFormat("bold")}><FormatBoldIcon /></IconButton></Tooltip>
                        <Tooltip title="Italic"><IconButton size="small" onClick={() => applyFormat("italic")}><FormatItalicIcon /></IconButton></Tooltip>
                        <Tooltip title="Underline"><IconButton size="small" onClick={() => applyFormat("underline")}><FormatUnderlinedIcon /></IconButton></Tooltip>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        <Tooltip title="Bulleted list"><IconButton size="small" onClick={() => applyFormat("insertUnorderedList")}><FormatListBulletedIcon /></IconButton></Tooltip>
                        <Tooltip title="Numbered list"><IconButton size="small" onClick={() => applyFormat("insertOrderedList")}><FormatListNumberedIcon /></IconButton></Tooltip>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        <TextField select size="small" defaultValue="p" SelectProps={{ native: true }} onChange={(event) => applyFormat("formatBlock", event.target.value)} sx={{ width: 125 }}>
                            <option value="p">Paragraph</option><option value="h2">Heading</option><option value="h3">Subheading</option>
                        </TextField>
                    </Stack>
                    <Divider />
                    <Box sx={{ mx: "auto", px: { xs: 3, md: 8 }, py: { xs: 4, md: 7 } }}>
                        <TextField fullWidth variant="standard" placeholder="Untitled article" value={title}
                            onChange={(event) => setTitle(event.target.value)} InputProps={{ disableUnderline: true }}
                            inputProps={{ "aria-label": "Article title" }}
                            sx={{ "& input": { fontSize: { xs: 30, md: 40 }, fontWeight: 700, color: "brand.main", lineHeight: 1.2 } }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>Add a clear, memorable title for your story.</Typography>
                        <Box ref={bodyRef} contentEditable suppressContentEditableWarning role="textbox" aria-label="Article body" aria-multiline="true"
                            onInput={(event) => setContent(event.currentTarget.innerText)} data-placeholder="Start writing your articleâ€¦"
                            sx={{ minHeight: 420, outline: "none", color: "text.primary", fontSize: 17, lineHeight: 1.9, whiteSpace: "pre-wrap", "&:empty:before": { content: "attr(data-placeholder)", color: "text.disabled" }, "& h2": { fontSize: 28, mt: 3 }, "& h3": { fontSize: 22, mt: 2 } }}
                        >{initialDraft.content || ""}</Box>
                    </Box>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between" sx={{ px: 3, py: 1.5, bgcolor: "background.default" }}>
                        <Typography variant="caption" color="text.secondary">Draft is saved in this browser.</Typography>
                        <Typography variant="caption" color="text.secondary">{wordCount} words</Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
};
export default CreateNewArticles;



