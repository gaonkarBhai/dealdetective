"use client"

import { addUserEmail } from "@/library/actions";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { Truck, Mail } from 'lucide-react';
import { useState } from "react";


const TrackProd = ({id}:string) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [value, setValue] = useState("");
    const handleClick = async ()=>{
        console.log(value);
        await addUserEmail(id, value)
    }

    return (
        <>
            <Button onPress={onOpen} className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Track Product
                </span>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>

                                <span className="flex gap-1 bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                    <Truck color="yellow" />
                                    Track Product
                                </span>

                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Stay informed! Enter your email address to track the price of your favorite product and receive timely updates on exclusive deals and discounts.
                                </p>
                                <Input
                                    onValueChange={setValue}
                                    isClearable
                                    color="secondary"
                                    type="email"
                                    label="Email"
                                    placeholder="you@example.com"
                                    labelPlacement="outside"
                                    startContent={
                                        <Mail />
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" variant="flat" onPress={onClose}>
                                    Track
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default TrackProd
