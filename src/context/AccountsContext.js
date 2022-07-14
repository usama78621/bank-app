import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { firestore, } from "../config/Firebase-uitles";
import { useState, useEffect, useContext } from "react";
import { useGobalContext } from "./UserContext";
const { createContext } = require("react");

const AccountContext = createContext();

const collectionName = "Accounts";
const docsCollectionRef = collection(firestore, collectionName)
const AccountProvider = ({ children }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false)
    const [documents, setDocuments] = useState([])
    const [open, setOpen] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [single, setSignle] = useState({})
    const { user } = useGobalContext()

    const handleopen2 = () => {
        setOpendelete(true)
    }
    const handlecolse2 = () => {
        setOpendelete(false)
    }
    const handleClose = () => setOpen(false);
    const handleOpen = (id) => {
        documents.forEach((doc) => {
            if (doc.id === id) {
                setSignle(doc)
                setOpen(true);
                return
            }
        })
    }
    useEffect(() => {
        handleOpen()
    }, [])
    //  Pages increase and dresase
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // fecth Products from firebase
    const readDocs = async () => {
        setIsLoading(true)
        let array = []
        const q = query(docsCollectionRef, where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        })
        setDocuments(array);
        setIsLoading(false)
    }

    useEffect(() => {
        readDocs();
    }, [user.uid]);


    // handle Delete
    const handleDelete = async (row) => {
        await deleteDoc(doc(firestore, collectionName, row.id))
        let array = documents.filter((items) => {
            return row.id !== items.id;
        });
        alert("Delete")
        setDocuments(array)
    }

    return (
        <AccountContext.Provider value={{
            page,
            rowsPerPage,
            isLoading,
            documents,
            open,
            opendelete,
            single,
            handleClose,
            handlecolse2,
            handleOpen,
            handleopen2,
            handleChangePage,
            handleChangeRowsPerPage,
            handleDelete,
            setIsLoading,
        }}>
            {children}
        </AccountContext.Provider>
    )

}

export const useAccountsContext = () => {
    return useContext(AccountContext)
}

export { AccountContext, AccountProvider }