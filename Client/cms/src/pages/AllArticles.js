import { useEffect, useMemo, useState } from "react";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { getAllArticles } from "../api/dashboardApi";
import ArticleCard from "../components/ArticleCard";
import deleteArticle from "../api/deleteArticle";
import { toast } from "react-toastify";

const AllArticles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [articleToDelete, setArticleToDelete] = useState(null);

    useEffect(() => {
        let active = true;
        getAllArticles()
            .then((results) => { if (active) setArticles(Array.isArray(results?.articles) ? results.articles : []); })
            .catch(() => { if (active) setError(true); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);
//   console.log(articles)
    const counts = useMemo(() => ({
        all: articles.length,
        published: articles.filter((article) => article.status?.trim().toLowerCase() === "published").length,
        draft: articles.filter((article) => article.status?.trim().toLowerCase() === "draft").length,
    }), [articles]);


    const filteredArticles = useMemo(() => {
        const term = search.trim().toLowerCase();
        return articles.filter((article) => {
            const matchesStatus = statusFilter === "all" || article.status?.trim().toLowerCase() === statusFilter;
            const matchesSearch = !term || `${article.name || ""} ${article.content || ""}`.toLowerCase().includes(term);
            return matchesStatus && matchesSearch;
        });
    }, [articles, search, statusFilter]);

    const handleEditDraft = (article) => {
        navigate("/createArticle", { state: { draft: article } });
    };

    const handleDeleteArticle = async () => {
        const article = articleToDelete;
        const id = article?.id;
        if (id == null) {
            toast.error("This article has no ID and cannot be deleted.");
            return;
        }

        setDeletingId(id);
        try {
            const result = await deleteArticle(id);
            if (!result?.article) {
                toast.error(result?.message || "Article could not be found.");
                return;
            }
            setArticles((currentArticles) => currentArticles.filter((item) => String(item.id) !== String(id)));
            setArticleToDelete(null);
            toast.success(result.message || "Article deleted successfully.");
        } catch (deleteError) {
            toast.error(deleteError.response?.data?.message || "Could not delete the article. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };
    const filters = [
        { value: "all", label: "All articles", count: counts.all },
        { value: "published", label: "Published", count: counts.published },
        { value: "draft", label: "Drafts", count: counts.draft },
    ];

    return (
        <Box sx={{ maxWidth: 1440, mx: "auto" }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}  sx={{ mb: 3, justifyContent:'space-between'}}>
                <Box>
                    <Typography variant="h4" sx={{ color: "brand.main", fontWeight: 750, letterSpacing: "-0.03em" }}>Articles</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.6 }}>Browse and manage your published stories and drafts.</Typography>
                </Box>
                <Button component={Link} to="/createArticle" variant="contained" startIcon={<AddRoundedIcon />} sx={{ bgcolor: "primary.main", borderRadius: 2, px: 2.2, py: 1.2, textTransform: "none", fontWeight: 700, boxShadow: "none", alignSelf: { xs: "flex-start", sm: "auto" }, "&:hover": { bgcolor: "primary.dark", boxShadow: "none" } }}>
                    Create article
                </Button>
            </Stack>

            <Paper elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: { xs: 2, sm: 2.5 }, mb: 3, bgcolor: "background.paper" }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {filters.map((filter) => (
                            <Button key={filter.value} onClick={() => setStatusFilter(filter.value)} sx={{ textTransform: "none", borderRadius: 2, px: 1.5, py: 0.9, color: statusFilter === filter.value ? "brand.main" : "text.secondary", bgcolor: statusFilter === filter.value ? "brand.light" : "transparent", fontWeight: statusFilter === filter.value ? 700 : 500, "&:hover": { bgcolor: "brand.light" } }}>
                                {filter.label}<Box component="span" sx={{ ml: 1, color: "text.disabled", fontSize: 12 }}>{filter.count}</Box>
                            </Button>
                        ))}
                    </Stack>
                    <TextField size="small" placeholder="Search articles or authors" value={search} onChange={(event) => setSearch(event.target.value)} sx={{ width: { xs: "100%", md: 300 }, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "background.paper" } }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: "text.disabled" }} /></InputAdornment> }} inputProps={{ "aria-label": "Search articles or authors" }} />
                </Stack>
            </Paper>

            {loading ? (
                <Typography sx={{ py: 8, textAlign: "center", color: "text.secondary" }}>Loading articles…</Typography>
            ) : error ? (
                <Paper elevation={0} sx={{ border: 1, borderColor: "error.light", borderRadius: 3, p: 5, textAlign: "center", bgcolor: "background.paper" }}>
                    <Typography sx={{ fontWeight: 700, color: "error.dark" }}>Articles couldn’t be loaded</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>Please refresh the page and try again.</Typography>
                </Paper>
            ) : filteredArticles.length ? (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "repeat(2, minmax(0, 1fr))" }, gap: 2 }}>
                    {filteredArticles.map((article, index) => <ArticleCard key={article.id || `${article.created_at}-${index}`} article={article} onEdit={() => handleEditDraft(article)} onDelete={() => setArticleToDelete(article)} deleting={String(deletingId) === String(article.id)} />)}
                </Box>
            ) : (
                <Paper elevation={0} sx={{ border: 1, borderStyle: "dashed", borderColor: "divider", borderRadius: 3, p: { xs: 4, sm: 7 }, textAlign: "center", bgcolor: "background.paper" }}>
                    <Box sx={{ width: 48, height: 48, mx: "auto", mb: 1.5, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "brand.light", color: "brand.main" }}><ArticleOutlinedIcon /></Box>
                    <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 700 }}>{articles.length ? "No matching articles" : "No articles yet"}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>{articles.length ? "Try a different search or status filter." : "Create your first article to get started."}</Typography>
                    {!articles.length && <Button component={Link} to="/createArticle" startIcon={<AddRoundedIcon />} sx={{ mt: 2, color: "primary.main", textTransform: "none", fontWeight: 700 }}>Create article</Button>}
                </Paper>
            )}

            <Dialog
                open={Boolean(articleToDelete)}
                onClose={() => { if (deletingId == null) setArticleToDelete(null); }}
                aria-labelledby="delete-article-title"
                aria-describedby="delete-article-description"
            >
                <DialogTitle id="delete-article-title">Delete article?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-article-description">
                        This will permanently delete this article. This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setArticleToDelete(null)} disabled={deletingId != null}>Cancel</Button>
                    <Button onClick={handleDeleteArticle} color="error" variant="contained" disabled={deletingId != null}>
                        {deletingId != null ? "Deleting…" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllArticles;




