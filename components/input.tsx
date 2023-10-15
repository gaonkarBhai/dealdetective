"use client"

import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Link2 } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import { scrapeAmazonProduct } from "@/library/scraper";

export default function INPUT() {

    const [value, setValue] = React.useState("");
    const [buttonClicked, setButtonClicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)

    const amazonUrlRegex = /^https?:\/\/(www\.)?amazon\.(com|ca|co\.uk|de|fr|es|it|com\.au|com\.br|com\.mx|nl|sg|ae|in|jp|se|tr|com\.tr|com\.tw|cn|sa)\b/i;

    const validateEmail = (value:any) => value.match(amazonUrlRegex);

    const isInvalid = React.useMemo(() => {
        if (value === "" || (buttonClicked && !validateEmail(value))) {
            return true;
        }
        return false;
    }, [value, buttonClicked]);

    const handleButtonClick = async() => {
        setButtonClicked(true);

        if (validateEmail(value)){
            try {
                setIsLoading(true)
                const product = await scrapeAmazonProduct(value);

            } catch (error) {
                console.log(error);
                
            }finally{
                setIsLoading(false);
            }
            console.log(value)
        }
        
    };

    return (
        <div className="flex w-96 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 justify-items-center items-center align-center">
            <Input
                isClearable
                type="text"
                label="URL"
                placeholder="https://www.amazon.com/..."
                description="Enter a valid amazon url"
                labelPlacement="outside"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "secondary"}
                errorMessage={isInvalid && "Please enter a valid URL"}
                onValueChange={setValue}
                startContent={<Link2 />}
            />
            {
                isLoading
                ?
                <Button
                disabled={value === ""}
                color="primary"
                variant="flat"
                onClick={handleButtonClick}
                isLoading
                spinner={
                    <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                        />
                    </svg>}
            >
                {/* <SendHorizontal /> */}
            </Button>
                :
                <Button disabled={value===""} color="primary" variant="flat" onClick={handleButtonClick} >
                    <SendHorizontal />
                </Button>
            }
        </div>
    );
}
