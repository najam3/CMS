import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";
import deleteDraftedArticleById from "../../api/deleteDraftedArticleById";



const ModalTextEditor = ({ saveDraft, readDraft, content }) => {
    const [openModal, setOpenModal] = useState(false);
    const blocker = useBlocker(({ currentLocation, nextLocation }) =>
        currentLocation.pathname === "/createArticle" &&
        currentLocation.pathname !== nextLocation.pathname);



    function removeDraft() {
        localStorage.removeItem("draftId");
    };


    const handleSaveDraft = async () => {
        saveDraft();
        removeDraft();
        blocker.proceed();
    }

    const cancelDraft = async () => {
        await deleteDraftedArticleById(JSON.parse(readDraft()));
        blocker.proceed();
        removeDraft();
    };

    async function handleModalOpen() {
        if (content?.length > 0) {
            setOpenModal(blocker.state === "blocked");
        } else if (blocker.state === "blocked") {
            await deleteDraftedArticleById(JSON.parse(readDraft()));
            removeDraft();
            blocker.proceed();
        }
    }

    useEffect(() => {
        handleModalOpen();
    }, [blocker.state]);



    return (
        <>
            <Dialog
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                    blocker.reset();
                }
                }
                aria-labelledby="delete-article-title"
                aria-describedby="delete-article-description"
            >
                <DialogTitle id="clear">{"Do you want to keep these changes?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="clear">
                        You will loose your Article!
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleSaveDraft}>Yes</Button>
                    <Button onClick={cancelDraft} color="error" variant="contained">
                        {"No"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};


export default ModalTextEditor;
