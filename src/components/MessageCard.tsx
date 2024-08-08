"use Client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/models/User.model"
import { useToast } from "./ui/use-toast"
import { apiResponse } from "@/types/apiResponse"
import axios from "axios"

type MessageCardProps={
    message:Message,
    onMessageDelete: (messageId:string)=>void,
}

const MessageCard = ({ message, onMessageDelete }:MessageCardProps) => {

    const {toast}=useToast()
    

   async function handleDeleteConfirm() {
    const response= await axios.delete<apiResponse>(`/api/delete-message/${message._id}`)
    toast({
        title:response.data.message
    })
    onMessageDelete(message._id)

    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive"><X className="w-5 h-5" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                {/* <CardContent></CardContent>
                <CardFooter></CardFooter> */}
            </Card>
        </div>
    )
}

export default MessageCard