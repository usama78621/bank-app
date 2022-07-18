import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { firestore, } from "../config/Firebase-uitles";
import { useState, useEffect, useContext, useCallback } from "react";
import { useGobalContext } from "./UserContext";
const { createContext } = require("react");

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false)
    const [documents, setDocuments] = useState([])
    const [transdocuments, setTransdocuments] = useState([])
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
    // useCallback(
    //     () => {

    //     },
    //     [],
    // )

    const readDocs = useCallback(async () => {
        setIsLoading(true)
        const collectionName = "accounts";
        const docsCollectionRef = collection(firestore, collectionName)
        let array = []
        const q = query(docsCollectionRef, where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        })
        setDocuments(array);
        setIsLoading(false)
    }, [user])

    // const readDocss = async () => {
    //     setIsLoading(true)
    //     const collectionName = "accounts";
    //     const docsCollectionRef = collection(firestore, collectionName)
    //     let array = []
    //     const q = query(docsCollectionRef, where("userid", "==", user.uid));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         array.push({ ...doc.data(), id: doc.id });
    //     })
    //     setDocuments(array);
    //     setIsLoading(false)
    // }

    useEffect(() => {
        readDocs();
    }, [readDocs]);

    const readtrascation = async () => {
        const collectionName = "transactions";
        const docsCollectionRef = collection(firestore, collectionName)
        setIsLoading(true)
        let array = []
        const q = query(docsCollectionRef, where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data(), id: doc.id });
        })
        setTransdocuments(array);

        setIsLoading(false)
    }

    useEffect(() => {
        readtrascation();
    }, [user.uid]);


    // handle Delete
    const handleDelete = async (row) => {
        setIsLoading(true)
        await deleteDoc(doc(firestore, "accounts", row.id))
        let array = documents.filter((items) => {
            return row.id !== items.id;
        });
        setDocuments(array)
        setIsLoading(false)
    }

    return (
        <AccountContext.Provider value={{
            page,
            rowsPerPage,
            isLoading,
            documents,
            setDocuments,
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
            transdocuments,
        }}>
            {children}
        </AccountContext.Provider>
    )

}

export const useAccountsContext = () => {
    return useContext(AccountContext)
}

export { AccountContext, AccountProvider }