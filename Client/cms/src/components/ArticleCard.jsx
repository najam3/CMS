import { Avatar, Box, Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const ArticleCard = ({ article, onEdit, onDelete, deleting = false }) => {
    const author = article?.name || "Unknown author";
    const status = article?.status || "Unspecified";
    const role = article?.role || "Unspecified";
    const normalizedStatus = status.trim().toLowerCase();
    const isPublished = normalizedStatus === "published";
    const isDraft = normalizedStatus === "draft";
    const content = typeof article?.content === "string" ? article.content.trim() : "";
    const preview = content.replace(/\s+/g, " ");
    const articleHeading = preview ? `${preview.slice(0, 68)}${preview.length > 68 ? "…" : ""}` : "Untitled article";
    const createdDate = article?.created_at ? new Date(article.created_at) : null;
    const dateLabel = createdDate && !Number.isNaN(createdDate.getTime())
        ? createdDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
        : "Date unavailable";
    const initials = author.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

    return (
        <Paper component="article" elevation={0} sx={{ position: "relative", overflow: "hidden", p: { xs: 2, sm: 2.5 }, border: 1, borderColor: "divider", borderRadius: 3, bgcolor: "background.paper", transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 12px 28px rgba(25, 48, 65, .08)", borderColor: "secondary.light" } }}>
            <Box sx={{ position: "absolute", left: 0, top: 18, bottom: 18, width: 3, borderRadius: "0 4px 4px 0", bgcolor: isPublished ? "success.main" : "warning.main" }} />
            <Stack spacing={2} sx={{ pl: 0.5 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.disabled" }}>
                        <ArticleOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography variant="caption" sx={{ fontWeight: 650, letterSpacing: ".04em", textTransform: "uppercase" }}>Article</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1, justifyContent: "space-between" }}>
                        <Chip size="small" label={status} sx={{ height: 25, bgcolor: isPublished ? "success.light" : "warning.light", color: isPublished ? "success.dark" : "warning.dark", fontWeight: 700, textTransform: "capitalize", borderRadius: 1.5 }} />
                        {isDraft && (
                            <Button size="small" variant="outlined" startIcon={<EditOutlinedIcon />} onClick={onEdit} aria-label="Edit draft">Edit</Button>
                        )}
                    </Stack>
                </Stack>
                <Box>
                    <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 700, fontSize: 17, lineHeight: 1.45, mb: 0.7 }}>{articleHeading}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 71 }}>
                        {preview || "No article content available."}
                    </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={1.2} sx={{ pt: 1.5, borderTop: 1, borderColor: "divider" }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "brand.light", color: "brand.main", fontSize: 12, fontWeight: 700 }}>{initials || "?"}</Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", color: "text.primary", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{author}</Typography>
                        <Typography variant="caption" sx={{ color: "text.disabled" }}>{role}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>{dateLabel}</Typography>
                    <Tooltip title={deleting ? "Deleting article" : "Delete article"}>
                        <span>
                            <IconButton size="small" onClick={onDelete} disabled={deleting || article?.id == null} aria-label="Delete article" sx={{ color: "error.main", "&:hover": { bgcolor: "error.light" } }}>
                                <DeleteOutlinedIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>

                </Stack>
            </Stack>
        </Paper>
    );
};

export default ArticleCard;








