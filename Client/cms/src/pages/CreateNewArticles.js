import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import createNewArticle from "../api/createNewArticle";
import { toast } from "react-toastify";
import updateDraft from "../api/updateDraft";
import publishDraft from "../api/publishDraft";
import { useLocation } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import ModalTextEditor from "../components/modals/ModalTextEditor";
import getAricleByArticleId from "../api/getArtticleByArticleId";

const DRAFT_KEY = "bloggy-article-draft";



function storeDraft(draftId) {
    try {
        return localStorage.setItem("draftId", draftId)
    } catch (error) {
        return {};
    }
}

function getDraft() {
    try {
        return JSON.stringify(localStorage.getItem("draftId"))
    } catch (error) {
        return {};
    }
}

function readDraftId() {
    const storedId = localStorage.getItem("draftId");
    if (!storedId) return null;
    try { return JSON.parse(storedId); }
    catch { return storedId; }
};



const CreateNewArticles = () => {
    const [initialDraft, setInitialDraft] = useState({});
    const location = useLocation();
    const [title, setTitle] = useState(initialDraft?.title || "");
    const [content, setContent] = useState(initialDraft?.content || "");
    const [savedAt, setSavedAt] = useState(initialDraft.savedAt || null);
    const [editDraft, setEditDraft] = useState(location.state?.draft || "");
    const [saveDraftWhenLeaving, setSaveDraftWhenLeaving] = useState(false);
    const bodyRef = useRef(null);
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const author_id = JSON.parse(localStorage.getItem("signInSession"))?.id;
    const [draftId, setDraftId] = useState(() => readDraftId());


    async function readDraft() {
        try {
            const articleId = readDraftId();
            const response = await getAricleByArticleId(JSON.parse(articleId));
            const { title, content, created_at } = response.data.initialDraft;

            setInitialDraft({ title: title, content: content, savedAt: created_at });
            return response?.data?.initialDraft;
        } catch (error) {
            return {};
        }
    };


    const saveDraftOnMount = async () => {
        const response = await createNewArticle({ status: 'draft', content, author_id: author_id });
        storeDraft(response?.created_article?.id);
        return response;
    }

    const updateDraftWhenUserTypes = async () => {
        const response = await updateDraft({ content, id: readDraftId() });
        return response;
    };

    const saveDraft = async () => {
        const response = await updateDraft({ content, id: readDraftId() });
        toast.success('Your Draft is saved!');
        return response;
    };


    // Debounce Effect
    useEffect(() => {
        if (initialDraft) {
            const timer = window.setTimeout(() => {
                updateDraftWhenUserTypes()
            }, 700);
            return () => window.clearTimeout(timer);
        }
    }, [title, content]);



    // This drafts a new Article when component mounts and saves the id creatted in localstorage.
    useEffect(() => {
        if (readDraftId()) {
            readDraft();
            return;
        };
        saveDraftOnMount()
    }, [])




    const savedLabel = savedAt
        ? `Saved at ${new Date(savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
        : "Changes save automatically";






    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: { xs: 2, md: 4 }, maxWidth: 1440, mx: "auto" }}>
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
                        <Button variant="contained" disabled={!content.trim()}>Publish</Button>
                    </Stack>
                </Stack>
                <TextEditor
                    setContent={setContent}
                    editDraft={editDraft}
                    setEditDraft={setEditDraft}
                    setTitle={setTitle}
                    title={title}
                    wordCount={wordCount}
                    initialDraft={initialDraft}
                    bodyRef={bodyRef}
                />
            </Stack>
            <ModalTextEditor
                readDraft={getDraft}
                saveDraft={saveDraft}
                content={content}
                />
        </Box>
    );
};
export default CreateNewArticles;



